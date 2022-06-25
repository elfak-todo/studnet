import { useCallback, useEffect, useRef, useState } from "react";

function CountUp({ end }) {
  const [state, setState] = useState(null);
  const ref = useRef(0);

  const increment = end / 100;

  const updateCounter = useCallback(() => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + increment);
      if (result > end) return setState(end);
      setState(result);
      ref.current = result;
    }
    setTimeout(updateCounter, 30);
  }, [end, increment]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      updateCounter();
    }
    return () => {
      isMounted = false;
    };
  }, [end, updateCounter]);
  return <div> {state} </div>;
}

export default CountUp;
