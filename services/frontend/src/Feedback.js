import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import ShoeCard from './ShoeCard';

function Feedback() {
  const { user_id } = useUser();
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    fetchUnseenShoe();
  }, [user_id]);

  const fetchUnseenShoe = () => {
    axios
      .get(`http://localhost:8080/feedback/get_unseen_shoe/${user_id}`)
      .then((response) => {
        console.log('API Response:', response);
        setShoe(response.data); // Assuming the API response contains shoe data
      })
      .catch((error) => {
        console.error('Error fetching unseen shoe:', error);
      });
  };

  const handleRatingChangeAndSubmit = (newRating) => {
    // Submit the rating to the API immediately when a rating button is clicked
    axios
      .post(`http://localhost:8080/feedback/add_feedback/${user_id}/${shoe.id}`, {
        feedback_value: newRating
      })
      .then(() => {
        // Fetch the next unseen shoe after submitting feedback
        fetchUnseenShoe();
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

  const handleSkip = () => {
    // Fetch the next unseen shoe when the skip button is clicked
    fetchUnseenShoe();
  };

  return (
    <div className="feedback-container">
      {shoe ? (
        <>
          <h2 className="centered-heading">Rate this Shoe</h2>
          <div className="shoe-card-wrapper">
            <ShoeCard shoe={shoe} />
          </div>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingChangeAndSubmit(value)}
                className="rating-button" // Add a class to the button
              >
                {value}
              </button>
            ))}
          </div>
          <button onClick={handleSkip} className="skip-button">Skip</button> {/* Add a class to the "Skip" button */}
        </>
      ) : (
        <p>Please wait...</p>
      )}
    </div>
  );
}

export default Feedback;
