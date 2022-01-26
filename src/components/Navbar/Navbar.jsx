import React from 'react';
import './Navbar.scss';
import '../../index.scss';

const Navbar = () => {
    return (
        <>
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                    <h5 className="text-white h4">Demo JSON placeholder API</h5>
                    <span className="text-muted">Future Navbar implementation</span>
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h3>Frontend Demo</h3>
                </div>
            </nav>
        </>
    )
}

export default Navbar;