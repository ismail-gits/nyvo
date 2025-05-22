import * as fabric from "fabric";
import material from "material-colors";

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0, 0, 255, 1)";
export const STROKE_COLOR = "rgba(0, 0, 255, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];

export type CornerStyleType = "circle" | "rect" | undefined;
export const CONTROL_CORNER_COLOR = "rgba(255, 255, 255, 1)";
export const CONTROL_CORNER_BORDER_COLOR = "rgba(0, 0, 0, 1)";
export const CONTROL_STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const CONTROL_CORNER_STYLE: CornerStyleType = "circle";

export const CONTROL_OPTIONS = {
  cornerColor: CONTROL_CORNER_COLOR,
  borderColor: CONTROL_CORNER_BORDER_COLOR,
  cornerStyle: CONTROL_CORNER_STYLE,
  borderScaleFactor: 1.5,
  transparentCorners: false,
  borderOpacityWhenMoving: 1,
  cornerStrokeColor: CONTROL_STROKE_COLOR,
  cornerSize: 10,
  padding: 1,
};

export const CIRCLE_OPTIONS = {
  radius: 200,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export type UseEditorProps = {
  clearSelectionCallback: () => void;
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  workspace: fabric.Rect | null;
  fillColor: string;
  setFillColor: (color: string) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  selectedObjects: fabric.FabricObject[];
  strokeDashArray: number[];
  setStrokeDashArray: (strokeDashedArray: number[]) => void;
};

export interface Editor {
  bringForward: () => void;
  sendBackward: () => void;
  changeFillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeStrokeWidth: (width: number) => void;
  changeStrokeDashArray: (strokeDashedArray: number[]) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  canvas: fabric.Canvas;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  selectedObjects: fabric.FabricObject[];
}
