import React, { useState,useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import TodoItem from './components/Todo'

const App = () => {
    const [input, setinput] = useState("")
    const [todo, settodo] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });


    const handleinput = (e) => { setinput(e.target.value) }
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todo));
    }, [todo]);
    const addtodo = () => {
        // Khali task rokne ke liye
        if (input.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                text: input,
                isCompleted: false
            };
            settodo([...todo, newTodo]);
            setinput(""); // Input box clear ho jayega
        }
    }

    const toggleComplete = (id) => {
        settodo(todo.map(item =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        ));
    };
    const deleteTodo = (id) => {
        settodo(todo.filter(item => item.id !== id));
    }
    return (
        <>
            <Navbar />
            <main>
                <div className='flex items-center justify-center p-4 w-full h-50 text-2xl m-0'>
                    JUST DO IT
                </div>
                <div className="flex justify-center items-center mt-10 px-4">
                    <div className="w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg shadow-purple-500/30">
                        <div className="bg-white rounded-[14px] flex items-center p-2">
                            <input
                                type="text"
                                value={input} // Yeh line bohot important hai!
                                placeholder="Add a new task..."
                                className="w-full px-4 py-2 text-gray-700 bg-transparent border-none outline-none focus:ring-0"
                                onChange={handleinput}
                            />
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-all active:scale-95" onClick={addtodo}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    {todo.map((item) => (
                        <TodoItem
                            key={item.id}
                            task={item} // Iska naam dhyan se Todo.jsx mein use karna
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}
export default App