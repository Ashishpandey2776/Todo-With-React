import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [AllTodo,setAllTodo]=useState([]);
  const [Todo, setTodo]=useState({title:"",desc:""});

  const fetchTodos=async()=>{
    try {
    const response= await axios.get('http://localhost:8000')
    setAllTodo(response.data)
    console.log(setAllTodo)
    } catch (error) {
      console.log("error in featching todos",error)
    }
  }
  useEffect(()=>{
    fetchTodos()
  },[AllTodo])
 
 async function  handleTodo(){
  //  setAllTodo(prevValue=>[...prevValue,Todo]);
  if(!Todo.title || !Todo.desc){
    return
  }
   try {
   await axios.post('http://localhost:8000/todos',Todo)
    setAllTodo([...AllTodo,response.data])
    setTodo({ title: "", desc: "" });
   } catch (error) {
    console.log("server erorr",error)
   }
  
  }  
  
 async function deleteTodo(_id,index){ 
     try {
     await axios.delete(`http://localhost:8000/todos/${_id}`)
     const updatedTodos = AllTodo.filter((_, i) => i !== index);
      setAllTodo(updatedTodos);
     } catch (error) {
      console.log("server side deleteproblem",error)
     }
  }

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
              onClick={() => deleteTodo(item._id,index)}
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
