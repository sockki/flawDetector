
import Input from '@/components/Input/Input';

export default function page() {
  return (
    <div className="m-4 flex flex-col items-center justify-center gap-4">
      <Input placeholder="Placeholder" />
      <Input placeholder="Placeholder" variant="error" />
      <Input placeholder="Placeholder" disabled />
    </div>
  );
}
