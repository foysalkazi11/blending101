import { useRef, useEffect, useCallback } from "react";

const useThemeMethod = () => {
  const ref = useRef<any>(null);

  const collectionHandler = useCallback((e) => {
    alert("I Worked");
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      // Handling add to Collection
      const btn = element.querySelector("#addToCollection");
      if (btn) {
        btn.onclick = collectionHandler;
      }
    }
  });

  return ref;
};

export default useThemeMethod;
