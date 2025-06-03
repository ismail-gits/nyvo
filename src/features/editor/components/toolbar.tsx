import React, { useState } from "react";
import { ActiveTool, Editor } from "../types";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx"
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { isTextType } from "../utils";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const fontFamily = editor?.getActiveFontFamily();

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  const selectedObjectType = editor?.selectedObjects[0].type;
  const isText = isTextType(selectedObjectType);

  const [properties, setProperties] = useState({
    fillColor,
  });

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
                backgroundColor: fillColor,
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
              <div className="max-w-[100px] truncate">{fontFamily}</div>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </Hint>
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
                  borderColor: strokeColor,
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
    </div>
  );
};

export default Toolbar;
