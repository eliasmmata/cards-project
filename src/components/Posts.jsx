import React, { useState, useEffect } from "react";

import Comments from "./Comments/Comments";

import { getPosts, postComment } from "../Api/Api";

const Posts = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(
            (res) => {
                setPosts(res);
                // console.log(res.data);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, []);


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <h3 style={{ textAlign: `center` }}>Loading...</h3>;
    } else {
        return (
            <div>
                {posts.map((post, index) => (
                    <div key={`${post.userId}${index}`}>
                        <div key={index} style={{ border: `1px solid red`, margin: `0px 2rem`, padding: `5px` }}>
                            <h3 key={index.userId} style={{textAlign:`center`}}>Post</h3>
                            <p key={index.userId}>userId: {post.userId}</p>
                            <p key={index.id}>id: {post.id}</p>
                            <p key={index.title}>title: {post.title}</p>
                            <p key={index.body}>body: {post.body}</p>
                        </div>
                        <Comments currentUserId="999" />
                    </div>
                    
                ))}
            </div>
        );
    }
};
export default Posts;