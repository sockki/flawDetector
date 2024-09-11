import { FloatingButton } from '@/components/Floating/FloatingButton';
import { Carousel, Hero, Introduction, Overview } from './_components';
import ContactSection from './me/_components/ContactSection';

export default function MainPage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Overview />
      <Carousel />
      <div className="flex min-h-screen items-center justify-center overflow-hidden p-[15rem]">
        <ContactSection />
      </div>
      <FloatingButton type="top" className="fixed bottom-[8.77rem] right-[10.8rem]" />
    </>
  );
}
