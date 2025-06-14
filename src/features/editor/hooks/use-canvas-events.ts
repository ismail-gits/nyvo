import * as fabric from "fabric";
import { useEffect } from "react";

interface UseCanvasEvenstProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.FabricObject[]) => void;
  clearSelectionCallback?: () => void;
  save: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
  save,
}: UseCanvasEvenstProps) => {
  useEffect(() => {
    if (!canvas) {
      return;
    }

    // Selection events
    const handleSelectionCreated = (
      e: Partial<fabric.TEvent<fabric.TPointerEvent>> & {
        selected: fabric.FabricObject[];
      }
    ) => {
      setSelectedObjects(e.selected);
    };
    const handleSelectedUpdated = (
      e: Partial<fabric.TEvent<fabric.TPointerEvent>> & {
        selected: fabric.FabricObject[];
      }
    ) => {
      setSelectedObjects(e.selected);
    };
    const handleSelectedCleared = (
      e: Partial<fabric.TEvent<fabric.TPointerEvent>> & {
        deselected: fabric.FabricObject[];
      }
    ) => {
      setSelectedObjects([]);
      clearSelectionCallback?.();
    };

    // Objects events
    const handleObjectAdded = () => {
      save();
    };
    const handleObjectRemoved = () => {
      save();
    };
    const handleObjectModified = () => {
      save();
    };

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectedUpdated);
    canvas.on("selection:cleared", handleSelectedCleared);

    canvas.on("object:added", handleObjectAdded);
    canvas.on("object:removed", handleObjectRemoved);
    canvas.on("object:modified", handleObjectModified);

    return () => {
      if (canvas) {
        canvas.off("selection:created", handleSelectionCreated);
        canvas.off("selection:updated", handleSelectedUpdated);
        canvas.off("selection:cleared", handleSelectedCleared);

        canvas.off("object:added", handleObjectAdded);
        canvas.off("object:removed", handleObjectRemoved);
        canvas.off("object:modified", handleObjectModified);
      }
    };
  }, [canvas, clearSelectionCallback]);
};
