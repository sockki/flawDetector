const getData = async () => {
  const data = fetch('localhost:3000/api/get');
  return data;
};

export default async function page() {
  const data = getData();
  console.log(data);
  return <div />;
}
