import Banner from "./banner/Banner";
import Categories from "./categories/Categories";
import Choosing from "./choosing/Choosing";
import Instructors from "./instructors/Instructors";
import Introduction from "./introduction/Introduction";
import PopularCourse from "./popular/PopularCourse";
import Review from "./review/Review";


const Home = () => {
    return (
        <div className="space-y-10">
            <Banner />
            <Introduction />
            <Categories />
            <PopularCourse />
            <Choosing />
            <Instructors />
            <Review />
        </div>
    );
};

export default Home;