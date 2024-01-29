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
        
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    deleteDoc(deleteTask)
                }
              });
    }

    const btnClass = "btn w-fit mx-auto font-bold flex justify-end lg:text-base text-xs bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:p-20 md:p-10 p-5">
                {filteredTask.map((data, index)=>
                    <div key={index} className={`${window.innerWidth == 1024 ? 'w-52' : 'lg:w-96' }card border-2 border-[#ef4444] hover:shadow-[#ef4444] shadow-lg duration-200`}>
                    <div className="card-body">
                      <h2 className="card-title text-xs md:text-xl lg:text-2xl">{data.doc.title}</h2>
                      <p>Due date: {data.doc.date}</p>
                      <p>{data.doc.description}</p>
                      <div className="card-actions justify-center">


                        <EditTask data={data}></EditTask>

                        <button onClick={()=>deleteTask(data.id)} className={`${btnClass } margin-0 border-0 text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500`}><span className="text-xl"><MdDeleteForever /></span>Delete</button>
                        <button onClick={()=>deleteTask(data.id)} className={`${btnClass } margin-0 border-0 text-blue-500 border-blue-500 hover:bg-blue-500 hover:border-blue-500`}><span className="text-xl"></span>Collaborate</button>
                      </div>
                    </div>
                  </div>
                    )}
            </div>
        </div>
    );
};

export default RealTimeTasks;