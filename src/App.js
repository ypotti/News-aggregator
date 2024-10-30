import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import fetchAllNews from './services/NewsService';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { debounce } from './utils';

const ArticleFeed = lazy(() => import('./components/ArticleFeed'));

const App = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [preferences, setPreferences] = useState({ preferredSource: '' });
  const [filters, setFilters] = useState({ fromDate: '', toDate:'', category: '', source: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    console.log("Fetching data...");
    setIsLoading(true);
    try {
      const data = await fetchAllNews(query, { ...preferences, ...filters });
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }finally{
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line
  const debouncedFetchData = useCallback(debounce(fetchData, 500), [query, preferences, filters]);

  useEffect(() => {
    debouncedFetchData();
  }, [debouncedFetchData])

  return (
    <div className="App">
      <Header onSearch={setQuery} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="content">
          <Sidebar preferences={preferences} setPreferences={setPreferences} filters={filters} setFilters={setFilters}/>
          {error ? <p className="error">{error}</p> : <ArticleFeed isLoading={isLoading} articles={articles} query={query}/>}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
