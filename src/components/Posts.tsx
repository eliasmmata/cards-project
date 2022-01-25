
import React, { useEffect, useState } from "react";
import Comments, { generateRandomDate } from "./Comments/Comments";

import TypedPosts from "../Types/Posts.type";

import './Posts.scss';


type ChildrenProps = {
    posts: TypedPosts[],
    loading: boolean,
    error: any,
}

const Posts = ({ error, loading, posts }: ChildrenProps) => {

    // BORRAR POSTS SOLO DEL LADO CLIENTE SIN BORRAR DEL BACKEND
    const [/* post */, setList] = useState<any>([]);

    const deletePost = (index:any) => {
        alert('Estás seguro de borrar el post ')
        var updatePostList = posts
        updatePostList.splice(index,1);
        setList([...updatePostList])
    }

    if (error) {
        return <div>Error: {error/* .message */}</div>;
    } else if (loading) {
        return <div style={{ 'width': '100vw', height: `100vh`, marginTop: `45vh` }}>
            <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '2em', display: `flex`, justifyContent: `center` }}></i>
        </div>;
    } else {
        return (
            <section className="posts-container">
                {posts.map((post: TypedPosts, index: any) => (
                    <div className="post-with-comments-container" key={`${post.userId}${index}`}>
                        <div className="post-container" key={post.id}>
                            <h2 key={index.userId} style={{ textAlign: `center` }}>Post <span>{post.id}</span></h2>
                            <div className="post-container-info">
                                <div className="post-container-info-image">
                                    <img src="/favicon.ico" alt="post img" />
                                </div>
                                <div className="post-container-info-name">
                                    <p id="name" key={index.userId}>{post.userId.toString().replace(/[0-1]/g, 'John Doe')}</p>
                                    <p id="date" key={index.id}>{generateRandomDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="post-container-content">
                                <h3 key={index.title}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h3>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-x75NT3_toz7u1Z8JcoZnWsn4AgTTHX-8COWPxKNxFc81bIJDYeIAbiohp154zQXFR8&usqp=CAU" alt="post img" />
                            </div>
                            <p id="body-text" key={index.body}><span>Temática</span>{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
                            <button className="delete-post"  onClick={() => deletePost(index)}>
                                Borrar post {post.id}
                                <i className="pi pi-trash"></i>
                            </button>
                        </div>
                        <Comments currentUserId="999" />
                    </div>
                ))
                }
            </section >
        );
    }
};
export default Posts;