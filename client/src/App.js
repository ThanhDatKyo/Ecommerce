import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("react");
    //fetch news
    const getNews = async () => {
        const res = await axios.get(
            `http://hn.algolia.com/api/v1/search?query=${searchQuery}`
        );
        console.log(res);
        setNews(res.data.hits);
        // fetch("http://hn.algolia.com/api/v1/search?query=react").then().then().catch()
    };

    useEffect(() => {
        getNews();
    }, [searchQuery]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="App">
            <h2>News</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            {news.map((n, i) => (
                <p key={i}>{n.title}</p>
            ))}
        </div>
    );
};

export default App;
