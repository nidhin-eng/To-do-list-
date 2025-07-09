import React, { useState } from 'react';

const TodoList = () => {
    // State variables for task details and tasks list
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    // Add or update a task
    const addOrUpdateTask = () => {
        if (taskName.trim() && taskCategory.trim()) {
            if (editIndex !== null) {
                const updatedTasks = tasks.map((task, index) =>
                    index === editIndex
                        ? { ...task, name: taskName, category: taskCategory }
                        : task
                );
                setTasks(updatedTasks);
                setEditIndex(null);
            } else {
                setTasks([
                    ...tasks,
                    { name: taskName, category: taskCategory, completed: false }
                ]);
            }
            setTaskName('');
            setTaskCategory('');
        }
    };

    // Populate form with existing task details for editing
    const editTask = (index) => {
        const taskToEdit = tasks[index];
        setTaskName(taskToEdit.name);
        setTaskCategory(taskToEdit.category);
        setEditIndex(index);
    };

    // Delete a task
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Toggle task completion status
    const toggleTaskCompletion = (index) => {
        setTasks(tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        ));
    };

    // Custom styles
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        },
        inputContainer: {
            marginBottom: '20px',
        },
        input: {
            padding: '8px',
            marginRight: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#007BFF',
            color: 'white',
        },
        taskList: {
            listStyleType: 'none',
            padding: 0,
        },
        taskItem: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        taskName: (completed) => ({
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? '#888' : '#000',
            fontWeight: completed ? 'bold' : 'normal',
        }),
        category: {
            fontSize: '12px',
            fontStyle: 'italic',
        },
        editButton: {
            marginRight: '5px',
            backgroundColor: '#FF8C00',
            color: 'white',
        },
        deleteButton: {
            backgroundColor: '#FF6347',
            color: 'white',
        }
    };

    return (
        <div style={styles.container}>
            <h1>Todo List</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Task Description"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Task Category"
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    style={styles.input}
                />
                <button onClick={addOrUpdateTask} style={styles.button}>
                    {editIndex !== null ? 'Save' : 'Add Task'}
                </button>
            </div>
            <ul style={styles.taskList}>
                {tasks.map((task, index) => (
                    <li key={index} style={styles.taskItem}>
                        <div>
                            <span style={styles.taskName(task.completed)}>{task.name}</span>
                            <div style={styles.category}>{task.category}</div>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleTaskCompletion(index)}
                                style={styles.button}
                            >
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                onClick={() => editTask(index)}
                                style={{ ...styles.button, ...styles.editButton }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTask(index)}
                                style={{ ...styles.button, ...styles.deleteButton }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;