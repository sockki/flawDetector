import MePageTitle from '@/app/me/_components/MePageTitle';
import ContactSection from '@/app/me/_components/ContactSection';

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center gap-[12.4rem]">
      <MePageTitle title="Customer Service center" />
      <ContactSection />
    </div>
  );
}
