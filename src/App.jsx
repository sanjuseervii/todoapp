import React, { useState,useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import TodoItem from './components/Todo'
import confetti from 'canvas-confetti'; // Import confetti
import { motion, AnimatePresence } from 'framer-motion'; //
const App = () => {
    const [input, setinput] = useState("");
    const [msg, setMsg] = useState("");
    const [todo, settodo] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    
    const handleinput = (e) => { setinput(e.target.value) }
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todo));
    }, [todo]);
    const addtodo = () => {
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
    settodo(todo.map(item => {
        if (item.id === id) {
            const updatedStatus = !item.isCompleted;

            // 🎉 Party condition: Agar task ab complete ho raha hai (true ban raha hai)
            if (updatedStatus === true) {
                // 1. Confetti (Party Bomb)
                confetti({
                    particleCount: 1000,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                const compliments=[
    "Boom! Task Crushed! 🚀",
    "You're on fire today! 🔥",
    "Absolute Legend! 🏆",
    "Productivity Level: God Mode ⚡",
    "Look at you go! 🌟",
    "Task: Terminated. 😎",
    "You're making this look easy! ✨",
    "Keep that momentum building! 📈",
    "Another one bites the dust! 💥",
    "Unstoppable! 🦾"
];
                
                const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
                setMsg(randomMsg);
                //message dsappear after 3 seconds 
                setTimeout(() => setMsg(""), 3000);
            }

            return { ...item, isCompleted: updatedStatus };
        }
        return item;
    }));
};
    const deleteTodo = (id) => {
        settodo(todo.filter(item => item.id !== id));
    }
    return (
        <>
        
            <Navbar />
            <main>
                {/* 1. Animation wala part yahan rakhein */}
            <AnimatePresence>
                {msg && (
                   <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }} // Scale 1.2 ki jagah 1 rakhein mobile ke liye
    exit={{ opacity: 0, scale: 0.5, y: -50 }}
    style={{
        position: "fixed",
        top: "15%", // Phone par thoda upar rakha hai taaki keyboard ya haath ke niche na aaye
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#ffeb3b",
        padding: "12px 20px", // Padding thodi kam kar di
        borderRadius: "50px",
        fontWeight: "bold",
        boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
        zIndex: 2000, // Z-index high rakhein
        fontSize: "18px", // Font size 18px phone ke liye perfect hai
        color: "#333",
        textAlign: "center",
        width: "80%", // Ye phone par screen ke hisab se width lega
        maxWidth: "350px", // Desktop par bahut bada nahi hoga
        whiteSpace: "nowrap", // Text ko ek hi line mein rakhega
        pointerEvents: "none" // Taaki message ke beech mein aane se click karne mein dikkat na ho
    }}
>
    {msg}
</motion.div>
                )}
            </AnimatePresence>
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