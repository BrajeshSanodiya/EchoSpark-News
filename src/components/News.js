import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category : 'general',
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }

  constructor() {
    super();
    console.log("Hello I a constructor of News class");
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca9f2962f5ba4a3a9cf9d4b130051d34&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    console.log("response from url :" + data);
    let parsedData = await data.json();
    console.log("parsed response from url :" + parsedData);
    console.log("articles response from url :" + parsedData.articles);
    this.setState({
      article: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading:false
    });
  }
  handleNextClick = async () => {
    console.log("Next click");
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / this.props.pageSize)) {
      document.activeElement.blur()
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca9f2962f5ba4a3a9cf9d4b130051d34&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      console.log("url :"+url);
      let data = await fetch(url);
      console.log("response from url :" + data);
      let parsedData = await data.json();
      console.log("parsed response from url :" + parsedData);
      console.log("articles response from url :" + parsedData.articles);
      this.setState({
        article: parsedData.articles,
        page: this.state.page + 1,
        loading:false
      });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };
  handlePrevClick = async () => {
    console.log("Prev Click");
    if (this.state.page - 1 >0) {
      document.activeElement.blur()
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca9f2962f5ba4a3a9cf9d4b130051d34&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      console.log("url :"+url);
      let data = await fetch(url);
      console.log("response from url :" + data);
      let parsedData = await data.json();
      console.log("parsed response from url :" + parsedData);
      console.log("articles response from url :" + parsedData.articles);
      this.setState({ article: parsedData.articles, page: this.state.page - 1 ,loading:false});
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">EchoSpark News - Top News</h2>
        {this.state.loading && <Spinner/>}
        <div id="newscontainer" className="row">
          {!this.state.loading && this.state.article.map((item) =>
            item.urlToImage != null &&
            item.url != null &&
            item.title != null &&
            item.description ? (
              <div className="col-md-4 my-1" key={item.url}>
                <NewsItem
                  title={item.title.slice(0, 45) + "..."}
                  description={item.description.slice(0, 80) + "..."}
                  imgUrl={item.urlToImage}
                  newsUrl={item.url}
                />
              </div>
            ) : (
              ""
            )
          )}
        </div>

        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center my-3 dark"
        >
          <ul id="btnNextPrev" class="pagination" >
            <li class={`page-item ${(this.state.page - 1)>0?"":"disabled"}`} onClick={this.handlePrevClick}>
              <button class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only"> Previous</span>
              </button>
            </li>
            <li class={`page-item ${(this.state.page + 1) <= Math.ceil(this.state.totalArticles / this.props.pageSize)?"":"disabled"}`} onClick={this.handleNextClick}>
              <button class="page-link" aria-label="Next">
                <span class="sr-only">Next </span>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default News;
