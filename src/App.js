import React, { useState ,useRef,useEffect} from 'react';
import TodoList from "./TodoList";
import {v4 as uuid} from 'uuid';
import './style.css';


const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos,setTodos]=useState([]);
  const todoNameRef=useRef();


  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  },[]);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos));
  }, [todos]);
  
  

  function toggleTodo(id){
    const newTodos=[...todos];
    const todo=newTodos.find(todo=>todo.id===id);
    todo.complete=!todo.complete;
    setTodos(newTodos);
  }

function handleAddTodo(e){
  const name=todoNameRef.current.value;
  if(name==='')return
  setTodos(prevTodos=>{
    return [...prevTodos,{id:uuid(),name:name,complete:false}]
  })
  todoNameRef.current.value=null;
}


function handleClearTodo(e){
  const newTodos=todos.filter(todo=>!todo.complete);
  setTodos(newTodos);
}


/*
if((todos.filter(todo=>!todo.complete).length)<3){
  var x=document.querySelector('p');
  x.setAttribute("class","toomuch");
}else{
  document.querySelector('p').setAttribute("class","relax");
}
*/
  return (
    <>
    <div class="html">
    <div class="carte">
    <h1>TodoList</h1>
    <input ref={todoNameRef} type="text"/>
    <div class="buttons">
    <button onClick={handleAddTodo}>Ajouter une tâche</button>
    <button onClick={handleClearTodo}>Supprimer les tâches réalisées</button>
    </div>
    <p id="nrTodo">{todos.filter(todo=>!todo.complete).length} tâches à completer</p>
      </div>
  <div id="list"><TodoList todos={todos} toggleTodo={toggleTodo}/></div>
    </div>
    </>
  );
}

export default App;
