'use client';
import { Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LayoutHeader() {
  const router = useRouter();
  const pathname = usePathname();

  // 导航菜单数据
  const menuItems = [
    {
      label: <Link href="/">首页</Link>,
      key: '',
    },
    {
      label: '工具',
      key: 'tools',
      children: [
        {
          label: <Link href="/tools/picframe">照片边框</Link>,
          key: 'picframe',
        },
        {
          label: <Link href="/tools/photo-curve">照片调色</Link>,
          key: 'photo-curve',
        },
        {
          label: <Link href="/tools/map-generator">地图生成工具</Link>,
          key: 'map-generator',
        },
        {
          label: <Link href="/tools/webgpu">WebGPU</Link>,
          key: 'webgpu',
        }
      ]
    },
  ];

  const getSelectedKey = () => {
    if (pathname === '/') return ['']; // 首页对应key为空

    const segments = pathname.replace(/^\/|\/$/g, '').split('/');
    // 例如：/tools/picframe -> 返回 ['tools', 'picframe']（支持多级菜单选中）
    return segments;
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const path = e.keyPath.reverse().filter(Boolean).join('/');
    router.push(path ? `/${path}` : '/');
  };

  return (
    <Header className="flex items-center shadow-md py-0 px-4 md:px-6">
      {/* Logo 区域 */}
      <Link href="/" className="text-white text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
        <span>Encaik</span>
        <span className="text-indigo-300">World</span>
      </Link>

      {/* 导航菜单 */}
      <div className="ml-8">
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          onClick={handleMenuClick}

          style={{
            background: 'transparent',
            borderBottom: 'none',
            flex: 1
          }}
        />
      </div>

    </Header>
  );
}