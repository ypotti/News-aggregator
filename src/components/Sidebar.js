import React from 'react';
import { BUSINESS, ENTERTAINMENT, GENERAL, GUARDIAN, HEALTH, NEWSAPI, NYTIMES, SCIENCE, SPORTS, TECHNOLOGY } from '../constants';

const Sidebar = ({ preferences, setPreferences, filters, setFilters }) => {
  const updatePreference = (type, value) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const updateFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ fromDate: '', toDate:'', category: '', source: '' })
  }

  return (
    <aside>
      <h2>Preferences</h2>
      <h3>Preferred Sources</h3>
      <select onChange={(e) => updatePreference('preferredSource', e.target.value)} value={preferences.preferredSource || ''}>
        <option value="">All Sources</option>
        <option value={NEWSAPI}>NewsAPI</option>
        <option value={GUARDIAN}>The Guardian</option>
        <option value={NYTIMES}>NewYork Times</option>
      </select>

      <h2>Filters</h2>
      <h3>From Date</h3>
      <input
        type="date"
        onChange={(e) => updateFilter('fromDate', e.target.value)}
        value={filters.fromDate || ''}
        max={filters.toDate || ''}
      />

      <h3>To Date</h3>
      <input
        type="date"
        onChange={(e) => updateFilter('toDate', e.target.value)}
        value={filters.toDate || ''}
        min={filters.fromDate || ''}
      />


      <h3>Category</h3>
      <select onChange={(e) => updateFilter('category', e.target.value)} value={filters.category || ''}>
        <option value="">All Categories</option>
        <option value={BUSINESS}>Business</option>
        <option value={ENTERTAINMENT}>Entertainment</option>
        <option value={GENERAL}>General</option>
        <option value={HEALTH}>Health</option>
        <option value={SCIENCE}>Science</option>
        <option value={SPORTS}>Sports</option>
        <option value={TECHNOLOGY}>Technology</option>
      </select>

      <h3>Source</h3>
      <select onChange={(e) => updateFilter('source', e.target.value)} value={filters.source || ''}>
        <option value="">All Sources</option>
        <option value={NEWSAPI}>NewsAPI</option>
        <option value={GUARDIAN}>The Guardian</option>
        <option value={NYTIMES}>NewYork Times</option>
      </select>

      <button onClick={clearFilters}>Clear Filters</button>
    </aside>
  );
};

export default Sidebar;
