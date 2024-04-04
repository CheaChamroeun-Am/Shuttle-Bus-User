"use server";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookingTicket, cancelTicket, waitingTicket } from "@/services/api";
import { GiSandsOfTime } from "react-icons/gi";

import TicketCard from "@/components/TicketCard/TicketCard";
import { ConvertDate, ConvertTime } from "@/lib/date_time_converter";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import BookingTickets from "./booking/page";
import WaitingTicket from "./waiting/page";
import { redirect } from "next/navigation";

export async function getAllBookTicket() {
  try {
    const res = await bookingTicket({
      id: cookies().get("id")!.value,
      token: cookies().get("token")!.value,
    });
    return res;
  } catch (err) {
    redirect("/server-error");
  }
}

export async function getAllWaitingTicket() {
  try {
    const res = await waitingTicket({
      id: cookies().get("id")!.value,
      token: cookies().get("token")!.value,
    });
    return res;
  } catch (err) {
    redirect("/server-error");
  }
}

export async function DeleteTicket(id: string) {
  try {
    const res = await cancelTicket({
      ticketId: id,
      userToken: cookies().get("token")!.value,
    });
    revalidatePath("/ticket");
    const data = await res.json();
    return {
      status: res.status,
      ...data,
    };
  } catch (err) {
    redirect("/server-error");
  }
}

export default async function TicketScreen(params: any) {
  const bookingList = await getAllBookTicket();
  const waitingList = await getAllWaitingTicket();

  return (
    <main className="section">
      <nav>
        <div>
          <h2 className="text-primary font-semibold">Ticket</h2>
        </div>
      </nav>
      <Tabs
        defaultValue={params.searchParams.k ? params.searchParams.k : "booked"}
        className="bg-transparent mt-5"
      >
        <TabsList className="w-[100%] md:w-[50%] h-[35px]">
          <TabsTrigger value="booked" className="h-[35px] w-full">
            Booked
          </TabsTrigger>
          <TabsTrigger value="waiting" className="h-[35px] w-full">
            Waiting
          </TabsTrigger>
        </TabsList>
        <TabsContent value="booked" className="mt-5">
          {bookingList.data.length === 0 ? (
            <div className="flex h-[calc(100vh-325px)] justify-center items-center ">
              <div className="flex flex-col items-center gap-10">
                <GiSandsOfTime className="text-8xl text-primary" />
                <h4 className="font-bold text-center text-primary">
                  Sorry, You dont have any booking ticket
                </h4>
              </div>
            </div>
          ) : (
            <>
              {bookingList.data.map((ticket: any) => (
                <div key={ticket.id}>
                  <TicketCard
                    id={ticket.id}
                    hasButton={true}
                    from={
                      ticket.schedule.departure.from.mainLocationName
                        ? ticket.schedule.departure.from.mainLocationName
                        : "N/A"
                    }
                    to={
                      ticket.schedule.departure.destination.mainLocationName
                        ? ticket.schedule.departure.destination.mainLocationName
                        : "N/A"
                    }
                    date={
                      ticket.schedule.date
                        ? ConvertDate(ticket.schedule.date)
                        : "N/A"
                    }
                    plateNumber={
                      ticket.schedule.bus
                        ? ticket.schedule.bus.plateNumber
                          ? ticket.schedule.bus.plateNumber
                          : "N/A"
                        : "N/A"
                    }
                    driverNumber={
                      ticket.schedule.bus
                        ? ticket.schedule.bus.driverContact
                          ? ticket.schedule.bus.driverContact
                          : "N/A"
                        : "N/A"
                    }
                    time={
                      ticket.schedule.departure.departureTime
                        ? ConvertTime(ticket.schedule.departure.departureTime)
                        : "N/A"
                    }
                    isCancelButton={true}
                  />
                </div>
              ))}
            </>
          )}
        </TabsContent>
        <TabsContent value="waiting" className="mt-5">
          {waitingList.data.length === 0 ? (
            <div className="flex h-[calc(100vh-325px)] justify-center items-center">
              <div className="flex flex-col items-center gap-10">
                <GiSandsOfTime className="text-8xl text-primary" />
                <h4 className="font-bold text-center text-primary">
                  Sorry, You dont have any waiting ticket
                </h4>
              </div>
            </div>
          ) : (
            <>
              {waitingList.data.map((ticket: any) => (
                <div key={ticket.id}>
                  <div key={ticket.id}>
                    <TicketCard
                      id={ticket.id}
                      hasButton={true}
                      from={
                        ticket.schedule.departure.from.mainLocationName
                          ? ticket.schedule.departure.from.mainLocationName
                          : "N/A"
                      }
                      to={
                        ticket.schedule.departure.destination.mainLocationName
                          ? ticket.schedule.departure.destination
                              .mainLocationName
                          : "N/A"
                      }
                      date={
                        ticket.schedule.date
                          ? ConvertDate(ticket.schedule.date)
                          : "N/A"
                      }
                      plateNumber={
                        ticket.schedule.bus
                          ? ticket.schedule.bus.plateNumber
                            ? ticket.schedule.bus.plateNumber
                            : "N/A"
                          : "N/a"
                      }
                      driverNumber={
                        ticket.schedule.bus
                          ? ticket.schedule.bus.driverContact
                            ? ticket.schedule.bus.driverContact
                            : "N/A"
                          : "N/a"
                      }
                      time={
                        ticket.schedule.departure.departureTime
                          ? ConvertTime(ticket.schedule.departure.departureTime)
                          : "N/A"
                      }
                      isCancelButton={true}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
