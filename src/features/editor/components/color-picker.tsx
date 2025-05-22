"use client"

import { ChromePicker, CirclePicker, ColorResult } from "react-color";
import { colors } from "../types";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const onChangeColor = (color: ColorResult) => {
    const formattedColor = rgbaObjectToString(color.rgb);
    onChange(formattedColor);
  };

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={color}
        onChange={onChangeColor}
        className="border rounded-lg"
      />
      <CirclePicker
        color={color}
        colors={colors}
        onChangeComplete={onChangeColor}
      />
    </div>
  );
};

export default ColorPicker;
