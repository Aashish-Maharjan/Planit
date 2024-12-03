import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { useCreateTaskMutation, useGetAllTaskQuery, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { useGetTeamListQuery } from "../../redux/slices/api/userApiSlice";
import {toast} from "sonner";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen ,task}) => {
  
  let defaultValues = task?? {};
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const{data:userList,isLoading:userListLoading,error,refetch:userListRefetch}=useGetTeamListQuery() ;
  
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );

  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);



  const dispatch=useDispatch();
  const{refetch}=useGetAllTaskQuery({
    strQuery:"",
    search:"",
    isTrashed:""
  });
   const [createTask,{isLoading}]=useCreateTaskMutation();
  const[updateTask,{isLoading:isUpdating}]=useUpdateTaskMutation();
  const URLS = task?.assets?[...task.assets]:[];

  const submitHandler = async(data) => {
    try{
      const newData={
        ...data,
        team,
        stage:stage.replace(/ /g,''),
        priority,
      }
      const res =task?._id
      ?await updateTask({...newData,_id:task._id}).unwrap()
      :await createTask(newData).unwrap();
      refetch();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 50);
    }
    catch(err){
      toast.error(err?.data?.message||err.error)
  };
}

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Task Title'
              type='text'
              name='title'
              label='Task Title'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} users={userList} />

            <div className='flex gap-4'>
              <SelectList
                name="stage"
                label='Task Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Task Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                name="priority"
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              {/* <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div> */}
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;