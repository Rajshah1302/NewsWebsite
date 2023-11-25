import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import NewsComponent  from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress : 0,
  }
  setProgress= (progress)=>{
    this.setState({progress : progress});
  };
  render() {
    return (
      <>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
  <Routes>
    <Route path="/" element={<NewsComponent setProgress={this.setProgress} country='in' category="general" key="general" />} />
    <Route path="/business" element={<NewsComponent setProgress={this.setProgress} country='in' category="business" key="business" />} />
    <Route path="/entertainment" element={<NewsComponent setProgress={this.setProgress} country='in' category="entertainment" key="entertainment" />} />
    <Route path="/general" element={<NewsComponent setProgress={this.setProgress} country='in' category="general" key="general" />} />
    <Route path="/health" element={<NewsComponent setProgress={this.setProgress} country='in' category="health" key="health" />} />
    <Route path="/technology" element={<NewsComponent setProgress={this.setProgress} country='in' category="technology" key="technology" />} />
    <Route path="/sports" element={<NewsComponent setProgress={this.setProgress} country='in' category="sports" key="sports" />} />
    <Route path="/science" element={<NewsComponent setProgress={this.setProgress} country='in' category="science" key="science" />} />
  </Routes>
</Router>

      </>
    );
  }
}
