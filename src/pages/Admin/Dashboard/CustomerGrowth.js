import React, { useState, useRef, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import Box from "@mui/material/Box";

const CustomerGrowth = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const customerGrowthData = [
    { month: "Jan", customers: 1200 },
    { month: "Feb", customers: 1800 },
    { month: "Mar", customers: 2600 },
    { month: "Apr", customers: 3400 },
    { month: "May", customers: 4200 },
    { month: "Jun", customers: 5200 },
    { month: "Jul", customers: 6000 },
    { month: "Aug", customers: 7500 },
    { month: "Sep", customers: 8800 },
    { month: "Oct", customers: 10200 },
    { month: "Nov", customers: 11800 },
    { month: "Dec", customers: 13000 },
  ];

  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(700);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      setChartWidth(entries[0].contentRect.width);
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className="growth-section">
      <h2 className="fw-bold mb-3">Customer Growth Trend</h2>
      <div className="admin-revenue-card" ref={containerRef}>
        <div className="admin-filter">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="admin-filter-icon">
              <RiEqualizerLine size={15} />
            </div>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{ "aria-labelledby": "long-button" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "15ch" } },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === selectedTimeOption}
                onClick={() => {
                  setSelectedTimeOption(option);
                  handleClose();
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <Box sx={{ width: "100%" }}>
          <LineChart
            dataset={customerGrowthData}
            xAxis={[
              {
                dataKey: "month",
                scaleType: "band",
                label: `${selectedTimeOption}`,
                labelStyle: { fill: "#1e88e5", fontWeight: 600 },
              },
            ]}
            yAxis={[
              { valueFormatter: (v) => v / 1000, tickMinStep: 500, position: "left" },
            ]}
            series={[
              {
                dataKey: "customers",
                label: "New Customers",
                color: "#2FB972",
                area: true,
                curve: "linear",
                showMark: true,
              },
            ]}
            tooltip={{ trigger: "item", valueFormatter: (v) => `${v} new customers` }}
            width={chartWidth} 
            height={350}
            grid={{ vertical: true, horizontal: true }}
          />
        </Box>
      </div>
    </div>
  );
};

export default CustomerGrowth;
