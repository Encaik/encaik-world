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
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* 标题区域 */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">工具介绍 🛠️</h2>
          <div className="w-24 h-1 bg-indigo-600 rounded-full mx-auto"></div>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((item) => (
            <Card
              key={item.title}
              className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px'
              }}
              styles={{
                cover: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fafafa'
                },
                body: {
                  flex: '1 1',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column'
                },
                actions: {
                  padding: '12px 16px',
                  borderTop: '1px solid #f0f2f5',
                  background: '#fafafa'
                }
              }}
              cover={
                <Image
                  alt={item.title}
                  src={item.img || DEFAULT_IMG}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'contain'
                  }}
                  preview={false}
                  fallback={DEFAULT_IMG}
                />
              }
              actions={[
                <Tooltip
                  key="action"
                  title={item.isExternal ? '外部链接，新开页面' : '立即使用'}
                  placement="top"
                >
                  <Link
                    href={item.link}
                    target={item.isExternal ? '_blank' : '_self'}
                    className="w-full"
                  >
                    <Button
                      type="primary"
                      icon={item.isExternal ? <LinkOutlined /> : <SendOutlined />}
                      style={{
                        width: '100%',
                        background: '#4f46e5',
                        borderColor: '#4f46e5',
                        borderRadius: '8px'
                      }}
                      className="hover:bg-indigo-700 transition-colors"
                    >
                      立即使用
                    </Button>
                  </Link>
                </Tooltip>,
              ]}
            >
              {/* 卡片内容 */}
              <Meta
                title={
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1e293b',
                      marginBottom: '8px',
                      lineHeight: '18px',
                      display: 'inline-flex'
                    }}
                  >
                    {item.title}
                    {item.isExternal && (
                      <LinkOutlined
                        style={{
                          marginLeft: 6,
                          fontSize: 18,
                          color: '#4f46e5',
                          lineHeight: '18px'
                        }}
                      />
                    )}
                  </span>
                }
                description={
                  <p style={{
                    color: '#64748b',
                    lineHeight: 1.6,
                    fontSize: '14px',
                    flexGrow: 1
                  }}>
                    {item.description}
                  </p>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}