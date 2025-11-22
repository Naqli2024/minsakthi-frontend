import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBookUser } from "react-icons/lu";
import { MdOutlineElectricalServices } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";

export const adminItems = [
  {
    item: "Dashboard",
    path: "dashboard",
    icon: <MdOutlineDashboard size={20} />,
  },
  {
    item: "User",
    path: "user",
    icon: <LuBookUser size={20} />,
    subItem: [
      {
        item: "Customers",
        path: "customers",
      },
      {
        item: "Technicians",
        path: "technicians",
      },
      {
        item: "Employees",
        path: "employees",
      },
    ],
  },
  {
    item: "Services",
    path: "services",
    icon: <MdOutlineElectricalServices size={20} />,
    subItem: [
      {
        item: "Orders",
        path: "orders",
      },
      {
        item: "List of Services",
        path: "service-list",
      },
      {
        item: "Process List",
        path: "process-list",
      },
      {
        item: "Service SOP",
        path: "service-sop",
      },
      {
        item: "Service BOM",
        path: "service-bom",
      },
      {
        item: "Schedule",
        path: "schedule",
      },
    ],
  },
  {
    item: "Payment & Transactions",
    path: "payment-transactions",
    icon: <MdOutlinePayments size={20} />,
  },
  {
    item: "Reports",
    path: "reports",
    icon: <MdOutlineReportGmailerrorred size={20} />,
  },
  {
    item: "Support Tickets",
    path: "support-tickets",
    icon: <MdOutlineContactSupport size={20} />,
  },
  { item: "Settings", path: "settings", icon: <IoSettingsOutline size={20} /> },
  {
    item: "Help & Support",
    path: "help-support",
    icon: <IoMdHelpCircleOutline size={20} />,
  },
];
