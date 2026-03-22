'use client';
import Link from 'next/link';

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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-gray-500 ml-4">共 {blogs.length} 篇</p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item, index) => (
            <Link
              key={item.title}
              href={item.link}
              target={item.isExternal ? '_blank' : '_self'}
              className="group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1">
                {/* 顶部装饰线 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-5">
                  {/* 标题 */}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* 链接类型标签 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.isExternal ? (
                        <span className="px-2 py-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-md">
                          掘金
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-md">
                          本地
                        </span>
                      )}
                    </div>

                    {/* 箭头 */}
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-blue-300 group-hover:bg-blue-50 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
