'use client';
import { Button, Card, Tooltip, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import { SendOutlined, LinkOutlined } from '@ant-design/icons';
import Link from 'next/link';

const DEFAULT_IMG = 'https://img.shields.io/badge/Encaik-Tools-blue?style=flat-square';

const tools = [
  {
    title: '照片边框',
    link: '/tools/picframe',
    img: '/images/tools-card/picframe.png',
    description:
      '为相机照片添加精致边框和水印，自动生成相机型号、拍摄参数等信息，彰显摄影师风格与技术细节。',
    isExternal: false,
  },
  {
    title: '简谱编辑工具',
    link: 'https://simple-notation.vercel.app/',
    img: '',
    description: '在线简谱编辑与渲染，支持多种乐谱格式，适合音乐爱好者和教师。',
    isExternal: true,
  },
  {
    title: 'WebGpu',
    link: '/tools/webgpu',
    img: '',
    description: 'WebGPU 图形渲染实验工具，探索前沿 Web 图形技术。',
    isExternal: false,
  },
  {
    title: '博客',
    link: 'https://encaik.top/',
    img: '',
    description: '作者博客，记录开发心得与技术分享。',
    isExternal: true,
  },
  {
    title: '照片调色',
    link: '/tools/photo-curve',
    img: '',
    description: '支持上传照片，左侧渲染，右侧可用风格曲线调整全通道和RGB通道色彩。',
    isExternal: false,
  },
  {
    title: '地图生成工具',
    link: '/tools/map-generator',
    img: '',
    description: '在线地图生成与编辑工具，支持自定义标记与样式，适用于地理信息可视化。',
    isExternal: false,
  },
];

export default function ToolCardList() {
  return (
    <>
      <span className="my-20 text-gray-500 text-4xl text-center">工具介绍</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((item) => (
          <Card
            key={item.title}
            className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            styles={{
              body: {
                flex: '1 1'
              }
            }}
            cover={
              <div
                style={{
                  background: '#f0f2f5',
                  height: 180,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <Image
                  alt={item.title}
                  src={item.img || DEFAULT_IMG}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  preview={false}
                  fallback={DEFAULT_IMG}
                  placeholder={
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#f0f2f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999'
                    }}>
                      加载中...
                    </div>
                  }
                />
              </div>
            }
            actions={[
              <Tooltip title={item.isExternal ? '外部链接，新开页面' : '立即使用'} key="action">
                <Link href={item.link} target={item.isExternal ? '_blank' : '_self'}>
                  <Button
                    type="primary"
                    icon={item.isExternal ? <LinkOutlined /> : <SendOutlined />}
                  >
                    立即使用
                  </Button>
                </Link>
              </Tooltip>,
            ]}
          >
            <Meta
              title={
                <span>
                  {item.title}
                  {item.isExternal && <LinkOutlined style={{ marginLeft: 6, fontSize: 14, color: '#1677ff' }} />}
                </span>
              }
              description={item.description}
            />
          </Card>
        ))}
      </div>
    </>
  )
}