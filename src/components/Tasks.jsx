import Task from './Task';

const Tasks = ({ tasks, onDelete, onEdit }) => {
  return (
    <>
      {/* Map through the tasks array and render a Task component for each */}
      {tasks.map((task) => (
        <Task 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </>
  );
};

export default Tasks;