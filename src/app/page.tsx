import { FloatingButton } from '@/components/Floating/FloatingButton';
import { Carousel, Hero, Introduction, Overview } from './_components';

export default function MainPage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Overview />
      <Carousel />

      <FloatingButton type="top" className="fixed bottom-[8.77rem] right-[10.8rem]" />
    </>
  );
}
