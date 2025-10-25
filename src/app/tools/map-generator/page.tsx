import React, { useEffect, useRef, useState } from 'react';
import SimplexNoise from 'simplex-noise';
/**
 * 伪随机数生成器，保证每次刷新不同地图
 * @param {number} seed 种子
 * @returns {() => number} 随机数生成函数
 */
function createSeedRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

/**
 * 生成单块连通大陆掩码（Simplex噪声+最大连通域），面积由landRatio控制
 * @param {number} w 画布宽
 * @param {number} h 画布高
 * @param {number} landRatio 大陆比例
 * @param {() => number} rand 随机数生成器
 * @returns {Promise<number[][]>} 掩码二维数组
 */
async function generateSingleContinentMask(w: number, h: number, landRatio: number, rand: () => number): Promise<number[][]> {
  const simplex = new SimplexNoise(rand);
  const scale = 1.2;
  const raw = Array.from({ length: h }, () => Array(w).fill(0));
  const values: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = (x - w / 2) / (w / 2) * scale;
      const ny = (y - h / 2) / (h / 2) * scale;
      let v = 0.7 * simplex.noise2D(nx, ny)
        + 0.2 * simplex.noise2D(nx * 2, ny * 2)
        + 0.1 * simplex.noise2D(nx * 4, ny * 4);
      const dist = Math.sqrt(nx * nx + ny * ny);
      v -= dist * 0.7;
      raw[y][x] = v;
      values.push(v);
    }
  }
  values.sort((a, b) => a - b);
  const threshold = values[Math.floor((1 - landRatio) * values.length)];
  const mask = Array.from({ length: h }, () => Array(w).fill(0));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      mask[y][x] = raw[y][x] > threshold ? 1 : 0;
    }
  }
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  let maxRegion: [number, number][] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (mask[y][x] && !visited[y][x]) {
        const queue: [number, number][] = [[x, y]];
        const region: [number, number][] = [];
        visited[y][x] = true;
        while (queue.length) {
          const [cx, cy] = queue.shift()!;
          region.push([cx, cy]);
          for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
            const nx = cx + dx, ny = cy + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h && mask[ny][nx] && !visited[ny][nx]) {
              visited[ny][nx] = true;
              queue.push([nx, ny]);
            }
          }
        }
        if (region.length > maxRegion.length) maxRegion = region;
      }
    }
  }
  const finalMask = Array.from({ length: h }, () => Array(w).fill(0));
  for (const [x, y] of maxRegion) finalMask[y][x] = 1;
  return finalMask;
}

/**
 * 细胞自动机处理大陆掩码，增强边缘锯齿和自然感
 * @param {number[][]} mask 掩码二维数组
 * @param {number} iter 迭代次数
 * @returns {number[][]} 新掩码
 */
function cellularAutomata(mask: number[][], iter: number): number[][] {
  const h = mask.length, w = mask[0].length;
  let grid = mask.map(row => [...row]);
  for (let k = 0; k < iter; k++) {
    const next = Array.from({ length: h }, () => Array(w).fill(0));
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            if (grid[y + dy][x + dx]) count++;
          }
        }
        next[y][x] = count >= 5 ? 1 : 0;
      }
    }
    grid = next;
  }
  return grid;
}

/**
 * 绘制地图，包含海洋、陆地和连续边界线
 * @param {CanvasRenderingContext2D} ctx canvas上下文
 * @param {number[][]} mask 掩码二维数组
 * @param {[number, number][]} boundary 大陆边界点集
 */
function drawMap(ctx: CanvasRenderingContext2D, mask: number[][]) {
  const h = mask.length, w = mask[0].length;
  // 先绘制底色（海洋）
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#7ec7e6';
  ctx.fillRect(0, 0, w, h);
  // 填充陆地
  const imgData = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (mask[y][x]) {
        imgData.data[idx] = 109;
        imgData.data[idx + 1] = 179;
        imgData.data[idx + 2] = 127;
        imgData.data[idx + 3] = 255;
      } else {
        imgData.data[idx + 3] = 0;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  // 隐藏边缘线绘制
  // ctx.save();
  // ctx.beginPath();
  // boundary.forEach(([x, y], i) => {
  //   if (i === 0) ctx.moveTo(x, y);
  //   else ctx.lineTo(x, y);
  // });
  // ctx.closePath();
  // ctx.lineWidth = 3;
  // ctx.strokeStyle = '#3a5d2c';
  // ctx.stroke();
  // ctx.restore();
}

const CANVAS_MARGIN = 0;
const SEA_COLOR = '#7ec7e6';

/**
 * 地图生成工具主组件
 * @returns {JSX.Element}
 */
const MapGenerator = () => {
  // 大陆与海洋比例，默认0.5
  const [landRatio] = useState(0.5);
  // 大陆类型，支持扩展，当前为'single'（单块大陆，四周全是海）
  const [continentType] = useState<'single'>('single');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      canvas.width = clientWidth - CANVAS_MARGIN * 2;
      canvas.height = clientHeight - CANVAS_MARGIN * 2;
      renderMap();
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
     
  }, []);

  /**
   * 渲染地图到canvas
   */
  function renderMap() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rand = createSeedRandom(Date.now() % 1000000);
    const w = canvas.width, h = canvas.height;
    const mask: number[][] = [];
    // 类型控制：single为中间一块完整大陆，四周全是海
    if (continentType === 'single') {
      generateSingleContinentMask(w, h, landRatio, rand).then((rawMask) => {
        const mask = cellularAutomata(rawMask, 2);
        drawMap(ctx, mask);
      });
    }
    // 预留：其他类型可扩展
  }

  useEffect(() => {
    renderMap();
     
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: 'calc(100vh - 64px - 32px)', background: SEA_COLOR, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
      {/* 操作区最大化留白，后续可加工具栏 */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', background: SEA_COLOR, borderRadius: 12, boxShadow: '0 2px 16px #0002' }}
      />
    </div>
  );
};

export default MapGenerator; 