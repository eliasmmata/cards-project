import { getComments, postComment, deleteCommentApi } from "../../Api/Api";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

import './Comments.scss';


function generateRandomDate() {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
}


const Comments = ({ currentUserId }) => {
    const [error, setError] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);


    const [backendComments, setBackendComments] = useState([]);

    const rootComments = backendComments.filter(
        backendComment => backendComment.postId < 2
    );
    const getReplies = (commentId) => {
        return backendComments
            .filter(backendComment => backendComment.postId === commentId)
            .sort(
                (a, b) =>
                new Date(a.date).getTime() - new Date(a.date).getTime()
            );
    };

    const addComment = (text, postId) => {
        // console.log('addComment', text, "creado", createdAt);
        postComment(text).then(comment => {
            setBackendComments([comment, ...backendComments]);
            console.log( currentUserId)
            console.log( comment)
        })
    }

    const deleteComment = (commentId) => {
        if(window.confirm('¿ Estás seguro de borrar tu comentario ?')) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                )
                setBackendComments(updatedBackendComments)
            })
        }
    }

    useEffect(() => {
        getComments().then(
            (data) => {
                setBackendComments(data);
                setIsLoaded(true);
                // console.log('backendComments', data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error)
            }
        );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div style={{ textAlign: `center` }}>Loading...</div>;
    } else {
        return (
            <div className="comments" style={{ border: `1px solid blue`, margin: `0px 2rem 1rem`, padding: `5px` }}>
                <h3 className="comments-title" style={{ textAlign: `center` }}>Comentarios</h3>
                <div className="comment-form-title">Escribe tu comentario</div>
                <CommentForm submitLabel="Enviar" handleSubmit={addComment} />
                <div className="comments-container">
                    {rootComments.map((rootComment, index) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            date={generateRandomDate()}
                            replies={getReplies(rootComment.id)}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                        />
                    ))}
                </div>
            </div>
        );
    }
};

export default Comments;

