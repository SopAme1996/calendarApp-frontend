import React from 'react'
import { useForm } from '../hooks/useForm'

export const RegisterScreen = () => {
    const [rvalues, handleInputChange] = useForm({
        rname: '',
        rmail: '',
        rpassword: '',
        repitePassword: '',
    });

    const { rname, rmail, rpassword, repitePassword } = rvalues;

    console.log(rvalues);
    return (
        <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        onChange={handleInputChange}
                        value={rname}
                        name='rname'
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        onChange={handleInputChange}
                        value={rmail}
                        name='rmail'
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={handleInputChange}
                        value={rpassword}
                        name='rpassword'
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        onChange={handleInputChange}
                        value={repitePassword}
                        name='repitePassword'
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta" />
                </div>
            </form>
        </div>
    )
}
