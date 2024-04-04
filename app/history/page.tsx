import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import React, { Suspense } from 'react';
import Location from '@/components/location';
import TicketDetail from '@/components/ticketDetail';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiBus, BiTimeFive } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { BsFillCalendarFill, BsCalendar } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import HistoryList from '../../components/historyList';
import Loading from '../loading';

export default function HistoryScreen() {
  return (
    <main className='section'>
      <div>
        <nav>
          <div>
            <h2 className='text-primary font-semibold'>History</h2>
          </div>
        </nav>

        <HistoryList />
      </div>
    </main>
  );
}
