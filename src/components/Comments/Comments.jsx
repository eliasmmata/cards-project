import { getComments, postComment, deleteComments, updateComments } from "../../Api/Api";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

import './Comments.scss';


export function generateRandomDate() {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
}


const Comments = ({ currentUserId }) => {
    // Ver comentarios al clickar
    const [showComments, setShowComments] = useState(false);
    // Cambiar texto para ocultar comentarios
    const [buttonText, setButtonText] = useState(false);

    const showHideComments = () => {
        console.log(rootComments.index);
        setShowComments(!showComments);
        setButtonText(!buttonText);
    }

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const [backendComments, setBackendComments] = useState([]);

    const [activeComment, setActiveComment] = useState(null);

    const rootComments = backendComments.filter(
        backendComment => backendComment.postId < 2
    );

    const getReplies = (commentId) => {
        return backendComments
            .filter(backendComment => backendComment.postId === commentId)
            .filter(backendComment => backendComment.email !== "Eliseo@gardner.biz")
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(a.date).getTime()
            )
    };

    const addComment = (text, parentId) => {
        console.log('comentario Añadido', text, 'parentId', parentId);
        postComment(text, parentId).then((comment) => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        })
    }


    const deleteComment = (commentId) => {
        if (window.confirm('¿ Estás seguro de borrar tu comentario ?')) {
            deleteComments(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                )
                setBackendComments(updatedBackendComments)
            })
        }
    }

    const updateComment = (text, commentId) => {
        updateComments(text).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    useEffect(() => {
        getComments().then(
            (data) => {
                setLoading(true);
                setBackendComments(data);
                setLoading(false);
            },
            (error) => {
                setLoading(true);
                setError(error)
            }
        );
    }, []);

    if (error) {
        return <div>Error: {error/* .message */}</div>;
    } else if (loading) {
        return  <div style={{ 'width': '100vw', height:`100vh`, marginTop:`45vh`}}>
                    <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '2em', display: `flex`, justifyContent: `center` }}></i>
                </div>;
    } else {
        return (
            <div className="comments-container">
                <div className="comments-form-title">
                    <p>{rootComments.length} comentarios</p>
                </div>
                <CommentForm submitLabel="Enviar" handleSubmit={addComment} />
                <p
                    onClick={showHideComments}
                    className="comments-read"> {buttonText ? 'Ocultar comentarios' : 'Ver comentarios'}
                    {!buttonText ?
                    <i className="pi pi-sort-amount-down-alt" style={{'fontSize': '1em', marginLeft:`2rem`}}></i>
                    : <i className="pi pi-sort-amount-up" style={{'fontSize': '1em', marginLeft:`2rem`}}></i>
                    }
                </p>

                {showComments ?
                    <div className="comments-list">
                        {rootComments.map((rootComment, index) => (
                            <Comment
                                key={rootComment.id}
                                comment={rootComment}
                                date={generateRandomDate()}
                                replies={getReplies(rootComment.id)}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                updateComment={updateComment}
                            />
                        ))}
                        <i onClick={showHideComments} className="pi pi-times"></i>
                    </div> : null}

            </div>
        );
    }
};

export default Comments;