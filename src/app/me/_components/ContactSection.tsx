import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function Section() {
  return (
    <div className="flex gap-[12.4rem]">
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
