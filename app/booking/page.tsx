import SelectDateComponent from "@/components/SelectDateCompontent";
import { Button } from "@/components/ui/button";
import { ConvertDateToApiFormat } from "@/lib/date_time_converter";
import { schedule } from "@/services/api";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AiOutlineCalendar } from "react-icons/ai";
import { cookies } from "next/headers";

async function getSchedule() {
  try {
    const cookieStore = cookies();

    const res = await schedule({
      id: cookieStore.get("id")!.value,
      token: cookieStore.get("token")!.value,
    });

    if (res.data === undefined) {
      return [];
    } else {
      if (res.data.length > 0) {
        const data = res.data.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const datesOnly = data.map((item: any) => new Date(item.date));

        return datesOnly;
      } else {
        return res.data;
      }
    }
  } catch (e) {
    redirect("/server-error");
  }
}

export default async function BookingScreen() {
  const scheduleList = await getSchedule();

  const formattedDate =
    scheduleList.length > 0
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(new Date(scheduleList[0]))
      : "N/A";

  return (
    <div className="flex flex-col items-center page-background bg-cover h-[calc(100vh-60px)]">
      <main className=" section">
        <nav>
          <div>
            <h2 className="text-primary font-semibold">Bus Reservation</h2>
          </div>
        </nav>
        <div className="mt-10 md:mt-20 grid gird-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Card className="p-5 bg-background">
              <h4 className="">Next Bus Date</h4>
              <div className="flex items-center w-full mt-5">
                <div className="p-8 bg-input">
                  <AiOutlineCalendar color="#0e6431" size={25} />
                </div>
                <div className="justify-start items-just text-start gap-2 p-8">
                  <h3 className="font-bold">{formattedDate}</h3>
                  {scheduleList.length > 0 ? (
                    <Link
                      href={`/booking/${ConvertDateToApiFormat(
                        scheduleList[0]
                      )}`}
                    >
                      <Button
                        variant="link"
                        className="p-0 text-end flex flex-row font-bold"
                        size="lg"
                      >
                        {"Book now"}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="link"
                      className="p-0 text-end flex flex-row font-bold"
                      size="lg"
                      disabled
                    >
                      {"Book now"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-5 bg-background">
              <h4 className="mb-5">Search Bus</h4>
              <SelectDateComponent availableDates={scheduleList} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
