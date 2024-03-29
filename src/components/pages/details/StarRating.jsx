import '@fortawesome/fontawesome-free/css/all.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="text-yellow-500 fas fa-star"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className="text-yellow-500 fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i key={i} className="text-gray-400 far fa-star"></i>);
    }
  }
  return <div className="flex">{stars}</div>;
};

export default StarRating;
