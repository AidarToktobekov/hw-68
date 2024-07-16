import {AsyncThunk,createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axios-api";
import { Task } from "../../types";
import { RootState } from "../../app/store";


interface TaskState {
    task: Task[];  
    loading: boolean;
    error: boolean;
}

const initialState: TaskState = {
    task: [],
    loading: false,
    error: false,
};

export const fetchTask:AsyncThunk<Task[], void, {state:RootState}> = createAsyncThunk ('task/fetch', async () => {
    const taskList:Task[] = []; 
    const response = await axiosApi.get('/Todo.json');
    for (const key in response.data) {
        const task = response.data[key];
        task.id = key;
        taskList.push(task);
    }
    return taskList || [];
}) 
export const taskSlice = createSlice({
    name: 'task', 
    initialState,  
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      });
      builder.addCase(fetchTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    }
});
    
export const taskReducer = taskSlice.reducer;




  