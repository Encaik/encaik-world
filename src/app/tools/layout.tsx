export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-full flex flex-col">
      {children}
    </div>
  )
}