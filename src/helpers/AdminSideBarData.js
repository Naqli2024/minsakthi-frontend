import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBookUser } from "react-icons/lu";
import { MdOutlineElectricalServices } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

export const adminItems = [
  {
    item: "dashboard",
    path: "dashboard",
    icon: <MdOutlineDashboard size={20} />,
  },
  {
    item: "user",
    path: "user",
    icon: <LuBookUser size={20} />,
    subItem: [
      {
        item: "customers",
        path: "customers",
      },
      {
        item: "technicians",
        path: "technicians",
      },
      {
        item: "employees",
        path: "employees",
      },
    ],
  },
  {
    item: "services",
    path: "services",
    icon: <MdOutlineElectricalServices size={20} />,
    subItem: [
      {
        item: "orders",
        path: "orders",
      },
      {
        item: "list_of_services",
        path: "service-list",
      },
      {
        item: "process_list",
        path: "process-list",
      },
      {
        item: "service_sop",
        path: "service-sop",
      },
      {
        item: "service_bom",
        path: "service-bom",
      },
      {
        item: "schedule",
        path: "schedule",
      },
    ],
  },
  {
    item: "payment_transactions",
    path: "payment-transactions",
    icon: <MdOutlinePayments size={20} />,
  },
  {
    item: "reports",
    path: "reports",
    icon: <MdOutlineReportGmailerrorred size={20} />,
  },
  {
    item: "support_tickets",
    path: "support-tickets",
    icon: <MdOutlineContactSupport size={20} />,
  },
  { item: "settings", path: "settings", icon: <IoSettingsOutline size={20} /> },
  {
    item: "help_support",
    path: "help-support",
    icon: <IoMdHelpCircleOutline size={20} />,
  },
];
