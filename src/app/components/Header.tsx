'use client';
import { Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LayoutHeader() {
  const userRouter = useRouter();
  const menu = [
    {
      label: '首页',
      key: '',
    },
    {
      label: '工具',
      key: 'tools',
      children: [
        {
          label: '照片边框',
          key: 'picframe',
        },
        {
          label: '照片调色',
          key: 'photo-curve',
        },
        {
          label: '地图生成工具',
          key: 'map-generator',
        },
        {
          label: 'WebGPU',
          key: 'webgpu',
        }
      ]
    },
  ]

  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    userRouter.push(`/${e.keyPath.reverse().join('/')}`);
  };

  return (
    <Header className="flex flex-row justify-start items-center bg-cyan-950 shadow-lg shadow-blue-500/30">
      <span className="text-gray-100 text-3xl font-bold">Encaik Tools</span>
      <div className="ml-4">
        <Menu mode="horizontal" theme="dark" selectedKeys={[current]} items={menu} onClick={onClick}></Menu>
      </div>
    </Header>
  )
}