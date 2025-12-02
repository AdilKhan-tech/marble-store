"use client";
import { useEffect } from "react";
import Chart from "chart.js/auto";

export default function Piechart() {
  useEffect(() => {
    new Chart(document.getElementById("chartjs-doughnut"), {
      type: "doughnut",
      data: {
        labels: ["Completed", "New Order", "Pending"],
        datasets: [{
          data: [60, 125, 54, 146],
          backgroundColor: ["#0d6efd","#198754","#ffc107","#dee2e6"]
        }]
      },
      options: { cutout: "65%" }
    });
  }, []);

  return <div className="col-md-6">
    <canvas id="chartjs-doughnut" style={{ width: "180px", height: "180px" }}></canvas>
  </div>;
}
