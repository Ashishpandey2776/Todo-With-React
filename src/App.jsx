import { useEffect, useState } from 'react'

function App() {
  const [AllTodo,setAllTodo]=useState([]);
 const [Todo, setTodo]=useState({title:"",desc:""});
 
  function handleTodo(){
  //  setAllTodo(prevValue=>[...prevValue,Todo]);
  if(!Todo.title || !Todo.desc){
    return
  }
    setAllTodo([...AllTodo,Todo])
    savTodo([...AllTodo,Todo])
  }  
  
  function deleteTodo(index){ 
      AllTodo.splice(index,1) 
     savTodo(AllTodo)
     setAllTodo(AllTodo);
  }
  function savTodo(todo){
    localStorage.setItem("todos",JSON.stringify(todo))
  }
  function getdatafromLocal(){
    let data=JSON.parse(localStorage.getItem("todos"))||[]
    setAllTodo(data)
  } 
  useEffect(()=>{
 getdatafromLocal()
  },[])
  return (
    <div className='bg-slate-500 max-w-screen max-h-screen overflow-auto flex flex-col items-center'>
    <div className='bg-white shadow-lg rounded-lg p-8 w-3/4 max-w-md'>
       <h1>MY TODO</h1>
      <div className='flex flex-col space-y-4'>
        <input
          type="text"
          placeholder='Title'
          className='border border-gray-300 rounded-md p-2'
          onChange={(e) => setTodo((prevValue) => ({
            ...prevValue,
            title: e.target.value
          }))}
        />
        <input
          type="text"
          placeholder='Description'
          className='border border-gray-300 rounded-md p-2'
          onChange={(e) => setTodo((prevValue) => ({
            ...prevValue,
            desc: e.target.value
          }))}
        />
        <button
          onClick={handleTodo}
          className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
        >
          Add List
        </button>
      </div>
    </div>
  
    <div className='mt-6 w-3/4 max-w-md'>
      {AllTodo.length > 0 ? (
        AllTodo.map((item, index) => (
          <div key={index} className='bg-white rounded-lg shadow-md p-4 mb-4'>
            <h3 className='text-lg font-bold'>Title: {item.title}</h3>
            <p className='text-gray-600'>Description: {item.desc}</p>
            <button
              onClick={() => deleteTodo(index)}
              className='mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200'
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className='text-white'>No items in the list</p>
      )}
    </div>
  </div>
  
  )
}

export default App
