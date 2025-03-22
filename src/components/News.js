import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  //const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0) 

  const updateNews = async () => {
    props.setProgress(10);
    //const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${getCategoryUrl(props.category)}&apiKey=${props.apiKey}&page=${page}&size=${props.pageSize}`;
    const url = `https://newsdata.io/api/1/latest?country=${props.country}&category=${getCategoryUrl(props.category)}&apikey=${props.apiKey}&size=${props.pageSize}`;
    
    setLoading(true);
    //setState({ loading: true });
    let data = await fetch(url);
    props.setProgress(70)
    let parsedData = await data.json();
    props.setProgress(90)
    if (parsedData.results) {
      setArticles(parsedData.results);
      //setTotalResult(parsedData.totalResults);
      setTotalResult(10);
      setLoading(false);
    }
    props.setProgress(100)
  }

  useEffect(() => {
    document.title= `EchoSpark: ${props.category}`
    updateNews();
  }, []);

  const fetchMoreData = async () => { //comment due to different api used
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${getCategoryUrl(props.category)}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // if (parsedData.articles) {
    //   setPage(page + 1);
    //   setArticles(articles.concat(parsedData.articles));
    // }
  };

  const getCategoryUrl = (category) => {
    switch (category) {
      case "Top News": return "general";
      default: return capitalizeFirstLetter(category);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <h2 className="text-center" style={{marginTop:'80px'}} >EchoSpark - {props.category === 'Top' ? "Main" : "Top " + props.category} Headlines</h2>
      {loading && <Spinner />}

      <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResult} loader={<Spinner />}>
        <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.link}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.image_url} newsUrl={element.link} author={element.source_name} date={element.pubDate} source={element.source_name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;