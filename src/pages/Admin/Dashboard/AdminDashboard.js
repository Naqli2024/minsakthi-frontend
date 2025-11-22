import Overview from "./Overview";
import RevenueByService from "./RevenueByService";
import CustomerGrowth from "./CustomerGrowth";
import Orders from "./Orders";
import Actioners from "./Actioners";
import CustomerSegment from "./CustomerSegment";
import CustomerRevenue from "./CustomerRevenue";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-content">
      <Overview/>
      <div className="admin-dashboard-revenue-breakdown">
        <RevenueByService/>
        <CustomerGrowth/>
      </div>
      <div className="admin-dashboard-revenue-breakdown">
        <Orders/>
        <Actioners/>
      </div>
      <div className="admin-dashboard-revenue-breakdown">
        <CustomerSegment/>
        <CustomerRevenue/>
      </div>
    </div>
  );
};

export default AdminDashboard;