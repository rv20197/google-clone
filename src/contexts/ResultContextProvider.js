import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const getResults = async resultType => {
		setIsLoading(true);

		const response = await fetch(`${baseUrl}${resultType}`, {
			method: 'GET',
			headers: {
				'X-User-Agent': 'desktop',
				'X-Proxy-Location': 'IN',
				'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
				'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
			}
		});

		const data = await response.json();
		if (resultType.includes('/news')) {
			setResults(data.entries);
		} else if (resultType.includes('/image')) {
			setResults(data.image_results);
		} else {
			setResults(data.results);
		}
		setIsLoading(false);
	};

	return (
		<ResultContext.Provider
			value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
			{children}
		</ResultContext.Provider>
	);
};

export const useResultContext = () => useContext(ResultContext);
