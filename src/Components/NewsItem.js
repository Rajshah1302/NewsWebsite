import React from "react";

const NewsItem = (props)=> {
    let { title, description, imgURL, url,publishedAt } = props;
    return (
      <div className="card m-4" >
        <img src={imgURL} className="card-img-top" alt="News Thumbnail" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
          <p class="card-text"><small class="text-body-secondary">Publised on {new Date(publishedAt).toGMTString()}</small></p>
        </div>
      </div>
    );
}

export default NewsItem;
