import BlogCardList, { BlogItem } from "@/app/components/blog-card-list";

const blogs: BlogItem[] = [
  {
    title: '聊天室demo',
    link: '/repo/chatdemo',
    isExternal: false,
  },
  {
    title: '大创项目-文件内容搜索系统',
    link: '/repo/dachuang',
    isExternal: false,
  },
  {
    title: 'Electron应用',
    link: '/repo/electron',
    isExternal: false,
  },
  {
    title: 'IBF项目',
    link: '/repo/ibf',
    isExternal: false,
  },
  {
    title: '毕业设计-高校学生会事务管理系统',
    link: '/repo/index',
    isExternal: false,
  },
  {
    title: 'Java课设——薪资管理系统',
    link: '/repo/javaks',
    isExternal: false,
  },
  {
    title: '可视化demo',
    link: '/repo/ksh',
    isExternal: false,
  },
  {
    title: 'Markdown',
    link: '/repo/mddemo',
    isExternal: false,
  },
  {
    title: 'TenseFlow',
    link: '/repo/tenseflow',
    isExternal: false,
  },
  {
    title: 'Todo应用',
    link: '/repo/todo',
    isExternal: false,
  },
  {
    title: '歌词统计 - 词云统计生成',
    link: '/repo/tongji',
    isExternal: false,
  },
  {
    title: 'WebAudio - 音频处理应用',
    link: '/repo/webaudio',
    isExternal: false,
  },
  {
    title: '大学微科创竞赛项目——学生财务管理系统',
    link: '/repo/wkc',
    isExternal: false,
  },
];

export default function Repo() {
  return (
    <>
      <BlogCardList title={'项目简介 📚'} blogs={blogs} />
    </>
  );
}
