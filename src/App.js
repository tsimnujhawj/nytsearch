import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import API from "../src/util/api"

import Header from "./components/Header/Header"
import Search from "./components/Search/Search"
import Results from "./components/Results/Results"

class App extends Component {
  constructor(){
    super();
    this.state = {
      topic: "",
      startYear: "",
      endYear: "",
      articles: [],
      saved: []
    }
}

  // Keep track of what user types into topic input so that input can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  // A helper method for rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

    // When save article button is clicked, add article to db
    handleSaveButton = (id) => {
      const findArticleByID = this.state.articles.find((el) => el._id === id);
      console.log("findArticleByID: ", findArticleByID);
      const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
      API.saveArticle(newSave)
      .then(this.getSavedArticles());
    }
  
    // When delete article button is clicked, remove article from db
    handleDeleteButton = (id) => {
      API.deleteArticle(id)
        .then(this.getSavedArticles());
    }

    // Method for getting saved articles (all articles) from the db
    getSavedArticles = () => {
      API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
    }

  render() {
    return (
      <div>
        <Header />
        
        <Search
        handleTopicChange={this.handleTopicChange}
        handleStartYearChange={this.handleStartYearChange}
        handleEndYearChange={this.handleEndYearChange}
        handleFormSubmit={this.handleFormSubmit}
        renderArticles={this.renderArticles}
        />

      </div>
      
    );
  }
}

export default App;
