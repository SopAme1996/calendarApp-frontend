import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';
import { customStyles } from '../../helpers/CalendarModal-style';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux'
import { uiCloseModal } from '../../actions/ui';
import { eventAddNewNote, eventRemoveNoteActive, eventUpdated } from '../../actions/events';


Modal.setAppElement('#root');

const startDate = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = startDate.clone().add(1, 'hours');

const formulario = {
    start: startDate.toDate(),
    end: endDate.toDate(),
    title: '',
    notes: '',
}


export const CalendarModal = () => {

    const [values, handleInputChange, setValues, reset] = useForm(formulario);
    const [dateStart, setStartDate] = useState(startDate.toDate());
    const [dateEnd, setEndDate] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);
    const { ui } = useSelector(state => state);
    const { activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const { title, notes } = values;


    useEffect(() => {
        if (activeEvent) {
            setValues(activeEvent);
            setStartDate(activeEvent.start);
            setEndDate(activeEvent.end);
        } else {
            setValues(formulario);
            setStartDate(startDate.toDate());
            setEndDate(endDate.toDate());
        }
    }, [activeEvent, setValues])

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventRemoveNoteActive());
        reset();
        setStartDate(startDate.toDate());
        setEndDate(endDate.toDate());
    }

    const handleInputStartDate = (e) => {
        setStartDate(e);
        setValues({
            ...values,
            start: e
        });

    }

    const handleInputEndDate = (e) => {
        setEndDate(e);
        setValues({
            ...values,
            end: e
        });
    }

    const handleSave = (e) => {
        e.preventDefault();

        const momentStart = moment(dateStart);
        const momentEnd = moment(dateEnd);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio');
            return;
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        //Se guarda la información nueva del usuario
        if (activeEvent === null) {
            dispatch(eventAddNewNote({
                ...values,
                id: new Date().getTime(),
                user: {
                    id: 1996,
                    name: 'Mario Ciau'
                }
            }));
        } else {
            dispatch(eventUpdated(values));
        }
        reset();

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ui.modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
            contentLabel='Modal'
        >

            <h1>{(!activeEvent) ? 'Nuevo Evento' : 'Editar Evento'}</h1>
            <hr />
            <form className="container" onSubmit={handleSave}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleInputStartDate}
                        value={dateStart}
                        className="form-control"
                        name="f_inicial"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleInputEndDate}
                        value={dateEnd}
                        className="form-control"
                        name='f_final'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        onChange={handleInputChange}
                        value={title}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        onChange={handleInputChange}
                        value={notes}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal >
    )
}
