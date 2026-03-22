'use client';
import Link from 'next/link';

const roadItems = [
  {
    title: '学习路线',
    href: '/road/road',
    description: '前端技术学习路线图，从入门到精通的成长路径',
    icon: '🗺️',
    gradient: 'from-indigo-500 to-violet-600',
    bgGradient: 'from-indigo-50 to-violet-50',
  },
  {
    title: '自检清单',
    href: '/road/checklist',
    description: '技术自检清单，查漏补缺，巩固知识体系',
    icon: '📋',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
];

export default function RoadPage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            学习{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              路线
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            技术学习路线与自检清单，规划成长路径
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* 板块列表 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">学习资源</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-300 hover:shadow-xl hover:-translate-y-2">
                {/* 顶部渐变装饰 */}
                <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />

                <div className="p-8">
                  {/* 图标 */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-3">
                    {item.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* 进入按钮 */}
                  <div className="flex items-center gap-2 text-indigo-600 font-medium group-hover:gap-3 transition-all">
                    <span>查看详情</span>
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
