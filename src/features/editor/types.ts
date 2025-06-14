import * as fabric from "fabric";
import material from "material-colors";

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extension",
  "extenstionType",
];

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "grayscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const fonts = [
  "Arial",
  "Arial Black",
  "Bookman",
  "Brush Script MT",
  "Calibri",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Franklin Gothic Medium",
  "Garamond",
  "Geneva",
  "Georgia",
  "Helvetica",
  "Impact",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Palatino",
  "Perpetua",
  "Rockwell",
  "Segoe UI",
  "Sylfaen",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

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
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 50;
export const FONT_WEIGHT = 400;
export const FONT_STYLE = "normal";

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

export const TEXT_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export type UseEditorProps = {
  clearSelectionCallback: () => void;
};

export type BuildEditorProps = {
  save: (skip?: boolean) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  autoZoom: () => void;
  copy: () => Promise<void>;
  paste: () => Promise<void>;
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
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
};

export interface Editor {
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  canUndo: () => boolean;
  canRedo: () => boolean;
  autoZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  getWorkspace: () => fabric.Rect | null;
  changeSize: (size: { width: number; height: number }) => void;
  changeBackground: (value: string) => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  copy: () => Promise<void>;
  paste: () => Promise<void>;
  getActiveImageFilters: () => string[];
  changeImageFilter: (filter: string) => void;
  addImage: (url: string) => void;
  delete: () => void;
  changeFontSize: (value: number) => void;
  getActiveFontSize: () => number;
  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;
  changeFontLinethrough: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;
  getActiveFontStyle: () => string;
  changeFontStyle: (fontStyle: string) => void;
  getActiveFontWeight: () => number;
  changeFontWeight: (fontWeight: number) => void;
  getActiveFontFamily: () => string;
  changeFontFamily: (value: string) => void;
  addText: (value: string, options?: Partial<fabric.TextboxProps>) => void;
  changeOpacity: (opacity: number) => void;
  getActiveOpacity: () => number;
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
