import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

function Recommendation() {
  const { user_id } = useUser();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user_id) {
      fetchRecommendations();
    }
  }, [user_id]);

  const fetchRecommendations = () => {
    axios
      .get(`http://localhost:8080/recommendation/3`) // Assuming you want the top 3 recommendations
      .then((response) => {
        setRecommendations(response.data); // Update recommendations based on API response
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  };

  return (
    <div className="recommendations-container">
      <h2>Top Recommendations</h2>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            <div className="recommendation-info">
              <img src={recommendation.imageUrl} alt={recommendation.name} />
              <p>Name: {recommendation.name}</p>
              <p>Description: {recommendation.description}</p>
              {/* Add more metadata fields as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendation;
