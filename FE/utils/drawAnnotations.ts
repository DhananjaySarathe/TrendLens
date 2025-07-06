import { AnalysisResult } from "../content/geminiAnalyzer";

export function drawAnnotations(
  results: AnalysisResult,
  offsetX: number,
  offsetY: number
): void {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1000001";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";

  results.patterns.forEach((pattern) => {
    const x = offsetX + pattern.position.x;
    const y = offsetY + pattern.position.y;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(pattern.name, x + 10, y);
  });
}
