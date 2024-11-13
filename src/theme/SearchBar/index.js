// theme/SearchBar/index.js
import React, { useState, useRef, useCallback } from 'react';
import { create, insert, search } from '@orama/orama';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function SearchBar() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const searchDb = useRef(null);
  const { siteConfig } = useDocusaurusContext();

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchDb.current) {
      const response = await fetch('/searchIndex.json');
      const data = await response.json();
      searchDb.current = await create(data);
    }

    if (searchQuery.trim()) {
      const searchResults = await search(searchDb.current, {
        term: searchQuery,
        limit: 10
      });
      setResults(searchResults.hits);
    } else {
      setResults([]);
    }
  }, []);

  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          performSearch(e.target.value);
        }}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map((result) => (
            <a
              key={result.id}
              href={result.document.url}
              className="search-result-item"
            >
              <h4>{result.document.title}</h4>
              <p>{result.document.content.substring(0, 200)}...</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}