import React from 'react';
import CommentForm from './CommentForm';
import './Comments.scss';


const Comment = ({
    comment,
    date,
    replies,
    currentUserId,
    activeComment,
    setActiveComment,
    addComment,
    deleteComment,
    updateComment,
    parentId = null,
}) => {
    
    /* console.log('parentid', parentId);
    console.log('comment', comment.email, 'comment id', comment.id, 'postId', comment.postId)
    console.log('Active comment', activeComment) */
    
    

    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;

    const canReply = Boolean(currentUserId);

    /* const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed; */
    const canDelete = comment.name === undefined;
    /* const canEdit = currentUserId === comment.userId && !timePassed; */
    const canEdit = comment.name === undefined && !timePassed;

    const replyId = parentId ? parentId : comment.postId;
    /* console.log(replyId , "replyId")
    console.log(parentId, "parentId")
    console.log(comment.id, "commentId") */

    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";

    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";


    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <img src="/favicon.ico" alt="profile pic"></img>
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div email={comment.email} className="comment-author">
                        {comment.username} {comment.email}
                    </div>
                    {comment.name !== undefined
                        ? <div className='comment-date' date={date} style={{ marginRight: `3rem` }}>{date.toLocaleDateString('es-ES')}</div>
                        : <div className='comment-date' createdat={comment.createdAt}>{comment.createdAt}</div>
                    }
                </div>
                {!isEditing && <div className="comment-text">{comment.body.charAt(0).toUpperCase() + comment.body.slice(1)}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Actualizar"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id, parentId, replyId ,comment.postId)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                <div className="comment-actions">
                    {canReply && (
                        <div 
                            className="comment-action"
                            onClick={() =>
                                setActiveComment({ id: comment.id, type: "replying", email: comment.email })
                            }
                        >
                            Contestar
                        </div>
                    )}
                    {canEdit && (
                        <div 
                            className="comment-action"
                            onClick={() =>
                                setActiveComment({ id: comment.id, type: "editing" })
                            }
                        >
                            Editar
                        </div>
                    )}
                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() => deleteComment(comment.id)}
                        >
                            Delete
                        </div>
                    )}
                </div>
                {isReplying &&  (
                    <CommentForm
                        submitLabel="Responder"
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replies={[]}
                                date={date}
                                createdat={comment.createdAt}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                updateComment={updateComment}
                                parentId={comment.id}
                                email={comment.email}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;