import React, { useEffect, useState } from 'react'
import './Todo.css'
import { fetchTodos } from '../../data/data'
function Todo() {

    const [todosRaw, setTodosRaw] = useState([]);

    const [onlyWaiting, setOnlyWaiting] = useState(false);
  
    const [todos, setTodos] = useState([]);

    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [curPage, setCurPage] = useState(1);
    const [numPage, setNumPage] = useState(5);

    //bypass
    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, []);

    useEffect(() => {
        console.log(onlyWaiting);
    }, [onlyWaiting])

    useEffect(() => {
        console.log(itemsPerPage);
        // setNumPage(Math.ceil(todos.length / itemsPerPage));

    }, [itemsPerPage, todos.length])
    //setup
    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter(todo => !todo.completed));
        }
        else {
            setTodos(todosRaw);
        }
    }, [todosRaw, onlyWaiting])
    return (
        <div className="todo-container">
            {/* filter */}
            <div className="todo-filter-container">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        // checked
                        onClick={(e) => setOnlyWaiting(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        Show only waiting
                    </label>
                </div>
                <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={5}
                    style={{ width: "200px" }}
                    onChange={(e) => {
                        setItemsPerPage(e.target.value);
                    }}
                >
                    <option value={5}>
                        5 items per page
                    </option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </select>
            </div>
            {/* table */}
            <table className="table table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Titles</th>
                        <th style={{ textAlign: "right" }}>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>
                                <span className="badge bg-secondary">{todo.id}</span>
                            </td>
                            <td>{todo.title}</td>
                            <td style={{ textAlign: "right" }}>
                                <span className={'badge ' + (todo.completed ? 'bg-success' : 'bg-danger')}>
                                    {todo.completed ? 'done' : 'waiting'}&nbsp; <span className={todo.completed ? 'bi bi-check' : 'bi bi-clock'}></span>
                                </span>
                                &nbsp;
                                <button className="btn btn-danger">
                                    <span className="bi bi-trash"></span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* pagacontrol */}
            <div className='d-flex justify-content-center align-items-center pb-3'>
                <button onClick={() => { setCurPage(1) }} className='btn btn-outline-primary todo-spacing' disabled={curPage === 1}>First</button>
                <button onClick={() => { 
                    curPage > 1 ? setCurPage(curPage - 1) 
                     : null
                }} className='btn btn-outline-primary todo-spacing' disabled={curPage === 1}>Previous</button>
                <span className='todo-spacing'>{curPage}&nbsp;/&nbsp;{numPage}</span>
                <button onClick={() => { 
                    curPage < numPage && setCurPage(curPage + 1) }} className='btn btn-outline-primary todo-spacing' disabled={curPage === numPage}>Next</button>
                <button onClick={() => { setCurPage(numPage) }} className='btn btn-outline-primary todo-spacing' disabled={curPage === numPage}>Last</button>
            </div>
        </div>
    )
}

export default Todo