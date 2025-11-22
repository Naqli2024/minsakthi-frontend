import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { ImWrench } from "react-icons/im";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { Star, Bell, Wrench, CheckCircle, Briefcase } from "lucide-react";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";

const TechnicianDashboard = () => {
  const jobStats = [
    {
      title: "Assigned Jobs",
      value: 12,
      color: "#ffe4e6",
      icon: <BsFillFileBarGraphFill size={20} color="white" />,
      iconColor: "#FA5A7D",
    },
    {
      title: "Ongoing Jobs",
      value: 8,
      color: "#fff7ed",
      icon: <ImWrench size={20} color="white" />,
      iconColor: "#FF947A",
    },
    {
      title: "Completed Jobs",
      value: 42,
      color: "#dcfce7",
      icon: <IoCheckmarkCircleOutline size={20} color="white" />,
      iconColor: "#3CD856",
    },
    {
      title: "Earnings This Month",
      value: "₹17,000",
      color: "#ede9fe",
      icon: <MdOutlinePayments size={20} color="white" />,
      iconColor: "#BF83FF",
    },
  ];

  const chartData = [
    { name: "Mon", completionRate: 3, responseTime: 5 },
    { name: "Tue", completionRate: 6, responseTime: 4 },
    { name: "Wed", completionRate: 8, responseTime: 6 },
    { name: "Thu", completionRate: 10, responseTime: 5 },
    { name: "Fri", completionRate: 9, responseTime: 7 },
    { name: "Sat", completionRate: 7, responseTime: 4 },
    { name: "Sun", completionRate: 5, responseTime: 6 },
  ];

  const recentJobs = [
    {
      id: "JOB ID 001",
      customer: "Rajesh",
      service: "AC Service",
      status: "Ongoing",
      scheduled: "July 25, 2025",
      priority: "High",
    },
    {
      id: "JOB ID 002",
      customer: "Rajesh",
      service: "AC Service",
      status: "Completed",
      scheduled: "July 26, 2025",
      priority: "Medium",
    },
    {
      id: "JOB ID 003",
      customer: "Rajesh",
      service: "AC Service",
      status: "Assigned",
      scheduled: "July 26, 2025",
      priority: "Low",
    },
  ];

  const notifications = [
    "New job assigned for tomorrow at 10:00 AM",
    "Job #123 completed successfully",
    "New job assigned for tomorrow at 10:00 AM",
  ];

  return (
    <div className="technician-dashboard-container">
      <div className="technician-dashboard-header">
        <h2>Welcome back, Johnson</h2>
        <p>Here's what's happening with your jobs today.</p>
      </div>
      <div className="technician-dashboard-summary-cards">
        {jobStats.map((stat, index) => (
          <div
            key={index}
            className="technician-dashboard-card"
            style={{ backgroundColor: `${stat.color}` }}
          >
            <div>
              <p className="technician-dashboard-card-title">{stat.title}</p>
              <h3 className="technician-dashboard-card-value">{stat.value}</h3>
            </div>
            <div
              className="technician-dashboard-card-icon"
              style={{ backgroundColor: `${stat.iconColor}` }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="technician-dashboard-charts-section">
        <div className="technician-dashboard-chart-card">
          <h3 className="fw-bold">Job Completion Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar
                dataKey="completionRate"
                fill="#00A63E"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="responseTime"
                fill="#1B61FC"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="col-md-6 technician-dashboard-comp-rate">
              <div>
                <BsGraphUpArrow color="#00A63E" size={20} />
              </div>
              <div>
                <p className="mb-1">Avg Completion Rate</p>
                <p className="mb-0 text-success">96%</p>
              </div>
            </div>
            <div className="col-md-6 technician-dashboard-resp-rate">
              <div>
                <MdAccessTime color="#1B61FC" size={20} />
              </div>
              <div>
                <p className="mb-1">Avg Response Time</p>
                <p className="mb-0 text-primary">1.2 hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="technician-dashboard-performance-card">
          <h3 className="fw-bold">Performance Overview</h3>
          <div className="technician-dashboard-progress-section">
            <p className="technician-dashboard-subtext mb-0">
              Performance score
            </p>
            <p className="technician-dashboard-progress-percent mb-0">
              82 / 100
            </p>
            <div className="technician-dashboard-progress-bar">
              <div
                className="technician-dashboard-progress-fill"
                style={{ width: "42%" }}
              ></div>
            </div>
          </div>

          <p className="d-flex justify-content-between mt-3 mb-0">
            <span>Customer Rating</span>
            <div>
              <Star fill="#FFD700" stroke="none" className="me-1" />
              4.8
            </div>
          </p>
          <div className="technician-dashboard-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="#FFD700" stroke="none" />
            ))}
          </div>

          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis axisLine={false} tickLine={false} tick={false} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="completionRate"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Job Completion Rate"
              />

              <Line
                type="monotone"
                dataKey="responseTime"
                stroke="#007DD6"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Avg Response Time"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="d-flex justify-content-between">
            <div>
              <p className="d-flex align-items-center">
                <div className="technician-dashboard-total-job"></div>Total Jobs
              </p>
              <p>62</p>
            </div>
            <div>
              <p className="d-flex align-items-center">
                <div className="technician-dashboard-active-week"></div>Active
                this Week
              </p>
              <p>20</p>
            </div>
          </div>
        </div>
      </div>

      <div className="technician-dashboard-bottom-section">
        <div className="technician-dashboard-recent-jobs">
          <h3 className="fw-bold mb-3">Recent Jobs</h3>
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Status</th>
                <th>Scheduled</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job, i) => (
                <tr key={i}>
                  <td className="technician-dashboard-job-id">{job.id}</td>
                  <td>{job.customer}</td>
                  <td>{job.service}</td>
                  <td>
                    <div
                      className={`technician-dashboard-status ${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </div>
                  </td>
                  <td>{job.scheduled}</td>
                  <td>
                    <div
                      className={`technician-dashboard-priority ${job.priority.toLowerCase()}`}
                    >
                      {job.priority}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="technician-dashboard-notifications">
          <h3 className="fw-bold mb-3">
            <Bell /> Recent Notifications
          </h3>
          <ul>
            {notifications.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
