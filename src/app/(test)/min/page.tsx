export default async function page() {
  const html = await fetch('http://localhost:3000/api/vulDb', {
    cache: 'no-cache',
  });
  const dataset = await html.json();
  console.log(dataset);
  return (
    <div>
      <ul />
    </div>
  );
}
