interface Props{ 
    title: string;
    status: boolean;
}

const Task:React.FC<Props> = ({title, status})=>{
    return(
        <>
            <li className="list-group-item d-flex justify-content-between">
                <input className="form-check-label" type="checkbox" defaultChecked={status}/>
                {title} 
                <button className="btn btn-danger">Delete</button>
            </li>
        </>
    )
}

export default Task;