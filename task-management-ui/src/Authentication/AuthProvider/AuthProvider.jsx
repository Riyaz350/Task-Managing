import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
// import useAxiosPublic from "../../Hooks/useAxiosPublic"
import auth from "../../../firebase.config"
import { sendPasswordResetEmail } from "firebase/auth";
import { addDoc, collection, onSnapshot, snapshotEqual } from "firebase/firestore";
import { db } from "../../../firebase.config";



export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    // const axiosPublic = useAxiosPublic()
    const [loading, setLoading] =useState(true)
    const [user, setUser] =useState(null)
    const [month, setMonth] =useState('january')
    const [usersCol, setUsersCol] = useState([])
    const [tasksCol, setTasksCol] = useState([])
    const [commentsCol, setCommentsCol] = useState([])
    const tasks = collection(db, 'tasks')
    const comments = collection(db, 'comments')

    
    const createUser = ( email, password) =>{
        setLoading(true)
        
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const passReset = ( email) =>{
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unsubscribe = onSnapshot(tasks, snapshot =>{
             setTasksCol(snapshot.docs.map(doc=>({id:doc.id, doc:doc.data()})))
         })
         return()=>{
             unsubscribe()
         }
     },[])
    useEffect(()=>{
        const unsubscribe = onSnapshot(comments, snapshot =>{
             setCommentsCol(snapshot.docs.map(doc=>({id:doc.id, doc:doc.data()})))
         })
         return()=>{
             unsubscribe()
         }
     },[])

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInPop = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            const userEmail = currentUser?.email || user?.email 
            const userName = currentUser?.displayName || user?.displayName 
            const userPhoto = currentUser?.photoURL || user?.photoURL 
            const userrr = collection(db, 'users')
            setUser(currentUser)
            setLoading(false)

            if(currentUser){
                const unsubscribe = onSnapshot(userrr, snapshot =>{
                    const uuss =snapshot.docs.map(doc=>({id:doc.id, doc:doc.data()}))
                    setUsersCol(uuss)
                        if(user?.email){
                            const iff = uuss.find(userr =>userr.doc.userEmail == user?.email)
                        if(!iff){
                            addDoc(userrr, {userEmail, userName, userPhoto})
                        }else{
                            console.log('ase already')
                        }
                        }
                    
                })
                return()=>{
                    unsubscribe()
                }
            }
            
                    
            


        })
        return()=>{
          unSubscribe()  
        }
    },[user?.email, user?.displayName, user?.photoURL])

    

    const authInfo = { user,loading,month, setMonth, createUser, signInUser,signInPop, logOut, passReset, usersCol, tasksCol, commentsCol }

return(
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
)
}

export default AuthProvider;