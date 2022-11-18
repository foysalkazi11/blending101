import { useRef, useEffect, useCallback } from "react";

interface ThemeMethods {
  toggleCollection?: (e: any, id: string) => any;
}
const useThemeMethod = (props?: ThemeMethods) => {
  const { toggleCollection = () => {} } = props;
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    const id = element?.dataset?.id;
    if (element) {
      // Handling add to Collection
      const btn = element.querySelector("#toggleCollection");
      const el = element.querySelector(".recipe-title");
      console.log(el);
      if (el) {
        el.id = toggleCollection;
        // console.log(btn.onclick);
      }
    }
  });

  return ref;
};

export default useThemeMethod;
