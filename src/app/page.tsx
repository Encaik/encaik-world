import Hero from './components/hero';
import ToolCardList from './components/tool-card-list';
import HomeModules from './components/home-modules';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HomeModules />
      <ToolCardList />
    </main>
  );
}
