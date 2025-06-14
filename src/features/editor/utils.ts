import * as fabric from "fabric";
import { RGBColor } from "react-color";
import { v4 } from "uuid"

export function transformText(objects: any) {
  if (!objects) {
    return;
  }

  objects.forEach((item: any) => {
    if (item.objects) {
      transformText(item.objects);
    } else {
      item.type === "text" && (item.type = "textbox");
    }
  });
}

export function downloadFile(file: string, type: string) {
  const anchorElement = document.createElement("a");

  anchorElement.href = file;
  anchorElement.download = `${v4()}.${type}`;

  document.body.appendChild(anchorElement);

  anchorElement.click();
  anchorElement.remove();
}

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function isImageType(type: string | undefined) {
  return type === "image";
}

export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return "rgba(0, 0, 0, 0)";
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}

export const createFilter = (filter: string) => {
  let effect;

  switch (filter) {
    case "polaroid":
      effect = new fabric.filters.Polaroid();
      break;
    case "sepia":
      effect = new fabric.filters.Sepia();
      break;
    case "kodachrome":
      effect = new fabric.filters.Kodachrome();
      break;
    case "contrast":
      effect = new fabric.filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new fabric.filters.Brightness({ brightness: 0.8 });
      break;
    case "grayscale":
      effect = new fabric.filters.Grayscale();
      break;
    case "brownie":
      effect = new fabric.filters.Brownie();
      break;
    case "vintage":
      effect = new fabric.filters.Vintage();
      break;
    case "technicolor":
      effect = new fabric.filters.Technicolor();
      break;
    case "pixelate":
      effect = new fabric.filters.Pixelate({
        blocksize: 4,
      });
      break;
    case "invert":
      effect = new fabric.filters.Invert();
      break;
    case "blur":
      effect = new fabric.filters.Blur({
        blur: 0.5,
      });
      break;
    case "sharpen":
      effect = new fabric.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      }) as any;
      effect._id = "sharpen";
      break;
    case "emboss":
      effect = new fabric.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      }) as any;
      effect._id = "emboss";
      break;
    case "removecolor":
      effect = new fabric.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      effect = new fabric.filters.BlackWhite() as any;
      effect._id = "blacknwhite";
      break;
    case "vibrance":
      effect = new fabric.filters.Vibrance({
        vibrance: 1,
      });
      break;
    case "blendcolor":
      effect = new fabric.filters.BlendColor({
        color: "#00ff00",
        mode: "multiply",
        alpha: 1,
      });
      break;
    case "huerotate":
      effect = new fabric.filters.HueRotation({
        rotation: 0.5,
      }) as any;
      effect._id = "huerotate";
      break;
    case "resize":
      effect = new fabric.filters.Resize({
        scaleX: 0.5,
        scaleY: 0.5,
        resizeType: "hermite",
      });
      break;
    case "saturation":
      effect = new fabric.filters.Saturation({
        saturation: 1,
      });
      break;
    case "gamma":
      effect = new fabric.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    default:
      effect = null;
      return;
  }

  return effect;
};
