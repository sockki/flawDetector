export default async function page() {
  const html = await fetch('http://localhost:3000/api/vulDb', {
    cache: 'no-store',
  });
  const dataset = await html.json();
  console.log(dataset);
  return {
    /* <div className="flex flex-col">
      <span>{dataset[0].title}</span>
      <span>{dataset[0].subTitle}</span>
      <ul>{dataset[0].content.map(c => typeof c === "string" ?  <li>{c}</li> : <ul className="flex flex-col gap-10">{c.table?.map((t,index) => <li>{JSON.stringify(t)}</li>)}</ul>)}</ul>
    </div> */
  };
}
