import { createContext , useEffect, useState } from 'react'
import { getUserData } from '../Services/userServices'


export const homeContext = createContext()

export default function HomeContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")!=null)
    const [ userData , setUserData] = useState("")
   const [isLoading, setIsLoading] = useState(false)

 
    async function getData() { // all user data
      try {
        const {data} = await getUserData()
        setUserData(data.user)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
    getData()
    }, [])
    
  return  <>
  <homeContext.Provider value={{isLoggedIn , setIsLoggedIn , userData , isLoading , setIsLoading}}>
    {children}
  </homeContext.Provider>

  </>
}
