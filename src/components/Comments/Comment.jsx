import React from 'react';
import './Comments.scss';

const Comment = ({ comment, date, replies, currentUserId, deleteComment }) => {

    // editar sólo si han pasado menos de cinco minutos
    const fiveMinutes = 30000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    // Usuario actual para poder editar
    const canReply = Boolean(currentUserId);
    /*     const canEdit = currentUserId === comment.userId && !timePassed; */
    const canEdit = comment.name === undefined && !timePassed;
    /*     const canDelete = currentUserId === comment.userId; */
    const canDelete = comment.name === undefined;

    return (
        <div className='comment'>
            <div className='comment-image-container'>
                <img src="/favicon.ico" alt="profile pic"></img>
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>{comment.email}</div>

                    {comment.name !== undefined
                        ? <div date={date} style={{ marginRight: `3rem` }}>Escrito el {date.toLocaleDateString('es-ES')}</div>
                        : <div className='today' createdat={comment.createdAt}>Escrito el {comment.createdAt}</div>
                    }
                </div>
                <div className='comment-text'>{comment.body}</div>
                <div className='comment-actions'>
                    {canReply && <div className='comment-action'>Contestar</div>}
                    {canEdit && <div className='comment-action'>Editar</div>}
                    {canDelete && (
                        <div
                            className='comment-action'
                            onClick={() => deleteComment(comment.id)}
                        >
                            Borrar
                        </div>
                    )}
                </div>
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replies={[]}
                                date={date}
                                createdat={comment.createdAt}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};

export default Comment;

