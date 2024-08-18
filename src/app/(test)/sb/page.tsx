import Button from '@/components/Button/Button';

export default function Page() {
  return (
    <div className="h-screen flex-col items-center justify-center gap-10">
      <div className="mb-4 text-center">
        <p>Filled</p>
      </div>
      <div className="flex gap-10">
        <Button variant="filled" size="small" disabled>
          button
        </Button>
        <Button variant="filled" shape="rectangle" size="small">
          button
        </Button>
        <Button variant="filled">button</Button>
        <Button variant="filled" shape="rectangle">
          button
        </Button>
        <Button variant="filled" size="large" shape="rectangle">
          button
        </Button>
      </div>

      <div className="mb-4 text-center">
        <p>Outlined</p>
      </div>
      <div className="flex gap-10">
        <Button variant="outlined" size="small" disabled>
          button
        </Button>
        <Button variant="outlined" shape="rectangle" size="small">
          button
        </Button>
        <Button variant="outlined">button</Button>
        <Button variant="outlined" shape="rectangle">
          button
        </Button>
        <Button variant="outlined" size="large" shape="rectangle">
          button
        </Button>
      </div>
      <div className="mb-4 text-center">
        <p>Tonal</p>
      </div>
      <div className="flex gap-10">
        <Button variant="tonal" shape="rounded" size="small" disabled>
          button
        </Button>
        <Button variant="tonal" shape="rectangle" size="small">
          button
        </Button>
        <Button variant="tonal" shape="rounded">
          button
        </Button>
        <Button variant="tonal" shape="rectangle">
          button
        </Button>
        <Button variant="tonal" size="large" shape="rectangle">
          button
        </Button>
      </div>
    </div>
  );
}
