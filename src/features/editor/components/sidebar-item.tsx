import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant={"ghost"}
      onClick={onClick}
      className={cn(
        "w-full h-[64px] p-3 py-4 flex flex-col rounded-none",
        isActive && "bg-gray-100 text-primary"
      )}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="text-xs -mt-1">{label}</span>
    </Button>
  );
};

export default SidebarItem;
