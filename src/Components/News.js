import React, { PureComponent } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsComponent extends PureComponent {
  static defaultProps = {
    country: "in",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      pageSize: 9,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}|PressHub`;
  }

  hasNextPage = () => {
    return this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.state.pageSize)
      ? false
      : true;
  };



  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a46e0709e484f288e443c3e5c1cc34a&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  fetchMoreData = async () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a46e0709e484f288e443c3e5c1cc34a&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container justify-content-center ">
          <div className="d-flex justify-content-center ">
            <h1 style={{marginTop : "90px" }}>
              PressHub-Top {this.capitalizeFirstLetter(this.props.category)}{" "}
              Headlines
            </h1>
          </div>
          
          {this.state.loading && <Spinner/>}
          <div className="container">
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.hasNextPage()}
              loader={<Spinner />}
            >
              <div className="row my-5">
                {this.state.articles.map((article) => {
                  return (
                    <div
                      className="col-sm-6 col-md-6 col-lg-4"
                      key={article.url}
                    >
                      <NewsItem
                        imgURL={
                          article.urlToImage
                            ? article.urlToImage
                            : "https://editorial.fxstreet.com/images/Breaking/breaking030223_Large.jpg"
                        }
                        title={article.title ? article.title.slice(0, 45) : ""}
                        description={
                          article.description
                            ? article.description.slice(0, 88)
                            : ""
                        }
                        url={article.url}
                        publishedAt={article.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }
}

export default NewsComponent;
