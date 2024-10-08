import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";

export const Navbar = () => {
  return (
    <nav className="bg-white w-full fixed flex items-center justify-between h-[10vh] px-20">
      <span className="px-2">RECIPIO</span>
      <ul className="flex justify-center text-lg gap-10 bg-white">
        <NavItem to="/" text="Home"/>
        <NavItem to="/recipes" text="Recipes"/>
        <NavItem to="/about" text="About"/>
        <NavItem to="/contact" text="Contact"/>
      </ul>
      <div className="flex gap-2">
        <LuShoppingCart className="text-3xl" />
        <FiUser className="text-3xl" />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  text: string;
}


const NavItem = ({to, text}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
        ? "px-2 text-black font-bold"
        : "px-2 text-gray-600 hover:text-black transition-colors duration-500 ease-in-out"
      }
    >
      {text}  
    </NavLink>
  );
};