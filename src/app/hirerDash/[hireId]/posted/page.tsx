import PageApi from "@/app/Components/FetchJobs";
import Sidebar from "@/app/Components/HireDashSidebar";

import { GetStaticProps, NextPage } from 'next';

import { useState } from 'react';





export default function Page({ params }: { params: { hireId: string } }) {
    return (
      <div>
      <Sidebar hireId={params.hireId}/>
        <main className=" h-screen w-screen bg-gray-900 ml-[230px]">
          
      <div className=" bg-gray-900">
       <PageApi/> 

      
    Posted Jobs
        </div></main>
        </div>
      );
  }


