import { captureSelectedArea, CaptureArea } from "./capture";
import { analyzeChartWithGemini } from "./geminiAnalyzer";
import { drawAnnotations } from "../utils/drawAnnotations";

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

  let startX: number, startY: number;
  let selection: HTMLDivElement;

  overlay.addEventListener("mousedown", (e: MouseEvent) => {
    startX = e.pageX;
    startY = e.pageY;

    selection = document.createElement("div");
    selection.id = "selection-box";
    Object.assign(selection.style, {
      position: "absolute",
      border: "2px dashed #333",
      background: "rgba(255,255,255,0.3)",
      left: `${startX}px`,
      top: `${startY}px`,
      zIndex: "1000000",
    });
    overlay.appendChild(selection);

    overlay.onmousemove = (e: MouseEvent) => {
      selection.style.width = `${e.pageX - startX}px`;
      selection.style.height = `${e.pageY - startY}px`;
    };

    overlay.onmouseup = async (e: MouseEvent) => {
      overlay.onmousemove = null;
      overlay.onmouseup = null;

      const endX = e.pageX;
      const endY = e.pageY;

      const captureArea: CaptureArea = {
        startX,
        startY,
        endX,
        endY,
      };

      const blob = await captureSelectedArea(captureArea);
      if (blob) {
        const results = await analyzeChartWithGemini(blob);
        drawAnnotations(results, startX, startY);
      }

      overlay.remove();
    };
  });
})();
