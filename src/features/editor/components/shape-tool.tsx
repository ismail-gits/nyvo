import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons"

interface ShapeToolProps {
  onClick: () => void
  icon: IconType | LucideIcon
  iconClassname?: string
}

const ShapeTool = ({
  onClick,
  icon: Icon,
  iconClassname
}:ShapeToolProps) => {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5 cursor-pointer">
      <Icon className={cn(
        "h-full w-full",
        iconClassname
      )}/>
    </button>
  )
}

export default ShapeTool