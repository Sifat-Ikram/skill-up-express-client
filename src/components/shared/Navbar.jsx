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
      <li className="text-xl font-semibold hover:bg-[#04734C] hover:text-white rounded-md">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="text-xl font-semibold hover:bg-[#04734C] hover:text-white rounded-md">
        <Link to={"/allCourse"}>All Courses</Link>
      </li>
      {user && (
        <>
          <li className="text-xl font-semibold hover:bg-[#04734C] hover:text-white rounded-md">
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xl font-semibold hover:bg-[#04734C] hover:text-white rounded-md">
            <Link to={"/addCourse"}>Add Course</Link>
          </li>
        </>
      )}
      {!user &&
        <>
          <li className="text-xl font-semibold  hover:bg-[#04734C] hover:text-white rounded-md">
            <Link to={"/signUp"}>Sign up</Link>
          </li>
        </>}
      <li className="text-xl font-semibold hover:bg-[#04734C] hover:text-white rounded-md">
        <Link to={"/about"}>About Us</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar w-full lg:px-10 md:px-8 px-5">
        <div className="text-white navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn border-2 border-solid border-[#04734C] mr-2 hover:border-[#04734C] bg-base-300 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu text-[#04734C] font-bold rounded-xs menu-md dropdown-content bg-white mt-3 z-[1] p-2 shadow-xl w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="block text-left cursor-pointer font-lato" href="/">
            <h1 className="lg:text-3xl md:text-2xl text-lg italic text-[#04734C] font-extrabold uppercase">
              skillup express
            </h1>
          </a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 space-x-3 font-bold text-[#04734C] menu menu-horizontal">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <a onClick={handleSignOut} className="btn bg-[#04734C] hover:bg-[#04734C] text-white font-semibold">
              Sign out
            </a>
          ) : (
            <a href="/SignIn" className="btn bg-[#04734C] hover:bg-[#04734C] text-white font-semibold">
              Sign in
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
