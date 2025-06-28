import * as fabric from "fabric";
import { useCallback, useRef, useState } from "react";
import { JSON_KEYS } from "../types";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
  workspace: fabric.Rect | null;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
}

export const useHistory = ({
  canvas,
  workspace,
  saveCallback,
}: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef<boolean>(false);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const save = useCallback(
    (skip: boolean = false) => {
      if (!canvas) {
        return;
      }

      const currentState = canvas.toObject(JSON_KEYS);
      const json = JSON.stringify(currentState);

      if (!skip && !skipSave.current) {
        canvasHistory.current.push(json);
        const newIndex = canvasHistory.current.length - 1;
        setHistoryIndex(newIndex);
      }

      const height = workspace?.height || 0;
      const width = workspace?.width || 0;

      saveCallback?.({
        json,
        height,
        width,
      });
    },
    [canvas]
  );

  const undo = useCallback(async () => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.clear();

      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);

      await canvas?.loadFromJSON(previousState);
      canvas?.requestRenderAll();
      setHistoryIndex(previousIndex);
      skipSave.current = false;
    }
  }, [canvas, historyIndex, canRedo]);

  const redo = useCallback(async () => {
    if (canRedo()) {
      skipSave.current = true;
      canvas?.clear();
      canvas?.requestRenderAll();

      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);

      await canvas?.loadFromJSON(nextState);
      canvas?.requestRenderAll();
      setHistoryIndex(nextIndex);
      skipSave.current = false;
    }
  }, [canvas, historyIndex, canRedo]);

  return {
    save,
    canUndo,
    canRedo,
    undo,
    redo,
    setHistoryIndex,
    canvasHistory,
  };
};
