import TicketCard from '@/components/TicketCard/TicketCard';
import { ConvertDate, ConvertTime } from '@/lib/date_time_converter';
import React from 'react';
import { GiSandsOfTime } from 'react-icons/gi';

interface BookingTicketProps {
  bookingTickets: any[];
}

export default function BookingTickets(props: BookingTicketProps) {
  const { bookingTickets } = props;
  return bookingTickets.length === 0 ? (
    <div className='flex h-[calc(100vh-325px)] justify-center items-center '>
      <div className='flex flex-col items-center gap-10'>
        <GiSandsOfTime className='text-8xl text-primary' />
        <h4 className='font-bold text-center text-primary'>
          Sorry, You dont have any booking ticket
        </h4>
      </div>
    </div>
  ) : (
    bookingTickets.map((ticket: any) => (
      <div key={ticket.id}>
        <TicketCard
          id={ticket.id}
          hasButton={true}
          from={
            ticket.schedule.departure.from.mainLocationName
              ? ticket.schedule.departure.from.mainLocationName
              : 'N/A'
          }
          to={
            ticket.schedule.departure.destination.mainLocationName
              ? ticket.schedule.departure.destination.mainLocationName
              : 'N/A'
          }
          date={
            ticket.schedule.date ? ConvertDate(ticket.schedule.date) : 'N/A'
          }
          plateNumber={
            ticket.schedule.bus
              ? ticket.schedule.bus.plateNumber
                ? ticket.schedule.bus.plateNumber
                : 'N/A'
              : 'N/A'
          }
          driverNumber={
            ticket.schedule.bus
              ? ticket.schedule.bus.driverContact
                ? ticket.schedule.bus.driverContact
                : 'N/A'
              : 'N/A'
          }
          time={
            ticket.schedule.departure.departureTime
              ? ConvertTime(ticket.schedule.departure.departureTime)
              : 'N/A'
          }
          isCancelButton={true}
        />
      </div>
    ))
  );
}
