import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import Swal from "sweetalert2";
import RealTimeTasks from '../AllTasks/RealTimeTasks'

const AllTasks = () => {

    // const [tasksCol, setTasksCol] = useState([]);
    const tasks = collection(db, 'tasks')

    // const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

    // useEffect(()=>{
    //     const getUsers = async () =>{
    //          getDocs(tasks)
    //          .then(res =>{
    //             const task = res.docs.map(doc=>({
    //                 data:doc.data(),
    //                 id:doc.id
    //             }))
    //             setTasksCol(task)
    //          })
    //     }
    //     getUsers()
    // },[])

    // const deleteTask = (id) =>{
    //     const deleteTask = doc(db, 'tasks', id)
    //     deleteDoc(deleteTask)
    //     .then(()=>{
    //         Swal.fire({position: "top-end", icon: "success", title: "Task Deleted", showConfirmButton: false, timer: 1500});

    //     })
    // }
    
    return (
        <div>
            <AddTask tasks={tasks}></AddTask>

            <RealTimeTasks></RealTimeTasks>
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {tasksCol.map((data, index)=>
                    <div key={index} className={`${window.innerWidth == 1024 ? 'w-52' : 'lg:w-96' }card bg-[#ef4444] shadow-2xl`}>
                    <div className="card-body">
                      <h2 className="card-title">{data.data.title}</h2>
                      <p>{data.data.description}</p>
                      <p>{data.data.date}</p>
                      <div className="card-actions justify-center">


                        <EditTask data={data}></EditTask>

                        <button onClick={()=>deleteTask(data.id)} className={`${btnClass } margin-0 border-0 text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500`}><span className="text-xl"><MdDeleteForever /></span>Delete</button>
                      </div>
                    </div>
                  </div>
                    )}
            </div> */}
        </div>
    );
};

export default AllTasks;