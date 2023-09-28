import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"
import { Link } from "react-router-dom"

export const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [viewPassword, setViewPàssword] = useState<boolean>(false)

  const { setDataUser } = useContext(AuthContext)

  const handleSubmit = async (event: { preventDefault: () => void}) => {
      event.preventDefault()
      try {
        const res = await fetch(import.meta.env.VITE_ENDPOINT + "auth/login",{
          method: "POST",
          headers: {
            "content-type" : "application/json"
          },
          body: JSON.stringify({
            name,
            password
          })
        })
        const data = await res.json()
        if(data.status === 200){
          setDataUser({
            name,
            id: data.user[0]._id
          })
          localStorage.setItem("auth", JSON.stringify({
            name,
            id: data.user[0]._id
          }))
        } else {
          alert(data.mensage)
        }
      } catch (error) {
        throw new Error("Algo deu Errado!" + error)
      } finally {
        setName("")
        setPassword("")
      }
  }

  const handleViewPassword = () => {
    setViewPàssword(prev => !prev)
  }

  return(
    <div className="max-w-xl min-h-screen mx-auto flex justify-center gap-2 p-2 flex-col">
      <form
        onSubmit={handleSubmit} 
        className="flex gap-2 p-2 flex-col">

        <h1 className="text-xl text-center mb-5 uppercase">
          Fazer Login
        </h1>

        <input
          value={name}
          required
          onChange={({target}) => setName(target.value)} 
          className=" outline-none rounded-sm p-5 text-zinc-300 bg-zinc-800" 
          type="text" placeholder="Nome"/>
        
        <div className="flex">
          <input
            value={password}
            required
            onChange={({target}) => setPassword(target.value)} 
            className="flex-1 outline-none rounded-sm p-5 text-zinc-300 bg-zinc-800" 
            type={
              !viewPassword ? "password"
              : "text" 
            } 
            placeholder="Senha"/>
          <button 
            onClick={handleViewPassword}
            type="button"
            className="bg-zinc-800 px-5">
              {
                viewPassword ? (
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                    </g>
                  </svg>
                )
                : (
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                )
              }
          </button>
        </div>

        <button type="submit" className="uppercase rounded-sm mt-2 bg-blue-700 p-5 hover:bg-blue-600">
          Entrar
        </button>
        <span className="text-center text-zinc-400 uppercase py-2">or</span>
        <Link to="/cadastrar" 
          className="text-center capitalize hover:bg-green-700 p-5 bg-zinc-900"
        >clique aqui para criar uma nova conta</Link>
      </form>
    </div>
  )
}