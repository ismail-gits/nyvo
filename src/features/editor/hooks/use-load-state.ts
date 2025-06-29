import * as fabric from "fabric";
import React, { useEffect, useRef } from "react";
import { JSON_KEYS } from "../types";

interface UseLoadStateProps {
  autoZoom: () => void;
  canvas: fabric.Canvas | null;
  initialState: React.RefObject<string | undefined>;
  canvasHistory: React.RefObject<string[]>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useLoadState = ({
  autoZoom,
  canvas,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: UseLoadStateProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    const loadCanvas = async () => {
      if (!initialized.current && initialState.current && canvas) {
        const data = JSON.parse(initialState.current);

        await canvas.loadFromJSON(data);

        const currentState = JSON.stringify(canvas.toObject(JSON_KEYS));
        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
        canvas.requestRenderAll();

        initialized.current = true;
      }
    };

    loadCanvas();
  }, [canvas, autoZoom, canvasHistory, initialState, setHistoryIndex]);
};
