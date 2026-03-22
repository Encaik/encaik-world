'use client';
import { RcFile } from 'antd/es/upload';
import EXIF from 'exif-js';
import { useEffect, useRef, useState } from 'react';
import { BorderConfig, BorderConfigItem, ExifData } from './model';
import ImgUpload from './components/img-upload';
import * as fabric from 'fabric';
import BorderConfigPanel from './components/border-config-panel';
import { imgReader } from './canvas';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function PicFrame() {
  const [fileInfo, setFileInfo] = useState<HTMLImageElement>();
  const [fileExif, setFileExif] = useState<ExifData>();
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [borderGroup, setBorderGroup] = useState<fabric.Group | null>(null);
  const [scale, setScale] = useState<number>(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

  // 初始化画布
  useEffect(() => {
    const canvasElement = document.getElementById(
      'pic-container'
    ) as HTMLCanvasElement;
    if (canvasElement) {
      // 检查是否已经存在canvas实例，如果存在则先销毁
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.dispose();
      }

      const { width, height } = canvasElement.getBoundingClientRect();
      const newCanvas = new fabric.Canvas(canvasElement, {
        width,
        height,
        backgroundColor: '#f8fafc',
      });

      canvasInstanceRef.current = newCanvas;
      // 使用requestAnimationFrame来避免在useEffect中直接调用setState
      requestAnimationFrame(() => {
        setCanvas(newCanvas);
      });
    }

    // 清理函数
    return () => {
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.dispose();
        canvasInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!canvas || !canvasRef.current) return;
      const canvasWidth = canvasRef.current.clientWidth - 32;
      const canvasHeight = canvasRef.current.clientHeight - 32;
      canvas.setHeight(canvasHeight);
      canvas.setWidth(canvasWidth);
      const objects = canvas?.getObjects();
      if (!objects || objects.length === 0) return;
      const dist = objects[0];
      const scale = Math.min(
        canvasWidth / (dist.width || 1),
        canvasHeight / (dist.height || 1)
      );
      canvas.setZoom(scale);
      const left = (canvasWidth / scale - (dist.width || 0)) / 2;
      const top = (canvasHeight / scale - (dist.height || 0)) / 2;
      dist.set({
        left,
        top,
      });
      setScale(() => scale);
      canvas?.renderAll();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvas]);

  // 上传图片
  const onImgUpload = (file: RcFile) => {
    imgReader(file, (img: HTMLImageElement) => {
      setFileInfo(img);
    });
  };

  // 当图片上传成功时，清空画布，重置缩放，并开始绘制
  useEffect(() => {
    if (!fileInfo) return;

    // 获取exif数据
    const getExifData = (el: HTMLImageElement) => {
      EXIF.getData(el.src, () => {
        setFileExif(EXIF.getAllTags(el));
      });
    };

    const drawBorder = (params: {
      left: number;
      top: number;
      width: number;
      height: number;
    }) => {
      const base = new fabric.Rect({
        ...params,
        fill: '#fff',
        selectable: true,
        hasControls: true,
        hasBorders: true,
      });
      return new fabric.Group([base]);
    };

    // 绘制内容
    const drawImage = ($el: HTMLImageElement) => {
      if (!canvas) return;
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const image = new fabric.Image($el, {
        left: 0,
        top: 0,
        width: $el.naturalWidth,
        height: $el.naturalHeight,
      });
      const border = drawBorder({
        left: 0,
        top: $el.naturalHeight,
        width: $el.naturalWidth,
        height:
          120 /
          Math.min(
            canvasWidth / $el.naturalWidth,
            canvasHeight / $el.naturalHeight
          ),
      });
      const dist = new fabric.Group([image, border], {
        evented: false,
        selectable: false,
        hasControls: false,
        hasBorders: false,
      });
      canvas.add(dist);
      const scale = Math.min(
        canvasWidth / (dist.width || 1),
        canvasHeight / (dist.height || 1)
      );
      canvas.setZoom(scale);
      const left = (canvasWidth / scale - (dist.width || 0)) / 2;
      const top = (canvasHeight / scale - (dist.height || 0)) / 2;
      dist.set({
        left,
        top,
      });
      setBorderGroup(() => {
        getExifData($el);
        return border;
      });
      setScale(() => scale);
      canvas.renderAll();
    };

    canvas?.clear();
    canvas?.renderAll();
    canvas?.setZoom(1);
    drawImage(fileInfo);
  }, [canvas, fileInfo]);

  const [borderConfig, setBorderConfig] = useState<BorderConfig>({
    model: {
      show: true,
      x: 45,
      y: 30,
      fontSize: 24,
      color: '#000',
    },
    time: {
      show: true,
      x: 45,
      y: 50,
      fontSize: 18,
      color: '#555',
    },
    info: {
      show: true,
      x: 500,
      y: 35,
      fontSize: 18,
      color: '#555',
    },
    size: {
      show: true,
      x: 500,
      y: 50,
      fontSize: 18,
      color: '#555',
    },
    logo: {
      show: true,
      x: 320,
      y: 35,
      size: 40,
    },
  });

  // 使用exif数据绘制文本
  useEffect(() => {
    console.log('重绘文本');
    if (!fileExif || !canvas) return;

    const drawText = (
      str: string,
      config: BorderConfigItem,
      group: fabric.Group
    ) => {
      return new fabric.FabricText(str, {
        left: (group.group?.left || 0) + config.x / scale,
        top: (fileInfo?.naturalHeight || 0) + config.y / scale,
        fontSize: config.fontSize, // 字体大小
        fill: config.color, // 文本颜色
        scaleX: 1 / scale,
        scaleY: 1 / scale,
      });
    };
    if (borderConfig.model.show) {
      borderGroup!.add(
        drawText(fileExif.Model || '', borderConfig.model, borderGroup!)
      );
    }
    if (borderConfig.time.show) {
      borderGroup!.add(
        drawText(
          fileExif.DateTimeOriginal || '',
          borderConfig.time,
          borderGroup!
        )
      );
    }
    if (borderConfig.info.show) {
      const infoStr = `f${fileExif.FNumber} 1/${1 / Number(fileExif.ExposureTime)} ISO${fileExif.ISOSpeedRatings}`;
      borderGroup!.add(drawText(infoStr, borderConfig.info, borderGroup!));
    }
    if (borderConfig.size.show) {
      const sizeStr = `${fileExif.PixelXDimension} x ${fileExif.PixelYDimension}`;
      borderGroup!.add(drawText(sizeStr, borderConfig.size, borderGroup!));
    }
    if (borderConfig.logo.show) {
      // 暂时注释掉SVG加载功能
    }
    canvas.renderAll();
    return () => {
      borderGroup?.getObjects().forEach((i) => {
        if (i instanceof fabric.FabricText || i instanceof fabric.Group) {
          borderGroup.remove(i);
        }
      });
    };
  }, [
    fileExif,
    borderConfig,
    scale,
    borderGroup,
    canvas,
    fileInfo?.naturalHeight,
  ]);

  const onSaveClick = () => {
    if (!canvas) return;
    const [dist] = canvas.getObjects();
    const dataURL = dist.toDataURL({
      format: 'jpeg',
      multiplier: 1,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.jpg';
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* 面包屑导航 */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              首页
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/tools/picframe"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              工具
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">照片边框</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            照片{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
              边框
            </span>
          </h1>
          <p className="text-gray-600">
            为相机照片添加精致边框和水印，自动生成拍摄参数信息
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* 操作栏 */}
          <div className="flex flex-row items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <ImgUpload onChange={onImgUpload} />
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={onSaveClick}
            >
              保存图片
            </Button>
          </div>

          {/* 主要内容区 */}
          <div
            className="flex flex-col lg:flex-row gap-6"
            style={{ height: 'calc(100vh - 320px)', minHeight: '500px' }}
          >
            {/* 画布区域 */}
            <div
              ref={canvasRef}
              className="flex-1 p-4 border border-gray-200 bg-white overflow-hidden rounded-xl shadow-sm flex flex-col items-center justify-center"
            >
              <canvas id="pic-container" className="w-full h-full"></canvas>
            </div>

            {/* 配置面板 */}
            <div className="w-full lg:w-80 lg:min-w-80 overflow-auto">
              <BorderConfigPanel
                borderConfig={borderConfig}
                setBorderConfig={setBorderConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
