import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title= `EchoSpark: ${this.props.category}`
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.getCategoryUrl(this.props.category)}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(70)
    let parsedData = await data.json();
    this.props.setProgress(90)
    if(parsedData.articles){
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    }    
    this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.getCategoryUrl(this.props.category)}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    if(parsedData.articles){
      this.setState({
        page: this.state.page + 1,
        articles: this.state.articles.concat(parsedData.articles) 
      })
    }
  };

  getCategoryUrl = (category) => {
    switch (category) {
      case "Top News": return "general";
      default: return this.capitalizeFirstLetter(category);
    }
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <>
        <h2 className="text-center my-3">EchoSpark - {this.props.category==='Top News'?"Main":"Top "+this.props.category} Headlines</h2>
          {this.state.loading && <Spinner />}
                  <InfiniteScroll
                      dataLength={this.state.articles.length}
                      next={this.fetchMoreData}
                      hasMore={this.state.articles.length !== this.state.totalResults}
                      loader={<Spinner/>}
                  > 
                      <div className="container my-3">
                          
                      <div className="row">
                          {this.state.articles.map((element) => {
                              return <div className="col-md-4 my-3" key={element.url}>
                                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                              </div>
                          })}
                      </div>
                      </div> 
                  </InfiniteScroll>
      </>
    );
  }
}

export default News;
