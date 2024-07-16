import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchTask } from "./taskSlice";
import Task from "./Task";
import '../../App.css'
import axiosApi from "../../axios-api";


const TaskList = () => {

    const [inputValue, setInputValue] = useState('');

    const taskList = useSelector((state: RootState) => state.task.task);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTask());
        
    }, [dispatch]);
    
    const taskListLoading = useSelector((state: RootState) => state.task.loading);
    
    let preloader = null;
    if (taskListLoading) {
        preloader = (
            <>
                <div id="preloader">
                  <div className="loader"></div>
                </div>
            </>
          );
    }

    const changeInput = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value);
    }

    const addTask =async(event: FormEvent)=>{
        event.preventDefault();
        try{
            if(inputValue.trim() === ''){
                alert('Fill in the input field');
            }else{
                const newTask = {
                    status: false,
                    title: inputValue,
                }
                await axiosApi.post('/Todo.json', newTask);
                dispatch(fetchTask());
                setInputValue('');
            }
        }catch(e){
            console.log(new Error);
        }
    }

  return (
    <>
        {preloader}
        <div className="container">
            <h1 className="text-center mt-5 mb-3">Todo</h1>
            <form onSubmit={addTask}>
                <div className="mb-3 d-flex gap-4">
                    <input type="text" onChange={changeInput} className="form-control" value={inputValue} placeholder="Add new task"/>
                    <button className="btn btn-primary" type="submit">add</button>
                </div>
            </form>
            <ul className="list-group">
                {taskList.map((task, index)=>{
                    return(
                            <Task key={index} id={task.id} title={task.title} status={task.status}></Task>
                    )
                })}
            </ul>
        </div>
    </>
  );

}



export default TaskList;