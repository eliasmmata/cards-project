import React, { cloneElement, useEffect, useState } from "react";
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
    const [data, setData] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    // para al pinchar en el numero me muestre los posts de esa página
    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    }

    // para pasar el numero de páginas prev
    const handlePrevBtn = () => {
        setcurrentPage(currentPage - 1);
        console.log(currentPage);
        if(currentPage <= 1) {
            setcurrentPage(1);
        }
        else if (currentPage - 1 % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    // para pasar el numero de páginas next
    const handleNextBtn = () => {
        setcurrentPage(currentPage + 1);
        if(currentPage + 1 > 20) {
            console.log('última tengo que volver a primera');
            setcurrentPage(1);
        }
        else if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        } 
    }


    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

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
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    return (
        <>
            <h1>Pagination</h1> <br />
            {renderData(currentItems)}
            <ul className="page-numbers">
                <i
                    onClick={handlePrevBtn}
                    className="pi pi-angle-left" style={{ 'fontSize': '2em', 'display': 'flex', 'alignItems': 'center' }}
                ></i>
                {renderPageNumbers}
                <i
                    onClick={handleNextBtn}
                    className="pi pi-angle-right" style={{ 'fontSize': '2em', 'display': 'flex', 'alignItems': 'center' }}
                ></i>
            </ul>

        </>
    );
}

export default PaginationComponent;