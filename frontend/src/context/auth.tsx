import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"

interface DataUserType{
  name: string;
  id: string;
}

interface Auth{
  dataUser: DataUserType;
  setDataUser: Dispatch<SetStateAction<DataUserType>>; 
}

const AuthContext = createContext<Auth>({} as Auth)

const AuthProvider = ({children}:{children: ReactNode}) => {
  const [dataUser, setDataUser] = useState<DataUserType>({} as DataUserType)
  const value : Auth = {
    dataUser,
    setDataUser
  }
  useEffect(() => {
    const storage = localStorage.getItem("auth")
    if(storage){
      const auth = JSON.parse(storage)
      setDataUser(auth)
    }
  },[])

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}