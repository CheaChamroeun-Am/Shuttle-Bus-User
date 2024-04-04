import React from 'react';
import Image from 'next/image';

type TicketDetail = {
  icon: React.ReactNode;
  headline: string;
  detail: string;
};

export default function TicketDetail(props: TicketDetail) {
  return (
    <div className='flex items-center py-2.5'>
      <div className='pr-5 text-primary'>{props.icon}</div>
      <div>
        <p className=''>{props.headline}</p>
        <h5 className='font-bold text-primary'>{props.detail}</h5>
      </div>
    </div>
  );
}
