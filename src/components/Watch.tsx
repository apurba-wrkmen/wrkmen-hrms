import { useEffect, useState } from "react";

export default function Watch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer); // clean up on unmount
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="text-4xl text-primary2 font-mono px-3 py-3 rounded-2xl text-center p-6rounded shadow-md w-fit mx-auto">
      {formatTime(time)}
    </div>
  );
}
