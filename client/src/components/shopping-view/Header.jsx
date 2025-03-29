import { House, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { logoutUser } from "../../../store/auth-slice/index";

const MenuItem = () => {
  return (
    <nav className="flex flex-col mb-3 p-6 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link key={item.id} to={item.path} className="text-sm font-medium">
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size={"icon"}>
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className=" bg-black font-extrabold text-white">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => Navigate("/shop/account")}>
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to="/shop/home">
          <House className="h-6 w-6 " />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItem />
            <HeaderRightContent /> 
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItem />
        </div>

        <div className="hiddenn lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default Header;
