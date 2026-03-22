'use client';
import Link from 'next/link';

const sections = [
  {
    title: '打卡记录',
    href: '/leecode/check-in',
    description: 'LeetCode 每日打卡，记录坚持刷题的历程',
    icon: '✅',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    title: '日常刷题',
    href: '/leecode/daily',
    description: '每日一题，提升算法与数据结构能力',
    icon: '💻',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
];

export default function LeetCodePage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            力扣{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              刷题
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            LeetCode 刷题记录，提升算法与数据结构能力
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-emerald-100">已完成题目</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="text-4xl font-bold mb-2">365</div>
            <div className="text-blue-100">打卡天数</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="text-4xl font-bold mb-2">∞</div>
            <div className="text-purple-100">持续努力</div>
          </div>
        </div>

        {/* 板块列表 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">刷题板块</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <Link
              key={section.title}
              href={section.href}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-300 hover:shadow-xl hover:-translate-y-2">
                {/* 顶部渐变装饰 */}
                <div className={`h-2 bg-gradient-to-r ${section.gradient}`} />

                <div className="p-8">
                  {/* 图标 */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-3xl">{section.icon}</span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-3">
                    {section.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {section.description}
                  </p>

                  {/* 进入按钮 */}
                  <div className="flex items-center gap-2 text-emerald-600 font-medium group-hover:gap-3 transition-all">
                    <span>进入查看</span>
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
