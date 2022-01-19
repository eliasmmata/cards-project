import React, { useEffect, useState } from "react";
import './Pagination.scss';

const renderData = (data) => {
    return (
        <ul>
            {data.map((post, index) => {
                return <li key={index}>{post.title} {post.id}</li>;
            })}
        </ul>
    );
};

function PaginationComponent() {
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    const [data, setData] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, /* setitemsPerPage */] = useState(5);

    const [pageNumberLimit, /* setpageNumberLimit */] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // para al pinchar en el numero me muestre los posts de esa página
    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
        
    }

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? "active" : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });

    // para pasar el numero de páginas next
    const handleNextBtn = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    // para pasar el numero de páginas prev
    const handlePrevBtn = () => {
        setcurrentPage(currentPage - 1);
       if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }
    // puntos suspensivos si hay más páginas detrás o delante
    let pageNextDots = null;
    if (pages.length > maxPageNumberLimit) {
        pageNextDots = <li style={{ 'cursor': 'auto'}}>&hellip;</li>
    }
    let pagePrevDots = null;
    if (pages.length > maxPageNumberLimit || currentPage > 10) {
        pagePrevDots = <li style={{ 'cursor': 'auto'}}>&hellip;</li>
        if (currentPage <= 5) {
            pagePrevDots = null
        }
    }
    // implementación para leer más en la misma página

    /* const handleLoadMore = () => {
        setitemsPerPage(itemsPerPage + 5)
    }
 */

    return (
        <>
            <h1>Pagination</h1> <br />
            {renderData(currentItems)}
            <ul className="page-numbers">
                <li>
                    <button
                        onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}
                        className="pi pi-angle-left">
                    </button>
                </li>
                {pagePrevDots}
                {renderPageNumbers}
                {pageNextDots}
                <li>
                    <button
                        onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}
                        className="pi pi-angle-right">
                    </button>
                </li>
            </ul>
            {/* botón de implementación para leer más en la misma página */}
            {/* <button onClick={handleLoadMore} className="loadmore">
                Leer más
            </button> */}
        </>
    );
}

export default PaginationComponent;