import { captureSelectedArea, CaptureArea } from "./capture";
import { drawAnnotations } from "../utils/drawAnnotations";
import { analyzeChartWithGemini } from "./geminiAnalyzer";

(function injectOverlay(): void {
  if (document.getElementById("chart-selector-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "chart-selector-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.05)",
    zIndex: "999999",
    cursor: "crosshair",
  });
  document.body.appendChild(overlay);

  overlay.addEventListener("mousedown", (e: MouseEvent) => {
    const startX = e.pageX;
    const startY = e.pageY;

    const selection = document.createElement("div");
    selection.id = "selection-box";
    Object.assign(selection.style, {
      position: "absolute",
      border: "2px dashed #333",
      background: "rgba(255,255,255,0.3)",
      zIndex: "1000000",
    });
    overlay.appendChild(selection);

    function onMouseMove(e: MouseEvent) {
      const currentX = e.pageX;
      const currentY = e.pageY;
      const left = Math.min(currentX, startX);
      const top = Math.min(currentY, startY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      Object.assign(selection.style, {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      });
    }

    async function onMouseUp(e: MouseEvent) {
      overlay.removeEventListener("mousemove", onMouseMove);
      overlay.removeEventListener("mouseup", onMouseUp);

      const endX = e.pageX;
      const endY = e.pageY;
      const captureArea: CaptureArea = {
        startX: Math.min(startX, endX),
        startY: Math.min(startY, endY),
        endX: Math.max(startX, endX),
        endY: Math.max(startY, endY),
      };

      const blob = await captureSelectedArea(captureArea);
      if (blob) {
        const results = await analyzeChartWithGemini(blob);
        drawAnnotations(results, captureArea.startX, captureArea.startY);
      }

      overlay.remove();
    }

    overlay.addEventListener("mousemove", onMouseMove);
    overlay.addEventListener("mouseup", onMouseUp);
  });
})();
