import React from 'react';

function RecommendationCard({ rank, shoe }) {
  return (
    <div className="recommendation-card">
      <div className="rank">{rank}</div>
      <img src={'http://localhost:8080/images/' + shoe.png_path} alt={shoe.title} />
      <div className="details">
        <h3>{shoe.title}</h3>
        <p><strong>Colorway:</strong> {shoe.colorway}</p>
        <p><strong>Release Date:</strong> {shoe.releaseDate}</p>
        <p><strong>Retail Price:</strong> {shoe.retailPrice}</p>
        {/* Add more metadata fields as needed */}
      </div>
    </div>
  );
}

export default RecommendationCard;