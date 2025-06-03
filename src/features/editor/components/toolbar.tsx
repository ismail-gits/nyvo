import React, { useState } from "react";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../types";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Trash,
} from "lucide-react";
import { isTextType } from "../utils";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import FontSizeInput from "./font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const intialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const intialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: intialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: intialFontWeight,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0].type;
  const isText = isTextType(selectedObjectType);

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor.changeFontWeight(newValue);

    setProperties({
      ...properties,
      fontWeight: newValue,
    });
  };

  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";
    editor.changeFontStyle(newValue);

    setProperties({
      ...properties,
      fontStyle: newValue,
    });
  };

  const toggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = !properties.fontLinethrough;
    editor.changeFontLinethrough(newValue);

    setProperties({
      ...properties,
      fontLinethrough: newValue,
    });
  };

  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = !properties.fontUnderline;
    editor.changeFontUnderline(newValue);

    setProperties({
      ...properties,
      fontUnderline: newValue,
    });
  };

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) {
      return;
    }

    editor.changeTextAlign(value);
    setProperties({
      ...properties,
      textAlign: value,
    });
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    editor.changeFontSize(value);
    setProperties({
      ...properties,
      fontSize: value,
    });
  };

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Color" side="bottom">
          <Button
            onClick={() => {
              onChangeActiveTool("fill");
            }}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: properties.fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom">
            <Button
              onClick={() => {
                onChangeActiveTool("font");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom">
            <Button
              onClick={toggleBold}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom">
            <Button
              onClick={toggleItalic}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom">
            <Button
              onClick={toggleUnderline}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strike" side="bottom">
            <Button
              onClick={toggleLinethrough}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align left" side="bottom">
            <Button
              onClick={() => onChangeTextAlign("left")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align center" side="bottom">
            <Button
              onClick={() => onChangeTextAlign("center")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align right" side="bottom">
            <Button
              onClick={() => onChangeTextAlign("right")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Color" side="bottom">
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-color");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Width" side="bottom">
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-width");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring Forward" side="bottom">
          <Button
            onClick={() => editor?.bringForward()}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send Backward" side="bottom">
          <Button
            onClick={() => editor?.sendBackward()}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom">
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom">
          <Button
            onClick={() => editor?.delete()}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
