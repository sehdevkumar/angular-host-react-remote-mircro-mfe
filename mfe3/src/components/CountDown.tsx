import { useEffect, useState } from 'react';

const Countdown = ({ initialSeconds }: {initialSeconds: number}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [seconds]);

  return (
    <div>
      <h1>Countdown</h1>
      <p>{seconds} seconds remaining</p>
    </div>
  );
};

export default Countdown;
