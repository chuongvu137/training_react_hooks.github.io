import { useEffect, useRef, useState } from "react";

const randomColor = (currentColor) => {
  const COLOR_LIST = ["red", "green", "yellow"];
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * 3);
  }

  return COLOR_LIST[newIndex];
};

function useMagicColor() {
  const [color, setColor] = useState("transparent");
  const colorRef = useRef("transparent");

  // Change color every 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current);

      colorRef.current = newColor;
      setColor(colorRef.current);
    }, 1000);

    return () => clearInterval(colorInterval);
  }, []);

  return { color };
}

export default useMagicColor;
