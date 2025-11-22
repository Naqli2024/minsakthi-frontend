import React, { useState, useRef, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import Box from "@mui/material/Box";

const RevenueByService = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
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
    <div className="revenue-section">
      <h2 className="fw-bold mb-3">Revenue By Service</h2>
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
          <BarChart
            xAxis={[
              {
                data: [
                  "Electrical",
                  "Appliance",
                  "Solar",
                  "EB Complaints",
                  "Contract",
                ],
                scaleType: "band",
                label: `${selectedTimeOption}`,
                labelStyle: { fill: "#1e88e5", fontWeight: 600 },
              },
            ]}
            yAxis={[{ valueFormatter: (v) => `${v / 1000}k`, tickMinStep: 5000 }]}
            series={[
              {
                data: [5000, 10000, 15000, 20000, 25000],
                label: "Actioners Revenue",
                color: "#0095FF",
                labelPosition: "top",
              },
              {
                data: [3000, 8000, 12000, 18000, 22000],
                label: "Admin Revenue",
                color: "#00E096",
                labelPosition: "top",
              },
            ]}
            height={350}
            width={chartWidth} // numeric width for responsive chart
          />
        </Box>
      </div>
    </div>
  );
};

export default RevenueByService;
