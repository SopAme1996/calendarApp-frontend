import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';


export const AddNewNote = () => {
    const {modalOpen} = useSelector(state => state.ui)
    const dispatch = useDispatch();
    const handleEventModal = () => {
        dispatch(uiOpenModal());
    }

    return (
        <>
            <button className={`btn btn-primary fab ${modalOpen && 'open'}`} onClick={handleEventModal}>
                <i className="fas fa-plus"></i>
            </button>
        </>
    )
}
