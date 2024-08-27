const getData = async () => {
  const data = await (
    await fetch(`http://localhost:3000/api/vulnerability-db`, {
      cache: 'no-cache',
    })
  ).json();
  return data;
};
export default function page() {
  const data = getData();
  return <>{data}</>;
}
