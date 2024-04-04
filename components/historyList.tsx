import TicketDetail from "@/components/ticketDetail";
import { Card } from "@/components/ui/card";
import React from "react";
import { ticket } from "../lib/types";
import { BiTimeFive, BiBus } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import Location from "@/components/location";
import { historyTicket } from "@/services/api";
import TicketCard from "@/components/TicketCard/TicketCard";
import { ConvertDate, ConvertTime } from "@/lib/date_time_converter";
import { cookies } from "next/headers";
import { AiOutlineStop } from "react-icons/ai";
import { redirect } from "next/navigation";

async function getUserHistory() {
  try {
    const res = await historyTicket({
      id: cookies().get("id")!.value,
      token: cookies().get("token")!.value,
    });
    return res;
  } catch (err) {
    redirect("/server-error");
  }
}

export default async function HistoryList() {
  const historyList = await getUserHistory();

  return (
    <div className="mt-[96px]">
      {historyList.data.length === 0 ? (
        <div className="flex h-[calc(100vh-300px)] justify-center items-center ">
          <div className="flex flex-col items-center gap-10">
            <AiOutlineStop className="text-8xl text-primary" />
            <h4 className="font-bold text-center text-primary">
              Sorry, There is not history
            </h4>
          </div>
        </div>
      ) : (
        <>
          {historyList.data.map((historyTicket: ticket) => (
            <div key={historyTicket.id}>
              <TicketCard
                id={historyTicket.id}
                hasButton={false}
                from={
                  historyTicket.schedule.departure.from.mainLocationName
                    ? historyTicket.schedule.departure.from.mainLocationName
                    : "N/A"
                }
                to={
                  historyTicket.schedule.departure.destination.mainLocationName
                    ? historyTicket.schedule.departure.destination
                        .mainLocationName
                    : "N/A"
                }
                date={
                  historyTicket.schedule.date
                    ? ConvertDate(historyTicket.schedule.date)
                    : "N/A"
                }
                time={
                  historyTicket.schedule.departure.departureTime
                    ? ConvertTime(
                        historyTicket.schedule.departure.departureTime
                      )
                    : "N/A"
                }
                plateNumber={
                  historyTicket.schedule.bus
                    ? historyTicket.schedule.bus.plateNumber
                      ? historyTicket.schedule.bus.plateNumber
                      : "N/A"
                    : "N/A"
                }
                driverNumber={
                  historyTicket.schedule.bus
                    ? historyTicket.schedule.bus.driverContact
                      ? historyTicket.schedule.bus.driverContact
                      : "N/A"
                    : "N/A"
                }
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
