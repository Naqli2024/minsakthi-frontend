import React, { useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

const Employees = () => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
        <div className="admin-customers-overall-content">
      <h2>Employees</h2>
      <p>Employees: 25</p>
      <div className="admin-customer-search-filter">
        <FormGroup className="col-md-7">
          <InputGroup>
            <InputGroup.Text
              style={{
                background: "none",
                borderRight: "none",
                padding: "0",
              }}
            >
              <IoSearchOutline className="ms-3" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, role, department..."
              style={{ borderLeft: "none", height: "40px", boxShadow: "none" }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #DBDBDB";
                e.target.style.borderLeft = "none";
              }}
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <Form.Group className="col-md-2">
          <Form.Select name="status" className="custom-textfield">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-2">
          <Form.Select name="status" className="custom-textfield">
            <option>Department</option>
            <option>Electrical</option>
            <option>Solar</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="admin-customers-table mt-5">
        <TableContainer
          sx={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            overflow: "hidden",
            height: "570px",
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <Table
            sx={{
              width: "100%",
              border: "1px solid #DBDBDB",
              "& thead": {
                backgroundColor: "#2fb972",
              },
              "& thead th": {
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
              },
              "& tbody td": {
                textAlign: "center",
              },
              "& tbody tr:last-child td": {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Emp ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Work Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="id-link">
                    T-1234
                  </div>
                </TableCell>
                <TableCell>Rajesh</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Electrical</TableCell>
                <TableCell>9876543212</TableCell>
                <TableCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <MdOutlineStar color="#FFDF00" size={20} />5
                  </div>
                </TableCell>
                <TableCell sx={{ color: "green" }}>Active</TableCell>
                <TableCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <MdModeEdit size={20} color="#2fb972" cursor={"Pointer"} />
                    <MdDelete size={20} color="red" cursor={"Pointer"} />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="id-link">
                    T-1234
                  </div>
                </TableCell>
                <TableCell>Raj</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Electrical</TableCell>
                <TableCell>9876543212</TableCell>
                <TableCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <MdOutlineStar color="#FFDF00" size={20} />5
                  </div>
                </TableCell>
                <TableCell sx={{ color: "red" }}>Pending</TableCell>
                <TableCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <MdModeEdit size={20} color="#2fb972" cursor={"Pointer"} />
                    <MdDelete size={20} color="red" cursor={"Pointer"} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Employees