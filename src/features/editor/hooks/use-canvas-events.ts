import * as fabric from "fabric";
import { useEffect } from "react";

interface UseCanvasEvenstProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.FabricObject[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
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
        clearSelectionCallback?.()
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
          clearSelectionCallback?.()
        });
      }
    };
  }, [canvas, clearSelectionCallback]);
};
