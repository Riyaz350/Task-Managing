import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import EditTask from "../AllTasks/EditTask";



const CollaboratedTasks = () => {
    const {user,tasksCol} = useContext(AuthContext)
    const filtered = tasksCol.filter(task=> task.doc.collabs.includes(user.email))
    console.log(filtered)

    const tasks = collection(db, 'tasks')
    console.log(tasks)
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:p-20 md:p-10 p-5">
                {filtered.map((data, index)=>
                    <div key={index} className={`${window.innerWidth == 1024 ? 'w-52' : 'lg:w-96' }card border-2 border-[#ef4444] hover:shadow-[#ef4444] shadow-lg duration-200`}>
                    <div className="card-body">
                      <h2 className="card-title text-xs md:text-xl lg:text-2xl">{data.doc.ownerName}</h2>
                      <h2 className="card-title text-xs md:text-xl lg:text-2xl">{data.doc.title}</h2>
                      <p>Due date: {data.doc.date}</p>
                      <p>{data.doc.description}</p>
                      <div className="card-actions justify-center">


                        <EditTask data={data}></EditTask>

                        {/* <button onClick={()=>deleteTask(data.id)} className={`${btnClass } margin-0 border-0 text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500`}><span className="text-xl"><MdDeleteForever /></span>Delete</button> */}
                      </div>
                    </div>
                  </div>
                    )}
            </div>
        </div>
    );
};

export default CollaboratedTasks;