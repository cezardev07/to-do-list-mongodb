import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth";

import { Link } from "react-router-dom";

interface TaskType{
  _id: string;
  task: string
}

const get = async (id: string) => {
  try {
    if(id){
      const res = await fetch(import.meta.env.VITE_ENDPOINT + id)
      const data = await res.json()
      return data.data
    }
  } catch (error) {
    throw new Error("Algo deu Errado!" + error)
  }
}

export const Profile = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const { dataUser, setDataUser } = useContext(AuthContext)
  
  
  useEffect(() => {
    
    async function getApi(){
      const data = await get(dataUser.id)
      setTasks(data)
    }
    getApi()

  },[dataUser.id])


  const handleLogout = async () => {
    setDataUser({
      name: "",
      id: ""
    })
    localStorage.clear()
  }

  const handleDeleteTask = async (idTask: string) => {
    try {
      if(idTask){
        await fetch(import.meta.env.VITE_ENDPOINT + idTask,{
          method: "DELETE",
          headers: {
            "content-type":"application/json"
          }
        })
        const data = await get(dataUser.id)
        setTasks(data)
      }
    } catch (error) {
      throw new Error("Algo deu Errado!" + error)
    }
  }

  const handleDeleteProfile = async () => {
    try {
      if(dataUser.id){
        const res = await fetch(import.meta.env.VITE_ENDPOINT + "auth/user/" + dataUser.id,{
          method: "DELETE",
        })
        const data = await res.json()

        alert(data.mensage)

        setDataUser({
          name: "",
          id: ""
        })
        localStorage.clear()
      }
    } catch (error) {
      throw new Error("Algo deu Errado!" + error)
    }
  }

  return(
    <>
      <header className="flex sticky top-0 z-10 items-center justify-end p-5 bg-zinc-900">
        <div className="drop-down mr-5 capitalize relative">
          <h3 className="py-2 font-bold flex items-center justify-center gap-2">
            { 
              dataUser ? (
                <>
                  <svg className="w-3 h-3 mt-1 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M9 1v16M1 9h16"/>
                  </svg>
                  {dataUser.name}
                </>
              )
              : "carregando..."
            }
          </h3>
          <div className="options bg-zinc-900 flex flex-col gap-2 items-center justify-center">
            <button
              onClick={handleDeleteProfile} 
              className="w-full flex items-center justify-between hover:bg-zinc-500 p-2 capitalize font-semibold text-sm">
                apagar conta
              <svg className="w-3 h-3 text-gray-800 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between hover:bg-zinc-500 p-2 capitalize font-semibold text-sm">
                sair da conta
              <div>
              <svg className="w-4 h-4 text-gray-800 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
              </svg>
              </div> 
            </button>
          </div>
        </div>
        <button 
          className="flex items-center relative justify-center w-8 h-8 font-bold text-yellow-500 rounded-sm capitalize"
          onClick={handleLogout}
          title="Sair">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v2H7V2ZM5 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 4H8a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2Zm0-4H8a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Z"/>
            </svg>
            {
              tasks && tasks?.length > 0 && (
                <span className="absolute aspect-square w-5 h-5 text-[70%] rounded-full flex items-center justify-center right-[-1px] text-white bg-red-500 z-10 top-[-5px] font-bold">
                  {
                    tasks.length
                  }
                </span>
              )
            }
        </button>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <div className="py-5 flex items-center justify-end">
          <Link
            to={`popup/post/${dataUser.id}`}
            className="flex items-center justify-center gap-1 uppercase px-2 py-3 bg-green-500 hover:bg-blue-600 font-bold rounded-md text-base">
            <span>CRIAR TAREFA</span>
            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M9 1v16M1 9h16"/>
            </svg>
          </Link>
        </div>
        <ul className="flex flex-col">
          {
            tasks ? tasks?.map((task, i) => (
              <li 
                  key={task._id}
                  className="flex items-center justify-between gap-5 p-4 border-b-2 border-zinc-800">
                  <span className="px-2">{i}</span>
                  <p className="flex-1 whitespace-break-spaces">{task.task}</p>
                  <div className="flex gap-5">
                    <Link
                      to={`popup/put/${task._id}`}
                      className="">
                      <svg className="w-5 h-5 hover:text-blue-500 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                      </svg>
                    </Link>
                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-white hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="ionicon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                    </button>
                  </div>
                </li>
              ))  
            : (
              <div className="text-center py-10">
                <h1 className="uppercase">Crie Suas Tarefas</h1>
              </div>
            )
          }
        </ul>
      </main>
    </>
  )
}