import React, { useState, useRef, useEffect } from "react";
import { Form, ProgressBar } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiEqualizerLine } from "react-icons/ri";
import Box from "@mui/material/Box";

const Actioners = () => {
  const [selectedActioner, setSelectedActioner] = useState("providers");
  const options = ["All Time", "Monthly", "This Week", "This year"];
  const ITEM_HEIGHT = 48;
  const [selectedTimeOption, setSelectedTimeOption] = useState("All Time");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const top3Providers = [
    { name: "Provider A", services: "Electrical", revenue: "45", color: "#0095FF", fillColor: "#F0F9FF" },
    { name: "Provider B", services: "Electrical", revenue: "30", color: "#00E096", fillColor: "#F0FDF4" },
    { name: "Provider C", services: "Electrical", revenue: "60", color: "#884DFF", fillColor: "#FBF1FF" },
  ];

  const top3Technicians = [
    { name: "Technician A", time: "23 hours", revenue: "45", color: "#0095FF", fillColor: "#F0F9FF" },
    { name: "Technician B", time: "23 hours", revenue: "30", color: "#00E096", fillColor: "#F0FDF4" },
    { name: "Technician C", time: "23 hours", revenue: "60", color: "#884DFF", fillColor: "#FBF1FF" },
  ];

  const dataToShow = selectedActioner === "providers" ? top3Providers : top3Technicians;

  // ✅ Responsive width management
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(700);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries[0]) setCardWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className="growth-section">
      <h2 className="fw-bold mb-3">Actioners</h2>
      <div className="admin-top3-actioners-card" ref={containerRef}>
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
              paper: {
                style: { maxHeight: ITEM_HEIGHT * 4.5, width: "15ch" },
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

        <Form.Group className="p-3 col-md-6">
          <Form.Select
            value={selectedActioner}
            onChange={(e) => setSelectedActioner(e.target.value)}
            className="drop-control"
            style={{
              border: "none",
              boxShadow: "none",
              outline: "none",
              backgroundColor: "#fff",
            }}
          >
            <option value="providers">Top 3 Providers by Category Revenue</option>
            <option value="technicians">Top 3 Technicians by Revenue</option>
          </Form.Select>
        </Form.Group>

        <Box sx={{ width: "100%", overflowX: "hidden" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }} elevation={0}>
            <Table
              sx={{
                width: "100%",
                tableLayout: "fixed",
                wordWrap: "break-word",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#96A5B8", fontSize: "13px" }}>#</TableCell>
                  <TableCell align="center" sx={{ color: "#96A5B8", fontSize: "13px" }}>Name</TableCell>
                  <TableCell align="center" sx={{ color: "#96A5B8", fontSize: "13px" }}>
                    {selectedActioner === "providers" ? "Services" : "Time"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#96A5B8", fontSize: "13px" }}>Revenue</TableCell>
                  <TableCell align="center" sx={{ color: "#96A5B8", fontSize: "13px" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataToShow.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center" sx={{ fontSize: "13px" }}>{index + 1}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "13px" }}>{row.name}</TableCell>
                    <TableCell align="center" sx={{ fontSize: "13px" }}>
                      {selectedActioner === "providers" ? row.services : row.time}
                    </TableCell>
                    <TableCell align="center">
                      <ProgressBar
                        now={row.revenue}
                        style={{ height: "5px", borderRadius: "8px" }}
                        variant={row.color}
                      >
                        <div
                          style={{
                            width: `${row.revenue}%`,
                            backgroundColor: row.color,
                            height: "5px",
                            borderRadius: "8px",
                          }}
                        />
                      </ProgressBar>
                    </TableCell>
                    <TableCell align="right">
                      <div
                        className="top3-provider-percent"
                        style={{
                          border: `1px solid ${row.color}`,
                          background: row.fillColor,
                          borderRadius: "4px",
                          textAlign: "center",
                          padding: "2px 4px",
                          fontSize: "12px",
                        }}
                      >
                        {row.revenue}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <div className="admin-filter-text fw-bold mt-4">{selectedTimeOption}</div>
      </div>
    </div>
  );
};

export default Actioners;
