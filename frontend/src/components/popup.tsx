import { 
  useContext, 
  useState,
  useEffect
} from "react";
import { AuthContext } from "../context/auth";

import { Link, useNavigate, useParams } from "react-router-dom";

export const PopUp = () => {
  const [newTask, setNewTask] = useState<string>("")
  const [endPoint, setEndPoint] = useState<string>("")
  
  const { dataUser } = useContext(AuthContext)
  const { method , idTask } = useParams()
  
  useEffect(() => {
    if(method === "put"){
      setEndPoint(`${import.meta.env.VITE_ENDPOINT}${idTask}`)
    }
    
    if(method === "post"){
      setEndPoint(`${import.meta.env.VITE_ENDPOINT}`)
    }
  },[method, idTask])

  const navigate = useNavigate()

  const handleCreateTask = async (event: {preventDefault: () => void}) => {
    event.preventDefault()
    try {
      if(dataUser.id && method){
        const res = await fetch(endPoint,{
          method,
          headers: {
            "content-type" : "application/json"
          },
          body: JSON.stringify({
            id_user: dataUser.id,
            task: newTask
          })
        })
        const data = await res.json()
        setNewTask("")
        if(data.status === 200 || data.status === 201){
          navigate("/")
        }
        // alert(data.mensage)
      }
    } catch (error) {
      throw new Error("Algo deu Errado!" + error)
    }
  }

  return(
    <div className="flex flex-col bg-zinc-900  p-4 w-full min-h-screen">
      <div className="flex items-center justify-end">
        <Link 
          to="/"
          className="p-2 bg-red-500 hover:bg-red-600 font-bold rounded-md text-base" 
        >
          Fechar pop up
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form 
          onSubmit={handleCreateTask}
          className="w-[1000px] p-4 mx-auto flex flex-col gap-4">
          {
            method === "post" ? (
              <h1>CRIAR NOVA TAREFA</h1>
            ) : method === "put" ? (
              <h1>ATUALIZAR TAREFA</h1>
            ) 
            : null
          }
          <textarea
            onChange={({target}) => setNewTask(target.value)}
            value={newTask}
            required
            className="outline-none rounded-sm p-5 text-zinc-300 bg-zinc-800"
            placeholder="TAREFA..."
          ></textarea>
          <button className="p-3 bg-green-700 hover:bg-green-600">
            {
              method === "post" ? (
                <h1>CONFIRMAR</h1>
              ) : method === "put" ? (
                <h1>CONFIRMAR ALTERAÇÃO</h1>
              ) 
              : null
            }
          </button>
        </form>
      </div>
    </div>
  )
}