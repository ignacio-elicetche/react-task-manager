import { useState } from 'react';
import Swal from "sweetalert2";

const AddTask = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        // Validation Logic: Early Return Pattern
        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in both the task and the date!'
            });
            return;
        }

        if (!text) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Task',
                text: 'Please add a task description!'
            });
            return;
        }

        if (!day) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Date',
                text: 'Please add a day & time!'
            });
            return;
        }

        // If validation passes, submit data
        onSave({ text, day });

        // Reset form fields
        setText('');
        setDay('');
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="task-input">Task</label>
                <input 
                    id="task-input"
                    type="text" 
                    placeholder="Ex: Buy groceries" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
            </div>
            <div className="form-control">
                <label htmlFor="day-input">Day & Time</label>
                <input 
                    id="day-input"
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