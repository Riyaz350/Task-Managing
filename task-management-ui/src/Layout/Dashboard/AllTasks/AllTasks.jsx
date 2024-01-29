import { collection } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import AddTask from "./AddTask";
import RealTimeTasks from '../AllTasks/RealTimeTasks'

const AllTasks = () => {
    const tasks = collection(db, 'tasks')
    
    return (
        <div className="">
            <AddTask tasks={tasks}></AddTask>

            <RealTimeTasks></RealTimeTasks>

        </div>
    );
};

export default AllTasks;