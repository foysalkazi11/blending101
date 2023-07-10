import { useRef, useEffect, useState } from "react";

export const useThemeTemplate = (link: string) => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    if (!link) return;
    fetch(link)
      .then((r) => r.text())
      .then((t) => {
        setTheme(t);
      });
  }, [link]);
  return theme;
};

interface ThemeMethods {
  toggleCollection?: (e: any) => any;
}
const useThemeMethod = (props?: ThemeMethods) => {
  // const { toggleCollection = () => {} } = props;
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const btn = element.querySelector("#toggleCollection");
      if (btn) {
        btn.onclick = props?.toggleCollection;
      }
    }
  });

  return ref;
};

export default useThemeMethod;
