"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = {
  "Registrado": "#aab2aa",
  "En tránsito": "#f4c430",
  "Entregado": "#4f9908"
};

export default function AdminCharts({ chartsData }) {
  if (!chartsData) return null;

  const { statusData, timelineData } = chartsData;

  return (
    <div className="admin-charts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
      {/* Gráfico de Torta: Estados de Despacho */}
      <div className="stat-card" style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 15px 0", color: "var(--green-dark)" }}>Distribución de Despachos</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#ccc"} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras: Evolución en el tiempo */}
      <div className="stat-card" style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 15px 0", color: "var(--green-dark)" }}>Despachos Registrados (Mensual)</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <RechartsTooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              <Bar dataKey="despachos" name="Nuevos Despachos" fill="var(--green)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
