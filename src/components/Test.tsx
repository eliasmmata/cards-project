/* import React, { useState, useEffect } from "react";
import Comments, { generateRandomDate } from "./Comments/Comments";
import { getPosts } from "../Api/Api";

import TypedPosts from "../Types/Posts.type";


import PaginationComponent from "./Pagination/Pagination";
import './Posts.scss';


const Posts = () => {
    

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState<TypedPosts[]>([]);


    useEffect(() => {
        getPosts().then(
            (res:any) => {
                setPosts(res);
                setIsLoaded(true);
            },
            (error: Error) => {
                setIsLoaded(true);
                setError(error as never);
            }
        );
    }, []);


    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <h3 style={{ textAlign: `center` }}>Loading...</h3>;
    } else {
        return (
            <div>
                <PaginationComponent
                    
                />
                {posts.map((post:TypedPosts, index:number) => (
                    <div className="post-with-comments-container" key={`${post.userId}${index}`}>
                        <div className="post-container" key={index}>
                            <h2 key={index.userId} style={{ textAlign: `center` }}>Post <span>{post.id}</span></h2>
                            <div className="post-container-info">
                                <div className="post-container-info-image">
                                    <img src="/favicon.ico" alt="post img" />
                                </div>
                                <div className="post-container-info-name">
                                    <p id="name" key={index.userId}>{post.userId.toString().replace(post.userId, 'John Doe')}</p>
                                    <p id="date" key={index.id}>{generateRandomDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="post-container-content">
                                <h3 key={index.title}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h3>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-x75NT3_toz7u1Z8JcoZnWsn4AgTTHX-8COWPxKNxFc81bIJDYeIAbiohp154zQXFR8&usqp=CAU" alt="post img" />
                            </div>
                            <p id="body-text" key={index.body}><span>Temática</span>{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
                        </div>
                        <Comments currentUserId="999" />
                    </div>

                ))}
            </div>
        );
    }
};
export default Posts; */