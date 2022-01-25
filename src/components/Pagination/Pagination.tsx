import React from "react";
import './Pagination.scss';

type ChildrenPropsPagination = {
    postsPerPage: number,
    totalPosts: number,
    paginate: any
}



const PaginationComponent = ({ postsPerPage, totalPosts, paginate }: ChildrenPropsPagination) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <ul className="page-numbers">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a
                            onClick={(e) => {
                                paginate(number);
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'});
                                e.preventDefault();
                            }}
                            href={number.toString()} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );

}

export default PaginationComponent