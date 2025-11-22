import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";

export const technicianItems = [
    { item: "Dashboard", path: "dashboard", icon: <MdOutlineDashboard size={20}/> },
    { item: "Job Management", path: "job-management", icon: <MdOutlineWorkOutline size={20}/> },
    { item: "Earnings", path: "earnings", icon: <MdOutlinePayments size={20}/> },
    { item: "Notifications", path: "notifications", icon: <MdOutlineNotificationsActive size={20}/> },
    { item: "Settings", path: "settings", icon: <IoSettingsOutline size={20}/> },
]