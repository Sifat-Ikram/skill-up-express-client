import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#04734C] to-[#02494E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Section 1 */}
        <div className="flex flex-col space-y-4 lg:w-1/4">
          <h1 className="text-white text-3xl font-semibold mb-4">SkillUp Express</h1>
          <p className="text-gray-300">Start Your Career Journey</p>
          <div className="mt-6 flex space-x-4">
            <a href="#" className="text-white transition duration-300 transform hover:scale-110">
              <IoLogoFacebook className="text-4xl" />
            </a>
            <a href="#" className="text-white transition duration-300 transform hover:scale-110">
              <FaTwitter className="text-4xl" />
            </a>
            <a href="#" className="text-white transition duration-300 transform hover:scale-110">
              <FaLinkedin className="text-4xl" />
            </a>
            <a href="#" className="text-white transition duration-300 transform hover:scale-110">
              <FaYoutube className="text-4xl" />
            </a>
            <a href="#" className="text-white transition duration-300 transform hover:scale-110">
              <FaInstagram className="text-4xl" />
            </a>
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex flex-col space-y-4 lg:w-1/3">
          <h2 className="text-white text-xl font-semibold">Explore</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Courses</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Section 3 */}
        <div className="flex flex-col space-y-4 lg:w-1/3">
          <form className="flex flex-col space-y-2">
            <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring focus:border-[#04734C]" />
            <button type="submit" className="px-4 py-3 bg-white text-[#04734C] font-bold rounded-md hover:bg-opacity-80 transition duration-300 focus:outline-none focus:ring focus:border-[#04734C]">Subscribe</button>
          </form>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-8">Copyright © 2023 - All rights reserved</p>
    </footer>
  );
};

export default Footer;
