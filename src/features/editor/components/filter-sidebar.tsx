import { cn } from "@/lib/utils";
import { ActiveTool, Editor, filters, fonts } from "../types";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const [version, setVersion] = useState(0);
  const value = editor?.getActiveImageFilters() || ["none"];

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Apply a filter to selected image"
      />
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-4 space-y-2 border-b">
          {filters.map((filter: string) => (
            <Button
              key={filter}
              variant={"secondary"}
              size={"lg"}
              className={cn(
                "w-full h-16 justify-start text-left",
                ((filter === "none" && value?.length === 0) ||
                  value[0]?.toLowerCase().includes(filter)) &&
                  "border-2 border-black"
              )}
              onClick={() => {
                editor?.changeImageFilter(filter);
                setVersion((v) => v + 1);
              }}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FilterSidebar;
