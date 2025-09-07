// src/components/RadarChart.tsx

import { attributeLabels } from "./chart.config";

const AttributeRow = ({ label, score }: { label: string; score: number }) => {
  const percentage = score * 10;
  return (
    <view className="GaugeItemContainer">
      <view className="GaugeItemHeader">
        <text className="GaugeItemLabel">{label}</text>
        <text className="GaugeItemScore">{score}/10</text>
      </view>
      <view className="ProgressBarBackground">
        <view
          className="ProgressBarForeground"
          style={{ width: `${percentage}%` }}
        />
      </view>
    </view>
  );
};

interface RadarChartProps {
  data: number[];
}

export default function RadarChart({ data }: RadarChartProps) {
  return (
    <view className="FingerprintContainer">
      {attributeLabels.map((label, index) => (
        <AttributeRow key={label} label={label} score={data[index] || 0} />
      ))}
    </view>
  );
}
