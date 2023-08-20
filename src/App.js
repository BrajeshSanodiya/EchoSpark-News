import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 21
  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Top News" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="Technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}