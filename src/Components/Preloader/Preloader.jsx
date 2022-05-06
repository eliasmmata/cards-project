import React from 'react';

import './Preloader.scss'

const Preloader = () => {
    return (
        <section className="preloader-section">
            <div className="preloader-container">
                <img id="logo" className="animate__animated animate__bounce" src={'/assets/img/logo.png'} alt="logo" />
                <h2 id="logo-name" className="animate__animated animate__fadeInUp">Demo Api Call <span>
                Social Media with React</span></h2>
                <h3 className="animate__animated animate__fadeInUp">Frontend Test</h3>
                <a href="https://github.com/eliasmmata/social-media">Elías Moreno Mata</a>
            </div>
        </section>
    )
}

export default Preloader