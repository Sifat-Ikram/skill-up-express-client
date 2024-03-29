import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <div className="w-5/6 mx-auto space-y-10">
        <div>
          <div className="w-2/5 min-h-screen mx-auto mt-14">
            <div className="text-center bg-[#04734C] w-full py-10">
              <h1 className="text-5xl font-bold text-white">Sign in here!</h1>
            </div>
            <div>
              <form
                onSubmit={handleSignIn}
                className="space-y-5 card-body bg-base-100"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="mt-6 form-control">
                  <button className="btn bg-[#04734C] hover:bg-[#04734C] border-white text-white font-bold text-xl">
                    Sign in
                  </button>
                </div>
                {error && <p className="text-base text-red-800">{error}</p>}
                <Link to={"/signUp"}>
                  <p>
                    Do not have an account? <span className="text-[#04734C]">Sign up</span> here
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
