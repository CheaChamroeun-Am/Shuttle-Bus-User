import React from 'react';

interface TicketCardItemProps {
  label: String;
  value: String;
  icon: React.ReactNode;
}

export default function TicketCardItem(props: TicketCardItemProps) {
  const { label, value, icon } = props;

  return (
    <div className='flex items-center gap-5'>
      {icon}
      <div className='flex flex-col'>
        <p className=''>{label}</p>
        <h5 className='text-primary font-semibold'>{value}</h5>
      </div>
    </div>
  );
}
