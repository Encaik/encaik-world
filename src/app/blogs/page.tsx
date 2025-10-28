import BlogCardList, { BlogItem } from "@/app/components/blog-card-list";

const blogs: BlogItem[] = [
  {
    title: '【Simple-Notaion】我用vite+ts+vue开发了一个简谱渲染应用，别人问我这有什么意义？',
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
  {
    title: '前端工程化',
    link: '/blogs/index',
    img: '/images/blogs/blog/index.png',
  },
  {
    title: '高德 JS API 总结',
    link: '/blogs/amap',
    img: '/images/blogs/blog/amap.png',
  },
  {
    title: 'Angular 学习笔记',
    link: '/blogs/angular',
    img: '/images/blogs/blog/angular.png',
  },
  {
    title: 'AST 抽象语法树',
    link: '/blogs/ast',
  },
  {
    title: 'Canvas 画布技术',
    link: '/blogs/canvas',
    img: '/images/blogs/blog/canvas/1.png',
  },
  {
    title: 'Console 控制台调试',
    link: '/blogs/console',
  },
  {
    title: 'CSS 预处理器',
    link: '/blogs/csspre',
    img: '/images/blogs/blog/csspre.png',
  },
  {
    title: 'D3.js 数据可视化',
    link: '/blogs/d3',
    img: '/images/blogs/blog/d3.png',
  },
  {
    title: 'Deno 运行时学习',
    link: '/blogs/deno',
  },
  {
    title: 'Docker 容器技术',
    link: '/blogs/docker',
  },
  {
    title: 'Docker Compose 编排',
    link: '/blogs/docker-compose',
  },
  {
    title: 'Docker 项目实战',
    link: '/blogs/docker-project',
  },
  {
    title: 'ECharts 图表库',
    link: '/blogs/echarts',
    img: '/images/blogs/blog/echarts.png',
  },
  {
    title: 'Egg.js 企业级框架',
    link: '/blogs/egg',
  },
  {
    title: 'Electron + Angular',
    link: '/blogs/electron-angular',
    img: '/images/blogs/blog/electron-angular.png',
  },
  {
    title: 'Electron + Vue',
    link: '/blogs/electron-vue',
  },
  {
    title: 'Flex & Grid 布局',
    link: '/blogs/flex-grid',
    img: '/images/blogs/blog/flex&grid.png',
  },
  {
    title: 'Flutter 跨平台开发',
    link: '/blogs/flutter',
    img: '/images/blogs/blog/flutter/1.jpg',
  },
  {
    title: 'G6 图可视化引擎',
    link: '/blogs/g6',
    img: '/images/blogs/blog/g6.png',
  },
  {
    title: 'GIS 地理信息系统',
    link: '/blogs/gis',
    img: '/images/blogs/blog/gis/1.png',
  },
  {
    title: 'Git 版本控制',
    link: '/blogs/git',
    img: '/images/blogs/blog/git.png',
  },
  {
    title: 'Go 语言学习',
    link: '/blogs/golang',
  },
  {
    title: 'HarmonyOS 鸿蒙开发',
    link: '/blogs/harmony',
    img: '/images/blogs/blog/harmony.png',
  },
  {
    title: 'HTTP 协议详解',
    link: '/blogs/http',
  },
  {
    title: 'Koa2 框架学习',
    link: '/blogs/koa2-learn',
  },
  {
    title: 'Mapbox 地图服务',
    link: '/blogs/mapbox',
    img: '/images/blogs/blog/mapbox.png',
  },
  {
    title: 'NG-Alain 代码生成',
    link: '/blogs/ng-alain-generate',
  },
  {
    title: 'NG-Alain Mock 数据',
    link: '/blogs/ng-alain-mock',
  },
  {
    title: 'Angular Universal SSR',
    link: '/blogs/ng-universal',
  },
  {
    title: 'Node.js CLI 工具',
    link: '/blogs/nodecli',
  },
  {
    title: 'Node.js 爬虫技术',
    link: '/blogs/nodespider',
  },
  {
    title: '前端性能优化',
    link: '/blogs/performance',
  },
  {
    title: 'Puppeteer 自动化',
    link: '/blogs/puppeteer',
    img: '/images/blogs/blog/pupeteer.png',
  },
  {
    title: 'React 框架学习',
    link: '/blogs/react',
  },
  {
    title: 'React Native 移动开发',
    link: '/blogs/react-native',
  },
  {
    title: 'Socket.IO 实时通信',
    link: '/blogs/socketio',
    img: '/images/blogs/blog/socketio.png',
  },
  {
    title: 'Spring Boot 后端开发',
    link: '/blogs/springboot',
  },
  {
    title: 'Svelte 框架学习',
    link: '/blogs/svelte',
    img: '/images/blogs/blog/svelte.png',
  },
  {
    title: 'Taro 跨端开发',
    link: '/blogs/taro',
    img: '/images/blogs/blog/taro.png',
  },
  {
    title: '天地图 & Cesium',
    link: '/blogs/tdt-cesium',
  },
  {
    title: 'TensorFlow 机器学习',
    link: '/blogs/tensorflow',
    img: '/images/blogs/blog/tensorflow.png',
  },
  {
    title: 'Three.js 3D 图形',
    link: '/blogs/three',
    img: '/images/blogs/blog/three.png',
  },
  {
    title: 'Tone.js 音频处理',
    link: '/blogs/tonejs',
  },
  {
    title: 'TypeScript 爬虫',
    link: '/blogs/tsspider',
  },
  {
    title: 'VSCode 插件开发',
    link: '/blogs/vscode-extension',
  },
  {
    title: 'Vue 2.x 学习',
    link: '/blogs/vue2',
    img: '/images/blogs/blog/vue2/vue2-1.png',
  },
  {
    title: 'Vue 3.x 学习',
    link: '/blogs/vue3',
  },
  {
    title: 'VuePress 静态站点',
    link: '/blogs/vuepress',
  },
  {
    title: 'Vue Test Utils 测试',
    link: '/blogs/vuetestutils',
  },
  {
    title: 'Vue Test Utils 2',
    link: '/blogs/vuetestutils2',
  },
  {
    title: 'Webpack 模块打包',
    link: '/blogs/webpack',
  },
];

export default function Blogs() {
  return (
    <>
      <BlogCardList title={'博客列表 📝'} blogs={blogs} />
      <BlogCardList title={'历史文档 📚'} blogs={history} />
    </>
  );
}
