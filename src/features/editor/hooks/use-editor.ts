import { useCallback, useState, useMemo } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./use-auto-resize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_STYLE,
  FONT_WEIGHT,
  JSON_KEYS,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
  UseEditorProps,
} from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import {
  createFilter,
  downloadFile,
  isTextType,
  transformText,
} from "../utils";
import { useClipboard } from "./use-clipboard";
import { useHistory } from "./use-history";
import { useHotkeys } from "./use-hotkeys";
import { useWindowEvents } from "./use-window-events";

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
  fontFamily,
  setFontFamily,
  copy,
  paste,
  autoZoom,
  save,
  canUndo,
  canRedo,
  undo,
  redo,
}: BuildEditorProps): Editor => {
  const savePng = () => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      width: workspace?.width,
      height: workspace?.height,
      left: workspace?.left,
      top: workspace?.top,
      multiplier: 1,
    });

    downloadFile(dataUrl, "png");
    autoZoom();
  };

  const saveSvg = () => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      width: workspace?.width,
      height: workspace?.height,
      left: workspace?.left,
      top: workspace?.top,
      multiplier: 1,
    });

    downloadFile(dataUrl, "svg");
    autoZoom();
  };

  const saveJpeg = () => {
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const dataUrl = canvas.toDataURL({
      format: "jpeg",
      quality: 1,
      width: workspace?.width,
      height: workspace?.height,
      left: workspace?.left,
      top: workspace?.top,
      multiplier: 1,
    });

    downloadFile(dataUrl, "jpeg");
    autoZoom();
  };

  const saveJson = () => {
    const dataUrl = canvas.toObject(JSON_KEYS);

    transformText(dataUrl.objects);

    const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, "\t")
    )}`;

    downloadFile(fileString, "json");
  };

  const loadJson = async (json: string) => {
    const data = JSON.parse(json);

    await canvas.loadFromJSON(data);
    autoZoom();
  };

  const center = (object: fabric.FabricObject) => {
    const centerPoint = workspace?.getCenterPoint();
    canvas._centerObject(object, centerPoint!);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    savePng,
    saveSvg,
    saveJpeg,
    saveJson,
    loadJson,
    undo,
    redo,
    canUndo,
    canRedo,
    autoZoom,
    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += 0.05;
      const canvasCenter = canvas.getCenterPoint();

      canvas.zoomToPoint(
        new fabric.Point(canvasCenter.x, canvasCenter.y),
        zoomRatio > 1.3 ? 1.3 : zoomRatio
      );
    },
    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= 0.05;
      const canvasCenter = canvas.getCenterPoint();

      canvas.zoomToPoint(
        new fabric.Point(canvasCenter.x, canvasCenter.y),
        zoomRatio < 0.2 ? 0.2 : zoomRatio
      );
    },
    getWorkspace: () => {
      return workspace;
    },
    changeSize: (size: { width: number; height: number }) => {
      workspace?.set(size);
      autoZoom();
      save();
    },
    changeBackground: (value: string) => {
      workspace?.set({ fill: value });
      canvas.requestRenderAll();
      save();
    },
    enableDrawingMode: () => {
      canvas.discardActiveObject();

      canvas.isDrawingMode = true;

      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      }

      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;

      canvas.requestRenderAll();
    },
    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },
    copy,
    paste,
    getActiveImageFilters: () => {
      const selectedObject = selectedObjects[0] as fabric.FabricImage;

      if (!selectedObject) {
        return [];
      }

      return (selectedObject.filters || [])
        .filter((f) => f != null)
        .map((f) => (f as any)._id || f.type);
    },
    changeImageFilter: (filter: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === "image") {
          const imageObject = object as fabric.FabricImage;

          const effect = createFilter(filter);

          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();

          canvas.requestRenderAll();
        }
      });
    },
    addImage: async (url: string) => {
      try {
        const image = await fabric.FabricImage.fromURL(url, {
          crossOrigin: "anonymous",
        });

        console.log("Image image - SUCCESS");

        image.scaleToWidth(workspace?.width || 0);
        image.scaleToHeight(workspace?.height || 0);

        addToCanvas(image);
      } catch (error) {
        console.log("Image loading failed: " + error);
      }
    },
    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            fontSize: value,
          });
        }

        canvas.requestRenderAll();
      });
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_SIZE;
      }

      const value = (selectedObject.get("fontSize") as number) || FONT_SIZE;

      return value;
    },
    changeTextAlign: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            textAlign: value,
          });
        }

        canvas.requestRenderAll();
      });
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "left";
      }

      const value = (selectedObject.get("textAlign") as string) || "left";

      // currently gradients and patterns are not supported
      return value;
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            underline: value,
          });
        }

        canvas.requestRenderAll();
      });
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      const value = (selectedObject.get("underline") as boolean) || false;

      // currently gradients and patterns are not supported
      return value;
    },
    changeFontLinethrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            linethrough: value,
          });
        }

        canvas.requestRenderAll();
      });
    },
    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      const value = (selectedObject.get("linethrough") as boolean) || false;

      // currently gradients and patterns are not supported
      return value;
    },
    changeFontStyle: (fontStyle: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            fontStyle,
          });
        }

        canvas.requestRenderAll();
      });
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_STYLE;
      }

      const value = (selectedObject.get("fontStyle") as string) || FONT_STYLE;

      // currently gradients and patterns are not supported
      return value;
    },
    changeFontWeight: (fontWeight: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            fontWeight,
          });
        }

        canvas.requestRenderAll();
      });
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_WEIGHT;
      }

      const value = (selectedObject.get("fontWeight") as number) || FONT_WEIGHT;

      // currently gradients and patterns are not supported
      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fontFamily;
      }

      const value = (selectedObject.get("fontFamily") as string) || fontFamily;

      return value;
    },
    changeFontFamily: (value: string) => {
      console.log("Changing font: " + value);
      setFontFamily(value);

      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({
            fontFamily: value,
          });
        }
      });

      canvas.requestRenderAll();
    },
    addText: (value: string, options?: Partial<fabric.TextboxProps>) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        ...options,
        fill: fillColor,
        borderColor: "black",
      });

      addToCanvas(object);
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const opacity = (selectedObject.get("opacity") as number) || 1;

      return opacity;
    },
    changeOpacity: (opacity: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          opacity,
        });

        canvas.requestRenderAll();
      });
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringObjectForward(object);
      });

      if (workspace) {
        canvas.sendObjectToBack(workspace);
      }

      canvas.requestRenderAll();
    },
    sendBackward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendObjectBackwards(object);
      });

      if (workspace) {
        canvas.sendObjectToBack(workspace);
      }

      canvas.requestRenderAll();
    },

    changeFillColor: (color: string) => {
      setFillColor(color);
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          fill: color,
        });
      });
      canvas.requestRenderAll();
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

      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = color;
      }

      canvas.requestRenderAll();
    },
    changeStrokeWidth: (width: number) => {
      setStrokeWidth(width);
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          strokeWidth: width,
        });
        object.setCoords();
      });

      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = width;
      }

      canvas.requestRenderAll();
    },
    changeStrokeDashArray: (strokeDashedArray: number[]) => {
      setStrokeDashArray(strokeDashedArray);
      canvas.getActiveObjects().forEach((object) => {
        object.set({
          strokeDashArray: strokeDashedArray,
        });
      });
      canvas.requestRenderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        scaleY: -1,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object);
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
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );

      addToCanvas(object);
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

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  const { save, canUndo, canRedo, undo, redo, canvasHistory, setHistoryIndex } =
    useHistory({ canvas });

  const { copy, paste } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({
    canvas,
    container,
    workspace,
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
    save,
  });

  useHotkeys({
    canvas,
    undo,
    redo,
    save,
    copy,
    paste,
  });

  useWindowEvents();

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
        fontFamily,
        setFontFamily,
        copy,
        paste,
        autoZoom,
        save,
        canUndo,
        undo,
        canRedo,
        redo,
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
    fontFamily,
    copy,
    paste,
    autoZoom,
    save,
    canUndo,
    canRedo,
    undo,
    redo,
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

      const currentState = JSON.stringify(initialCanvas.toObject(JSON_KEYS));
      canvasHistory.current = [currentState];
      setHistoryIndex(0);
    },
    []
  );

  return { init, editor };
};
