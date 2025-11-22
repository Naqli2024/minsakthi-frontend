import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import { PieChart } from "@mui/x-charts";

const CustomerSegment = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartWidth, setChartWidth] = useState(300);
  const chartRef = useRef(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const parentWidth = chartRef.current.offsetWidth;
        setChartWidth(Math.max(Math.min(parentWidth - 40, 300), 200)); 
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customerSegmentationData = [
    { label: "Electrical Service", value: 20, color: "#986FFF" },
    { label: "Appliances Service", value: 40, color: "#B500E0" },
    { label: "Contract Service", value: 50, color: "#FAA081" },
    { label: "Solar Service", value: 30, color: "#5B93FF" },
    { label: "Eb Complaint", value: 60, color: "#8EDFAA" },
  ];

  return (
    <div className="revenue-section" style={{ width: "100%" }}>
      <h2 className="fw-bold mb-3">Customer Segmentation</h2>

      <div
        className="admin-revenue-card"
        ref={chartRef}
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <div
          className="admin-filter"
          style={{ alignSelf: "flex-end", marginBottom: "0.5rem" }}
        >
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="admin-filter-text fw-bold">
                {selectedTimeOption}
              </div>
              <div className="admin-filter-icon">
                <RiEqualizerLine size={15} />
              </div>
            </div>
          </IconButton>

          <Menu
            id="long-menu"
            MenuListProps={{ "aria-labelledby": "long-button" }}
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

        <PieChart
          width={chartWidth}
          height={chartWidth}
          margin={{ left: 0, right: 0, top: 20, bottom: 20 }}
          series={[
            {
              data: customerSegmentationData.map((d) => ({
                value: d.value,
                label: d.label,
                color: d.color,
              })),
              valueField: "value",
              argumentField: "label",
              colorField: "color",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomerSegment;
