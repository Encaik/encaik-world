'use client';
import { Button, Card, Tooltip, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ReadOutlined } from '@ant-design/icons';
import Link from 'next/link';

const DEFAULT_IMG = 'https://img.shields.io/badge/Encaik-Blogs-blue?style=flat-square';

// 定义博客项的类型接口
export interface BlogItem {
  title: string;
  link: string;
  img?: string;
  isExternal?: boolean;
}

interface BlogCardListProps {
  blogs: BlogItem[];
  title: string;
}

export default function BlogCardList({ blogs, title }: BlogCardListProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* 标题区域 */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{title}</h2>
          <div className="w-24 h-1 bg-indigo-600 rounded-full mx-auto"></div>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((item) => (
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
                  title={'立即阅读'}
                  placement="top"
                >
                  <Link
                    href={item.link}
                    target={item.isExternal ? '_blank' : '_self'}
                    className="w-full"
                  >
                    <Button
                      type="primary"
                      icon={<ReadOutlined />}
                      style={{
                        width: '100%',
                        background: '#4f46e5',
                        borderColor: '#4f46e5',
                        borderRadius: '8px'
                      }}
                      className="hover:bg-indigo-700 transition-colors"
                    >
                      立即阅读
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
                      display: 'inline-flex',
                      whiteSpace: 'break-spaces',
                    }}
                  >
                    {item.title}
                  </span>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </section >
  );
}