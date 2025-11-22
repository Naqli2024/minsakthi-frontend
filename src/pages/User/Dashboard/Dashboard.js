import React, { useState } from "react";
import { GiSpanner, GiConfirmed } from "react-icons/gi";
import { FaCalendarDay } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);

 


  const jobList = [
    {
      job: "Active Orders",
      num: "03",
      icon: GiSpanner,
      bg: "#d8ffe7",
      iconBg: "#41d363",
    },
    {
      job: "Completed",
      num: "12",
      icon: GiConfirmed,
      bg: "#ffe2e6",
      iconBg: "#ff5277",
    },
    {
      job: "Scheduled Visits",
      num: "1",
      icon: FaCalendarDay,
      bg: "#f1e8ff",
      iconBg: "#a155f8",
    },
    {
      job: "My Wallet",
      num: "₹ 0",
      icon: FaMoneyBills,
      bg: "#fff3d6",
      iconBg: "#e2a455",
    },
  ];

  const steps = [
    {
      label: "Booking Confirmed",
    },
    {
      label: "Technician Assigned",
    },
    {
      label: "Work Started",
    },
    {
      label: "Work Started",
    },
  ];

  return (
    <div className="dashboard-overall-container">
      <p className="title">Hello, Saravanan</p>
      <p className="subtitle">Here's your service summary at a glance.</p>

      <div className="job-field">
        {jobList.map((item, index) => (
          <div
            key={index}
            className="status-box"
            style={{ backgroundColor: item.bg }}
          >
            <div className="status-left">
              <p className="job-title">{item.job}</p>
              <p className="job-number">{item.num}</p>
            </div>

            <div
              className="icon-wrapper"
              style={{ backgroundColor: item.iconBg }}
            >
              <item.icon size={22} color="white" />
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-mid-content col-md-12 my-4">
        <div
          className="dashboard-mid-content-left col-md-9"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
          />
        </div>

        <div className="dashboard-mid-content-right col-md-3 p-5" style={{}}>
          <p className="fw-bold">Service Progress Timeline</p>
          <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                    
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p:3}}>
                <Typography>All steps completed — you're finished</Typography>

               
              </Paper>
            )}
          </Box>
        </div>
      </div>
      <div className="dashboard-end-content">
        <div className="dashboard-end-content-left col-md-5"></div>
        <div className="dashboard-end-content-center col-md-4"></div>
        <div className="dashboard-end-content-right col-md-3"></div>
      </div>
    </div>
  );
};
export default Dashboard;
