import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task">
      {/* Task Info Container */}
      <div className="task-info">
        <p className="taskName">
          <span className="textBold">Task:</span> {task.text}
        </p>
        <p className="taskDate">
          <span className="textBold">Date:</span> {task.day}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="task-icons">
        <FaPencilAlt 
            className="editIcon" 
            role="button"          // 1. Tells screen reader "This is a button"
            tabIndex={0}           // 2. Makes it focusable via Keyboard (Tab key)
            aria-label="Edit task" // 3. Description for blind users
            onClick={() => onEdit(task.id)} 
        />
        <FaTimes 
            className="delIcon" 
            role="button"
            tabIndex={0}
            aria-label="Delete task"
            onClick={() => onDelete(task.id)} 
        />
      </div>
    </div>
  )
}

export default Task;