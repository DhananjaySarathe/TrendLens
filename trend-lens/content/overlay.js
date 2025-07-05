import html2canvas from "html2canvas";
import { analyzeChartWithGemini } from "./geminiAnalyzer";
import { drawAnnotations } from "../utils/drawAnnotations";

(function injectOverlay() {
  if (document.getElementById("chart-selector-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "chart-selector-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.05)",
    zIndex: 999999,
    cursor: "crosshair"
  });
  document.body.appendChild(overlay);

  let startX, startY, selection;

  overlay.addEventListener("mousedown", (e) => {
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
      zIndex: 1000000
    });
    overlay.appendChild(selection);

    overlay.onmousemove = (e) => {
      selection.style.width = `${e.pageX - startX}px`;
      selection.style.height = `${e.pageY - startY}px`;
    };

    overlay.onmouseup = async (e) => {
      overlay.onmousemove = null;
      overlay.onmouseup = null;

      const endX = e.pageX;
      const endY = e.pageY;

      html2canvas(document.body).then(async (canvas) => {
        const ctx = canvas.getContext("2d");
        const imgData = ctx.getImageData(startX, startY, endX - startX, endY - startY);

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = imgData.width;
        tempCanvas.height = imgData.height;
        tempCanvas.getContext("2d").putImageData(imgData, 0, 0);

        tempCanvas.toBlob(async (blob) => {
          const results = await analyzeChartWithGemini(blob);
          drawAnnotations(results, startX, startY);
        });
      });

      overlay.remove();
    };
  });
})();