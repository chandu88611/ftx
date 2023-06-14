import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdVerified} from "react-icons/md";

const reviews = [
  {
    id: 1,
    rating: 4,
    comment: "Great product! Highly recommended.",
    author: "John Doe",
    image: "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017544736_437Wx649H_202305151039022.jpeg",
  },
  {
    id: 2,
    rating: 5,
    comment: "Excellent quality. Very satisfied with my purchase.",
    author: "Jane Smith",
    image: "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017544739_437Wx649H_202305151039072.jpeg",
  },
  {
    id: 3,
    rating: 3,
    comment: "Average product. Could be better.",
    author: "David Johnson",
    image: "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017544739_437Wx649H_202305151039043.jpeg",
  },
];

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState(null);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`p-4 border flex ${
              selectedReview === review
                ? "border-blue-500"
                : "border-gray-200"
            } rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-300 gap-8`}
            onClick={() => handleReviewClick(review)}
          >
           
            <div className="relative  h-42 mb-4">
              <img
                src={review.image}
                alt="Product"
                className="object-cover w-36  rounded-lg"
              />
            </div>
            <div>
            <div className="flex items-center space-x-2 mb-2">
              {Array.from({ length: review.rating }).map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <div className="flex gap-3">

            <span className="text-gray-600 font-medium">{review.author}</span>
            <p className="font-semibold text-blue-500 flex items-center">Verified<MdVerified/></p>
            </div>
            <p className="text-gray-800 mt-2">{review.comment}</p>
            </div>
         
          </div>
        ))}
      </div>
      {selectedReview && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Selected Review</h3>
          <div className="p-4 border border-blue-500 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {Array.from({ length: selectedReview.rating }).map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <div className="relative w-full h-36 mb-4">
              <img
                src={selectedReview.image}
                alt="Product"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <span className="text-gray-600">{selectedReview.author}</span>
            <p className="text-gray-800 mt-2">{selectedReview.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
}
