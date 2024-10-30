import React, { useState } from 'react';
import { getReadableDate } from '../utils';

const ArticleCard = ({ article }) => {
  let [imgSrc, setImgSrc]  = useState(article.image);
  const { title, description, url, source, date } = article;
  
  if(title === "[Removed]"){
    return null;
  }

  const handleImageError = () => {
    setImgSrc('/news.webp');
  }

  return (
    <div className="article-card">
      <img src={imgSrc} alt={title} onError={handleImageError}/>
      <div className="article-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{getReadableDate(date)}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
        <p className="source-label">{source}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
