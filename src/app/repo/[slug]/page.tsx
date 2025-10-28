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
    { slug: 'canvas-lib' },
    { slug: 'chatdemo' },
    { slug: 'dachuang' },
    { slug: 'electron' },
    { slug: 'ibf' },
    { slug: 'index' },
    { slug: 'javaks' },
    { slug: 'ksh' },
    { slug: 'mddemo' },
    { slug: 'tenseflow' },
    { slug: 'todo' },
    { slug: 'tongji' },
    { slug: 'webaudio' },
    { slug: 'wkc' },
  ]
}

export const dynamicParams = false