import { useLayoutEffect, useRef, useState } from "react";

export default function useDimensions() {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState(null);

  useLayoutEffect(() => {
    if (ref?.current) setDimensions(ref.current.getBoundingClientRect().toJSON());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current]);

  return [ref, dimensions];
}
