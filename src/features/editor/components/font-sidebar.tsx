import { cn } from "@/lib/utils";
import { ActiveTool, Editor, fonts } from "../types";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FontSideBarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FontSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSideBarProps) => {
  const activeFont = editor?.getActiveFontFamily()

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Font" description="Modify the font of your text" />
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-4 space-y-2 border-b">
          {fonts.map((font: string) => (
            <Button
              key={font}
              variant={"secondary"}
              size={"lg"}
              className={cn(
                "w-full h-16 justify-start text-left",
                activeFont === font && "border-2 border-black"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "7px 16px"
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FontSideBar;
