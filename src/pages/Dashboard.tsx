import { Button } from "@/components/ui/button";
import Watch from "@/components/Watch";
import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import { useLogout } from "@/hooks/useLogin";
import { usePunchDetails, usePunchIn, usePunchOut } from "@/hooks/usePunchIn";
import { useUser } from "@/hooks/useUser";
import wrkmne_hrms from "@/assets/wrkmen_hrms.svg";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { UserAvatarFilled } from "@/shared/UserAvatarFilled";

export default function Dashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const { user } = useUser();
  const { punch } = usePunchIn();
  const { punchoutTWO } = usePunchOut();
  const { logouts } = useLogout();

  const userEmail = user?.user?.email;
  const userId = user?.user?.id;

  // Only call hooks when userId is available
  const { punchDet } = userId ? usePunchDetails(userId, today) : { punchDet: [] };
  const { employee } = userId ? useEmployeeDetails(userId) : { employee: [] };

  const isPunchedIn = Boolean(punchDet?.[0]?.checked_in);
  const isPunchedOut = Boolean(punchDet?.[0]?.checked_out);
  const isCompleted = isPunchedIn && isPunchedOut;

  const handlePunchIn = () => {
    if (!userId) return;

    const punchInData = {
      date: today,
      checekInTime: new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      id: userId,
    };

    punch(punchInData);
  };

  const handlePunchOut = () => {
    if (!userId) return;

    const punchOutData = {
      date: today,
      checekOutTime: new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      id: userId,
    };

    punchoutTWO(punchOutData);
  };

  const handleLogOut = () => {
    logouts();
  };


  return (
    <section className="h-screen">
      <section className="flex px-3 py-3 rounded-2xl shadow-md w-fit mx-auto">
        {/* left */}
        <div className="flex ">
          <div className="w-50 flex flex-col justify-between items-center">
            <img src={wrkmne_hrms} alt="" className="h-30 pt-10" />
            <div className="pb-10">
              <Button onClick={handleLogOut}>
                <TbLogout2 />
                Log out
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4 rounded-2xl px-3 py-3 shadow-md w-fit mx-auto">
            {/* Header */}
            <section className="flex justify-end gap-2 items-center text-right rounded-2xl text-primary2 px-3 py-3 shadow-md">
              <MdOutlineNotificationsNone className="w-8 h-8 text-primary2" />
              <div className="uppercase">
                <h3 className="font-bold">
                  {employee?.[0]?.firstName || ""}{" "}
                  {employee?.[0]?.lastName || ""}
                </h3>
                <h3>{employee?.[0]?.designation || ""}</h3>
              </div>
              <CgProfile className="w-8 h-8 text-primary2" />
            </section>

            {/* Welcome Card */}
            <section className="flex flex-col bg-background3 text-white px-10 py-12 gap-2 rounded-xl">
              <h1 className="text-4xl uppercase font-bold">
                Hi! <span>{employee?.[0]?.firstName || ""}</span>
              </h1>
              <p>Here’s what’s happening at your organization today.</p>
            </section>

            {/* Info Cards */}
            <section className="flex gap-4">
              {/* Employee Info */}
              <section className="rounded-2xl px-3 py-3 shadow-md w-fit mx-auto">
                <div className="bg-amber-50 flex items-center gap-2 px-10 py-3">
                  <UserAvatarFilled />
                  <div className="uppercase">
                    <h2 className="font-bold">
                      {employee?.[0]?.firstName || ""}{" "}
                      {employee?.[0]?.lastName || ""}
                    </h2>
                    <h3>{employee?.[0]?.designation || ""}</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 px-4 py-4">
                  <div>
                    <h2 className="text-primary2 font-bold">Phone No:</h2>
                    <h3>{employee?.[0]?.phoneNumber || "N/A"}</h3>
                  </div>
                  <div>
                    <h2 className="text-primary2 font-bold">Email Address:</h2>
                    <h3>{userEmail}</h3>
                  </div>
                  <div>
                    <h2 className="text-primary2 font-bold">Joined Date:</h2>
                    <h3>{employee?.[0]?.joinedDate || "N/A"}</h3>
                  </div>
                </div>
              </section>

              {/* Punch Box */}
              <section>
                <div className="flex flex-col gap-3 items-center font-bold">
                  <h2>Start Your Workday with a Tap</h2>
                  <Watch />
                </div>
                <div className="flex items-center justify-center h-full font-bold">
                  {isCompleted ? (
                    <p>⚠️ See you again tomorrow</p>
                  ) : (
                    <>
                      {!isPunchedIn && (
                        <Button onClick={handlePunchIn}>Punch In</Button>
                      )}
                      {isPunchedIn && !isPunchedOut && (
                        <Button onClick={handlePunchOut}>Punch Out</Button>
                      )}
                    </>
                  )}
                </div>
              </section>

              {/* Status Box */}
              <section className="rounded-2xl px-6 py-3 shadow-md w-fit mx-auto flex flex-col justify-evenly">
                <div>
                  <h3 className="text-primary2 font-bold">Punch In At</h3>
                  <p>{punchDet?.[0]?.checked_in || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-primary2 font-bold">Punch Out At</h3>
                  <p>{punchDet?.[0]?.checked_out || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-primary2 font-bold">Today's Working</h3>
                  <p>{punchDet?.[0]?.work_duration || "N/A"}</p>
                </div>
              </section>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}
