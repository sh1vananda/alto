// src/components/BooGauge.tsx

export interface BooGaugeData {
  mainBooGauge?: number;
  dread?: number;
  jumpScares?: number;
  gore?: number;
  psychological?: number;
  atmosphere?: number;
  lingeringEffect?: number;
}
interface BooGaugeProps {
  data: BooGaugeData;
}
interface GaugeItemProps {
  label: string;
  score: number;
}

const GaugeItem = ({ label, score }: GaugeItemProps) => {
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

export default function BooGauge({ data }: BooGaugeProps) {
  const mainScore = data.mainBooGauge || 0;

  return (
    <view className="BooGaugeContainer">
      <view className="MainGaugeWrapper">
        <view className="MainScoreCircle">
          <text className="MainScoreText">{mainScore}</text>
        </view>
      </view>

      <view style={{ flexGrow: 1 }} />

      <view className="SubGaugeGrid">
        <GaugeItem label="Dread" score={data.dread || 0} />
        <GaugeItem label="Jump Scares" score={data.jumpScares || 0} />
        <GaugeItem label="Gore" score={data.gore || 0} />
        <GaugeItem label="Psychological" score={data.psychological || 0} />
        <GaugeItem label="Atmosphere" score={data.atmosphere || 0} />
        <GaugeItem label="Lingering Effect" score={data.lingeringEffect || 0} />
      </view>
    </view>
  );
}
