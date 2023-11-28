import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import apiService from '../services/apiService';
import '../../styles/BudgetChart.css';

function BudgetChart({ token }) {
  const canvasRef = useRef(null);
  const pieCanvasRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState([]);
  const [budgetCapacity, setBudgetCapacity] = useState([]);

  useEffect(() => {
    const fetchDataAndCharts = async () => {
      try {
        const budgetEndpoint = selectedMonth
          ? `/budgets/getAllBudgets/${selectedMonth}`
          : '/budgets/getAllBudgets';
  
        const capacityEndpoint = '/budgets/capacity';
  
        const [budgetResponse, capacityResponse] = await Promise.all([
          apiService.get(budgetEndpoint, token, {
            params: { month: parseInt(selectedMonth, 10) },
          }),
          apiService.get(capacityEndpoint, token),
        ]);
  
        const budgetData = budgetResponse.data || [];
        const capacityData = capacityResponse.data || [];
  
        setBudgetData(budgetData);
        setBudgetCapacity(capacityData);
        setLoading(false);
  
        // Call the chart creation functions after fetching data
        createBarChart();
        createPieChart();
        drawAdditionalCircle();
        drawSecondCircle();
      } catch (error) {
        console.error('Error fetching budget data: ', error);
        setLoading(false);
      }
    };
  
    fetchDataAndCharts();
  }, [token, selectedMonth]);
  

  useEffect(() => {
    if (!loading && budgetData.length > 0 && budgetCapacity.length > 0) {
      createBarChart();
      createPieChart();
      drawAdditionalCircle();
      drawSecondCircle();
    }
  }, [loading, budgetData, budgetCapacity]);

  const createBarChart = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context for canvas');
      return;
    }

    try {
      if (canvas.chart) {
        canvas.chart.destroy();
      }

      const combinedData = budgetData.map(dataItem => {
        const matchingCapacity = budgetCapacity.find(capacityItem => capacityItem.budgetname === dataItem.budgetname);
        return {
          budgetname: dataItem.budgetname,
          actualExpenditure: dataItem.budgetnumber,
          budgetCapacity: matchingCapacity ? matchingCapacity.budgetnumber : null,
        };
      });

      const chartData = {
        labels: combinedData.map(item => item.budgetname),
        datasets: [
          {
            label: 'Actual Expenditure',
            backgroundColor: '#ff6384',
            data: combinedData.map(item => item.actualExpenditure),
          },
          {
            label: 'Budget Capacity',
            backgroundColor: '#36a2eb',
            data: combinedData.map(item => item.budgetCapacity),
          },
        ],
      };

      console.log('barChartData:', chartData);

      canvas.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            x: { stacked: false },
            y: { stacked: false },
          },
        },
      });
    } catch (error) {
      console.error('Error creating bar chart: ', error);
    }
  };

  const createPieChart = () => {
    const pieCanvas = pieCanvasRef.current;

    if (!pieCanvas) {
      console.error('Pie Canvas element not found');
      return;
    }

    const pieCtx = pieCanvas.getContext('2d');
    if (!pieCtx) {
      console.error('Unable to get 2D context for pie canvas');
      return;
    }

    try {
      if (pieCanvas.chart) {
        pieCanvas.chart.destroy();
      }

      const combinedData = budgetData.map(dataItem => {
        const matchingCapacity = budgetCapacity.find(capacityItem => capacityItem.budgetname === dataItem.budgetname);
        return {
          budgetname: dataItem.budgetname,
          actualExpenditure: dataItem.budgetnumber,
          budgetCapacity: matchingCapacity ? matchingCapacity.budgetnumber : null,
        };
      });

      const pieData = combinedData.map((item, index) => {
        const actualExpenditure = item.actualExpenditure || 0;
        const budgetCapacity = item.budgetCapacity || 0;
        const remainingBudget = budgetCapacity - actualExpenditure;

        const backgroundColors = [
          '#ff6384', '#36a2eb', '#ff9f40', '#4bc0c0', '#9966ff', '#ffcc66', '#6666ff', '#99ff66', '#ff6666', '#66ccff',
          '#ffcc99', '#cc66ff', '#33cc33', '#6666cc', '#cc6666', '#99ccff', '#ff6666', '#66ccff', '#ffcc99', '#cc66ff'
        ];

        return {
          label: item.budgetname,
          data: [actualExpenditure, remainingBudget],
          backgroundColor: backgroundColors[index % backgroundColors.length],
        };
      });

      console.log('pieChartData:', pieData);

      pieCanvas.chart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: pieData.map(item => item.label),
          datasets: [{
            data: pieData.map(item => item.data[0]),
            backgroundColor: pieData.map(item => item.backgroundColor),
          }],
        },
      });
    } catch (error) {
      console.error('Error creating pie chart: ', error);
    }
  };

  const drawAdditionalCircle = () => {
    console.log('Drawing additional circle'); // Add this line for debugging
  
    const pieCanvas = pieCanvasRef.current;
  
    if (!pieCanvas) {
      console.error('Pie Canvas element not found');
      return;
    }
  
    const pieCtx = pieCanvas.getContext('2d');
    if (!pieCtx) {
      console.error('Unable to get 2D context for pie canvas');
      return;
    }
  
    try {
      const centerX = pieCanvas.width / 2;
      const centerY = pieCanvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8; // Adjust the multiplier based on your preference
  
      // Draw the outer circle
      pieCtx.beginPath();
      pieCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      pieCtx.strokeStyle = 'red'; // Change the color to something distinct
      pieCtx.lineWidth = 2;
      pieCtx.stroke();
      pieCtx.closePath();
    } catch (error) {
      console.error('Error drawing additional circle: ', error);
    }
  };

  const drawSecondCircle = () => {
    const pieCanvas = pieCanvasRef.current;

    if (!pieCanvas) {
      console.error('Pie Canvas element not found');
      return;
    }

    const pieCtx = pieCanvas.getContext('2d');
    if (!pieCtx) {
      console.error('Unable to get 2D context for pie canvas');
      return;
    }

    try {
      const centerX = pieCanvas.width / 2;
      const centerY = pieCanvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.6; // Adjust the multiplier based on your preference

      pieCtx.beginPath();
      pieCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      pieCtx.strokeStyle = 'green'; // Change the color as needed
      pieCtx.lineWidth = 2; // Change the line width as needed
      pieCtx.stroke();
      pieCtx.closePath();
    } catch (error) {
      console.error('Error drawing second circle: ', error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="budget-chart">
      <h3>Budget Chart</h3>
      <label>
        Select Month:
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {budgetData.length > 0 && budgetCapacity.length > 0 ? (
            <>
              <canvas className="budget-canvas" ref={canvasRef}></canvas>
              <h3>Pie Chart</h3>
              <canvas className="budget-pie-canvas" ref={pieCanvasRef}></canvas>
            </>
          ) : (
            <p>No budget data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BudgetChart;
