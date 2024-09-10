import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center gap-[12.4rem] overflow-hidden p-[15rem]">
      <ContactInfo />
      <ContactForm />
    </section>
  );
}
