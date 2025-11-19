import { useState, useEffect } from 'react';

const NEWS_API_URL = 'http://localhost:5000/api/news';
const EVENTS_API_URL = 'http://localhost:5000/api/events';

// Hook 1: Fetches a list of recent News (Used for the 3-card preview)
export const useTopNews = (limitCount) => {
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopNews = async () => {
            try {
                const response = await fetch(NEWS_API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                
                // Check if data is an array before slicing
                if (Array.isArray(data)) {
                    setNewsItems(data.slice(0, limitCount)); 
                } else {
                    setNewsItems([]);
                }
            } catch (err) {
                console.error("Error fetching homepage news from API:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopNews();
    }, [limitCount]);

    return { newsItems, isLoading };
};

// Hook 2: Fetches ONE News and ONE Event (Used if you switch to the "What's Happening Now" layout)
export const useTopContent = () => {
    const [latestNews, setLatestNews] = useState(null);
    const [nearestEvent, setNearestEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // 1. Fetch News
                const newsRes = await fetch(NEWS_API_URL);
                const newsData = await newsRes.json(); 

                // 2. Fetch Events
                const eventsRes = await fetch(EVENTS_API_URL);
                const eventsData = await eventsRes.json();

                // Process News (48 Hour Expiry)
                if (Array.isArray(newsData)) {
                    const twoDaysAgo = Date.now() - (48 * 60 * 60 * 1000); 
                    const currentNews = newsData.find(item => item.timestamp > twoDaysAgo);
                    setLatestNews(currentNews || null);
                }

                // Process Events (Nearest Upcoming)
                if (Array.isArray(eventsData)) {
                    const nextEvent = eventsData.length > 0 ? eventsData[0] : null;
                    setNearestEvent(nextEvent);
                }

            } catch (err) {
                console.error("Error fetching dynamic content:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    return { latestNews, nearestEvent, isLoading };
};