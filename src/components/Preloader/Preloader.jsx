import React from 'react';

import './Preloader.scss'

const Preloader = () => {
    return (
        <section className="preloader-section">
            <div className="preloader-container">
                <img id="logo" className="animate__animated animate__bounce" src={'/assets/img/logo.png'} alt="logo" />
                <h2 id="logo-name" className="animate__animated animate__fadeInUp">Demo Api Call <span>
                </span>Social Media with React</h2>
                <h3>Frontend Test for Cleverpy</h3>
                <a href="https://github.com/eliasmmata/slides-owl-react">Elías Moreno Mata</a>
            </div>
        </section>
    )
}

export default Preloader