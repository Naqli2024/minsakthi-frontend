import React from "react";

const Overview = () => {
  const overviewData = [
    {
      name: "Total Revenue",
      amount: `\u20B9120,000`,
      color: "#EDEEFC",
    },
    {
      name: "Actioners Earnings",
      amount: `\u20B9120,000`,
      color: "#E6F1FD",
    },
    {
      name: "Admin Commissions",
      amount: `\u20B9120,000`,
      color: "#EDEEFC",
    },
    {
      name: "Pending Payments",
      amount: `\u20B9120,000`,
      color: "#E6F1FD",
    },
    {
      name: "Pending Payouts",
      amount: `\u20B9120,000`,
      color: "#EDEEFC",
    },
  ];

  return (
    <div>
      <h2 className="fw-bold mb-3">Overview</h2>
      <div className="admin-dashboard-overview-outer">
        <div className="admin-dashboard-overview">
          {overviewData.map((overviewData) => (
            <div
              className="admin-overview-card"
              style={{ background: overviewData.color }}
            >
              <p className="mb-2">{overviewData.name}</p>
              <p className="fw-bold">{overviewData.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
