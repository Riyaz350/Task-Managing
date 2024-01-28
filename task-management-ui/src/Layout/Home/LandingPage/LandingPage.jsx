import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import { collection,  getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";
const LandingPage = () => {
    const [users, setUsers] = useState([])
    const {user} = useContext(AuthContext)
    const usersCollection = collection(db, "users")
    useEffect(()=>{
        const getUsers = async () =>{
             getDocs(usersCollection)
             .then(res =>{
                const movs = res.docs.map(doc=>({
                    data:doc.data(),
                    id:doc.id
                }))
                setUsers(movs)
             })
        }
        getUsers()
    },[])
    console.log(users)
    return (
        <div>
            <h1>You have landed</h1>
        </div>
    );
};

export default LandingPage;