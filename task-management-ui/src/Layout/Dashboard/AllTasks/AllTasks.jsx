import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import { collection,  addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase.config";

const AllTasks = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [tasksCol, setTasksCol] = useState([]);
    const day = startDate.getDate()
    const month = startDate.getMonth() +1
    const year = startDate.getFullYear()
    const tasks = collection(db, 'tasks')

    const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

    useEffect(()=>{
        const getUsers = async () =>{
             getDocs(tasks)
             .then(res =>{
                const task = res.docs.map(doc=>({
                    data:doc.data(),
                    id:doc.id
                }))
                setTasksCol(task)
             })
        }
        getUsers()
    },[])

    const handleAddTask=(e)=>{
        e.preventDefault()
        const form = e.target
        const date = day+'/'+ month +'/'+year
        const title = form.title.value
        const description = form.description.value

        addDoc(tasks, {date, title, description})
        .then(res=> console.log(res))
        .catch(err=> console.log(err))
    }
    const handleUpdate=(e)=>{
        e.preventDefault()
        const form = e.target
        const date = day+'/'+ month +'/'+year
        const title = form.title.value
        const ID = form.id.value
        const description = form.description.value

        const upTask = doc(db, 'tasks', ID)
        updateDoc(upTask, {date, title, description})
    }
    return (
        <div>
            <button className={`${btnClass} my-5 lg:my-10 `} onClick={()=>document.getElementById('my_modal_4').showModal()}><span className="text-xl">< CiCirclePlus /></span>Add Task</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="modal-action flex flex-col">
                    <form  onSubmit={handleAddTask} className="lg:space-y-10 form my-10">
                                    <div className=" md:gap-6 ">
                                    <div className="lg:w-[500px] mx-auto  text-[#FFffff]">
                                        <h1>Availability Date</h1>
                                            <DatePicker className="lg:text-3xl bg-[#000000] text-center text-xl" selected={startDate} onChange={(date)  => setStartDate(date)} />
                                            </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                    </div>
                                    

                                    </div>
                                    <div>
                                    <textarea name="description" placeholder="Description"  className="textarea textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                    </div>
                            <button type="submit" className="btnTask btn">Add Task</button>
                            </form>
                            <form method="dialog" className="w-full">
                            <button className="btn">Close</button>

                    </form>
                    
                    </div>
                </div>
            </dialog>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {tasksCol.map((data, index)=>
                    <div key={index} className={`${window.innerWidth == 1024 ? 'w-52' : 'lg:w-96' }card  bg-base-100 shadow-2xl`}>
                    <div className="card-body">
                      <h2 className="card-title">{data.data.title}</h2>
                      <p>{data.data.description}</p>
                      <p>{data.data.date}</p>
                      <div className="card-actions justify-center">


                        <button  onClick={()=>document.getElementById(data.id).showModal()} className={btnClass} ><span className="text-xl"><FaPencilAlt /></span>Edit</button>
                        <dialog id={data.id} className="modal">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <div className="modal-action flex flex-col">
                                <form  onSubmit={handleUpdate} className="lg:space-y-10 form my-10">
                                                <div className=" md:gap-6 ">
                                                <div className="lg:w-[500px] mx-auto  text-[#FFffff]">
                                                    <h1>Availability Date</h1>
                                                        <DatePicker className="lg:text-3xl bg-[#000000] text-center text-xl" selected={startDate} onChange={(date)  => setStartDate(date)} />
                                                        </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input defaultValue={data.data.title} type="text" name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group hidden">
                                                    <input defaultValue={data.id}  type="text" name="id"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                                </div>
                                                

                                                </div>
                                                <div>
                                                <textarea defaultValue={data.data.description} name="description" placeholder="Description"  className="textarea textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                                </div>
                                        <button type="submit" className="btnTask btn">Update Task</button>
                                        </form>
                                        <form method="dialog" className="w-full">
                                        <button className="btn">Close</button>

                                </form>
                                
                                </div>
                            </div>
                        </dialog>

                        <button  className={`${btnClass } margin-0 border-0 text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500`}><span className="text-xl"><MdDeleteForever /></span>Delete</button>
                      </div>
                    </div>
                  </div>
                    )}
            </div>
        </div>
    );
};

export default AllTasks;