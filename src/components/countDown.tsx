import React, { useCallback, useEffect, useState } from "react";
interface CountdownProps {
  timestamp: number;
}

const Countdown: React.FC<CountdownProps> = ({ timestamp }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = timestamp - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }, [timestamp]);

  // const calculateTimeLeft = () => {
  //   const difference = timestamp - new Date().getTime();
  //   let timeLeft = {
  //     days: 0,
  //     hours: 0,
  //     minutes: 0,
  //     seconds: 0,
  //   };

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor(
  //         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       ),
  //       minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
  //       seconds: Math.floor((difference % (1000 * 60)) / 1000),
  //     };
  //   }

  //   return timeLeft;
  // };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, timestamp]);

  const formatTimeUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <strong>Presale Ends In</strong>
      <div>
        <span className="bg-[#FCDAE1] rounded-md text-black p-2">
          {formatTimeUnit(timeLeft.days)}
        </span>
        <span className="text-[12px]">{" D "}</span>
        {""}
        <span className="bg-[#FCDAE1] rounded-md text-black p-2">
          {formatTimeUnit(timeLeft.hours)}
        </span>
        <span className="text-[12px]">{" H "}</span>
        <span className="bg-[#FCDAE1] rounded-md text-black p-2">
          {formatTimeUnit(timeLeft.minutes)}
        </span>
        <span className="text-[12px]">{" M "}</span>
        {/* <span className="bg-[#FCDAE1] rounded-md text-black p-2">
          {formatTimeUnit(timeLeft.seconds)}
        </span>
        <span className="text-[12px]">{" S "}</span> */}
      </div>
    </div>
  );
};

export default Countdown;
