import html2canvas from "html2canvas";

export interface CaptureArea {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

/**
 * Capture a rectangular area of the page as a Blob image.
 */
export async function captureSelectedArea(
  area: CaptureArea
): Promise<Blob | null> {
  try {
    console.log("Capturing area:", area);
    const canvas = await html2canvas(document.body);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const width = area.endX - area.startX;
    const height = area.endY - area.startY;

    const imgData = ctx.getImageData(area.startX, area.startY, width, height);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = imgData.width;
    tempCanvas.height = imgData.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return null;

    tempCtx.putImageData(imgData, 0, 0);

    return new Promise((resolve) => {
      tempCanvas.toBlob((blob: Blob | null) => {
        resolve(blob);
      });
    });
  } catch (error) {
    console.error("Error capturing image:", error);
    return null;
  }
}
