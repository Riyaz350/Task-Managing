import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import { FaRegUser } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase.config";

const ShowTask = () => {
    const {id} = useParams() 
    const [comment, setComment] = useState('')
    const {user,tasksCol, commentsCol}  = useContext(AuthContext)
    const btnClass = "btn lg:text-base text-xs w-fit mx-5 lg:mx-10 font-bold flex justify-end  bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"

    const data = tasksCol.find(task => task.id == id)
    const comms = commentsCol.filter(comment =>comment.doc.taskId == id)

    console.log(comms)

    const userrr = collection(db, 'comments')
    const addComment=() =>{
        const name = user?.displayName
        const photo = user?.photoURL
        const com = comment
        const taskId = data.id
        addDoc(userrr, {name, photo, com,taskId })
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Task Details</h1>
        <div className="max-w-5xl mx-auto border-2 border-black rounded-lg flex flex-col gap-10 p-5 my-10">
            <h1><span className="font-bold">Title:</span> {data?.doc.title}</h1>
            <h1><span className="font-bold">Description:</span>  {data?.doc.description}</h1>
            <h1><span className="font-bold">Deadline: </span> {data?.doc.date}</h1>
        </div>

        <div className="flex justify-center items-center max-w-5xl mx-auto">
            <summary className="m-2 btn p-0 rounded-full bg-transparent border-w border-black w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] " >{user?.photoURL? <img className="w-14 rounded-full" src={user.photoURL}></img> :<div className="m-1 btn bg-[#ffffff] rounded-full hover:text-[#000000] border-2 border-black hover:bg-white"><FaRegUser/></div>} </summary>
            <div className="">
                <input onChange={e=> setComment(e.target.value)} type="email"  placeholder="Type your comment" className="input input-bordered w-[200px] md:w-[500px] lg:w-[700px]" required />
            </div>  
            <button onClick={addComment} className={`${btnClass}`}>Post</button>      
        </div>

        <div>
            <div className="space-y-2">
                {comms.map(com=>
                    <div key={com.id} className="flex justify-start items-center max-w-5xl border-2 border-gray-500  mx-auto ">
                        <summary className="m-2 btn p-0 rounded-full bg-transparent border-w  w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] " >{com.doc.photo? <img className="w-14 rounded-full" src={com.doc.photo}></img> :<div className="m-1 btn bg-[#ffffff] rounded-full hover:text-[#000000] border-2 border-black hover:bg-white"><FaRegUser/></div>} </summary>
                        <div className="">
                        <h1 className="lg:w-[200px] font-bold">{com.doc.name}</h1>
                        <h1 className="lg:w-[500px] ">{com.doc.com}</h1>
                        </div>
                    </div>
                    )}
            </div>
        </div>

        </div>
    );
};

export default ShowTask;