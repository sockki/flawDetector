import { FloatingButton } from '@/components/Floating/FloatingButton';
import Hero from './_components/Hero';
import Introduction from './_components/Introduction';
import Overview from './_components/Overview';
import CarouSel from './_components/CarouSel';

export default function MainPage() {
  return (
    <div>
      <Hero />
      <Introduction />
      <Overview />
      <CarouSel />

      <FloatingButton type="top" className="fixed bottom-[8.77rem] right-[10.8rem]" />
    </div>
  );
}
