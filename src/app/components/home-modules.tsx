'use client';
import Link from 'next/link';

const modules = [
  {
    title: '技术博客',
    description: '记录技术路上的思考与探索，分享开发经验与心得',
    icon: '📝',
    href: '/blogs',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    stats: '48+ 篇文章',
  },
  {
    title: '实用工具',
    description: '精心打造的在线工具，帮助你更高效地完成工作',
    icon: '🛠️',
    href: '/tools',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    stats: '6 个工具',
  },
  {
    title: '项目仓库',
    description: '收录过往的项目作品，记录技术成长的足迹',
    icon: '📦',
    href: '/repo',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    stats: '13 个项目',
  },
  {
    title: '力扣刷题',
    description: 'LeetCode 刷题记录，提升算法与数据结构能力',
    icon: '💻',
    href: '/leecode',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    stats: '100+ 题目',
  },
  {
    title: '学习笔记',
    description: '前端、音乐等领域的学习笔记与心得',
    icon: '📚',
    href: '/note',
    gradient: 'from-rose-500 to-red-500',
    bgGradient: 'from-rose-50 to-red-50',
    stats: '多篇笔记',
  },
  {
    title: '学习路线',
    description: '技术学习路线与自检清单，规划成长路径',
    icon: '🗺️',
    href: '/road',
    gradient: 'from-indigo-500 to-violet-500',
    bgGradient: 'from-indigo-50 to-violet-50',
    stats: '持续更新',
  },
];

export default function HomeModules() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-gray-600 text-sm font-medium">探索更多</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            发现{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              精彩内容
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            从博客到工具，从项目到笔记，探索技术世界的无限可能
          </p>
        </div>

        {/* 模块网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link
              key={module.title}
              href={module.href}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-300 hover:shadow-xl hover:-translate-y-2">
                {/* 顶部渐变装饰 */}
                <div className={`h-1.5 bg-gradient-to-r ${module.gradient}`} />

                <div className="p-6">
                  {/* 图标和统计 */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-2xl">{module.icon}</span>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                      {module.stats}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {module.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {module.description}
                  </p>

                  {/* 进入按钮 */}
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>进入查看</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
    </section>
  );
}
