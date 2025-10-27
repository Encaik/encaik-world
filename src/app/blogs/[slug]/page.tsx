export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Post } = await import(`../content/${slug}.md`)

  return <Post />
}

export function generateStaticParams() {
  return [
    { slug: 'amap' },
    { slug: 'angular' },
    { slug: 'ast' },
    { slug: 'canvas' },
    { slug: 'console' },
    { slug: 'csspre' },
    { slug: 'd3' },
    { slug: 'deno' },
    { slug: 'docker-compose' },
    { slug: 'docker-project' },
    { slug: 'docker' },
    { slug: 'echarts' },
    { slug: 'egg' },
    { slug: 'electron-angular' },
    { slug: 'electron-vue' },
    { slug: 'flex&grid' },
    { slug: 'flutter' },
    { slug: 'g6' },
    { slug: 'gis' },
    { slug: 'git' },
    { slug: 'golang' },
    { slug: 'harmony' },
    { slug: 'http' },
    { slug: 'index' },
    { slug: 'koa2-learn' },
    { slug: 'mapbox' },
    { slug: 'ng-alain-generate' },
    { slug: 'ng-alain-mock' },
    { slug: 'ng-universal' },
    { slug: 'nodecli' },
    { slug: 'nodespider' },
    { slug: 'performance' },
    { slug: 'puppeteer' },
    { slug: 'react-native' },
    { slug: 'react' },
    { slug: 'socketio' },
    { slug: 'springboot' },
    { slug: 'svelte' },
    { slug: 'taro' },
    { slug: 'tdt&cesium' },
    { slug: 'tensorflow' },
    { slug: 'three' },
    { slug: 'tonejs' },
    { slug: 'tsspider' },
    { slug: 'vscode-extension' },
    { slug: 'vue2' },
    { slug: 'vue3' },
    { slug: 'vuepress' },
    { slug: 'vuetestutils' },
    { slug: 'vuetestutils2' },
    { slug: 'webpack' }
  ]
}

export const dynamicParams = false