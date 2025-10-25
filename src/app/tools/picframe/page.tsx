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
      'pic-container',
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
        canvasHeight / (dist.height || 1),
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

  const drawBorder = (params: { left: number; top: number; width: number; height: number }) => {
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
          canvasHeight / $el.naturalHeight,
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
      canvasHeight / (dist.height || 1),
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

    const drawText = (str: string, config: BorderConfigItem, group: fabric.Group) => {
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
        drawText(fileExif.Model || '', borderConfig.model, borderGroup!),
      );
    }
    if (borderConfig.time.show) {
      borderGroup!.add(
        drawText(
          fileExif.DateTimeOriginal || '',
          borderConfig.time,
          borderGroup!,
        ),
      );
    }
    if (borderConfig.info.show) {
      const infoStr = `f${fileExif.FNumber} 1/${1 / Number(fileExif.ExposureTime)} ISO${fileExif.ISOSpeedRatings}`;
      borderGroup!.add(
        drawText(infoStr, borderConfig.info, borderGroup!),
      );
    }
    if (borderConfig.size.show) {
      const sizeStr = `${fileExif.PixelXDimension} x ${fileExif.PixelYDimension}`;
      borderGroup!.add(
        drawText(sizeStr, borderConfig.size, borderGroup!),
      );
    }
    if (borderConfig.logo.show) {
      // let _url = '';
      // switch (fileExif.Make) {
      //   case 'NIKON CORPORATION':
      //     _url = '/tools/picframe/nikon-logo.svg';
      //     break;
      // }
      // 暂时注释掉SVG加载功能，因为fabric.js版本兼容性问题
      // fabric.loadSVGFromURL(url, (objects, options) => {
      //   if (objects && objects.length > 0) {
      //     const svgInstance = new fabric.Group(objects, options);
      //     svgInstance.left =
      //       (borderGroup?.group?.left || 0) + borderConfig.logo.x / scale;
      //     svgInstance.top =
      //       (fileInfo?.naturalHeight || 0) + borderConfig.logo.y / scale;
      //     svgInstance.width = svgInstance.height =
      //       borderConfig.logo.size! / scale;
      //     borderGroup!.add(svgInstance);
      //     canvas.renderAll();
      //   }
      // });
    }
    canvas.renderAll();
    return () => {
      borderGroup?.getObjects().forEach((i) => {
        if (i instanceof fabric.FabricText || i instanceof fabric.Group) {
          borderGroup.remove(i);
        }
      });
    };
  }, [fileExif, borderConfig, scale, borderGroup, canvas, fileInfo?.naturalHeight]);

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
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-row items-center gap-4">
        <span className="text-2xl font-bold">边框工具</span>
        <ImgUpload onChange={onImgUpload} />
        <Button type="primary" icon={<SaveOutlined />} onClick={onSaveClick}>
          保存
        </Button>
      </div>
      <div
        className="flex flex-row gap-4"
        style={{ height: 'calc(100% - 32px - 1rem)' }}
      >
        <div
          ref={canvasRef}
          className="p-4 border border-gray-300 bg-slate-200 overflow-hidden flex-auto rounded-lg flex flex-col items-center justify-center"
        >
          <canvas id="pic-container" className="w-full h-full"></canvas>
        </div>
        <div className="w-72 min-w-72 overflow-auto pr-2">
          <BorderConfigPanel
            borderConfig={borderConfig}
            setBorderConfig={setBorderConfig}
          ></BorderConfigPanel>
        </div>
      </div>
    </div>
  );
}
