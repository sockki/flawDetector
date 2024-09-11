import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="flex gap-[12.4rem]">
      <ContactInfo />
      <ContactForm />
    </section>
  );
}
