'use client';

import React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import Link from 'next/link';
import { ConvertDateToApiFormat } from '@/lib/date_time_converter';

interface SelectDateComponentProps {
  availableDates: Date[];
}

export default function SelectDateComponent({
  availableDates
}: SelectDateComponentProps) {
  const [date, setDate] = React.useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const isDateDisabled = (date: any) => {
    return !availableDates.some(
      (availableDates) => date.toDateString() === availableDates.toDateString()
    );
  };

  return (
    <div className='flex flex-col'>
      <p className='pb-5'>Departure date</p>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Select available Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(e) => {
              setDate(e);
              setIsCalendarOpen(false);
            }}
            initialFocus
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>
      {date == undefined ? (
        <Button className='mt-5' disabled>
          Search
        </Button>
      ) : (
        <Link href={`/booking/${ConvertDateToApiFormat(date)}`}>
          <Button className='mt-5 w-full'>Search</Button>
        </Link>
      )}
    </div>
  );
}
