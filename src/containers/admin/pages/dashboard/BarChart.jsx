import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Index from "../../../Index";

// Time period options
const TIME_PERIODS = [
  { label: "Last 1 week", value: "WEEK" },
  { label: "Last 1 month", value: "MONTH" },
    { label: "1 year", value: "YEAR" }
];
const BarChart = ({title="", chartData = {}, fetchData }) => {
  // State for selected time period and chart data
  const [selectedPeriod, setSelectedPeriod] = useState("MONTH");
  const [loading, setLoading] = useState(false);
  // Handle dropdown change
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Generate mock data for user registrations
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        await fetchData(selectedPeriod);
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, [selectedPeriod]);

  // Chart options
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: "70%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: (val) => Number.isInteger(val) ? val : '',
        style: {
          fontSize: "12px",
        },
      },
      tickAmount: Math.max(...(chartData.series || [0])), // optional but helps control number of ticks
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical", // You can experiment with vertical too
        shadeIntensity: 0.5,
        gradientToColors: ["#671869"], // The second color in your gradient
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ["#ed2525"], // Base color to start the gradient
    grid: {
      borderColor: "#f5f5f5",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Registrations",
      data: chartData.series,
    },
  ];
  
  return (
    <Index.Box sx={{ maxWidth: "100%" }}>
      <Index.Box className="admin-page-title-flex admin-page-title-main section-main">
        <Index.Typography
          className="admin-page-title"
          component="h2"
          variant="h2"
        >
          {title}
        </Index.Typography>
        <Index.Box style={{ display: "flex", gap: "10px" }}>
          <Index.Box className="admin-input-box filter-input">
            <Index.Box className="admin-form-group">
              <Index.Box className="admin-dropdown-box filter-box">
                <Index.FormControl className="admin-form-control">
                  <Index.Select
                    className="admin-dropdown-select"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={{
                      PaperProps: {
                        className: "form-select-field",
                      },
                    }}
                  >
                    {TIME_PERIODS.map((obj) => (
                      <Index.MenuItem
                        key={obj.value}
                        value={obj.value}
                        className="admin-menuitem"
                      >
                        {obj.label}
                      </Index.MenuItem>
                    ))}
                  </Index.Select>
                </Index.FormControl>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box sx={{ height: 400, width: "100%" }}>
        <Chart options={options} series={series} type="bar" height={400} />
      </Index.Box>
    </Index.Box>
  );
};

export default BarChart;
