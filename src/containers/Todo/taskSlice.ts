import {AsyncThunk,createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "axios";
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
    const URL = 'https://my-homework-1337-default-rtdb.europe-west1.firebasedatabase.app/';
    
    let taskList:Task[] = []; 
    const response = await axiosApi.get(URL + '/Todo.json');
    for (const key in response.data) {   
        taskList.push(response.data[key]);
    }
    return taskList || [];
}) 
export const taskSlice = createSlice({
    name: 'task', 
    initialState,  
    reducers: {      
        // increment: (state) => {      
        //     state.value++;  
        // },    
        // decrement: (state) => {        
        //     state.value--;    
        // },
        // increaseBy: (state, action: PayloadAction<number>) => {        
        //     state.value += action.payload;    
        // },    
        // decreaseBy: (state, action: PayloadAction<number>) => {            
        //     state.value -= action.payload; 
        // },    
    },
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




  