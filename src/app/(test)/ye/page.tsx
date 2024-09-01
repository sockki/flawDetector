import Alert from '@/components/Alert/Alert';

export default function TestPage() {
  return (
    <>
      <Alert type="error" />;
      <Alert type="complete" />;
      <Alert type="waiting" />;
      <Alert type="checking" />;
    </>
  );
}
