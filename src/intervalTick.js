import { useEffect, useRef } from 'react';

export function intervalTick(response, delay) {
  const savedResponse = useRef();

  //interval Function
  useEffect(() => {
    function tick() {
      savedResponse.current();
    }
    if (delay != null) {
      var time = setInterval(tick, delay);
      return () => clearInterval(time);
    }
  }, [delay]);

  //Saves and updates response
  useEffect(() => {
    savedResponse.current = response;
  }, [response]);
}
