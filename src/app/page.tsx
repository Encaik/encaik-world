import '@ant-design/v5-patch-for-react-19';
import ToolCardList from './components/ToolCardList';

export default function Home() {
  return (
    <div className="container mx-auto px-24 flex flex-col items-center justify-center">
      <span className="text-9xl font-bold py-48 text-center">Encaik Tools</span>
      <ToolCardList />
    </div>
  );
}
