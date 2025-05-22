import * as fabric from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  workspace: fabric.Rect | null;
}

export const useAutoResize = ({
  canvas,
  container,
  workspace,
}: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    console.log("resizing");
    if (!canvas || !container || !workspace) {
      return;
    }

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Set canvas dimension
    canvas.setDimensions({
      width,
      height,
    });

    // Get canvas center
    const canvasCenter  = canvas.getCenterPoint();

    // Zoom ratio to leave some padding
    const zoomRatio = 0.85;

    // Find scale to fit workspace in view
    const scale = fabric.util.findScaleToFit(workspace, {
      width,
      height,
    });
    const zoom = zoomRatio * scale;

    // Reset transform before applying new zoom
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    // Zoom to center
    canvas.zoomToPoint(canvasCenter, zoom);

    // Adjust viewport to center the workspace
    const workspaceCenter = workspace.getCenterPoint();
    const transform = canvas.viewportTransform;

    if (canvas.width && canvas.height && transform) {
    // Shift x and y translation to center workspace
    transform[4] = Math.round(canvas.width / 2 - workspaceCenter.x * transform[0]);
    transform[5] = Math.round(canvas.height / 2 - workspaceCenter.y * transform[3]);

    canvas.setViewportTransform(transform);
  }

  // Set coords and re-render
    canvas.getObjects().forEach((obj) => obj.setCoords());
    canvas.requestRenderAll();
  }, [canvas, container, workspace]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);

  return { autoZoom };
};
