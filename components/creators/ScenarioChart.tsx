import { formatUsd } from "@/lib/money";

export function ScenarioChart({
  rows,
}: {
  rows: { label: string; monthlyUsd: number }[];
}) {
  const max = Math.max(...rows.map((row) => row.monthlyUsd), 1);
  const width = 320;
  const height = 160;
  const barWidth = 56;
  const gap = (width - barWidth * rows.length) / (rows.length + 1);

  return (
    <figure className="grid gap-3">
      <figcaption className="text-sm font-semibold text-ink">Monthly estimate by scenario</figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="scenario-chart-title" className="h-40 w-full">
        <title id="scenario-chart-title">Bar chart of the low, expected, and high monthly USD estimates</title>
        {rows.map((row, index) => {
          const barHeight = Math.max(4, (row.monthlyUsd / max) * 110);
          const x = gap + index * (barWidth + gap);
          const y = 124 - barHeight;
          return (
            <g key={row.label}>
              <rect x={x} y={y} width={barWidth} height={barHeight} rx="8" fill={index === 1 ? "#315bff" : "#101b35"} />
              <text x={x + barWidth / 2} y="148" textAnchor="middle" fill="#475467" fontSize="12">
                {row.label}
              </text>
            </g>
          );
        })}
      </svg>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Monthly and readable amounts for each scenario</caption>
        <thead>
          <tr className="text-muted">
            <th scope="col" className="py-1 font-medium">Scenario</th>
            <th scope="col" className="py-1 font-medium">Monthly USD</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-line">
              <th scope="row" className="py-2 font-medium text-ink">{row.label}</th>
              <td className="py-2 tabular text-ink">{formatUsd(row.monthlyUsd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
