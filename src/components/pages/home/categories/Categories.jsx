import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Categories = () => {
    const axiosPublic = useAxiosPublic();
    const { data: categories = [], isLoading, isError } = useQuery({
        queryKey: ["course._id"],
        queryFn: async () => {
            const res = await axiosPublic.get("/category");
            return res.data;
        },
    });

    return (
        <div className="w-3/4 mx-auto mt-10">
            <h1 className="text-4xl font-bold text-center mb-10">Categories</h1>
            {isError && <div>Error fetching data</div>}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categories.slice(0, 6).map((category) => (
                        <Link key={category._id} to={`/allCourse/${category.name}`}>
                            <button className="relative overflow-hidden">
                                <img
                                    src={category.image}
                                    alt=""
                                    className="h-52 w-72 rounded-lg transform hover:scale-105 transition-transform duration-300"
                                    style={{
                                        filter: "brightness(0.8)",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-white bg-gradient-to-b from-transparent to-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <h1 className="text-2xl font-bold">{category.name}</h1>
                                </div>
                            </button>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;