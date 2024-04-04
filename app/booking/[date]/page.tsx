"use server";
import { booking, getScheduleByDate } from "@/services/api";
import React, { Suspense } from "react";
import Loading from "../../loading";
import { GiSandsOfTime } from "react-icons/gi";
import TicketCard from "@/components/TicketCard/TicketCard";
import { ConvertDate, ConvertTime } from "@/lib/date_time_converter";
import { revalidatePath } from "next/cache";
import { getUserData } from "@/app/profile/page";
import { getAllBookTicket, getAllWaitingTicket } from "@/app/ticket/page";
import { useToast } from "@/components/ui/use-toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AvailableScreenProps {
  params: any;
}

async function getAllScheduleByDate(date: any) {
  try {
    const res = await getScheduleByDate({
      date: date,
      token: cookies().get("token")!.value,
    });
    if (res.data === undefined) {
      return [];
    } else {
      return res.data;
    }
  } catch (err) {
    redirect("/server-error");
  }
}

const AvailableScreen = async (props: AvailableScreenProps) => {
  console.log("Here is the date :" + props.params.date);
  const allScheduleByDate = await getAllScheduleByDate(props.params.date);
  const userInfo = await getUserData();
  const bookingTickets = await getAllBookTicket();
  const waitingTickets = await getAllWaitingTicket();

  const scheduleIds = [...bookingTickets.data, ...waitingTickets.data].map(
    (ticket) => ticket.schedule.id
  );
  return (
    <main className="section">
      <nav>
        <h2 className="text-primary font-semibold">Available Departure</h2>
      </nav>

      {allScheduleByDate.length === 0 ? (
        <div className="flex h-[calc(100vh-175px)] justify-center items-center ">
          <div className="flex flex-col items-center gap-10">
            <GiSandsOfTime className="text-8xl text-primary" />
            <h4 className="font-bold text-center text-primary">
              Sorry there is no bus today
            </h4>
          </div>
        </div>
      ) : (
        allScheduleByDate.map((ticket: any) => {
          if (ticket.Waitting.length > 0) {
            const userIds = ticket.Waitting.map((user: any) => user.user.id);

            return (
              <div key={ticket.id}>
                <TicketCard
                  isWaitingTicket={userIds.includes(userInfo.data.id)}
                  isViewTicket={scheduleIds.includes(ticket.id)}
                  isDisable={
                    userInfo.data.ticket?.ticketLimitInhand == 2 ||
                    userInfo.data.ticket.remainTicket == 0
                  }
                  id={ticket.id}
                  hasButton={true}
                  from={
                    ticket.departure.from.mainLocationName
                      ? ticket.departure.from.mainLocationName
                      : "N/A"
                  }
                  to={
                    ticket.departure.destination.mainLocationName
                      ? ticket.departure.destination.mainLocationName
                      : "N/A"
                  }
                  date={ticket.date ? ConvertDate(ticket.date) : "N/A"}
                  plateNumber={
                    ticket.bus
                      ? ticket.bus.plateNumber
                        ? ticket.bus.plateNumber
                        : "N/A"
                      : "N/A"
                  }
                  driverNumber={
                    ticket.bus
                      ? ticket.bus.driverContact
                        ? ticket.bus.driverContact
                        : "N/A"
                      : "N/A"
                  }
                  time={
                    ticket.departure.departureTime
                      ? ConvertTime(ticket.departure.departureTime)
                      : "N/A"
                  }
                  isCancelButton={false}
                />
              </div>
            );
          } else {
            return (
              <div key={ticket.id}>
                <TicketCard
                  isWaitingTicket={false}
                  isViewTicket={scheduleIds.includes(ticket.id)}
                  isDisable={
                    userInfo.data.ticket?.ticketLimitInhand == 2 ||
                    userInfo.data.ticket.remainTicket == 0
                  }
                  id={ticket.id}
                  hasButton={true}
                  from={
                    ticket.departure.from.mainLocationName
                      ? ticket.departure.from.mainLocationName
                      : "N/A"
                  }
                  to={
                    ticket.departure.destination.mainLocationName
                      ? ticket.departure.destination.mainLocationName
                      : "N/A"
                  }
                  date={ticket.date ? ConvertDate(ticket.date) : "N/A"}
                  plateNumber={
                    ticket.bus
                      ? ticket.bus.plateNumber
                        ? ticket.bus.plateNumber
                        : "N/A"
                      : "N/A"
                  }
                  driverNumber={
                    ticket.bus
                      ? ticket.bus.driverContact
                        ? ticket.bus.driverContact
                        : "N/A"
                      : "N/A"
                  }
                  time={
                    ticket.departure.departureTime
                      ? ConvertTime(ticket.departure.departureTime)
                      : "N/A"
                  }
                  isCancelButton={false}
                />
              </div>
            );
          }
        })
      )}
    </main>
  );
};

export default AvailableScreen;
