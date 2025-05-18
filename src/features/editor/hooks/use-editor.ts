import { useCallback, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./use-auto-resize";

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [workspace, setWorkspace] = useState<fabric.Rect | null>(null)

  useAutoResize({
    canvas,
    container,
    workspace
  })

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setDimensions(
        {
          width: initialContainer.offsetWidth,
          height: initialContainer.offsetHeight,
        },
        {
          cssOnly: false,
        }
      );

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setWorkspace(initialWorkspace)
      setCanvas(initialCanvas)
      setContainer(initialContainer)

      const rectangle = new fabric.Rect({
        fill: "blue",
        width: 100,
        height: 150,
      });

      rectangle.cornerColor = "white";
      rectangle.cornerStyle = "circle";
      rectangle.borderColor = "black";
      rectangle.borderScaleFactor = 1.5;
      rectangle.transparentCorners = false;
      rectangle.borderOpacityWhenMoving = 1;
      rectangle.cornerStrokeColor = "black";
      // rectangle.cornerStrokeColor = "#3b82f6";
      rectangle.cornerSize = 10;
      rectangle.padding = 1;

      initialCanvas.add(rectangle);
      initialCanvas.centerObject(rectangle);
    },
    []
  );

  return { init };
};
