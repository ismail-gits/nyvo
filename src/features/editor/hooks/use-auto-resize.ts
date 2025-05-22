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

    canvas.setDimensions({
      width,
      height,
    })

    const center = canvas.getCenterPoint();

    const zoomRatio = 0.85;

    const scale = fabric.util.findScaleToFit(workspace, {
      width: width,
      height: height,
    });

    const zoom = zoomRatio * scale;

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    canvas.zoomToPoint(new fabric.Point(center.x, center.y), zoom);

    const workspaceCenter = workspace.getCenterPoint();
    const viewPortTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewPortTransform
    ) {
      return;
    }

    viewPortTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewPortTransform[0];
    viewPortTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewPortTransform[3];

    canvas.setViewportTransform(viewPortTransform);

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
