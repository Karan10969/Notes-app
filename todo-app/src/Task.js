
export default function Task(props) {

    const myTaskList = props.tasklist.map(task => {
        return (
            <li key={task.id} className="todo-task">

                <div className="visible-note">
                    <button className="edit-note-button"
                        onClick={() => props.toggleEdit(task.id)}
                        title="edit your note"
                    >
                        Edit
                    </button>
                
                <div className="note-container">
                    {task.todotask}
                </div>
                    
                    <button
                        title="delete note"
                        className="delete-note-button"
                        onClick={() => props.toggleClick(task.id)}
                    >
                        <svg className="delete-svg" xmlns="http://www.w3.org/2000/svg" height="24" fill="red" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                    </button>
                </div>

                <div className="update-note-text" id={task.id} style={{display: 'none'}}>

                    <input type="text"
                        className="update-textfield"
                        placeholder='enter updated note here'
                        onChange={props.toggleUpdateText}
                        id={`update${task.id}`}
                        onKeyDown={() => props.enterforupdate(task.id)}
                    >
                    </input>

                    <button className="update-button" onClick={() => props.toggleUpdate(task.id)}>
                        update
                    </button>
                    <button className="update-close-button" onClick={() => props.toggleEditClose(task.id)}>
                        X
                    </button>
                </div>

            </li>

        )
    })

    return (
        <div className="task-container">
            {myTaskList}
        </div>
    )
}