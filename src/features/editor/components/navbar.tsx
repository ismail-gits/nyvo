import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import {
  BsCloudCheck,
  BsFiletypeJpg,
  BsFiletypeJson,
  BsFiletypePng,
  BsFiletypeSvg,
} from "react-icons/bs";
import { useFilePicker } from "use-file-picker";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Hint from "@/components/hint";
import Logo from "./logo";
import { ActiveTool, Editor } from "../types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ editor, activeTool, onChangeActiveTool }: NavbarProps) => {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"} variant={"ghost"}>
              File
              <ChevronDown className="size-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              onClick={() => openFilePicker()}
              className="flex items-center gap-x-2"
            >
              <BsFiletypeJson className="size-7" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeActiveTool(activeTool)}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom">
          <Button
            disabled={!editor?.canUndo()}
            variant={"ghost"}
            size={"icon"}
            onClick={async () => {
              await editor?.undo();
            }}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom">
          <Button
            disabled={!editor?.canRedo()}
            variant={"ghost"}
            size={"icon"}
            onClick={async () => {
              await editor?.redo();
            }}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant={"ghost"}>
                Export
                <Download className="size-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJson()}
              >
                <BsFiletypeJson className="size-7" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.savePng()}
              >
                <BsFiletypePng className="size-7" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJpeg()}
              >
                <BsFiletypeJpg className="size-7" />
                <div>
                  <p>JPEG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for photos and web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveSvg()}
              >
                <BsFiletypeSvg className="size-7" />
                <div>
                  <p>SVG </p>
                  <p className="text-xs text-muted-foreground">
                    Best for logos and icons
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* TODO: Add user button */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
