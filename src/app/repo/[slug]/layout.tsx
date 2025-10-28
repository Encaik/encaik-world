import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-24">
      <Link href="/repo">
        返回仓库列表页
      </Link>
      {children}
    </div>
  );
}