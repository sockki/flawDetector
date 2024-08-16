import Button from '@/components/Button/Button';

export default function Page() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen">
      <div className="text-center mb-4">
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

      <div className="text-center mb-4">
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
      <div className="text-center mb-4">
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
