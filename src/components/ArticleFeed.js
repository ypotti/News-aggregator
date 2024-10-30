// src/components/ArticleFeed.js
import React from 'react';
import { FaRegHourglassHalf } from "react-icons/fa6";
import ArticleCard from './ArticleCard';

const ArticleFeed = ({ isLoading ,articles, query }) => {

  return (
    <div className='article-feed'>
      {isLoading ? (
        <p className='loader'>
          <span>Loading...</span>
          <FaRegHourglassHalf />
        </p>
      ): null}
      {query ? (
        <p className='query-text'>Showing Results for {query}</p>
      ) : null}
      <main>
        {articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </main>
    </div>
  );
};

export default ArticleFeed;
