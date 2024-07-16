import { ChangeEvent } from "react";
import axiosApi from "../../axios-api";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { fetchTask } from "./taskSlice";

interface Props{ 
    title: string;
    status: boolean;
    id: string;
}

const Task:React.FC<Props> = ({title, status, id})=>{
    const dispatch: AppDispatch = useDispatch();

    const changeStatus =async(event: ChangeEvent<HTMLInputElement>)=>{
        try{
            const task ={
                title: title,
                status: event.target.checked,
            }
            await axiosApi.put('/Todo/' + id + '.json', task);
        }catch(e){
            console.log(new Error);
        }
    }
    
    const deleteTask = async()=>{
        try{
            await axiosApi.delete('/Todo/' + id + '.json');
            dispatch(fetchTask());

        }catch(e){
            console.log(new Error);
        }
    }

    return(
        <>
            <li className="list-group-item d-flex justify-content-between mb-3 align-items-center px-3 border-dark border-2">
                <input className="form-check-label" type="checkbox"onChange={changeStatus} defaultChecked={status}/>
                {title} 
                <button className="btn btn-danger" onClick={deleteTask}>Delete</button>
            </li>
        </>
    )
}

export default Task;