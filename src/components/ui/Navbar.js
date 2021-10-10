import React from 'react'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Fernando
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span>
                    Salir
                </span>
            </button>
        </nav>
    )
}
