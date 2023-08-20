import React from "react";
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', right: '0', position: 'absolute' }}><span className="badge rounded-pill bg-danger">{source}</span></div>
        <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "15rem" }} />
        <div className="card-body">
          <h5 className="card-title"><LinesEllipsisLoose text={title} maxLine='2' lineHeight='28'/></h5>
          <p className="card-text"><LinesEllipsisLoose text={description} maxLine='3' lineHeight='22'/></p>
          <p className="card-text"><small className="text-danger">By {author ? author : "Unknown"} on {new Date(date).toLocaleDateString()}</small> </p>
          <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    );
}

export default NewsItem;
