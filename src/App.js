import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Table } from "antd"

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [tag, setTag] = useState("");
  const [todo, setTodo] = useState("");
  const [search, setsearch] = useState("");

  // Array of all options
  const optionList = [
    { value: "meeting", label: "Meeting" },
    { value: "reading", label: "Reading" },
    { value: "phonecall", label: "Phone Call" },
    { value: "project", label: "Project" },
    { value: "contractsign", label: "Contract Sign" },
    { value: "family", label: "Family" },
    { value: "personal", label: "Personal" },

  ];
  // Function triggered on clicking ADD button
  const handlerAddTodo = () => {
    if (title === "" || title === null) {
      alert("Name must be filled out");
      return false;
    }
    if (description === "" || description === null) {
      alert("plz describe your description");
      return false;
    }
    if (status === "" || status == null) {
      alert("Set current Status");
      return false;
    }
    const d = new Date();
    let newTodoItem = {
      title: title,
      description: description,
      time: d.toLocaleTimeString(),
      duedate: duedate,
      status: status,
      tag: tag,
    }
    let updatedTodoarr = [...todo];
    updatedTodoarr.push(newTodoItem);
    setTodo(updatedTodoarr);
    localStorage.setItem('todo', JSON.stringify(updatedTodoarr))
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todo'))
    if (savedTodo) {
      setTodo(savedTodo)
    }
  }, [])
  // Funtion for deleting event 
  const handleDelete = (index) => {
    let reducedtodo = [...todo];
    reducedtodo.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(reducedtodo))
    setTodo(reducedtodo);
    console.log("Clicked");

  }
  const DeleteAll = () =>{
    setTodo("");
  }
    // Collumns name of  Ant pro table
  const columns = [
    {
      title: "TIMESTAMP",
      dataIndex: "time",
      key: "key"
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "key",
      // For searching title value
      filteredValue: [search],
      onFilter: (value, record) => {
        return String(record.title).includes(value.toLowerCase());
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "key",
    },

    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "key"
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "key"
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "key"
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "key",
      render: (index) => (
        <div>
          <button className="primaryBtn" onClick={() => { window.confirm('Are you sure you want to delete this Task ?',) && handleDelete(index) }}>
            {"delete"}
          </button>

          <button className="primaryBtn" onClick={() => console.log("Edit clicked")}>
            {"edit"}
          </button>


        </div>

      ),
    }
  ]
  const options = [
    {
      label: "OPEN",
      value: "OPEN",
    },
    {
      label: "WORKING",
      value: "WORKING",
    },
    {
      label: "DONE",
      value: "DONE",
    },
    {
      label: "OVERDUE",
      value: "OVERDUE",
    },
  ];
  return (
    <>
      <h1>Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label > Title </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='type here... Required' maxLength="100" />
          </div>
          <div className="todo-input-item">
            <label > Description </label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='type here... Required' maxLength="1000" />
          </div>
          <div className="todo-input-item">
            <label > Due Date </label>
            <input type="date" min={new Date().toISOString().split('T')[0]} max="2050-06-08" value={duedate} onChange={(e) => setDuedate(e.target.value)} placeholder='Enter expected due date here..' />
          </div>
          <div className="todo-input-item">
            <label> Status </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}  >
              {options.map((option, index) => (
                <option key={index} value={option.value} >{option.label}</option>
              ))}
            </select>

          </div>
          <div className="todo-input-item">
            <label > Tags </label>
            <select value={tag} onChange={(e) => setTag(e.target.value)}  >
              {optionList.map((optionList, index) => (
                <option key={index} value={optionList.value} >{optionList.label}</option>
              ))}
            </select>
          </div>
          <div className="todo-input-item">
            <button onClick={handlerAddTodo} className="primaryBtn"> Add </button>
          </div>
        </div>

        <div className="todo-list">
         <div className='mid-section'>
         <Input.Search placeholder="Search here..." style={{ marginBottom: 9 }} onSearch={(value) => {
          setsearch(value);
        }} />
        <button onClick={() => { window.confirm('Are you sure ,You want to delete all Data ?',) && DeleteAll()}} className='alldeletBtn'>Delete All</button>
         </div>
          <Table dataSource={todo} columns={columns} pagination={{
            pageSize: 5,
            current: Math.round(100),
          }}></Table>
        </div>
      </div>
    </>
  );
}

export default App;
