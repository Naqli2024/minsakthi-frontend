import React from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdModeEdit, MdDelete, MdAdd } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Schedule = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [openNewScheduleModal, setOpenNewScheduleModal] = useState(false);

  return (
    <div className="schedule-management-overall-container">
      <h1>Schedule Management</h1>
      <div className="d-flex align-items-center justify-content-between">
        <p className="text-muted fw-bold">Schedules: 5</p>
        <div>
          <button
            className="admin-pl-new-process-btn"
            onClick={() => setOpenNewScheduleModal(true)}
          >
            <MdAdd size={18} /> New Schedule
          </button>
        </div>
      </div>

      <div className="d-md-flex justify-content-between align-items-center gap-3 mt-3">
        <Form.Group className="col-md-3 mb-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by Service name, Order Id..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="col-md-3 mb-2">
          <InputGroup>
            <Form.Select
              value={technicianFilter}
              onChange={(e) => setTechnicianFilter(e.target.value)}
            >
              <option value="">Technician</option>
              <option>Technician 1</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>

        <Form.Group className="col-md-3 mb-2">
          <InputGroup>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option>Completed</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>

        <Form.Group className="col-md-2 mb-2">
          <InputGroup>
            <Form.Control type="date" />
          </InputGroup>
        </Form.Group>
      </div>
      <div className="d-md-flex justify-content-between align-items-center my-4">
        <div className="admin-schedule-toggle-btn mb-2">
          <p
            className={`${
              viewMode === "table" ? "active-view-btn" : "view-btn-text"
            }`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </p>
          <p
            className={`${
              viewMode === "calender" ? "active-view-btn" : "view-btn-text"
            }`}
            onClick={() => setViewMode("calender")}
          >
            Calendar View
          </p>
        </div>
        <div className="d-flex gap-3 admin-schedule-status-labels mb-2">
          <span>
            <span className="admin-schedule-legend scheduled"></span> Scheduled
          </span>
          <span>
            <span className="admin-schedule-legend progress"></span> In Progress
          </span>
          <span>
            <span className="admin-schedule-legend delayed"></span> Delayed
          </span>
          <span>
            <span className="admin-schedule-legend completed"></span> Completed
          </span>
        </div>
      </div>

      <div>
        {viewMode === "table" ? (
          <TableContainer
            sx={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              maxHeight: "450px",
              overflow: "auto",
            }}
          >
            <Table
              stickyHeader
              sx={{
                width: "100%",
                border: "1px solid #DBDBDB",
                "& thead": { backgroundColor: "#2fb972" },
                "& thead th": {
                  backgroundColor: "#2fb972",
                  color: "#fff",
                  fontWeight: 600,
                  textAlign: "center",
                },
                "& tbody td": { textAlign: "center" },
                "& tbody tr:last-child td": { borderBottom: "none" },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Service ID</TableCell>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Technician</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="id-link">S-2001</div>
                  </TableCell>
                  <TableCell>Ac Maintenance</TableCell>
                  <TableCell>Repair & maintenence</TableCell>
                  <TableCell>Rajesh</TableCell>
                  <TableCell>Chennai</TableCell>
                  <TableCell>19-11-2025</TableCell>
                  <TableCell>9.00 Am - 10.00 Am</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <MdModeEdit
                        size={20}
                        color="#2fb972"
                        style={{ cursor: "pointer" }}
                      />
                      <MdDelete
                        size={20}
                        color="red"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer
            sx={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              maxHeight: "450px",
              overflow: "auto",
            }}
          >
            <Table
              stickyHeader
              sx={{
                width: "100%",
                border: "1px solid #DBDBDB",
                borderCollapse: "collapse",
                "& thead": { backgroundColor: "#2fb972" },
                "& td": {
                  border: "1px solid #DBDBDB",
                  textAlign: "center",
                  fontWeight: "600",
                },
                "& tbody tr:last-child td": {
                  borderBottom: "1px solid #DBDBDB",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="d-flex gap-2 text-dark">
                      <div className="admin-schedule-days-btn admin-schedule-days-active">
                        Yesterday
                      </div>
                      <div className="admin-schedule-days-btn">Today</div>
                      <div className="admin-schedule-days-btn">Tomorrow</div>
                    </div>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <div className="fw-bold m-0 text-dark">
                      October 26 - November 01
                    </div>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <div className="d-flex justify-content-end gap-2 text-dark">
                      <div className="admin-schedule-days-btn admin-schedule-days-active">
                        Month
                      </div>
                      <div className="admin-schedule-days-btn">Week</div>
                      <div className="admin-schedule-days-btn">Day</div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>26 Sun</TableCell>
                  <TableCell>27 Mon</TableCell>
                  <TableCell>28 Tue</TableCell>
                  <TableCell>29 Wed</TableCell>
                  <TableCell>30 Thu</TableCell>
                  <TableCell>31 Fri</TableCell>
                  <TableCell>01 Sat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>08:00 AM</TableCell>
                  <TableCell></TableCell>
                  <TableCell rowSpan={2}>
                    <div className="admin-schedule-event event-red">
                      <strong>8:00 AM - 9:00 AM</strong>
                      <br />
                      AC Installation <br />
                      Rajesh <br />
                      ORD ID - 0001
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell rowSpan={2}>
                    <div className="admin-schedule-event event-green">
                      <strong>8:00 AM - 9:00 AM</strong>
                      <br />
                      AC Installation <br />
                      Rajesh <br />
                      ORD ID - 0001
                    </div>
                  </TableCell>
                  <TableCell rowSpan={2}>
                    <div className="admin-schedule-event event-orange">
                      <strong>8:00 AM - 9:00 AM</strong>
                      <br />
                      AC Installation <br />
                      Rajesh <br />
                      ORD ID - 0001
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell rowSpan={2}>
                    <div className="admin-schedule-event event-purple">
                      <strong>8:00 AM - 9:00 AM</strong>
                      <br />
                      AC Installation <br />
                      Rajesh <br />
                      ORD ID - 0001
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>09:00 AM</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10:00 AM</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Dialog
        open={openNewScheduleModal}
        onClose={() => setOpenNewScheduleModal(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "600px",
            maxWidth: "100vw",
            borderRadius: "10px",
            padding: "20px"
          },
        }}
      >
        <DialogContent>
          <div className="new-schedule-modal">
            <h1>Create New Schedule</h1>
            <p>Assign a technician for on-site service work</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Order ID</Form.Label>
              <InputGroup>
                <Form.Select>
                  <option value="">Select Order ID</option>
                  <option>1</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Assignment Type</Form.Label>
              <InputGroup>
                <Form.Select>
                  <option value="">Select Assignment Type</option>
                  <option>Manual Assignment</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-12 mb-3">
            <Form.Group>
              <Form.Label>Technician</Form.Label>
              <InputGroup>
                <Form.Select>
                  <option value="">Select Technician</option>
                  <option>1</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Start Date</Form.Label>
              <InputGroup>
                <Form.Control
              type="date"
            />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>End Date</Form.Label>
              <InputGroup>
                 <Form.Control
              type="date"
            />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Start Time</Form.Label>
              <InputGroup>
                <Form.Control
              type="time"
            />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>End Time</Form.Label>
              <InputGroup>
                 <Form.Control
              type="time"
            />
              </InputGroup>
            </Form.Group>
          </div>
          <div className="col-md-12 mb-2">
            <Form.Group>
              <Form.Label>Remarks / Notes</Form.Label>
              <InputGroup>
                <Form.Control
              type="text"
              row={3}
              as="textarea"
              placeholder="Add any special instructions or notes..."
            />
              </InputGroup>
            </Form.Group>
          </div>
        </DialogContent>
        <DialogActions className="d-md-flex align-items-center justify-content-center">
          <Button
            className="px-5"
            style={{ background: "white", color: "black",border: "1px solid #A1A1A1" }}
            onClick={() => setOpenNewScheduleModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="border-0 px-5"
            style={{ background: "#2fb972" }}
          >
            Create Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Schedule;
