// AnalysisResultDisplay.tsx
import React from "react";

export interface ChartPattern {
  name: string;
  description: string;
  position: { x: number; y: number };
}

interface Props {
  result: { patterns: ChartPattern[] } | null;
}

const AnalysisResultDisplay: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  if (result.patterns.length === 0) {
    return <p className="text-gray-400">No patterns detected.</p>;
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg mt-4 text-white">
      <h2 className="text-lg font-semibold mb-2">Detected Chart Patterns:</h2>
      <ul className="list-disc pl-5 space-y-1">
        {result.patterns.map((pattern, idx) => (
          <li key={idx}>
            <strong>{pattern.name}</strong>: {pattern.description} ( Position:{" "}
            {pattern.position.x.toFixed(2)}, {pattern.position.y.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisResultDisplay;
