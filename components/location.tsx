import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineLocationOn } from 'react-icons/md';
import { TbLocation } from 'react-icons/tb';
import TicketDetail from './ticketDetail';
import { LocationProps } from '@/lib/types';

export default function Location(props: LocationProps) {
  return (
    <div className='flex-row justify-start items-center'>
      <div className='hidden lg:block'>
        <div className='flex items-center'>
          <div className='text-start'>
            <p className=''>From</p>
            <h3 className='pt-3 text-primary font-bold'> {props.from}</h3>
          </div>
          <BsArrowRight className='w-32 h-10' />
          <div className='text-start'>
            <p className=''>To</p>
            <h3 className='pt-3 text-primary font-bold'> {props.to}</h3>
          </div>
        </div>
      </div>
      <div className='lg:hidden flex flex-col items-start justify-start text-start'>
        <TicketDetail
          headline='From'
          detail='Phnom Penh'
          icon={<MdOutlineLocationOn className='w-5 h-5 text-primary' />}
        />
        <TicketDetail
          headline='To'
          detail='Kirirom'
          icon={<TbLocation className='w-5 h-5 text-primary' />}
        />
      </div>
    </div>
  );
}
