import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import sign from "../../../assets/sign.png"
import { updateProfile } from 'firebase/auth';
// import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../provider/AuthProvider';

const SignUp = () => {
    const { createUser, googleSignUp } = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleGoogle = () => {
        googleSignUp()
            .then(res => {
                console.log(res.user);
                updateProfile(res.user, {
                    displayName: res.user.name,
                    email: res.user.email
                })

                // const userInfo = {
                //     name: res.user.name,
                //     email: res.user.email
                // }

                // axiosPublic.post("/user", userInfo)
                //     .then(res => {

                //         if (res.data.insertedId) {
                //             navigate(location?.state ? location.state : '/');
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "You signed up successfully!",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //         }
                //     })
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    const handleSignUp = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (password.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }
        else if (regex.test(password)) {
            setError("You can not use any capital letter or any special character");
            return;
        }

        setError('');

        createUser(email, password)
            .then(res => {

                updateProfile(res.user, {
                    displayName: name,
                    email: email
                })

                // const userInfo = {
                //     name: name,
                //     email: email
                // }

                // axiosPublic.post("/user", userInfo)
                //     .then(res => {

                //         if (res.data.insertedId) {
                //             navigate(location?.state ? location.state : '/');
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "You signed up successfully!",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //         }
                //     })


            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
    }


    return (
        <div>
            <div>
                <div className="w-11/12 mx-auto mt-14 flex">
                    <div>
                        <img src={sign} alt="" />
                    </div>
                    <div className="flex-col hero-content w-1/2 shadow-2xl ">
                        <div className="text-center w-full">
                            <h1 className="text-5xl font-bold text-accent">Sign up now!</h1>
                        </div>
                        <div className="w-full card shrink-0">
                            <form onSubmit={handleSignUp} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Full Name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="mt-6 form-control">
                                    <button className="btn btn-accent border-white text-white font-bold text-xl">Sign up</button>
                                </div>
                                {
                                    error && <p className="text-base text-red-800">{error}</p>
                                }
                                <div className='flex justify-center'>
                                    <Link to={'/signIn'}><p>Already have account? <span className='text-accent font-semibold'>Sign in</span></p></Link>
                                </div>
                            </form>

                            <div className='flex items-center justify-center mb-10 bg-white'>
                                <button onClick={handleGoogle} className='btn btn-accent btn-outline w-11/12 mx-auto text-2xl font-semibold gap-5'><FcGoogle className='text-xl'></FcGoogle> Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;