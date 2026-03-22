'use client';
import Link from 'next/link';

const projects = [
  {
    title: '聊天室 Demo',
    link: '/repo/chatdemo',
    description: '实时聊天应用，支持多人在线交流',
    icon: '💬',
    category: 'Web 应用',
  },
  {
    title: '大创项目-文件内容搜索系统',
    link: '/repo/dachuang',
    description: '基于内容的文件搜索引擎',
    icon: '🔍',
    category: '搜索引擎',
  },
  {
    title: 'Electron 应用',
    link: '/repo/electron',
    description: '跨平台桌面应用开发实践',
    icon: '🖥️',
    category: '桌面应用',
  },
  {
    title: 'IBF 项目',
    link: '/repo/ibf',
    description: 'IBF 相关项目',
    icon: '📊',
    category: '数据处理',
  },
  {
    title: '毕业设计-高校学生会事务管理系统',
    link: '/repo/index',
    description: '学生会事务管理系统',
    icon: '🎓',
    category: '管理系统',
  },
  {
    title: 'Java 课设——薪资管理系统',
    link: '/repo/javaks',
    description: '薪资管理与计算系统',
    icon: '💰',
    category: '管理系统',
  },
  {
    title: '可视化 Demo',
    link: '/repo/ksh',
    description: '数据可视化展示项目',
    icon: '📈',
    category: '可视化',
  },
  {
    title: 'Markdown 编辑器',
    link: '/repo/mddemo',
    description: '在线 Markdown 编辑与预览',
    icon: '📝',
    category: '编辑器',
  },
  {
    title: 'TensorFlow 练习',
    link: '/repo/tenseflow',
    description: '机器学习与深度学习实践',
    icon: '🤖',
    category: 'AI/ML',
  },
  {
    title: 'Todo 应用',
    link: '/repo/todo',
    description: '任务管理与待办事项',
    icon: '✅',
    category: '效率工具',
  },
  {
    title: '歌词统计 - 词云统计生成',
    link: '/repo/tongji',
    description: '歌词分析与词云可视化',
    icon: '🎵',
    category: '数据处理',
  },
  {
    title: 'WebAudio - 音频处理应用',
    link: '/repo/webaudio',
    description: 'Web Audio API 音频处理',
    icon: '🎧',
    category: '音频处理',
  },
  {
    title: '大学微科创竞赛项目——学生财务管理系统',
    link: '/repo/wkc',
    description: '学生财务管理与统计',
    icon: '📱',
    category: '管理系统',
  },
];

export default function Repo() {
  return (
    <main className="min-h-screen bg-white pt-16">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            项目{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              仓库
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            收录过往的项目作品，记录技术成长的足迹
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* 项目统计 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">项目列表</h2>
          <span className="text-gray-500">共 {projects.length} 个项目</span>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={project.link}
              className="group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-200 hover:shadow-lg hover:-translate-y-1">
                {/* 顶部装饰线 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6">
                  {/* 图标和分类 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{project.icon}</span>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* 箭头 */}
                  <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-purple-300 group-hover:bg-purple-50 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors"
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
