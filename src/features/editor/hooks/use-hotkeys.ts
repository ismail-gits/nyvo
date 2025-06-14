import * as fabric from "fabric";

import { useEvent } from "react-use";

interface UseHotkeys {
  canvas: fabric.Canvas | null;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  save: (skip?: boolean) => void;
  copy: () => Promise<void>;
  paste: () => Promise<void>;
}

export const useHotkeys = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: UseHotkeys) => {
  useEvent("keydown", async (event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isBackspace = event.key === "Backspace";
    const isInput = ["INPUT", "TEXTAREA"].includes(
      (event.target as HTMLElement).tagName
    );

    if (isInput) {
      return;
    }

    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && event.key === "z") {
      event.preventDefault();
      await undo();
    }

    if (isCtrlKey && event.key === "y") {
      event.preventDefault();
      await redo();
    }

    if (isCtrlKey && event.key === "c") {
      event.preventDefault();
      await copy();
    }

    if (isCtrlKey && event.key === "v") {
      event.preventDefault();
      await paste();
    }

    if (isCtrlKey && event.key === "d") {
      event.preventDefault();
      await copy();
      await paste();
    }

    if (isCtrlKey && event.key === "s") {
      event.preventDefault();
      save(true);
    }

    if (isCtrlKey && event.key === "a") {
      event.preventDefault();
      canvas?.discardActiveObject();

      const allObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas })
      );

      canvas?.requestRenderAll();
    }
  });
};
