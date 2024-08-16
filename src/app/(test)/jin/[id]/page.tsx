import InfoBox from '@/components/InfoBox/InfoBox';

function InfoBoxGroup() {
  return (
    <>
      <InfoBox
        theme="red"
        location="on"
        bullet="off"
        description="Red theme with location on and bullet off."
      />
      <InfoBox
        theme="red"
        location="on"
        bullet="on"
        description="Red theme with location on and bullet on."
      />
      <InfoBox
        theme="red"
        location="off"
        bullet="off"
        description="Red theme with location off and bullet off."
      />
      <InfoBox
        theme="red"
        location="off"
        bullet="on"
        description="Red theme with location off and bullet on."
      />

      <InfoBox
        theme="primary"
        location="on"
        bullet="off"
        description="Primary theme with location on and bullet off."
      />
      <InfoBox
        theme="primary"
        location="on"
        bullet="on"
        description="Primary theme with location on and bullet on."
      />
      <InfoBox
        theme="primary"
        location="off"
        bullet="off"
        description="Primary theme with location off and bullet off."
      />
      <InfoBox
        theme="primary"
        location="off"
        bullet="on"
        description="Primary theme with location off and bullet on."
      />

      <InfoBox
        theme="grey"
        location="on"
        bullet="off"
        description="Grey theme with location on and bullet off."
      />
      <InfoBox
        theme="grey"
        location="on"
        bullet="on"
        description="Grey theme with location on and bullet on."
      />
      <InfoBox
        theme="grey"
        location="off"
        bullet="off"
        description="Grey theme with location off and bullet off."
      />
      <InfoBox
        theme="grey"
        location="off"
        bullet="on"
        description="Grey theme with location off and bullet on."
      />
    </>
  );
}

export default InfoBoxGroup;
