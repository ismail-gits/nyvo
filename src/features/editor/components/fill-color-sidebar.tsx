import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../types";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";

const ColorPicker = dynamic(() => import("./color-picker"), { ssr: false });

interface FillColorProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorProps) => {
  const color = editor?.fillColor || FILL_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (color: string) => {
    editor?.changeFillColor(color);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Add fill color to your elements"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker color={color} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FillColorSidebar;
