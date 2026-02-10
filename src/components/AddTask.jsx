import { useState } from 'react';
import Swal from "sweetalert2";

const AddTask = ({ onSave }) => {
    // 1. States: Form memory
    const [text, setText] = useState('');
    const [day, setDay] = useState('');

    // 2. Function executed on form submit
    const onSubmit = (e) => {
        e.preventDefault(); // Prevents page reload (Vital in React!)

        // Validations with SweetAlert
        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must fill in the task and the date!'
            })
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You forgot to write the task!'
            })
        } else if (text && !day) { // Fixed logic: Text exists, Day is missing
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You forgot the date!'
            })
        } else {
            // If everything is okay, send data to parent (App.jsx)
            onSave({ text, day });
            
            // Clear form
            setText('');
            setDay('');
        }
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input 
                    type="text" 
                    placeholder="Ex: Buy groceries" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input 
                    type="text" 
                    placeholder="Ex: Feb 5th at 2:30pm" 
                    value={day} 
                    onChange={(e) => setDay(e.target.value)} 
                />
            </div>
            
            <input type="submit" className="btn btn-block" value="Save Task" />
        </form>
    )
}

export default AddTask;