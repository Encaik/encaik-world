'use client';
import { useState } from 'react';
import BlogCardList, { BlogItem } from '@/app/components/blog-card-list';
import Link from 'next/link';

const blogs: BlogItem[] = [
  {
    title:
      '【Simple-Notaion】我用vite+ts+vue开发了一个简谱渲染应用，别人问我这有什么意义？',
    link: 'https://juejin.cn/post/7504094143413895183',
    isExternal: true,
  },
  {
    title: '跟上潮流，在Cursor里面加一点点MCP，在Agent中调试页面',
    link: 'https://juejin.cn/post/7491231734953295922',
    isExternal: true,
  },
  {
    title: '浅浅尝试Web Audio API 的使用，还挺有意思的',
    link: 'https://juejin.cn/post/7250122416948920357',
    isExternal: true,
  },
  {
    title: '（tauri+svelte+cesium）谁不想在桌面摆个地球仪呢🌏',
    link: 'https://juejin.cn/post/7135356134134644773',
    isExternal: true,
  },
  {
    title: '👀菜鸟前端摸爬滚打探索Canvas引擎要怎么实现（二）',
    link: 'https://juejin.cn/post/7055576235425923102',
    isExternal: true,
  },
  {
    title: '👀菜鸟前端摸爬滚打探索Canvas引擎要怎么实现',
    link: 'https://juejin.cn/post/7044790690076688397',
    isExternal: true,
  },
  {
    title: '🚀初次上手尝试开发鸿蒙OS上的Javascript应用（一）',
    link: 'https://juejin.cn/post/6971681119787810847',
    isExternal: true,
  },
  {
    title: '近期使用高德地图 JS api 的部分总结',
    link: 'https://juejin.cn/post/6896276492309757959',
    isExternal: true,
  },
  {
    title: '使用AntV G6实现流程图编辑',
    link: 'https://juejin.cn/post/6864459121828888584',
    isExternal: true,
  },
];

const history: BlogItem[] = [
  { title: '前端工程化', link: '/blogs/index' },
  { title: '高德 JS API 总结', link: '/blogs/amap' },
  { title: 'Angular 学习笔记', link: '/blogs/angular' },
  { title: 'AST 抽象语法树', link: '/blogs/ast' },
  { title: 'Canvas 画布技术', link: '/blogs/canvas' },
  { title: 'Console 控制台调试', link: '/blogs/console' },
  { title: 'CSS 预处理器', link: '/blogs/csspre' },
  { title: 'D3.js 数据可视化', link: '/blogs/d3' },
  { title: 'Deno 运行时学习', link: '/blogs/deno' },
  { title: 'Docker 容器技术', link: '/blogs/docker' },
  { title: 'Docker Compose 编排', link: '/blogs/docker-compose' },
  { title: 'Docker 项目实战', link: '/blogs/docker-project' },
  { title: 'ECharts 图表库', link: '/blogs/echarts' },
  { title: 'Egg.js 企业级框架', link: '/blogs/egg' },
  { title: 'Electron + Angular', link: '/blogs/electron-angular' },
  { title: 'Electron + Vue', link: '/blogs/electron-vue' },
  { title: 'Flex & Grid 布局', link: '/blogs/flex-grid' },
  { title: 'Flutter 跨平台开发', link: '/blogs/flutter' },
  { title: 'G6 图可视化引擎', link: '/blogs/g6' },
  { title: 'GIS 地理信息系统', link: '/blogs/gis' },
  { title: 'Git 版本控制', link: '/blogs/git' },
  { title: 'Go 语言学习', link: '/blogs/golang' },
  { title: 'HarmonyOS 鸿蒙开发', link: '/blogs/harmony' },
  { title: 'HTTP 协议详解', link: '/blogs/http' },
  { title: 'Koa2 框架学习', link: '/blogs/koa2-learn' },
  { title: 'Mapbox 地图服务', link: '/blogs/mapbox' },
  { title: 'NG-Alain 代码生成', link: '/blogs/ng-alain-generate' },
  { title: 'NG-Alain Mock 数据', link: '/blogs/ng-alain-mock' },
  { title: 'Angular Universal SSR', link: '/blogs/ng-universal' },
  { title: 'Node.js CLI 工具', link: '/blogs/nodecli' },
  { title: 'Node.js 爬虫技术', link: '/blogs/nodespider' },
  { title: '前端性能优化', link: '/blogs/performance' },
  { title: 'Puppeteer 自动化', link: '/blogs/puppeteer' },
  { title: 'React 框架学习', link: '/blogs/react' },
  { title: 'React Native 移动开发', link: '/blogs/react-native' },
  { title: 'Socket.IO 实时通信', link: '/blogs/socketio' },
  { title: 'Spring Boot 后端开发', link: '/blogs/springboot' },
  { title: 'Svelte 框架学习', link: '/blogs/svelte' },
  { title: 'Taro 跨端开发', link: '/blogs/taro' },
  { title: '天地图 & Cesium', link: '/blogs/tdt-cesium' },
  { title: 'TensorFlow 机器学习', link: '/blogs/tensorflow' },
  { title: 'Three.js 3D 图形', link: '/blogs/three' },
  { title: 'Tone.js 音频处理', link: '/blogs/tonejs' },
  { title: 'TypeScript 爬虫', link: '/blogs/tsspider' },
  { title: 'VSCode 插件开发', link: '/blogs/vscode-extension' },
  { title: 'Vue 2.x 学习', link: '/blogs/vue2' },
  { title: 'Vue 3.x 学习', link: '/blogs/vue3' },
  { title: 'VuePress 静态站点', link: '/blogs/vuepress' },
  { title: 'Vue Test Utils 测试', link: '/blogs/vuetestutils' },
  { title: 'Vue Test Utils 2', link: '/blogs/vuetestutils2' },
  { title: 'Webpack 模块打包', link: '/blogs/webpack' },
];

// 按首字母分组
const groupedHistory = history.reduce(
  (acc, item) => {
    const firstLetter = item.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  },
  {} as Record<string, BlogItem[]>
);

const sortedLetters = Object.keys(groupedHistory).sort();

export default function Blogs() {
  const [activeTab, setActiveTab] = useState<'juejin' | 'local'>('juejin');

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            技术{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              博客
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            记录技术路上的思考与探索，分享开发经验与心得
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* 标签切换 */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('juejin')}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === 'juejin'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            掘金文章 ({blogs.length})
            {activeTab === 'juejin' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('local')}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === 'local'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            本地文档 ({history.length})
            {activeTab === 'local' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>

        {/* 内容区域 */}
        {activeTab === 'juejin' ? (
          <BlogCardList title={'掘金文章'} blogs={blogs} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 侧边栏索引 */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">
                  字母索引
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sortedLetters.map((letter) => (
                    <a
                      key={letter}
                      href={`#letter-${letter}`}
                      className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
                    >
                      {letter}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 文档列表 */}
            <div className="md:col-span-3">
              {sortedLetters.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {groupedHistory[letter].map((item) => (
                      <Link
                        key={item.title}
                        href={item.link}
                        className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:shadow-md transition-all"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
