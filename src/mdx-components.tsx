import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  // 标题系列
  h1: (props) => (
    <h1
      {...props}
      className="text-3xl md:text-4xl font-bold tracking-tight mb-8 mt-16 text-slate-900 border-b border-slate-200 pb-2"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="text-2xl md:text-3xl font-bold tracking-tight mb-6 mt-14 text-slate-900 text-indigo-700"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="text-xl md:text-2xl font-semibold mb-4 mt-12 text-slate-800"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className="text-lg md:text-xl font-semibold mb-3 mt-10 text-slate-800"
    />
  ),

  // 段落
  p: (props) => (
    <p
      {...props}
      className="text-base md:text-lg mb-6 leading-relaxed text-slate-700"
    />
  ),

  // 列表
  ul: (props) => (
    <ul
      {...props}
      className="list-disc pl-6 mb-6 space-y-2 text-slate-700"
    />
  ),
  li: (props) => (
    <li
      {...props}
      className="relative before:absolute before:left-[-1.5rem] before:text-indigo-500"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="list-decimal pl-6 mb-6 space-y-2 text-slate-700"
    />
  ),

  // 链接
  a: (props) => (
    <a
      {...props}
      className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors font-medium"
    />
  ),

  // 代码块
  pre: (props) => (
    <pre
      {...props}
      className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6 text-sm border border-slate-800"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="px-2 py-0.5 rounded text-indigo-100 font-medium text-sm"
    />
  ),

  // 引用块
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-indigo-500 pl-4 py-2 my-6 bg-indigo-50 text-slate-700 italic"
    />
  ),

  // 分割线
  hr: (props) => (
    <hr
      {...props}
      className="my-12 h-px bg-slate-200 border-0"
    />
  ),

  // 图片
  img: (props) => (
    <img
      {...props}
      className="w-full max-w-3xl mx-auto my-8 rounded-lg shadow-sm border border-slate-100"
      loading="lazy"
    />
  ),

  // 表格
  table: (props) => (
    <table
      {...props}
      className="w-full border-collapse my-6 text-sm"
    />
  ),
  th: (props) => (
    <th
      {...props}
      className="border border-slate-200 px-4 py-2 bg-indigo-50 text-indigo-800 text-left font-semibold"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="border border-slate-200 px-4 py-2 text-slate-700"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components
}