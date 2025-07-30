import { Button } from "@/components/ui/button";
import Watch from "@/components/Watch";
import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import { useLogout } from "@/hooks/useLogin";
import { usePunchDetails, usePunchIn, usePunchOut } from "@/hooks/usePunchIn";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import wrkmne_hrms from "@/assets/wrkmen_hrms.svg";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { UserAvatarFilled } from "@/shared/UserAvatarFilled";

export default function Dashboard() {
  const now = new Date();
  const currentHour = now.getHours();
  let allowedTime = currentHour < 9;

  const today = new Date().toISOString().slice(0, 10);
  const { user } = useUser();
  const { punch } = usePunchIn();
  const { punchoutTWO } = usePunchOut();
  const { logouts } = useLogout();

  const userEmail = user?.user?.email;
  const userId = user?.user?.id;

  // console.warn(userId, today);
  const { punchDet } = usePunchDetails(userId, today);
  let status;
  let punchOutStatus;

  if (punchDet) {
    status = Boolean(punchDet[0] && punchDet[0]?.checked_in);
    console.log(status);
  }

  if (punchDet?.[0]?.checked_out) {
    punchOutStatus = true;
  }

  // useEffect(() => {
  //   if (punchDet) {
  //     console.info(punchDet);
  //   }
  // }, [punchDet]);

  // console.log(user);
  const { employee } = useEmployeeDetails(userId);
  // console.log(employee);

  const handlePunchIn = () => {
    const punchIn = {
      date: new Date().toISOString().slice(0, 10),
      checekInTime: new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      id: user?.user.id,
    };
    // if (allowedTime) return toast("please punch in after 9:00 Am");
    punch(punchIn);
    // console.log(punchIn);
  };

  const handlePunchOut = () => {
    const punchOut = {
      date: new Date().toISOString().slice(0, 10),
      checekOutTime: new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      id: user?.user.id,
    };
    // console.log(id)
    punchoutTWO(punchOut);
    // console.log(punchOut);
  };

  const handleLogOut = () => {
    logouts();
  };

  const alertStatus = punchDet?.[0]?.checked_in && punchDet?.[0]?.checked_out;
  return (
    <section className="h-screen">
      <section className="flex items-center justify-center  px-3 py-3 rounded-2xl p-6rounded shadow-md w-fit mx-auto ">
        <div className="flex ">
          <div className="w-50 flex flex-col justify-between items-center ">
            <img src={wrkmne_hrms} alt="" className="h-30  pt-10" />
            <div className="pb-10">
              <Button onClick={handleLogOut} className="">
                <TbLogout2 />
                Log out
              </Button>
            </div>
          </div>
          {/* right body */}
          <div className=" flex flex-col gap-4 rounded-2xl px-3 py-3  p-6rounded shadow-md w-fit mx-auto ">
            <section className="flex justify-end gap-2 items-center text-right rounded-2xl text-primary2 px-3 py-3  p-6rounded shadow-md ">
              <MdOutlineNotificationsNone className=" w-8 h-8 text-primary2 " />

              <div className="uppercase">
                <h3 className="font-bold">
                  {employee?.[0]?.firstName || ""}{" "}
                  {employee?.[0]?.lastName || ""}
                </h3>
                <h3>{employee?.[0]?.designation || ""}</h3>
              </div>
              <CgProfile className="w-8 h-8 text-primary2" />
            </section>

            {/* main body */}
            <section className="flex flex-col gap-5 px-10">
              <section>
                <h1 className="text-primary2 font-bold text-2xl ">
                  Employee Dashboard
                </h1>
              </section>
              <section className=" flex flex-col bg-background3 text-white px-10 py-12  gap-2 rounded-xl ">
                <h1 className="text-4xl uppercase  font-bold  ">
                  {" "}
                  Hi! <span>{employee?.[0]?.firstName || ""} </span>
                </h1>
                <p>Here’s what’s happening at your organization today.</p>
              </section>

              <section className="flex gap-4">
                {/* 1 */}
                <section className="rounded-2xl px-3 py-3  p-6rounded shadow-md w-fit mx-auto">
                  <div className="bg-amber-50 flex items-center gap-2 max-w px-10 py-3 ">
                    <UserAvatarFilled />
                    <div className="uppercase ">
                      <h2 className="font-bold">
                        {employee?.[0]?.firstName || ""}{" "}
                        {employee?.[0]?.lastName || ""}
                      </h2>
                      <h3>{(employee && employee[0]?.designation) || ""}</h3>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 px-4 py-4">
                    <div>
                      <h2 className="text-primary2 font-bold">Phone No:</h2>
                      <h3>
                        {(employee && employee[0]?.phoneNumber) || "User"}
                      </h3>
                    </div>
                    <div>
                      <h2 className="text-primary2 font-bold">
                        Email Adrress:
                      </h2>
                      <h3>{userEmail}</h3>
                    </div>
                    <div>
                      <h2 className="text-primary2 font-bold">Joined Date:</h2>
                      <h3>{(employee && employee[0]?.joinedDate) || "User"}</h3>
                    </div>
                  </div>
                </section>

                {/* punch box */}
                <section>
                  <div className="flex flex-col gap-3 items-center font-bold">
                    <h2 className="">Start Your Workday with a Tap</h2>
                    <Watch />
                  </div>
                  <div className="flex items-center justify-center h-full font-bold">
                    {alertStatus ? <p>⚠️See you again tommorow</p> : <></>}
                    {!status ? (
                      <Button onClick={handlePunchIn}>Punch In</Button>
                    ) : (
                      <></>
                    )}
                    {status && !punchOutStatus ? (
                      <Button onClick={handlePunchOut}>Punch Out</Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </section>
                <section className="rounded-2xl px-6 py-3  p-6rounded shadow-md w-fit mx-auto flex flex-col justify-evenly">
                  <div>
                    <h3 className="text-primary2 font-bold">Punch In At</h3>
                    <p>{punchDet && punchDet[0]?.checked_in}</p>
                  </div>
                  <div>
                    <h3 className="text-primary2 font-bold">Punch Out At</h3>
                    <p>{punchDet && punchDet[0]?.checked_out}</p>
                  </div>
                  <div>
                    <h3 className="text-primary2 font-bold">Todays Working</h3>
                    <p>{punchDet && punchDet[0]?.work_duration}</p>
                  </div>
                </section>
              </section>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
