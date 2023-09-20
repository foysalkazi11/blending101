import { useMemo, useEffect, useState } from "react";

type IMedia = "min" | "max";
type IUnit = "rem" | "px" | "em";
type IQuery = "xsm" | "sm" | "md" | "lg" | "xl" | "xxl" | { [key in IMedia]?: `${number}${IUnit}` };

const getQuery = (query: IQuery) => {
  if (typeof query === "object") return `(${Object.keys(query)[0]}-width: 22.5em)`;
  if (query === "xsm") return "(max-width: 22.5em)";
  if (query === "sm") return "(max-width: 36em)";
  if (query === "md") return "(max-width: 48em)";
  if (query === "lg") return "(max-width: 62em)";
  if (query === "xl") return "(max-width: 75em)";
  if (query === "xxl") return "(max-width: 87.5em)";
};

export function useMediaQuery(media: IQuery): boolean {
  const query = useMemo(() => {
    return getQuery(media);
  }, [media]);

  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
