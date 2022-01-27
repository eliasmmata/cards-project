import React, { useState } from 'react';

import './Comments.scss';

type TypedCommentForm = {
    handleSubmit: Function;
    submitLabel: string;
    hasCancelButton?: boolean | undefined;
    initialText?: string | undefined;
    handleCancel: any;
}

const CommentForm = ({ handleSubmit, submitLabel, hasCancelButton = false, initialText="", handleCancel }:TypedCommentForm) => {

    const [text, setText] = useState(initialText);

    // para que botón esté deshabilitado si no hay texto
    const isTextareaDisabled = text.length === 0;

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder="Escribe un comentario..."
                    className='comment-form-textarea'
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <div className='button-container'>
                    <button className='comment-form-button' disabled={isTextareaDisabled}>
                        {submitLabel}
                    </button>
                    {hasCancelButton && (
                        <button
                        type="button"
                        className='comment-form-button comment-form-cancel-button'
                        onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
        )

};

export default CommentForm;