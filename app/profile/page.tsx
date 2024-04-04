import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userInfo } from "@/services/api";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function getUserData() {
  try {
    const res = await userInfo({
      id: cookies().get("id")!.value,
      token: cookies().get("token")!.value,
    });
    return res;
  } catch (err) {
    redirect("/server-error");
  }
}

export default async function ProfileScreen() {
  const userInfo = await getUserData();

  return (
    <main className="section">
      <nav>
        <div>
          <h2 className="text-primary font-semibold">Profile</h2>
        </div>
      </nav>
      <div>
        <div className="justify-center items-center flex flex-col my-5">
          <BsPersonCircle className="w-14 h-14" />
          <h5 className="text-primary my-2 font-bold">
            {userInfo.data.username}
          </h5>
          <p className="">{userInfo.data.email}</p>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-evenly mb-5">
          <div className="w-full lg:w-auto lg:mx-0 mx-auto text-center">
            <p className="text-muted-foreground">Remain Ticket</p>
            <h5 className="text-primary font-bold">
              {userInfo.data.ticket?.remainTicket}
            </h5>
          </div>
          <div className="w-full lg:w-auto lg:mx-0 mx-auto text-center">
            <p className="text-muted-foreground">Ticket on hand</p>
            <h5 className="text-primary font-bold">
              {userInfo.data.ticket?.ticketLimitInhand}
            </h5>
          </div>
        </div>

        <h3 className="text-primary font-semibold">Personal Detail</h3>
        <div className="my-5">
          <div className="">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 md:mb-0 gap-1.5 lg:mb-10 mb-5">
                <Label htmlFor="email">Username</Label>
                <Input
                  value={userInfo.data.username}
                  disabled
                  className="disabled:cursor-default appearance-none"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 gap-1.5  mb-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={userInfo.data.email}
                  disabled
                  className="disabled:cursor-default appearance-none"
                />
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 md:mb-0 gap-1.5  mb-5">
                <Label htmlFor="email">Department</Label>
                <Input
                  value={
                    userInfo.data.studentInfo.batch.department ===
                    "SOFTWAREENGINEERING"
                      ? "Software Engineering"
                      : userInfo.data.studentInfo.batch.department ===
                        "TOURISMANDMANAGEMENT"
                      ? "Tourism Management"
                      : userInfo.data.studentInfo.batch.department ===
                        "ARCHITECTURE"
                      ? "Architecture"
                      : "N/A"
                  }
                  disabled
                  className="disabled:cursor-default appearance-none"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 gap-1.5">
                <Label htmlFor="email">Role</Label>
                <Input
                  value={userInfo.data.role}
                  disabled
                  className="disabled:cursor-default appearance-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
