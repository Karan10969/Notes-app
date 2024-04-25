import Task from './Task.js'
import { useState, useEffect } from 'react'

export default function App() {

  const [tasks, setTasks] = useState([])
  const [updatedTask, setUpdatedTask] = useState({ upTask: "" })
  const [currentTask, setCurrentTask] = useState({
    todotask: ""
  })

  async function getTodoData() {
    const result = await fetch('http://localhost:8000/')
    const data = await result.json()

    setTasks(data)
  }

  useEffect(() => {
    getTodoData()
  }, [tasks])


  async function sendTodoData() {
    const result = await fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(currentTask),
      headers: {
        "Content-type": "application/json"
      }
    })
  }

  async function updateTodo(id) {
    const result = await fetch(`http://localhost:8000/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-type": "application/json"
      }
    })
    const data = await result.json()
    console.log(data)
  }

  async function deleteTodoData(id) {
    const result = await fetch(`http://localhost:8000/${id}`, {
      method: 'DELETE',
    })
    console.log(result)
  }

  function getTask(e) {
    setCurrentTask({
      todotask: e.target.value
    })
  }
  function enterTask(e) {
    if (e.key === "Enter") {
      addTask(e);
    }
  }

  function addTask(event) {
    if (document.getElementById('add-task-id').value === "") {
      alert("Note is empty")
    }
    else {
      sendTodoData()
      document.getElementById("add-task-id").value = ""
    }
  }

  function editNote(id) {
    document.getElementById(`${id}`).style.display = "block"
  }
  function closeEditInput(id) {
    document.getElementById(`${id}`).style.display = "none"
  }


  function enterUpdate(id) {

    const updateButton = document.getElementById(`update${id}`)

    updateButton.addEventListener('keypress', function (e) {
      if (e.key === "Enter") {
        updateTodo(id)
        closeEditInput(id)
      }
    })

  }
  function getUpdateNote(id) {
    updateTodo(id)
    closeEditInput(id)
  }

  function updateNote(e) {
    setUpdatedTask({ upTask: e.target.value })
  }

  function deleteNote(id) {
    deleteTodoData(id)
  }

  return (
    <div className="main-todo-container">

      <div className="todo-input">
        <label className="add-task-label" htmlFor="add-task-id">
          Enter Task
        </label>

        <input type="text"
          id="add-task-id"
          name="add-task"
          placeholder="enter you task here.."
          onChange={getTask}
          onKeyDown={enterTask}
          size="25"
        >
        </input>

        <button className="todo-input-button" onClick={addTask}><div id="todo-input-button-add">Add</div>&nbsp;&nbsp;<div id="todo-input-button-task">Task</div></button>
      </div>

      <Task
        tasklist={tasks}
        toggleClick={deleteNote}
        toggleEdit={editNote}
        toggleEditClose={closeEditInput}
        toggleUpdateText={updateNote}
        toggleUpdate={getUpdateNote}
        enterforupdate={enterUpdate}
      />

    </div>
  )
}
