import Alert from '@/components/Alert/Alert';

export default function TestPage() {
  return (
    <>
      <Alert type="error" />
      <br />
      <Alert type="complete" />
      <br />
      <Alert type="waiting" />
      <br />
      <Alert type="checking" />
    </>
  );
}
