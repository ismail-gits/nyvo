import * as fabric from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<fabric.FabricObject | null>(null);

  const copy = useCallback(async () => {
    const activeObject = canvas?.getActiveObject();

    if (activeObject) {
      try {
        const cloned = await activeObject.clone();
        clipboard.current = cloned;
      } catch (error) {
        console.log("Failed to clone object: " + error);
      }
    }
  }, [canvas]);

  const paste = useCallback(async () => {
    if (!clipboard.current || !canvas) {
      return;
    }

    const cloned = await clipboard.current.clone();

    canvas.discardActiveObject();

    cloned.set({
      left: cloned.left + 10,
      top: cloned.top + 10,
      evented: true,
    });

    if (cloned instanceof fabric.ActiveSelection) {
      const activeSelection = cloned as fabric.ActiveSelection;

      activeSelection.canvas = canvas;
      activeSelection.forEachObject((obj) => {
        canvas.add(obj);
      });
      activeSelection.setCoords();
    } else {
      // Handle single object
      canvas.add(cloned);
    }

    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
  }, [canvas]);

  return { copy, paste };
};
