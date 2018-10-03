import axios from "axios";

const API = {
    // Query NYT API
    searchNYT: function(topic, startYear, endYear) {
      const authKey = "6e50a698d8c84f4c81424b853cbf6499";
      const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${authKey}&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}0101`;
      return axios.get(queryURL);
    },
    // Retrieves saved articles from the db
    getArticle: function() {
      return axios.get("/api/saved");
    },
    // Saves a new article to the db
    saveArticle: function(articleObj) {
      return axios.post("/api/saved", articleObj);
    },
    // Deletes an article from the db
    deleteArticle: function(id) {
      return axios.delete(`/api/saved/${id}`);
    }
  };
  
  export default API;