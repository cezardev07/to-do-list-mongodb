import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Login } from "../components/login";
import { Profile } from "../components/profile";
import { PopUp } from "../components/popup";
import { Register } from "../components/register";
import { PageDefault } from "../components/404";

export const AppRoutes = () => {
  const { dataUser } = useContext(AuthContext)
  const id : string = dataUser.id
  
  return(
    <Routes>
      <Route path="/*" element={<HandleRoutes auth={{id}}/>}/>
    </Routes>
  )
}

const HandleRoutes = ({auth}: { auth: { id : string } }) => {
  return(
    <Routes>
      {
        !auth.id ? (
          <>
            <Route path="/" element={<Login/>}/>
            <Route path="/cadastrar" element={<Register/>}/>
            <Route path="*" element={<PageDefault/>}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Profile/>}/>
            <Route path="/popup/:method/:idTask" element={<PopUp/>}/>
          </>
        )
      }
    </Routes>
  )
}