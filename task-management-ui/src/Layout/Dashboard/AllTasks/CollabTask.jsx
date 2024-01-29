import { useContext } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";

const CollabTask = () => {
    const { usersCol} = useContext(AuthContext)

    const btnClass = "btn w-fit mx-auto font-bold flex justify-end lg:text-base text-xs bg-white border-2 border-black hover:bg-black hover:text-white hover:border-black"
    const collabTask=()=>{
        console.log(usersCol)
    }
    return (
        <div>
            <button className={`${btnClass } margin-0 border-0 text-blue-500 border-blue-500 hover:bg-blue-500 hover:border-blue-500`} onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <div className="space-y-2">
                    <h1 className="text-center text-xl font-medium ">Click to select collaborator</h1>
                {usersCol.map(user =>(
                    
                <button key={user.id} onClick={collabTask} className={`${btnClass }  w-full flex justify-between`}>
                    <img className="w-[40px]" src={user.doc.userPhoto} alt="" />
                    <h1>{user.doc.userName}</h1>
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