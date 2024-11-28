import { updateTask } from "../../../../../server/controllers/taskController"
import { apiSlice } from "../apiSlice"

const TASK_URL ="/task" 


export const taskApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateTask:builder.mutation({
            query:(data)=>({
                url:`${TASK_URL}/update/${id}`,
                method:"PUT",
                body:data,
                credentials:"include",
            })
        }),
        getTask:builder.query({
            query:()=>({
                url:`${TASK_URL}/`,
                method:"GET",
                credentials:"include",
            })
        }),
        createTask:builder.mutation({
            query:(data)=>({
                url:`${TASK_URL}/create`,
                method:"POST",
                body:data,
                credentials:"include",
            })
        }),
       
    })
})

export const{useUpdateTaskMutation,useGetTaskQuery,useCreateTaskMutation}=taskApiSlice