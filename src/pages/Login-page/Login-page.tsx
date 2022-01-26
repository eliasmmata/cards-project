import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import './Login-page.scss';

type FormData = {
  user: string;
  password: string;
};

const Login = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));

  if(errors) {
    console.log(errors);
  }

  return (
    <section className="login-section animate__animated animate__fadeIn">
      <div className="login-container">
        <div className="session-container">
          <Link to="/login" style={{ borderBottom: `3px solid #13505B`, pointerEvents: `none` }}>
            Iniciar Sesión
          </Link>
          <Link to="/register" style={{ borderBottom: `3px solid #fff`, pointerEvents: `none` }}>
            Regístrate
          </Link>
        </div>
        <h3>Inicia sesión <span>ahora</span></h3>
        <div className="buttons-container">
          <button id="facebook-button">
            <i className="pi pi-facebook"></i>
            Facebook
          </button>
          <button id="google-button">
            <i className="pi pi-google"></i>
            <span><span className="g-blue">G</span><span
              className="o-red">o</span><span className="o-yellow">o</span><span className="g-blue">g</span><span
                className="l-green">l</span><span className="o-red">e</span></span>
          </button>
        </div>
        <p id="useMail">o utiliza tu correo electrónico</p>
      </div>
      <form className="register-form" onSubmit={onSubmit}>
        <label>Usuario</label>
        <input {...register("user")} placeholder="Click Ingresar"/>
        <label>Contraseña</label>
        <input {...register("password")} placeholder="Test, no necesaria" />
        <Link to="/posts">
          <button className="login-button"
            type="button"
            onClick={() => {
              setValue("user", "admin");
              setValue("password", "test");
            }}
          >
            Ingresar
          </button>
        </Link>
      </form>

    </section>
  );
}

export default Login;