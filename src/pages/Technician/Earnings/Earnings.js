import { SlCalender } from "react-icons/sl";
import { PiChartLineUpLight } from "react-icons/pi";
import { MdPendingActions } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Earnings = () => {
  const earningsData = [
    { label: "Month", value: "4,580", sub: "23 jobs completed", bgColor: "#f0f6ff", icon: <SlCalender size={20} color="#2B7FFF" />, iconColor: "#AFD7FC"},
    { label: "Average/Job", value: "95", sub: "per job completed", bgColor: "#fff0f3", icon: <PiChartLineUpLight size={20} color="#B81B23" />, iconColor: "#F0BBBE"},
    { label: "Pending", value: "360", sub: "Awaiting payment", bgColor: "#fff9e6", icon: <MdPendingActions size={20} color="#D19527" />, iconColor: "#F3DEB8"},
  ];

  const paymentHistory = [
    { id: "J-2001", category: "Repair & Maintenance", name: "AC Installation", date: "2025-10-30", jobs: "3 Jobs", earned: "285 INR", status: "Paid" },
    { id: "J-2002", category: "Electrical", name: "Wiring", date: "2025-10-29", jobs: "1 Job", earned: "120 INR", status: "Paid" },
    { id: "J-2003", category: "Appliance", name: "Refrigerator Repair", date: "2025-10-28", jobs: "2 Jobs", earned: "260 INR", status: "Paid" },
    { id: "J-2003", category: "Appliance", name: "Refrigerator Repair", date: "2025-10-28", jobs: "2 Jobs", earned: "260 INR", status: "Paid" },
  ];

  return (
    <div className="technician-earnings-overall-container">
      <h2>Earnings</h2>
      <p className="text-muted">Track your income and payment history</p>

      <div className="technician-earnings-summary-cards">
        {earningsData.map((item, index) => (
          <div key={index} className="technician-earnings-card-container"
          style={{ backgroundColor: `${item.bgColor}` }}>
            <div className="technician-earnings-card-header">
              <span className="label">{item.label}</span>
              <span className="icon" style={{ backgroundColor: `${item.iconColor}` }}>{item.icon}</span>
            </div>
            <h2>{item.value} <small>INR</small></h2>
            <p>{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="technician-earnings-breakdown">
        <h3 className="fw-bold">October 2025 Breakdown</h3>
        <table>
          <tbody>
            <tr>
              <td>Total Jobs</td>
              <td className="text-end">23</td>
            </tr>
            <tr>
              <td>Total Earnings</td>
              <td className="text-end text-danger">4,580 INR</td>
            </tr>
            <tr>
              <td>Net Earnings</td>
              <td className="text-end text-success">4,122 INR</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="technician-earnings-payment-history">
        <h3 className="fw-bold mb-3">Payment History</h3>
        <TableContainer
                  sx={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                    height: "220px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  <Table
              stickyHeader
              sx={{
                width: "100%",
                border: "1px solid #DBDBDB",
                "& thead": {
                  backgroundColor: "#2fb972",
                },
                "& thead th": {
                  backgroundColor: "#2fb972",
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
                        <TableCell>Job ID</TableCell>
                        <TableCell>Service Category</TableCell>
                        <TableCell>Service Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Jobs Completed</TableCell>
                        <TableCell>Amount Earned</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {paymentHistory.map((job, index) => (
                     <TableRow key={index}>
                  <TableCell><div className="technician-earnings-job-id">{job.id}</div></TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>{job.jobs}</TableCell>
                  <TableCell>{job.earned}</TableCell>
                  <TableCell><span className={`technician-earnings-status ${job.status.toLowerCase()}`}>{job.status}</span></TableCell>
                </TableRow>))}
                    </TableBody>
                  </Table>
                </TableContainer>
      </div>
    </div>
  );
};

export default Earnings;
