import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="mt-20">
      <footer className="p-10 footer footer-center bg-accent text-primary-content">
        <nav>
          <div className="grid grid-flow-col gap-10">
            <a>
              <IoLogoFacebook className="text-3xl" />
            </a>
            <a>
              <FaTwitter className="text-3xl" />
            </a>
            <a>
              <FaLinkedin className="text-3xl" />
            </a>
            <a>
              <FaYoutube className="text-3xl" />
            </a>
            <a>
              <FaInstagram className="text-3xl" />
            </a>
          </div>
        </nav>
        <aside>
          <h1 className="text-5xl font-extrabold text-white mb-5">
            SkillUp Express
          </h1>
          <h2 className="text-4xl font-bold text-white">
            {" "}
            Start Your Career Journey
          </h2>
          <p>Copyright © 2023 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
