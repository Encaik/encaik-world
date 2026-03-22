'use client';
import Link from 'next/link';

const tools = [
  {
    title: '照片边框',
    href: '/tools/picframe',
    description:
      '为相机照片添加精致边框和水印，自动生成相机型号、拍摄参数等信息',
    icon: '📷',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-50 to-rose-50',
    tags: ['图片处理', 'EXIF'],
    isExternal: false,
  },
  {
    title: '照片调色',
    href: '/tools/photo-curve',
    description:
      '支持上传照片，左侧渲染，右侧可用风格曲线调整全通道和RGB通道色彩',
    icon: '🎨',
    gradient: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-50 to-indigo-50',
    tags: ['图片处理', '曲线'],
    isExternal: false,
  },
  {
    title: '地图生成',
    href: '/tools/map-generator',
    description: '在线地图生成工具，使用 Simplex 噪声生成随机大陆地图',
    icon: '🗺️',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    tags: ['图形', '算法'],
    isExternal: false,
  },
  {
    title: 'WebGPU',
    href: '/tools/webgpu',
    description: 'WebGPU 图形渲染实验，探索前沿 Web 图形技术',
    icon: '⚡',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
    tags: ['图形', 'GPU'],
    isExternal: false,
  },
  {
    title: '简谱编辑',
    href: 'https://simple-notation.vercel.app/',
    description: '在线简谱编辑与渲染，支持多种乐谱格式，适合音乐爱好者',
    icon: '🎵',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    tags: ['音乐', '编辑器'],
    isExternal: true,
  },
  {
    title: '技术博客',
    href: 'https://encaik.top/',
    description: '记录开发心得与技术分享，探索前端技术的无限可能',
    icon: '📝',
    gradient: 'from-slate-500 to-slate-700',
    bgGradient: 'from-slate-50 to-gray-50',
    tags: ['博客', '分享'],
    isExternal: true,
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            实用{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              工具
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            精心打造的在线工具，帮助你更高效地完成工作
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* 工具统计 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">工具列表</h2>
          <span className="text-gray-500">共 {tools.length} 个工具</span>
        </div>

        {/* 工具网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={tool.title}
              href={tool.href}
              target={tool.isExternal ? '_blank' : '_self'}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-300 hover:shadow-xl hover:-translate-y-2">
                {/* 顶部渐变装饰 */}
                <div className={`h-2 bg-gradient-to-r ${tool.gradient}`} />

                <div className="p-6">
                  {/* 图标 */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{tool.icon}</span>
                  </div>

                  {/* 标题 */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    {tool.isExternal && (
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </div>

                  {/* 描述 */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-md group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 进入按钮 */}
                  <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>使用工具</span>
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
    </main>
  );
}
