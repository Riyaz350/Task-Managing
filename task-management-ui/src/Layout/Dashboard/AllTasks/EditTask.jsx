import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase.config";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";

const EditTask = (data) => {
        const [startDate, setStartDate] = useState(new Date());
        const [newColl, setNewColl] = useState(data.data.doc.collabs)
        const btnClass = "btn lg:text-base text-xs w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"
        const {user, usersCol} = useContext(AuthContext)
        const colls = usersCol.filter(userr=> userr.doc.userEmail !== user?.email)
        const ID = data.data.id
        const tasksss = doc(db, 'tasks', ID)


        const day = startDate.getDate()
        const month = startDate.getMonth() +1
        const year = startDate.getFullYear()

        const date = data.data.doc.date
        const owner = data.data.doc.owner
        const description = data.data.doc.description
        const title = data.data.doc.title
        const ownerName = data.data.doc
        console.log(ownerName)

        useEffect(()=>{
            setDoc(tasksss, {date, owner, description, title, collabs:newColl})

        },[newColl])

        const handleUpdate=(e)=>{
        e.preventDefault()
        const form = e.target
        const date = day+'/'+ month +'/'+year
        const title = form.title.value
        const ID = data.data.id
        const description = form.description.value


       

        const upTask = doc(db, 'tasks', ID)
        updateDoc(upTask, {date, title, description})
        .then(()=>{
            Swal.fire({position: "top-end", icon: "success", title: "Task Updated", showConfirmButton: false, timer: 1500});
            
        })
    }
    
    const collabTask=(mail, name)=>{
        setNewColl(newColl => [...newColl, mail])
        
                Swal.fire({position: "top-end", icon: "success", title: `Task collaboration with ${name} successful `, showConfirmButton: false, timer: 1500});
                
        
        }
        console.log(newColl)
    return (
        <div>
            <div>
            <button  onClick={()=>document.getElementById(data.data.id).showModal()} className={btnClass} ><span className="text-xl"><FaPencilAlt /></span>Edit</button>
                        <dialog id={data.data.id} className="modal">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <div className="modal-action flex flex-col">
                                <form  onSubmit={handleUpdate} className="lg:space-y-10 form my-10">
                                    <div className=" md:gap-6 ">
                                    <div className="lg:w-[500px] mx-auto  text-[#FFffff]">
                                        <h1>Availability Date</h1>
                                        <DatePicker selected={startDate} className="lg:text-3xl bg-[#000000] text-center text-xl"  onChange={(date)  => setStartDate(date)} />
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input defaultValue={data.data.doc.title} type="text" name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Name" required />
                                    </div>
                                    </div>

                                    <div>
                                    <textarea defaultValue={data.data.doc.description} name="description" placeholder="Description"  className="textarea textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                    </div>

                                    <button type="submit" className="btnTask btn">Update Task</button>
                                </form>

                                <form method="dialog" className="w-full">
                                <button className="btn">Close</button>
                                </form>
                                </div>
                            </div>
                            <div className="space-y-2 bg-white p-10">
                                <h1 className="text-center text-xl font-medium ">Click to select collaborator</h1>
                                {colls.map(user =>(
                                    
                                <button key={user.id} onClick={()=>collabTask(user.doc.userEmail, user.doc.userName)} className={`${btnClass }  w-full flex justify-between`}>
                                    <img className="w-[40px] bg-white rounded-lg" src={user.doc.userPhoto} alt="" />
                                    <h1 >{user.doc.userName}</h1>
                                    <h1>{user.doc.userEmail}</h1>
                                    </button>
                                ))

                                }
                        </div>
                        </dialog>
        </div>
       
        </div>
    );
};

export default EditTask;