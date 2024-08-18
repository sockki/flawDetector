import Input from '@/components/Input/Input';

export default function page() {
  return (
    <div className="flex flex-col gap-4 m-4 items-center justify-center">
      <Input placeholder="Placeholder" />
      <Input placeholder="Placeholder" variant="error" />
      <Input placeholder="Placeholder" disabled />
    </div>
  );
}
