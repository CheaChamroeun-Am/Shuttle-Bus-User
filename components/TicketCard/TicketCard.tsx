"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BiBus, BiTimeFive, BiCalendarAlt, BiPhoneCall } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineLocationOn } from 'react-icons/md';
import { TbLocation } from 'react-icons/tb';
import { Button } from '../ui/button';
import TicketCardItem from './TIcketCardItem';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { DeleteTicket } from '@/app/ticket/page';
import { FormatDate } from '@/lib/date_time_converter';
import Link from 'next/link';
import { booking } from '@/services/api';
import { useRouter } from 'next/navigation';

import { getCookie } from "cookies-next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { BsCalendar3 } from 'react-icons/bs';
interface TicketCardProps {
  id: string;
  hasButton: boolean;
  from: string;
  to: string;
  date: string;
  plateNumber: string;
  driverNumber: string;
  isCancelButton?: boolean;
  time: string;
  isDisable?: boolean;
  isViewTicket?: boolean;
  isWaitingTicket?: boolean;
}

export default function TicketCard(props: TicketCardProps) {
  const {
    id,
    hasButton,
    from,
    to,
    date,
    time,
    plateNumber,
    driverNumber,
    isCancelButton = false,
    isDisable = false,
    isViewTicket,
    isWaitingTicket
  } = props;

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  async function cancelTicket(id: string) {
    setLoadingCancel(true);
    const res = await DeleteTicket(id);
    if (res.status === 200) {
      toast({
        title: "You're all set!",
        description: "Your ticket has been successfully canceled!",
      });
      setIsCancel(true);
    } else if (res.status === 400) {
      toast({
        variant: "destructive",
        title: "Bad Request",
        description:
          "Oops! Something went wrong. Please check your request and try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 401) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You are not authorized to access this resource.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 403) {
      toast({
        variant: "destructive",
        title: "Forbidden",
        description: "Access to this resource is forbidden.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 404) {
      toast({
        variant: "destructive",
        title: "Not Found",
        description: "The requested resource could not be found.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 405) {
      toast({
        variant: "destructive",
        title: "Method Not Allowed",
        description: "The HTTP method used is not allowed for this resource.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 409) {
      toast({
        variant: "destructive",
        title: "Conflict",
        description:
          "There is a conflict with the current state of the resource.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 410) {
      toast({
        variant: "destructive",
        title: "Gone",
        description: "The requested resource is no longer available.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else if (res.status === 500) {
      toast({
        variant: "destructive",
        title: "Internal Server Error",
        description: "Oops! Something went wrong on the server side.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    setLoadingCancel(false);
  }

  async function bookingTicket(id: string, date: string) {
    setIsLoading(true);
    const res = await ticketBooking(id, date);
    if (res.status == 200) {
      toast({
        title: "You're all set!",
        description: "Booking successful – see you then!",
      });
      setIsBooked(true);
    } else if (res.status == 500) {
      toast({
        variant: "destructive",
        title: "Internal Server Error",
        description: "Oops! Something went wrong on the server side.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    setIsLoading(false);
  }

  const router = useRouter();

  async function ticketBooking(scheduleId: string, date: string) {
    const res = await booking({
      scheduleId,
      userId: getCookie("id")!,
      payStatus: true,
      token: getCookie("token")!,
    });
    router.refresh();
    const data = await res.json();
    return {
      status: res.status,
      ...data,
    };
  }

  const CancelTicketDialog = ({ id }: { id: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {loadingCancel ? (
          <Button className='w-full' disabled variant='destructive' size='lg'>
            Loading ....
          </Button>
        ) : isCancel ? null : (
          <Button className='w-full' variant='destructive' size='lg'>
            Cancel
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cancel your
            ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-2 border-muted-foreground">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelTicket(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const BookingDialog = ({ id, date }: { id: string; date: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <Button className='w-full' disabled variant='default' size='lg'>
            Loading ....
          </Button>
        ) : (
          <Button className='w-full' variant='default' size='lg'>
            Book
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to confirm this booking? Once confirmed, the
            slot will be reserved for you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-2 border-muted-foreground">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => bookingTicket(id, FormatDate(date))}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const DisableButton = () => (
    <Popover>
      <PopoverTrigger asChild className='w-full'>
        <Button variant='default' size='lg'>
          Book
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        You may not have any remaining tickets, or you have reached the limit of
        tickets in hand.
      </PopoverContent>
    </Popover>
  );

  const ViewTicketButton = () => {
    if (isWaitingTicket) {
      return (
        <Link href={{ pathname: '/ticket', query: { k: 'waiting' } }}>
          <Button className='w-full' variant='secondary' size='lg'>
            View
          </Button>
        </Link>
      );
    } else {
      return (
        <Link href='/ticket'>
          <Button className='w-full' variant='secondary' size='lg'>
            View
          </Button>
        </Link>
      );
    }
  };

  const renderButtonContent = () => {
    if (isBooked) {
      return <ViewTicketButton />;
    } else if (isCancel) {
      return <CancelTicketDialog id={id} />;
    } else {
      if (isCancelButton) return <CancelTicketDialog id={id} />;
      if (isViewTicket) return <ViewTicketButton />;
      if (isDisable) return <DisableButton />;
      return <BookingDialog id={id} date={date} />;
    }
  };

  return (
    <>
      <Card className="p-10  px-10 bg-input mt-10 ">
        <div className="hidden xl:flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-10 items-center">
            <div>
              <BiBus className="text-4xl text-primary" />
            </div>
            <div className="text-5xl text-primary">|</div>
            <div className="flex flex-col text-center">
              <p>From</p>
              <h4 className="font-bold text-primary p-0">{from}</h4>
            </div>
            <div>
              <BsArrowRight className="text-2xl" />
            </div>
            <div className="flex flex-col text-center">
              <p>To</p>
              <h4 className="font-bold text-primary p-0">{to}</h4>
            </div>
          </div>

          <TicketCardItem
            label="Date"
            value={date}
            icon={<BiCalendarAlt className='text-xl text-primary' />}
          />

          <TicketCardItem
            label="Time"
            value={time}
            icon={<BiTimeFive className="text-xl text-primary" />}
          />
          <TicketCardItem
            label="Plate Number"
            value={plateNumber}
            icon={<BiBus className="text-xl text-primary" />}
          />
          <TicketCardItem
            label="Driver Number"
            value={driverNumber}
            icon={<BiPhoneCall className='text-xl text-primary' />}
          />

          {hasButton && <div>{renderButtonContent()}</div>}
        </div>

        <div className="flex xl:hidden flex-col gap-10  justify-start">
          <TicketCardItem
            label="From"
            value={from}
            icon={<MdOutlineLocationOn className="text-xl text-primary" />}
          />
          <TicketCardItem
            label="To"
            value={to}
            icon={<TbLocation className="text-xl text-primary" />}
          />

          <TicketCardItem
            label="Date"
            value={date}
            icon={<BsCalendar3 className='text-xl text-primary' />}
          />

          <TicketCardItem
            label="Time"
            value={time}
            icon={<BiTimeFive className="text-xl text-primary" />}
          />

          <TicketCardItem
            label="Plate Number"
            value={plateNumber}
            icon={<BiBus className="text-xl text-primary" />}
          />

          <TicketCardItem
            label="Driver Number"
            value={driverNumber}
            icon={<BiPhoneCall className='text-xl text-primary' />}
          />

          {hasButton && <div>{renderButtonContent()}</div>}
        </div>
      </Card>
    </>
  );
}
