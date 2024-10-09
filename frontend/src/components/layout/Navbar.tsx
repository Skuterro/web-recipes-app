import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { TbToolsKitchen3 } from "react-icons/tb";

export const Navbar = () => {
  return (
    <nav className="bg-white w-full fixed flex items-center justify-between h-[10vh] px-20">
      <div className="flex">
        <span className="px-2 text-2xl font-bold -mx-3">RECIPIO</span>
        <TbToolsKitchen3 className="text-black text-xl"/>
      </div>
      <ul className="flex justify-center text-lg gap-10 bg-white">
        <NavItem to="/" text="Home"/>
        <NavItem to="/recipes" text="Recipes"/>
        <NavItem to="/about" text="About"/>
        <NavItem to="/contact" text="Contact"/>
      </ul>
      <div className="flex gap-6 ml-10">
        <button className="text-3xl text-black hover:text-orange-500 transition-colors duration-300 ease-in-out" >
          <LuShoppingCart/> 
        </button>
        <button className="text-3xl text-black hover:text-orange-500 transition-colors duration-300 ease-in-out" >
          <FiUser/> 
        </button>
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
        ? "px-2 text-black font-bold text-xl border-b-2 border-black"
        : "px-2 text-gray-600 hover:text-black transition-colors duration-500 ease-in-out"
      }
    >
      {text}  
    </NavLink>
  );
};