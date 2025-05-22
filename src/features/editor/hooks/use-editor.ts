import { useCallback, useState, useMemo } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./use-auto-resize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  CONTROL_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
  UseEditorProps,
} from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({
  canvas,
  workspace,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
}: BuildEditorProps): Editor => {
  const center = (object: fabric.FabricObject) => {
    const centerPoint = workspace?.getCenterPoint();
    canvas._centerObject(object, centerPoint!);
  };

  return {
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringObjectForward(object);
      });

      if (workspace) {
        canvas.sendObjectToBack(workspace);
      }

      canvas.renderAll();
    },
    sendBackward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendObjectBackwards(object);
      });

      if (workspace) {
        canvas.sendObjectToBack(workspace);
      }

      canvas.renderAll();
    },

    changeFillColor: (color: string) => {
      setFillColor(color);
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          fill: color,
        });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (color: string) => {
      setStrokeColor(color);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            fill: color,
          });
          return;
        }
        object.set({
          stroke: color,
        });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (width: number) => {
      setStrokeWidth(width);
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          strokeWidth: width,
        });
        object.setCoords();
      });
      canvas.renderAll();
    },
    changeStrokeDashArray: (strokeDashedArray: number[]) => {
      setStrokeDashArray(strokeDashedArray);
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          strokeDashArray: strokeDashedArray,
        });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        ...CONTROL_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        ...CONTROL_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        ...CONTROL_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        ...CONTROL_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addInverseTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        ...CONTROL_OPTIONS,
        scaleY: -1,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addDiamond: () => {
      const size = 200;

      const object = new fabric.Polygon(
        [
          { x: 0, y: -size },
          { x: size, y: 0 },
          { x: 0, y: size },
          { x: -size, y: 0 },
        ],
        {
          ...DIAMOND_OPTIONS,
          ...CONTROL_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );

      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    canvas,
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.fill || fillColor;

      // currently gradients and patterns are not supported
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.stroke || strokeColor;

      // currently gradients and patterns are not supported
      return value as string;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.strokeWidth || strokeWidth;

      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.strokeDashArray || strokeDashArray;

      return value;
    },
    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: UseEditorProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [workspace, setWorkspace] = useState<fabric.Rect | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.FabricObject[]>(
    []
  );
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  useAutoResize({
    canvas,
    container,
    workspace,
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        workspace,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      const initialWorkspace = new fabric.Rect({
        id: "workspace",
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

      setWorkspace(initialWorkspace);
      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const rectangle = new fabric.Rect({
        fill: "blue",
        width: 200,
        height: 300,
        cornerColor: "white",
        borderColor: "black",
        cornerStyle: "circle",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "black",
        cornerSize: 10,
        padding: 1,
      });
      // rectangle.cornerStrokeColor = "#3b82f6";

      initialCanvas.add(rectangle);
      initialCanvas.centerObject(rectangle);
    },
    []
  );

  return { init, editor };
};
