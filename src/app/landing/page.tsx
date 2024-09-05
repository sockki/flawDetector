import { FloatingButton } from '@/components/Floating/FloatingButton';
import Hero from './_components/Hero';
import Introduction from './_components/Introduction';
import Overview from './_components/Overview';
import Carousel from './_components/Carousel';

export default function MainPage() {
  return (
    <div>
      <Hero />
      <Introduction />
      <Overview />
      <Carousel />

      <FloatingButton type="top" className="fixed bottom-[8.77rem] right-[10.8rem]" />
    </div>
  );
}
