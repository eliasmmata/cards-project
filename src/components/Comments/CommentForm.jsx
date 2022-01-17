import React, { useState } from 'react';

import './Comments.scss';

const CommentForm = ({ handleSubmit, submitLabel}) => {
   
    const [text, setText] = useState("");

    // para que botón esté deshabilitado si no hay texto
    const isTextareaDisabled = text.length === 0;
   
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea
                    className='comment-form-textarea'
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <button className='comment-form-button' disabled={isTextareaDisabled}>{submitLabel}</button>
            </form>
        </div>
        )

};

export default CommentForm;