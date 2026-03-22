'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 渐变圆形装饰 */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-50 blur-3xl" />

        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* 标签 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-600 text-sm font-medium">
              探索 · 创造 · 分享
            </span>
          </div>

          {/* 标题 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">Encaik</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              {' '}
              World
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            一个安放热爱与探索的角落 🌟
            <br />从{' '}
            <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-mono text-lg">
              Hello World
            </code>{' '}
            开始，记录技术路上的每一步
          </p>

          {/* 特性标签 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['React', 'Next.js', 'TypeScript', 'WebGL', 'AI'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA 按钮 - 添加链接 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blogs"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
            >
              开始探索
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="/tools"
              className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 bg-white"
            >
              查看工具
            </Link>
          </div>

          {/* 统计数据 */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '48+', label: '技术博客' },
                { value: '6', label: '实用工具' },
                { value: '100+', label: 'LeetCode' },
                { value: '∞', label: '持续探索' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-xs">向下滚动</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
