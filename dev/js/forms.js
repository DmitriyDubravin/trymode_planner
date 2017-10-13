import React from 'react';

export const Form = ({submitHandler, children}) => <form onSubmit={submitHandler} action="#">{children}</form>;
export const FormRow = ({children}) => <div className="line">{children}</div>;
export const Input = ({reference, type = 'text', placeholder = ''}) => <input ref={reference} type={type} placeholder={placeholder} />;
export const Select = ({changeHandler, children}) => <select onChange={changeHandler}>{children}</select>;
export const Textarea = ({val, reference, placeholder}) => <textarea value={val} placeholder={placeholder} ref={reference}></textarea>;
export const Button = ({clickHandler, type = 'submit', text = 'Button'}) => <button onClick={clickHandler} type={type}>{text}</button>;
export const FormError = ({children}) => <div className="form-error">{children}</div>;
