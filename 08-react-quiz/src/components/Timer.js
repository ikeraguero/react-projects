import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  console.log(secondsRemaining);
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <>
      <div className="timer">
        {min >= 10 ? "" : "0"}
        {min}:{secs > 10 ? "" : "0"}
        {secs}
      </div>
    </>
  );
}

export default Timer;
