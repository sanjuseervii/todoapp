import React from 'react';

// Props mein 'task' aur 'toggleComplete' lo
const TodoItem = ({ task, toggleComplete,deleteTodo }) => {

  return (
    <div className="flex justify-center items-center mt-4 px-4">
      <div className="w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg shadow-purple-500/30">
        <div className="bg-white rounded-[14px] flex items-center justify-between p-3">
          <div className="flex items-center gap-3 w-full">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleComplete(task.id)} 
              className="w-5 h-5 accent-purple-600 cursor-pointer"
            />
            
            {/* isCompleted check karke strikeout style apply hoga */}
            <span className={`font-medium truncate transition-all duration-300 ${
              task.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
            }`}>
              {task.text} 
            </span>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-xl text-sm transition-all active:scale-95" onClick={()=>deleteTodo(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;