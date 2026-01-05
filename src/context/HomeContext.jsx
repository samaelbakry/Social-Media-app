import { createContext , useEffect, useState } from 'react'
import { getUserData } from '../Services/userServices'

export const homeContext = createContext()

export default function HomeContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")!=null)
    const [ userData , setUserData] = useState("")
 
    async function getData() { // all user data
      try {
        const {data} = await getUserData()
        setUserData(data.user)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
    if(isLoggedIn){
      getData()
    }
    }, [isLoggedIn])
    
  return  <>
  <homeContext.Provider value={{isLoggedIn , setIsLoggedIn , userData  }}>
    {children}
  </homeContext.Provider>

  </>
}
