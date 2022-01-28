import React from 'react';
import './login.css';
import { RegisterScreen } from './RegisterScreen';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {
    const [lvalues, handleInputChange] = useForm({
        lmail: '',
        lpassword: '',
    });
    const { lmail, lpassword } = lvalues;

    return (
        <div className="container_padre">
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3>Ingreso</h3>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    onChange={handleInputChange}
                                    value={lmail}
                                    name='lmail'
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    onChange={handleInputChange}
                                    value={lpassword}
                                    name='lpassword'
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login"
                                />
                            </div>
                        </form>
                    </div>

                    <RegisterScreen />
                </div>
            </div>
        </div>
    )
}