"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatMoney } from "@/lib/money";
import type { CalculatorResult } from "@/types/calculator";

export default function BreakdownChart({ result }: { result: CalculatorResult }) {
  const data = [
    { name: "Gross", amount: result.grossUsd, fill: "#101B35" },
    { name: "Platform fee", amount: result.platformFeeUsd, fill: "#F05252" },
    { name: "Withdrawal", amount: result.payoneerFeeUsd + result.flatFeeInOrderCurrency, fill: "#F5A524" },
    { name: "Net", amount: result.netUsd, fill: "#315BFF" },
  ];

  return (
    <div className="h-56 w-full min-w-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#E5EAF3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#667085", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            formatter={(value) => formatMoney(Number(value), result.currency)}
            cursor={{ fill: "#EFF6FF" }}
          />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-2 text-xs text-muted">
        Order-currency steps only. Tax and a local conversion, when you enter them, are not mixed into this chart.
      </p>
    </div>
  );
}
