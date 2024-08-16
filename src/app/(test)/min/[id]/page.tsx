import React from 'react';
import Pagination from '@/components/Pagination/Pagination';
import InfoBox from '@/components/InfoBox/InfoBox';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Pagination nowPage={Number(params.id)} name="min" totalPage={20} />

      <InfoBox theme="red" location="on" bullet="off" />
      <InfoBox theme="red" location="on" bullet="on" />
      <InfoBox theme="red" location="off" bullet="off" />
      <InfoBox theme="red" location="off" bullet="on" />

      <InfoBox theme="primary" location="on" bullet="off" />
      <InfoBox theme="primary" location="on" bullet="on" />
      <InfoBox theme="primary" location="off" bullet="off" />
      <InfoBox theme="primary" location="off" bullet="on" />

      <InfoBox theme="grey" location="on" bullet="off" />
      <InfoBox theme="grey" location="on" bullet="on" />
      <InfoBox theme="grey" location="off" bullet="off" />
      <InfoBox theme="grey" location="off" bullet="on" />
    </div>
  );
}
