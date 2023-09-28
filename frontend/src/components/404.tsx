import { Link } from "react-router-dom"

export const PageDefault = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col text-center">
      <h1 className="text-3xl">404</h1>
      <Link 
        to="/"
        className="hover:text-blue-500 uppercase" 
      >OPS!, pagina não econtrada, volte para o inicio clicando aqui</Link>
    </div>
  )
}