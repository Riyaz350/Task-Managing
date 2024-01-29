import { CiCirclePlus } from "react-icons/ci";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";

const AddTask = (tasks) => {
    const {user} = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const btnClass = "btn w-fit mx-auto font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"
    const day = startDate.getDate()
    const month = startDate.getMonth() +1
    const year = startDate.getFullYear()
    const tasksCol = tasks.tasks

    const handleAddTask=(e)=>{
        e.preventDefault()
        const form = e.target
        const date = day+'/'+ month +'/'+year
        const title = form.title.value
        const description = form.description.value
        const owner = user?.email
        const ownerName = user?.displayName
        const collabs = []

        console.log(ownerName)

        addDoc(tasksCol, {date, title, description, owner, ownerName, collabs})
        .then(()=> {
            Swal.fire({position: "top-end", icon: "success", title: "Task Added", showConfirmButton: false, timer: 1500});
        })
        .catch(err=> console.log(err))
    }

    return (
        <div>
             <button className={`${btnClass}  `} onClick={()=>document.getElementById('my_modal_4').showModal()}><span className="text-xl">< CiCirclePlus /></span>Add Task</button>
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

        </div>
    );
};

export default AddTask;