"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditor } from "../hooks/use-editor";

const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose()
    }
  }, [init]);

  return (
    <div className="h-full flex">
      <div ref={containerRef} className="flex-1 h-full bg-muted">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;
