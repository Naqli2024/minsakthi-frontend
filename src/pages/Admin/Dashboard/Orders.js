import React, { useState, useRef, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import Box from "@mui/material/Box";

const Orders = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const ongoingOrderData = [
    { month: "Jan", value: 2 },
    { month: "Feb", value: 5.5 },
    { month: "Mar", value: 2 },
    { month: "Apr", value: 8.5 },
    { month: "May", value: 1.5 },
    { month: "Jun", value: 5 },
    { month: "Jul", value: 3 },
    { month: "Aug", value: 4 },
    { month: "Sep", value: 2 },
    { month: "Oct", value: 5 },
    { month: "Nov", value: 7 },
    { month: "Dec", value: 8 },
  ];

  // ✅ Responsive chart width handling
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(700);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries[0]) {
        setChartWidth(entries[0].contentRect.width);
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className="revenue-section">
      <h2 className="fw-bold mb-3">Ongoing Orders</h2>
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
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "15ch",
                },
              },
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
            dataset={ongoingOrderData}
            xAxis={[
              {
                dataKey: "month",
                scaleType: "band",
                label: `${selectedTimeOption}`,
                labelStyle: { fill: "#1e88e5", fontWeight: 600 },
              },
            ]}
            yAxis={[
              { valueFormatter: (v) => v, tickMinStep: 1, position: "left" },
            ]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5, 3, 2, 4, 7, 8, 5],
                area: true,
              },
            ]}
            height={300}
            width={chartWidth} 
          />
        </Box>
      </div>
    </div>
  );
};

export default Orders;
