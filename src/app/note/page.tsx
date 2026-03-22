'use client';
import Link from 'next/link';

const noteCategories = [
  {
    title: '前端学习',
    href: '/note/front',
    description: '前端开发技术栈学习笔记，包括框架、工具、最佳实践',
    icon: '💻',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
    count: 4,
  },
  {
    title: '音乐学习',
    href: '/note/music',
    description: '音乐理论与实践笔记，记录音乐学习的点滴',
    icon: '🎵',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-50 to-rose-50',
    count: 2,
  },
];

export default function NotePage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            学习{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              笔记
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            前端、音乐等领域的学习笔记与心得
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* 分类列表 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">笔记分类</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {noteCategories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-300 hover:shadow-xl hover:-translate-y-2">
                {/* 顶部渐变装饰 */}
                <div className={`h-2 bg-gradient-to-r ${category.gradient}`} />

                <div className="p-8">
                  {/* 图标和数量 */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <span className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">
                      {category.count} 篇笔记
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-rose-600 transition-colors mb-3">
                    {category.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* 进入按钮 */}
                  <div className="flex items-center gap-2 text-rose-600 font-medium group-hover:gap-3 transition-all">
                    <span>查看笔记</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
