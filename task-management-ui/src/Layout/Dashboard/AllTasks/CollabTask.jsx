import { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase.config";

const CollabTask = (data) => {
    // console.log(data)
    const usersss = collection(db, 'users')



    const btnClass = "btn w-fit mx-auto font-bold flex justify-end lg:text-base text-xs bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"
    const collabTask=()=>{
        console.log(data)
    }
    return (
        <div>
            <button className={`${btnClass } margin-0 border-0 text-blue-500 border-blue-500 hover:bg-blue-500 hover:border-blue-500`} onClick={()=>document.getElementById(data.data.id).showModal()}>open modal</button>
            <dialog id={data.data.id} className="modal">
            <div className="modal-box">
                <div className="space-y-2">
                    <h1 className="text-center text-xl font-medium ">Click to select collaborator</h1>
                {usersCol.map(user =>(
                    
                <button key={user.id} onClick={collabTask} className={`${btnClass }  w-full flex justify-between`}>
                    <img className="w-[40px] bg-white rounded-lg" src={user.doc.userPhoto} alt="" />
                    <h1 >{user.doc.userName}</h1>
                    <h1>{user.doc.userEmail}</h1>
                    </button>
                ))

}
                </div>

                <div className="modal-action">


                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
    );
};

export default CollabTask;