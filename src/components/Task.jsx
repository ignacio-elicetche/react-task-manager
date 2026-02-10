import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task">
      {/* Left Side: Text and Date */}
      <div>
        <p className="taskName">
          <span className="textBold">Task:</span> {task.text}
        </p>
        <p className="taskDate">
          <span className="textBold">Date:</span> {task.day}
        </p>
      </div>

      {/* Right Side: Edit and Delete Icons */}
      <div className="task-icons">
        <FaPencilAlt 
            onClick={() => onEdit(task.id)} 
            className="editIcon" 
            title="Edit"
        />
        <FaTimes 
            onClick={() => onDelete(task.id)} 
            className="delIcon" 
            title="Delete"
        />
      </div>
    </div>
  )
}

export default Task;