export default async function GetData() {
  const html = await fetch('http://localhost:3000/api/vulDb/updateCrawling', {
    cache: 'no-store',
  });
  const dataset = await html.json();
  return (
    <div className="flex flex-col gap-5">
      {/* {dataset.map(data => (
        <div className="flex flex-col gap-2">
          <span>{data.title}</span>
          <span>{data.company}</span>
          <span>{format(data.uploadDate, 'yyyy.MM.dd hh:mm:ss')}</span>
        </div>
      ))} */}
      {dataset.length}
    </div>
  );
}
