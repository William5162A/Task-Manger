import React, { useState, useRef, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    // تحميل المهام من Local Storage عند بدء التشغيل
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks 
      ? JSON.parse(savedTasks) 
      : [
          { check: false, name: 'Create a React component', edit: false },
          { check: true, name: 'Add Tailwind styling', edit: false },
        ];
  });
  
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const editInputRefs = useRef([]);

  // حساب المهام المكتملة مباشرة
  const completedTasksCount = tasks.filter(task => task.check).length;

  // حفظ المهام في Local Storage عند كل تغيير
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  // تحميل المهام عند بدء التطبيق
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // إضافة مهمة جديدة
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { check: false, name: newTask, edit: false }]);
      setNewTask('');
    } else {
      alert('Please enter a task name');
    }
  };

  // تبديل حالة المهمة (تمت/لم تتم)
  const toggleCheck = (index) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, check: !task.check } : task
      );
      return updatedTasks;
    });
  };

  // بدء عملية التعديل
  const startEdit = (index) => {
    setTasks(prevTasks => {
      return prevTasks.map((task, i) =>
        i === index ? { ...task, edit: true } : task
      );
    });
  };

  // حفظ التعديلات
  const saveEdit = (index) => {
    setTasks(prevTasks => {
      return prevTasks.map((task, i) =>
        i === index ? { ...task, edit: false } : task
      );
    });
  };

  // حذف المهمة
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // تحديث اسم المهمة أثناء التعديل
  const updateTaskName = (index, value) => {
    setTasks(prevTasks => {
      return prevTasks.map((task, i) =>
        i === index ? { ...task, name: value } : task
      );
    });
  };

  // التركيز على حقل التعديل عند التصيير
  useEffect(() => {
    if (!isLoading) {
      tasks.forEach((task, index) => {
        if (task.edit && editInputRefs.current[index]) {
          editInputRefs.current[index].focus();
        }
      });
    }
  }, [tasks, isLoading]);

  // إعادة تعيين جميع المهام
  const resetTasks = () => {
    if (window.confirm('Are you sure you want to reset all tasks?')) {
      localStorage.removeItem('tasks');
      setTasks([
        { check: false, name: 'Create a React component', edit: false },
        { check: true, name: 'Add Tailwind styling', edit: false },
      ]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {isLoading ? "Loading tasks..." : "Data saved in your browser"}
        </div>
        <button 
          onClick={resetTasks}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
        >
          Reset Tasks
        </button>
      </div>

      <div className="py-5 bg-white rounded-lg shadow-md p-6">
        {/* إضافة مهمة جديدة */}
        <div className="flex pb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-3 border-2 border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 px-6 text-white hover:bg-blue-800 transition-all rounded-r-xl font-medium"
          >
            Add
          </button>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* قائمة المهام */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks yet. Add your first task!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                className={`flex items-center p-4 rounded-xl border border-gray-200 my-3 ${
                  task.check ? 'bg-green-50' : 'bg-white'
                } transition-all duration-200 shadow-sm hover:shadow-md`}
                key={index}
              >
                {/* صندوق الاختيار */}
                <input
                  type="checkbox"
                  checked={task.check}
                  onChange={() => toggleCheck(index)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />

                {/* محتوى المهمة */}
                <div className="mx-4 flex-1 min-w-0">
                  {task.edit ? (
                    <div className="flex items-center">
                      <input
                        ref={el => editInputRefs.current[index] = el}
                        type="text"
                        value={task.name}
                        onChange={(e) => updateTaskName(index, e.target.value)}
                        className="flex-1 p-2 border-2 border-blue-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => saveEdit(index)}
                        className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        Save
                      </button>
                    </div>
                  ) : task.check ? (
                    <del className="text-gray-600 block truncate">{task.name}</del>
                  ) : (
                    <span className="text-gray-800 block truncate">{task.name}</span>
                  )}
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex space-x-2 min-w-[140px] justify-end">
                  {!task.edit ? (
                    <button
                      onClick={() => startEdit(index)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                    >
                      Edit
                    </button>
                  ) : null}
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* إحصائيات المهام */}
      <div className="bg-white rounded-lg shadow-md mt-6 p-4">
        <div className="flex justify-between py-2 text-gray-700 font-medium">
          <div className="flex items-center">
            <span className="mr-2">📋</span>
            <p>Total tasks: {tasks.length}</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <p>Completed: {completedTasksCount}</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">⏳</span>
            <p>Pending: {tasks.length - completedTasksCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
