import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
// import { tasks } from "../../../Hooks/firestore.collections";
import EditTask from "./EditTask";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { db } from "../../../../firebase.config";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";

const RealTimeTasks = () => {
    const {user} = useContext(AuthContext)
    const [tasksCol, setTasksCol] = useState([])
    const tasks = collection(db, 'tasks')
    const filteredTask = tasksCol.filter(task => task.doc.owner.includes(user.email))

    useEffect(()=>{
       const unsubscribe = onSnapshot(tasks, snapshot =>{
            setTasksCol(snapshot.docs.map(doc=>({id:doc.id, doc:doc.data()})))
        })
        return()=>{
            unsubscribe()
        }
    },[])

    const deleteTask = (id) =>{
        const deleteTask = doc(db, 'tasks', id)
        deleteDoc(deleteTask)
        .then(()=>{
            Swal.fire({position: "top-end", icon: "success", title: "Task Deleted", showConfirmButton: false, timer: 1500});

        })
    }

    const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredTask.map((data, index)=>
                    <div key={index} className={`${window.innerWidth == 1024 ? 'w-52' : 'lg:w-96' }card bg-[#ef4444] shadow-2xl`}>
                    <div className="card-body">
                      <h2 className="card-title">{data.doc.title}</h2>
                      <p>{data.doc.description}</p>
                      <p>{data.doc.date}</p>
                      <div className="card-actions justify-center">


                        <EditTask data={data}></EditTask>

                        <button onClick={()=>deleteTask(data.id)} className={`${btnClass } margin-0 border-0 text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500`}><span className="text-xl"><MdDeleteForever /></span>Delete</button>
                      </div>
                    </div>
                  </div>
                    )}
            </div>
        </div>
    );
};

export default RealTimeTasks;