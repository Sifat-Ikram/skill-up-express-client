import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Review = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data;
    },
  });

  if (!reviews) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  console.log(reviews);

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            reviews.map(review => <div key={review._id} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img src={review.photo} alt={review.user} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-bold">{review.user}</h3>
                <p className="text-gray-600">{review.email}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
            {review.title}
            </p>
            <p className="text-gray-700 mb-4">
            {review.review}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">April 1, 2024</span>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5.45l3.693 1.847a1 1 0 01.31 1.638l-2.693 2.618.634 3.913a1 1 0 01-1.454 1.054L10 15.597l-3.187 1.678a1 1 0 01-1.454-1.054l.634-3.913-2.693-2.618a1 1 0 01.31-1.638L9 8.45V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5.45l3.693 1.847a1 1 0 01.31 1.638l-2.693 2.618.634 3.913a1 1 0 01-1.454 1.054L10 15.597l-3.187 1.678a1 1 0 01-1.454-1.054l.634-3.913-2.693-2.618a1 1 0 01.31-1.638L9 8.45V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5.45l3.693 1.847a1 1 0 01.31 1.638l-2.693 2.618.634 3.913a1 1 0 01-1.454 1.054L10 15.597l-3.187 1.678a1 1 0 01-1.454-1.054l.634-3.913-2.693-2.618a1 1 0 01.31-1.638L9 8.45V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5.45l3.693 1.847a1 1 0 01.31 1.638l-2.693 2.618.634 3.913a1 1 0 01-1.454 1.054L10 15.597l-3.187 1.678a1 1 0 01-1.454-1.054l.634-3.913-2.693-2.618a1 1 0 01.31-1.638L9 8.45V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Review;