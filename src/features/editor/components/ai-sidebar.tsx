import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";

import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { useState } from "react";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const mutation = useGenerateImage();

  const [value, setValue] = useState("")

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Block with paywall

    mutation.mutate({ prompt: value }, {
      onSuccess: (data) => {
        editor?.addImage(data.imageUrl)
      }
    })
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <form onSubmit={onSubmit} className="p-4 space-y-6">
        <Textarea
          disabled={mutation.isPending}
          value={value}
          placeholder="a 3d render of a wizard, saying nyvo in the background..."
          required
          minLength={3}
          className="w-full h-40 resize-none"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button disabled={mutation.isPending} type="submit" className="w-full">
          Generate
        </Button>
      </form>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
