import React from 'react'
import {FaList} from "react-icons/fa";
import {MdGridView} from "react-icons/md";
import Loading from '../components/Loader';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Title from '../components/Title';
import Tabs from '../components/Tabs';

const TABS=[
  {title:"Board View",icon:<MdGridView/>},
  {title:"List View",icon:<FaList/>},
];
const TASK_TYPE={
  todo:"bg-blue-600",
  "in progress":"bg-yellow-600",
  completed:"bg-green-600",
}
const Tasks = () => {
  const params=useParams();
  const [selected,setSelected]=useState(0);
  const[open,setOpen]=useState(false);
  const[loading,setloading]=useState(true);
  const status = params?.status ||" ";
  return loading?(
    <div className='py-10'>
      <Loading/>
    </div>
  ):(
    <div className='w-full'>
      <div className='flex items-center jusitfy-between mb-4'>
          <Title  title={status ?`${status}Tasks`:"Tasks"}/>
          
          {!status &&(
            <Button 
              label='Create Task'
              icon={<IOMdAdd className='text-lh'/>}
              className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
            />
          )}
      </div>
      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>

        </Tabs>
      </div>
    </div>
  )
}

export default Tasks ;
