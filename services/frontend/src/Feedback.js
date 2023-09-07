import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

function Feedback() {
  const { user_id } = useUser();
  const [shoe, setShoe] = useState(null);
  const [rating, setRating] = useState(0); // Initialize to 0, user can select 1-5

  useEffect(() => {
        fetchUnseenShoe();
  }, [user_id]);

  const fetchUnseenShoe = () => {
    axios
      .get(`http://localhost:8080/feedback/get_unseen_shoe/${user_id}`)
      .then((response)=> {
        console.log('API Response:', response);
        setShoe(response.data); // Assuming the API response contains shoe data
        setRating(0); // Reset rating when new shoe is fetched
      })
      .catch((error) => {
        console.error('Error fetching unseen shoe:', error);
      });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitRating = () => {
    if (rating > 0) {
      // Submit the rating to the API
      axios
        .post(`http://localhost:8080/feedback/add_feedback/${user_id}/${shoe.id}`, {
          feedback_value: rating
        })
        .then(() => {
          // Fetch the next unseen shoe after submitting feedback
          fetchUnseenShoe();
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
        });
    }
  };

  return (
    <div className="feedback-container">
      {shoe ? (
        <>
          <h2>Rate this Shoe</h2>
          <div className="shoe-info">
            <img src={'http://localhost:8080/images/' + shoe.png_path} alt={shoe.png_path} />
            <p>{shoe.title}</p>
            <p>{shoe.colorway}</p>
            <p>{shoe.releaseDate}</p>
            <p>{shoe.retailPrice}</p>
          </div>
          <div className="rating">
            <span>Your Rating: {rating}</span>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingChange(value)}
                className={value === rating ? 'selected' : ''}
              >
                {value}
              </button>
            ))}
          </div>
          <button onClick={handleSubmitRating}>Submit Rating</button>
        </>
      ) : (
        <p>Please wait... loading {user_id} {shoe}</p>
      )}
    </div>
  );
}

export default Feedback;
