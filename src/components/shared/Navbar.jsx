import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then((res) => console.log(res.user))
      .catch((err) => console.error(err.message));
  };

  const navLinks = (
    <>
      <li className="text-lg font-semibold">
        <Link to={"/"} className="text-white hover:text-gray-200">Home</Link>
      </li>
      <li className="text-lg font-semibold">
        <Link to={"/allCourse"} className="text-white hover:text-gray-200">All Courses</Link>
      </li>
      {user && (
        <>
          <li className="text-lg font-semibold">
            <Link to={"/dashboard"} className="text-white hover:text-gray-200">Dashboard</Link>
          </li>
          <li className="text-lg font-semibold">
            <Link to={"/addCourse"} className="text-white hover:text-gray-200">Add Course</Link>
          </li>
        </>
      )}
      {!user && (
        <li className="text-lg font-semibold">
          <Link to={"/signUp"} className="text-white hover:text-gray-200">Sign up</Link>
        </li>
      )}
      <li className="text-lg font-semibold">
        <Link to={"/about"} className="text-white hover:text-gray-200">About Us</Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#04734C]">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-lato text-white text-2xl font-bold uppercase">
              SkillUp Express
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ul className="flex space-x-6 text-white text-lg font-semibold">
              {navLinks}
            </ul>
            <div>
              {user ? (
                <button onClick={handleSignOut} className="bg-white text-[#04734C] hover:bg-[#056141] hover:text-white  text-lg font-semibold px-4 py-2 rounded-md">
                  Sign out
                </button>
              ) : (
                <Link to="/SignIn" className="bg-white text-[#04734C] hover:bg-[#056141] hover:text-white  text-lg font-semibold px-4 py-2 rounded-md">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
