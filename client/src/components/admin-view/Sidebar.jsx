import { ChartNoAxesCombined } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Sheet } from "../ui/sheet";

const adminSideBarMenuItems = [
  {
    id: "Dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "Products",
    label: "Products",
    path: "/admin/Products",
    icon: <ShoppingCart />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];
function MenuItems() {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSideBarMenuItems.map((menuItem, index) => (
        <div
          key={menuItem.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:cursor-pointer hover:bg-muted hover:text-foreground"
          onClick={() => navigate(menuItem.path)}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

const Sidebar = ({open,setOpen}) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} setOpen={setOpen} />
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default Sidebar;
