import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";

function useHover<T>(): [
  MutableRefObject<T>,
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);

  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);

  useEffect(
    () => {
      const node: any = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );
  return [ref, value, setValue];
}

export default useHover;
