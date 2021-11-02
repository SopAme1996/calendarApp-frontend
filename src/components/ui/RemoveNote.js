import React from 'react'

import { useDispatch } from 'react-redux'
import { enventRemove } from '../../actions/events';

export const RemoveNote = () => {
    const dispatch = useDispatch();

    const handleRemoveEvent = () => {
        dispatch(enventRemove());
    }

    return (
        <button className='btn btn-danger fab_remove'  onClick={handleRemoveEvent}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
