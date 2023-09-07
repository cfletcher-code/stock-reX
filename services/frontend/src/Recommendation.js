import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import RecommendationCard from './RecommendationCard'; 

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
      .get(`http://localhost:8080/recommendation/${user_id}/3`) // Assuming you want the top 3 recommendations
      .then((response) => {
        setRecommendations(response.data); // Update recommendations based on API response
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  };

  // Recommendation.js

// ...

return (
  <div className="recommendations-container">
    <h2 className="centered-heading">Top Recommendations</h2>
    <div className="recommendation-list">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard key={recommendation.id} rank={index + 1} shoe={recommendation} />
      ))}
    </div>
  </div>
);

}

export default Recommendation;
