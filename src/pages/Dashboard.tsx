import { Button } from "@/components/ui/button";
import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import { usePunchIn, usePunchOut } from "@/hooks/usePunchIn";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [emp, setEmp] = useState("");
  const { user } = useUser();
  const { punch } = usePunchIn();
  const { punchoutTWO, isPending2 } = usePunchOut();

  const userEmail = user?.user?.email;
  const userId = user?.user?.id;
  console.log(user);
  const { employee } = useEmployeeDetails(userId);
  console.log(employee);

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
    punch(punchIn);
    console.log(punchIn);
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
    console.log(punchOut);
  };

  return (
    <div>
      <div>
        <p>employee details</p>
        <ul>
          <li>{employee && employee[0].firstName}</li>
          <li>{employee && employee[0].phoneNumber}</li>
          <li>{employee && employee[0].designation}</li>
        </ul>
      </div>
      <div>H1 {userEmail}</div>

      <Button onClick={handlePunchIn}>Punch In</Button>
      <Button onClick={handlePunchOut}>Punch Out</Button>
    </div>
  );
}
