import React from "react";
import Index from "../../../Index";
import Chart from "react-apexcharts";

const CustomPieChart = ({ title, data, legendPosition = "bottom" }) => {

  // Prepare series and labels for ApexCharts Pie chart
  const series = data.map(item => item.value);
  const labels = data.map(item => item.label);
  const colors = data.map(item => item.color);

  // Options for ApexCharts Pie chart
  const options = {
    chart: {
      type: "pie",
    },
    labels: labels,
    // colors: colors,
    theme: {
      monochrome: {
        enabled: true,
        color: '#F44336',
        shadeTo: 'dark',
        shadeIntensity: 0.75
      }
    },
    legend: {
      position: legendPosition, // Positioning the labels at the bottom
      horizontalAlign: "center",  // Centering the legend horizontally
      fontSize: "14px",  // Adjusting the font size for better readability
      markers: {
        width: 10,  // Adjusting the size of the legend markers (color dots)
        height: 10,
        radius: 10,
      },
      formatter: function (seriesName, opts) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}: ${value}`; // Append count to legend
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (value) => `${value}`, // Formatting tooltip to show the values
      },
    },
  };

  return (
    <Index.Box sx={{ maxWidth: "100%" }} className="pie-chart-box">
          <Index.Box className="admin-page-title-flex admin-page-title-main section-main">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              {title}
            </Index.Typography>
    </Index.Box>
    {data?.length ? (
      <Index.Box className="admin-pie-chart-box"  >
        <Chart options={options} series={series} type="pie" width={500} height={300} />
      </Index.Box>
    ) : (
      <Index.Typography textAlign="center">
        No data available for {title?.toLowerCase()}
      </Index.Typography> 
    )}
    </Index.Box>
  );
};

export default CustomPieChart;
