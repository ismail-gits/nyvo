import { useCallback, useEffect } from "react";
import type { Canvas } from "fabric";

interface UseAutoResizeProps {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) {
      return;
    }

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setDimensions(
      {
        width,
        height,
      },
      { cssOnly: false }
    );

    const center = canvas.getCenterPoint()
    const zoomRatio = 0.85
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom()
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
