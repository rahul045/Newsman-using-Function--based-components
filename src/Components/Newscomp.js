import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const Newscomp = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalArticles, setTotalArticles] = useState(0)



    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
        setLoading(true)
        let data = await fetch(url);
        // props.setProgress(30);
        let parseData = await data.json();
        console.log(parseData);
        setArticles(parseData.articles);
        setLoading(false)
        setTotalArticles(parseData.totalResults)

        props.setProgress(100);
    }
    useEffect(() => {

        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMan`
        updateNews();
        // eslint-disable-next-line
    }, [])
    const fetchMoreData = async () => {
        setPage(page + 1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pagesize}`;
        setLoading(true)

        let data = await fetch(url);
        let parseData = await data.json();
        setLoading(false)
        console.log(parseData);
        setArticles(articles.concat(parseData.articles));
        setTotalArticles(parseData.totalResults)

    };

    return (
        <>
            <h2 className="text-center" style={{ marginTop: "65px" }}>NewsMan - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalArticles}
                // hasMore={page + 1 > Math.ceil(totalArticles / props.pagesize)}
                loader={<Spinner />}
            >
                <div className='container my-3 mx-auto' style={{ width: "auto" }}>
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-3" key={index}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author ? element.author : "sources"} publishedAt={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : ""} />
                            </div>

                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button type="button " disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / props.pagesize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
        </>
    )
}

Newscomp.defaultProps = {
    country: 'stranger',
    pagesize: 8,
    category: "general"
}
Newscomp.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}
export default Newscomp

