import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BroswerRouter as Router, Route} from "react-router-dom";
import API from "../src/util/api"

import Header from "./components/Header/Header"
import Search from "./components/Search/Search"
import Results from "./components/Results/Results"
import Saved from "./components/Saved/Saved"

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

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  }

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getArticle()
    .then((res) => {
      this.setState({ saved: res.data });
    });
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

  // A helper method for rendering one div for each saved article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
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

    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">
        <div className="saved-head">
          <strong><i className="fa fa-download"></i> Saved Articles</strong>
        </div>
        </h3>
      </div>
      <div className="panel-body">
        <ul className="list-group">
          {this.renderSaved()}
        </ul>
      </div>
    </div>

    <div className="spacer">
    </div>
      </div>
      
    );
  }
}

export default App;
