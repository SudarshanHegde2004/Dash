import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(tasks => {
        // Aggregate task counts by type
        const counts = {};
        tasks.forEach(task => {
          counts[task.type] = (counts[task.type] || 0) + 1;
        });
        const labels = Object.keys(counts);
        const data = Object.values(counts);
        // Generate colors (simplest: fixed palette)
        const backgroundColors = ['#34d399', '#3b82f6', '#fbbf24', '#f87171', '#a78bfa'];
        setChartData({
          labels,
          datasets: [{
            data,
            backgroundColor: backgroundColors.slice(0, labels.length),
            hoverOffset: 4
          }]
        });
      });
  }, []);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
      <Doughnut data={chartData} />
    </div>
  );
}
