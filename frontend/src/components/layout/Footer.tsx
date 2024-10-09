import { SiInstagram } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export const Footer = () => {
  return (

        <footer className="bg-white p-5 rounded-t-3xl -mt-5">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-center gap-10 text-gray-500 font-bold w-2/5">
              <a
                href="/"
                className="hover:text-black transition-colors duration-300 ease-in-out"
              >
                Home
              </a>
              <a
                href="/"
                className="hover:text-black transition-colors duration-300 ease-in-out"
              >
                Services
              </a>
              <a
                href="/"
                className="hover:text-black transition-colors duration-300 ease-in-out"
              >
                Platform
              </a>
            </div>
            <div className="flex flex-col items-center w-1/5 gap-10 text-gray-500">
              <p>
                <FaArrowDown className="text-primary text-4xl" />
              </p>
              <p className="flex flex-row gap-8 text-3xl">
                <FaFacebook />
                <SiInstagram />
                <FaLinkedin />
              </p>
              <div>
                <form className="flex items-center bg-gray-800 rounded-xl px-2">
                  <FaRegEnvelope className="mx-2 text-white" />
                  <input
                    type="email"
                    placeholder="Subscribe to newsletter..."
                    className="bg-gray-800 p-2 border-none outline-none placeholder-white text-white"
                  />
                  <button
                    type="submit"
                    className="ml-2 p-2 bg-gray-800 rounded-xl"
                  >
                    <FaArrowRight className="text-white " />
                  </button>
                </form>
              </div>
            </div>
            <div className="flex justify-center space-x-10 text-gray-500 font-bold w-2/5">
              <a
                href="/"
                className="hover:text-black transition-colors duration-300 ease-in-out"
              >
                About Us
              </a>
              <a
                href="/"
                className="hover:text-black transition-colors duration-300 ease-in-out"
              >
                Contact Us
              </a>
              <a
                href="/"
                className="hover:text-black transition-colors duration-300 ease-in-out"
              >
                Resources
              </a>
            </div>
          </div>
      </footer>

  );
};