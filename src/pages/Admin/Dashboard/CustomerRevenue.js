import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";

const CustomerRevenue = () => {
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] = React.useState("All Time");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dataset = [
    { date: new Date(2020, 0, 1), home: 40000, industry: 38000 },
    { date: new Date(2021, 0, 1), home: 42000, industry: 40000 },
    { date: new Date(2022, 0, 1), home: 46000, industry: 43000 },
    { date: new Date(2023, 0, 1), home: 49000, industry: 46000 },
    { date: new Date(2024, 0, 1), home: 52000, industry: 49000 },
  ];

  return (
    <div
      className="growth-section"
      style={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <h2 className="fw-bold mb-3">Customer Revenue Categories</h2>

      <div
        className="customer-revenue-card"
        style={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: "12px",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="admin-filter"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "8px",
          }}
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
              <div className="admin-filter-text fw-bold">{selectedTimeOption}</div>
              <div className="admin-filter-icon">
                <RiEqualizerLine size={15} />
              </div>
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

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "auto",
            }}
          >
            <LineChart
              dataset={dataset}
              xAxis={[
                {
                  id: "Years",
                  dataKey: "date",
                  scaleType: "time",
                  valueFormatter: (date) => date.getFullYear().toString(),
                },
              ]}
              yAxis={[{ width: 70 }]}
              series={[
                {
                  id: "Home",
                  label: "Home",
                  dataKey: "home",
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: "Industry",
                  label: "Industry",
                  dataKey: "industry",
                  stack: "total",
                  area: true,
                  showMark: false,
                },
              ]}
              experimentalFeatures={{ preferStrictDomainInLineCharts: true }}
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
              }}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRevenue;
