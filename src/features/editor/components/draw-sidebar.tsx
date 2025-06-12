import { cn } from "@/lib/utils";
import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from "../types";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ColorPicker = dynamic(() => import("./color-picker"), { ssr: false });

interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) => {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onColorChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  const onWidthChange = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Drawing Mode"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <Label className="text-sm">Brush Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>
        <div className="p-4 space-y-6">
          <ColorPicker color={colorValue} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default DrawSidebar;
