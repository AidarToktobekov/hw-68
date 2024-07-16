import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import { useEffect } from "react";
import { fetchTask } from "./taskSlice";
import Task from "./Task";


const TaskList = () => {
    const taskList = useSelector((state: RootState) => state.task.task);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTask());
        console.log(taskList);
        
    }, [dispatch]);
    
    const taskListLoading = useSelector((state: RootState) => state.task.loading);

  return (
    <>
        <div className="container">
        <ul className="list-group">
            {taskList.map((task)=>{
                return(
                    <>
                        <Task key={task.id} title={task.title} status={task.status}></Task>
                    </>
                )
            })}
        </ul>
        </div>
    </>
  );

}



export default TaskList;