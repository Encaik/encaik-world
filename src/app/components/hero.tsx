export default function Hero() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* 标题与标识 */}
        <div className="mb-1 md:mb-3 flex items-center gap-2">
          <span className="text-sm md:text-base text-slate-500">个人探索空间</span>
          <div className="h-3 w-px bg-slate-300"></div>
          <span className="text-sm md:text-base text-slate-500">始于 Hello World</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
          Encaik <span className="text-indigo-600">World</span> 🌍
        </h1>

        {/* 介绍文本 */}
        <div className="space-y-4 text-lg md:text-xl text-slate-700 leading-relaxed">
          <p>
            这里是我存放想法、折腾尝试的小天地 ✨ 从最初的 <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-700 font-medium">Hello World</code> 开始，慢慢搭建出属于自己的探索空间。
          </p>
          <p>
            你会看到技术路上的零散尝试：可能是刚跑通的代码片段 💻、突发奇想的设计草稿 🎨，或是对新工具的笨拙摸索 🛠️。
          </p>
          <p className="text-indigo-700 font-medium">
            简单说，这就是我的「Hello Encaik World」—— 一个安放热爱与探索的角落 🌟
          </p>
        </div>

        {/* 装饰线 */}
        <div className="mt-10 md:mt-14 w-full h-1 bg-indigo-600 rounded-full"></div>
      </div>
    </section>
  )
}