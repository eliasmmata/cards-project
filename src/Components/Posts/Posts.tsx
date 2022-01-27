
import React, { useState } from "react";
import Comments, { generateRandomDate } from "../Comments/Comments";

import TypedPosts from "../../Types/Posts.type";

import './Posts.scss';

type ChildrenProps = {
    posts: TypedPosts[],
    loading: boolean,
    error: null
}

const Posts = ({ error, loading, posts }: ChildrenProps) => {

    // BORRAR POSTS SOLO DEL LADO CLIENTE SIN BORRAR DEL BACKEND
    const [/* post */, setList] = useState<TypedPosts[]>([]);

    const deletePost = (index:number) => {
        alert('Estás seguro de borrar el post ')
        var updatePostList = posts
        updatePostList.splice(index,1);
        setList([...updatePostList])
    }

    if (error) {
        return <div>Error: {error}</div>;
    } else if (loading) {
        return <div style={{ 'width': '90vw', height: `100vh`, marginTop: `45vh` }}>
            <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '2em', display: `flex`, justifyContent: `center` }}></i>
        </div>;
    } else {
        return (
            <section className="posts-container animate__animated animate__fadeIn">
                {posts.map((post: TypedPosts, index:number) => (
                    <div className="post-with-comments-container" key={`${post.id}${index}`}>
                        <div className="post-container" /* key={post.id} */>
                            <h2 key={posts[index].id} style={{ textAlign: `center` }}>Post <span>{post.id}</span></h2>
                            <div className="post-container-info">
                                <div className="post-container-info-image">
                                    <img src="/favicon.ico" alt="post img" />
                                </div>
                                <div className="post-container-info-name">
                                    <p id="name" key={posts[index].userId}>{post.userId.toString().replace(/[0-1]/g, 'John Doe')}</p>
                                    <p id="date" /* key={posts[index].id} */>{generateRandomDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="post-container-content">
                                <h3 key={posts[index].title}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h3>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-x75NT3_toz7u1Z8JcoZnWsn4AgTTHX-8COWPxKNxFc81bIJDYeIAbiohp154zQXFR8&usqp=CAU" alt="post img" />
                            </div>
                            <p id="body-text" key={posts[index].body}><span>Temática</span>{post.body.charAt(0).toUpperCase() + post.body.slice(1)}</p>
                            <button className="delete-post"  onClick={() => deletePost(index)}>
                                Borrar post {post.id}
                                <i className="pi pi-trash"></i>
                            </button>
                        </div>
                        <Comments currentUserId="999" comments={[]} handleCancel={undefined} createdat={undefined} email={undefined} />
                    </div>
                ))
                }
            </section>
        );
    }
};
export default Posts;