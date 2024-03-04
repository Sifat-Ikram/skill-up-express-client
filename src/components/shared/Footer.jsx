import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="mt-20">
      <footer className="p-10 footer footer-center bg-[#04734C]">
        <nav>
          <div className="grid grid-flow-col gap-16">
            <a href="#">
              <IoLogoFacebook className="text-3xl text-white" />
            </a>
            <a href="#">
              <FaTwitter className="text-3xl text-white" />
            </a>
            <a href="#">
              <FaLinkedin className="text-3xl text-white" />
            </a>
            <a href="#">
              <FaYoutube className="text-3xl text-white" />
            </a>
            <a href="#">
              <FaInstagram className="text-3xl text-white" />
            </a>
          </div>
        </nav>
        <aside>
          <h1 className="text-5xl font-extrabold text-white mb-5">
            SkillUp Express
          </h1>
          <h2 className="text-3xl font-bold text-white">
            Start Your Career Journey
          </h2>
          <p className="text-gray-400">Copyright © 2023 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
