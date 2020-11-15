import React, { useState } from "react";
import "./ColorBox.scss";

function getColorRandom() {
  const COLOR_LIST = ["deeppink", "green", "yellow", "black", "blue"];
  const randomIndex = Math.trunc(Math.random() * 5);
  return COLOR_LIST[randomIndex];
}

function ColorBox() {
  const [color, setColor] = useState(() => {
    return localStorage.getItem("color_box") || "deeppink";
  });

  function handleBoxClick() {
    //get Random color -> set color
    const newColor = getColorRandom();
    setColor(newColor);
    localStorage.setItem("color_box", newColor);
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
    ></div>
  );
}

export default ColorBox;
