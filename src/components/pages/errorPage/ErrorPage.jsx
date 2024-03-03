import { Link } from "react-router-dom";
import error from "../../../assets/error.png"

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center w-11/12 mx-auto gap-3'>
            <img src={error} alt="" className='h-[500px]' />
            <Link to={'/'}>
                <button className='btn btn-accent'>Back Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;