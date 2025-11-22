import { MdOutlineDashboard } from "react-icons/md";
import { BiBookHeart } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


export const userItems = [
    { item: "Dashboard", path: "dashboard", icon: <MdOutlineDashboard size={20}/> },
    { item: "Orders", path: "orders", icon: <BiBookHeart size={20}/> },
    { item: "Payments", path: "payments", icon: <MdOutlinePayments size={20}/> },
    { item: "Help & Support", path: "help-support", icon: <MdOutlineContactSupport size={20}/> },
    { item: "Settings", path: "settings", icon: <IoSettingsOutline size={20}/> },
]