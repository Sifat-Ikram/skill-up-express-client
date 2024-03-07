import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <div className="w-4/5 mx-auto">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://i.ibb.co/61nFVV1/Online-course-creation-software.png"
              alt="E-Learnify"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Welcome to Skill Up Express!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Skill Up Express is your go-to platform for online learning.
              Whether you are looking to expand your skills, further your
              education, or just explore new topics, we've got you covered.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/about">
                <button className="text-white bg-green-500 hover:bg-green-600 rounded-xl py-3 px-7 text-lg font-semibold">
                  About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
