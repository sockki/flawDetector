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
      <ContactSection />
      <FloatingButton type="top" className="fixed bottom-[8.77rem] right-[10.8rem]" />
    </>
  );
}
