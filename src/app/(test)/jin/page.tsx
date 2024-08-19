import InfoBox from '../../../components/InfoBox/InfoBox';

export default function App() {
  return (
    <div className="p-[1rem]">
      <InfoBox theme="red" location bullet description={[' ']} />

      <InfoBox theme="primary" location={false} bullet description={[' ']} />

      <InfoBox theme="gray" location bullet={false} description={[' ']} />
    </div>
  );
}
