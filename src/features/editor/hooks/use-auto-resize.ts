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
    if (!canvas || !container || !workspace) {
      console.log("AutoZoom: Missing canvas, container, or workspace");
      return;
    }

    // Ensure enableRetinaScaling is true for best results
    // This should ideally be set at canvas initialization
    if (!canvas.enableRetinaScaling) {
      console.warn(
        "Fabric.js canvas does not have enableRetinaScaling set to true. " +
          "This can lead to blurriness on high-DPI displays. " +
          "Initialize your canvas with `new fabric.Canvas('id', { enableRetinaScaling: true });`"
      );
      // Optionally, you could try to set it here, but it's best at init.
      // canvas.enableRetinaScaling = true;
    }

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    if (containerWidth === 0 || containerHeight === 0) {
      console.log("AutoZoom: Container has zero dimensions, skipping resize.");
      return;
    }

    console.log(
      `AutoZoom: Resizing to container dimensions: ${containerWidth}x${containerHeight}`
    );

    // Set canvas logical dimensions.
    // If enableRetinaScaling is true, Fabric.js handles scaling the
    // underlying canvas element's width/height attributes by devicePixelRatio.
    canvas.setDimensions({
      width: containerWidth,
      height: containerHeight,
    });
    // Note: No manual canvas.contextContainer.scale(dpr, dpr) is needed here
    // when enableRetinaScaling is true, as Fabric manages this.

    // Get canvas center (logical coordinates)
    const canvasCenter = canvas.getCenterPoint(); // fabric.Point

    // Zoom ratio to leave some padding
    const zoomRatio = 0.9;

    // Ensure workspace has dimensions before trying to fit it
    if (!workspace.width || !workspace.height) {
      console.warn(
        "AutoZoom: Workspace has no dimensions. Cannot calculate scale to fit."
      );
      // Potentially set a default zoom or do nothing
      canvas.setZoom(1);
      canvas.setViewportTransform(fabric.iMatrix.concat() as fabric.TMat2D); // Reset transform
      canvas.centerObject(workspace); // Center workspace if no dimensions to scale
      canvas.requestRenderAll();
      return;
    }

    // Find scale to fit workspace in view
    // fabric.util.findScaleToFit expects workspace and target (canvas) dimensions
    const scaleToFit = fabric.util.findScaleToFit(workspace, {
      width: containerWidth,
      height: containerHeight,
    });

    const newZoom = zoomRatio * scaleToFit;

    // Reset transform before applying new zoom and pan
    // fabric.iMatrix is [1, 0, 0, 1, 0, 0]
    canvas.setViewportTransform(fabric.iMatrix.concat() as fabric.TMat2D);

    // Zoom to the center of the canvas
    // zoomToPoint takes a fabric.Point and the zoom level
    canvas.zoomToPoint(
      new fabric.Point(canvasCenter.x, canvasCenter.y),
      newZoom
    );

    // Adjust viewport to center the workspace
    // getCenterPoint() for workspace returns its center in canvas coordinates *before* current viewport transform
    const workspaceCenter = workspace.getCenterPoint(); // fabric.Point

    // After zooming, the viewportTransform has changed. We need its current state.
    const currentTransform = canvas.viewportTransform;

    if (currentTransform) {
      // Calculate the pan needed to bring the workspaceCenter (scaled by newZoom)
      // to the canvasCenter.
      // Panning formula:
      // newPanX = canvasCenterX - workspaceCenterX * zoom
      // newPanY = canvasCenterY - workspaceCenterY * zoom
      const panX = canvasCenter.x - workspaceCenter.x * newZoom;
      const panY = canvasCenter.y - workspaceCenter.y * newZoom;

      // Update the translation components of the viewport transform
      currentTransform[4] = panX;
      currentTransform[5] = panY;

      canvas.setViewportTransform(currentTransform);
    }

    // Set coords for all objects and re-render
    // This is important for interaction areas to be correct after zoom/pan
    canvas.getObjects().forEach((obj) => {
      obj.setCoords();
    });
    canvas.requestRenderAll();
    console.log("AutoZoom: Completed");
  }, [canvas, container, workspace]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      // Initial call to autoZoom when component mounts or dependencies change
      autoZoom();

      resizeObserver = new ResizeObserver((entries) => {
        // We only need to react if the contentRect dimensions have changed.
        // This helps avoid potential infinite loops if autoZoom itself causes a minor resize.
        // However, for simplicity, direct call is often fine if autoZoom is idempotent.
        for (const entry of entries) {
          if (entry.contentRect) {
            // Check if contentRect is available
            autoZoom();
          }
        }
      });

      resizeObserver.observe(container);
      console.log("AutoZoom: ResizeObserver attached.");
    } else {
      console.log(
        "AutoZoom: Canvas or container not available for ResizeObserver."
      );
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        console.log("AutoZoom: ResizeObserver disconnected.");
      }
    };
  }, [canvas, container, autoZoom]); // autoZoom is now a dependency

  return { autoZoom };
};
