import React from "react";

const Search = props => (
    <div>
  <div className="container">
        <div className="panel panel-primary search-section">
          <div className="panel-heading">
            <h3 className="panel-title">
            <div className="search-head">
              <strong>
                <i className="fa fa-search"></i>Search
              </strong>
            </div>
            </h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year</label>
                <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year</label>
                <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
              </div>
              <button onClick={props.handleFormSubmit} type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
          </div>
    </div>
    </div>


    <div className="container">
    <div className="panel panel-primary results-section">
        <div className="panel-heading">
        <h3 className="panel-title">
          <div className="results-head">
            <strong>
            <i className="fa fa-newspaper-o" aria-hidden="true"></i> Results
            </strong>
          </div>
        </h3>
        </div>
        <div className="panel-body article-render">
        {props.renderArticles()}
        </div>
    </div>
    </div>

    </div>
  )


export default Search;
