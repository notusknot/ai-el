import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import type { ScenarioResult } from "../lib/db/types";

type Props = {
  results: ScenarioResult[];
};

type MoralMapPoint = {
  x: number;
  y: number;
  z: number;
  name: string;
  shortLabel: string;
  count: number;
  controversy: number;
};

function makeShortLabel(title: string): string {
  if (title.length <= 18) return title;
  return `${title.slice(0, 16)}...`;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: MoralMapPoint }>;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0].payload;

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #d1d5db",
        borderRadius: "10px",
        padding: "0.75rem",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <strong>{point.name}</strong>
      <div>Responses: {point.count}</div>
      <div>Learning impact: {point.x.toFixed(2)}</div>
      <div>Fairness: {point.y.toFixed(2)}</div>
      <div>Controversy: {point.controversy.toFixed(2)}</div>
    </div>
  );
}

function CustomDot(props: any) {
  const { cx, cy, payload } = props;

  if (typeof cx !== "number" || typeof cy !== "number") return null;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="#4f46e5"
        fillOpacity={0.85}
        stroke="white"
        strokeWidth={2}
      />
      <text
        x={cx + 10}
        y={cy + 4}
        fontSize={11}
        fill="#1f2937"
        style={{ pointerEvents: "none" }}
      >
        {payload.shortLabel}
      </text>
    </g>
  );
}

export default function MoralMap({ results }: Props) {
  const data: MoralMapPoint[] = results
    .filter((r) => r.count > 0)
    .map((r) => ({
      x: r.avgLearningImpact,
      y: r.avgFairness,
      z: Math.max(1, r.count),
      name: r.title,
      shortLabel: makeShortLabel(r.title),
      count: r.count,
      controversy: r.controversyScore,
    }));

  return (
    <div className="moral-map-shell">
      <div className="quadrant-label top-left">Fair, but harms learning</div>
      <div className="quadrant-label top-right">Fair and helpful</div>
      <div className="quadrant-label bottom-left">Unfair and harmful</div>
      <div className="quadrant-label bottom-right">Unfair, but helpful</div>

      <div className="moral-map-chart">
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top: 20, right: 40, bottom: 30, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="x"
              domain={[-5, 5]}
              ticks={[-5, -3, -1, 0, 1, 3, 5]}
              label={{
                value: "Harms learning  ←→  Helps learning",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              type="number"
              dataKey="y"
              domain={[-5, 5]}
              ticks={[-5, -3, -1, 0, 1, 3, 5]}
              label={{
                value: "Unfair  ←→  Fair",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <ZAxis type="number" dataKey="z" range={[80, 320]} />

            <Tooltip content={<CustomTooltip />} />

            <Scatter data={data} shape={<CustomDot />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
