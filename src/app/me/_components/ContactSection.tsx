import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function Section() {
  return (
    <div className="flex gap-[12.4rem]">
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
