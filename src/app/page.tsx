import Hero from './components/hero';
import ToolCardList from './components/tool-card-list';

export default function Home() {
  return (
    <div className="container mx-auto px-24 flex flex-col items-center justify-center">
      <Hero />
      <ToolCardList />
    </div>
  );
}
