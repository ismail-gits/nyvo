import * as fabric from "fabric";
import { useEffect } from "react";

interface UseCanvasEvenstProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.FabricObject[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
}: UseCanvasEvenstProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected);
      });

      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created", (e) => {
        setSelectedObjects(e.selected);
      });

      canvas.off("selection:updated", (e) => {
        setSelectedObjects(e.selected);
      });
      canvas.off("selection:cleared", () => {
        setSelectedObjects([]);
      });
      }
    }
  }, [canvas]);
};
