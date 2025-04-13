import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoals, fetchTasksByGoal } from '../../redux/actions/goalActions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Sidebar.css';

const Sidebar = ({ onTaskDrag }) => {
  const dispatch = useDispatch();
  const { goals, tasks, selectedGoal } = useSelector(state => state.goals);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleGoalClick = (goalId) => {
    dispatch(fetchTasksByGoal(goalId));
  };

  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const { draggableId, source } = result;
    const task = tasks.find(task => task._id === draggableId);
    
    if (task) {
      onTaskDrag(task);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Goals</h3>
        <ul className="goals-list">
          {goals.map(goal => (
            <li
              key={goal._id}
              className={`goal-item ${selectedGoal === goal._id ? 'selected' : ''}`}
              onClick={() => handleGoalClick(goal._id)}
              style={{ borderLeftColor: goal.color }}
            >
              {goal.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Tasks</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="tasks-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => {
                  const goal = goals.find(g => g._id === task.goalId);
                  return (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-item"
                          style={{
                            backgroundColor: goal ? goal.color : '#ddd',
                            ...provided.draggableProps.style
                          }}
                        >
                          {task.name}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Sidebar;
