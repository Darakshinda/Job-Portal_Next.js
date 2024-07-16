import React from 'react';
import './JobModal.css';import './Form.css';

interface JobDetailsModalProps {
  job:{
    company: "",position: "",emptype: "Full-time",primtg: "",tags: "",locns:'',
    logo:'',minsal:"",maxsal:'',desc:'',benefits:'',how2apply:'',email4jobappl:'',applUrl:'',
    twtr:'',compMail:'',invMail:'',invAdrs:'',invNote:'',payLtr:false,pltrEml:'',fdbck:'',bgcolor:'#fefba4',
  };
  onClose: Function;
}



const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  const handleOverlayClick = () => {
   
      onClose();
    
  };
  const bgcol='black';
  let comp=job.company,pos=job.position,jobdesc=job.desc,how2apply=job.how2apply;
  if(comp=="") comp="Company";if(pos=="") pos="Position";

  return (
   
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modale text-white scrollbar-hide" onClick={(event)=>{event.stopPropagation();}}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="group" style={{background:bgcol,}}>
          <div className="group-heading" style={{background:bgcol,color:'white',}}><p style={{textTransform:'none',}}>Details</p></div>

          <main className="w-full bg-grey-900 text-white">
          
            <br/>
          <div style={{marginTop:"5px",marginBottom:"50px", border:"shadow",borderWidth:"1px",borderRadius:"7px",width:"95%",marginLeft:"2.5%"}}>
          
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar top-[82px] left-[13%]">
            <div className="w-20 rounded-full border border-white" style={{marginLeft:"0%"}}><img alt="Tailwind CSS Navbar component" src={job.logo} /></div>
          </div>
          
          <div style={{display:"flex",flexDirection:"column",width:"100%"}}><h1 style={{textAlign:"left"}}>

       <div className='ml-[20%]'>  
        <div style={{fontSize: "35px",marginTop:".5%",display:"flex",justifyItems:"center"}}>
        
        <span>{comp} is hiring a</span>
        </div>
        
        
         <b style={{fontSize: "35px",}}>Remote <span>{pos}</span></b>
         </div>
         </h1></div>
        

        <br/>

        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head" style={{background:bgcol,color:'white',}}>EMPLOYMENT TYPE: </span><div style={{marginTop:"18px",}}>{job.emptype}</div></div>
        {job.primtg!=""&&job.primtg!="Select a Primary tag for the Job"&&<div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head" style={{background:bgcol,color:'white',}}>PRIMARY TAG:</span><div style={{marginTop:"18px",}}>{job.primtg}</div></div>}
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head" style={{background:bgcol,color:'white',}}>TECHNICAL SKILLS:</span><div style={{marginTop:"18px",}}>{job.tags}</div></div>
        {job.locns!=""&&<div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head" style={{background:bgcol,color:'white',}}>LOCATIONS ALLOWED:</span><div style={{marginTop:"18px",}}>{job.locns}</div></div>}
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head" style={{background:bgcol,color:'white',}}>SALARY RANGE:</span><div style={{marginTop:"18px",}}>{`${job.minsal}  -  ${job.maxsal}`}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head" style={{background:bgcol,color:'white',}}>BENEFITS:</span><div style={{marginTop:"18px",}}>{job.benefits}</div></div>

        <span className="head" style={{marginLeft:"1.5%",background:bgcol,color:'white',}} >JOB DESCRIPTION:</span>
        <div className=' scrollbar-hide' style={{marginLeft:"2%",overflowX: "auto",overflowY: "auto",width:"80%",maxHeight:"400px",padding:"2px",borderRadius:"4px"}}>
        <main dangerouslySetInnerHTML={{ __html: jobdesc }}></main></div>

        {how2apply!=""&&how2apply!="<p><br></p>"&&<div>
        <span className="head" style={{marginLeft:"1.5%",background:bgcol,color:'white',}} >HOW TO APPLY:</span>
        <div className=' scrollbar-hide' style={{marginLeft:"2%",overflowX: "auto",overflowY: "auto",width:"80%",maxHeight:"400px",padding:"2px",borderRadius:"4px"}}>
        <main dangerouslySetInnerHTML={{ __html: how2apply }}></main></div><br/>
        </div>}
       
          </div>
          </main>
      </div>
  
      </div>
    </div>
  );
};

export default JobDetailsModal;
