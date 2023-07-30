'use client';
import { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';

export default function Home() {
  const [todos, setTodos] = useState<string[]>([])
  const [completedTodos, setCompletedTodos] = useState<boolean[]>([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    const storedCompletedTodos = localStorage.getItem("completedTodos")

    if(storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }

    if(storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos])

  function addTodo() {
    if(newTodo.trim() !== '') {
      setTodos([...todos, newTodo])
      setCompletedTodos([...completedTodos, false])
      setNewTodo('')
    }
  }

  function deleteTodo(index: number) {
    const updatedTodos = [...todos];
    const updatedCompletedTodos = [...completedTodos];

    updatedTodos.splice(index, 1)
    updatedCompletedTodos.splice(index, 1)

    setTodos(updatedTodos)
    setCompletedTodos(updatedCompletedTodos);
  }

  function completeTodo(index: number) {
    const updatedCompletedTodos = [...completedTodos]
    updatedCompletedTodos[index] = !updatedCompletedTodos[index]
    setCompletedTodos(updatedCompletedTodos)
  }

  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex gap-3">
        <input 
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm" 
          placeholder="Task" 
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button 
          className="rounded-full px-4 py-2 border text-sm hover:text-slate-400"
          onClick={addTodo}
        >
          Adicionar
        </button>
      </div>
      
      <ul className="py-5">
        {todos.map((todo, index) => (
          <div className="flex gap-3 items-center" key={index}>
            <input 
              className="cursor-pointer" 
              type="checkbox"
              checked={completedTodos[index]}
              onClick={() => completeTodo(index)} 
            />
            <li className={`list-none py-1 ${completedTodos[index] ? 'line-through' : ''}`}>{todo}</li>
            <AiOutlineClose
              className="cursor-pointer hover:fill-[red]"
              onClick={() => deleteTodo(index)}
            />
          </div>
        ))}
      </ul>
    </main>
  )
}
