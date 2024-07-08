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
  console.log(job);
  let comp=job.company,pos=job.position,jobdesc=job.desc,how2apply=job.how2apply;
  if(comp=="") comp="Company";if(pos=="") pos="Position";

  return (
   
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modale" onClick={(event)=>{event.stopPropagation();}}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="group">
          <div className="group-heading">Details</div>

          <main className="w-full"><br/>
          <div style={{marginTop:"5px",marginBottom:"50px", border:"shadow",borderWidth:"1px",borderRadius:"7px",width:"95%",marginLeft:"2.5%"}}>
          <div style={{display:"flex",flexDirection:"column",justifyItems:"center",alignItems:"center",width:"100%"}}><h1 style={{textAlign:"left"}}>
          
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" style={{marginLeft:"41%"}}>
            <div className="w-20 rounded-full border border-black"><img alt="Tailwind CSS Navbar component" src={job.logo} /></div>
          </div>
        <div style={{fontSize: "35px",marginTop:"3%",display:"flex",justifyItems:"center"}}>
        <span>{comp} is hiring a</span>
        </div> <b style={{fontSize: "35px",}}>Remote <span>{pos}</span></b></h1></div>
        <br/>

        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head">EMPLOYMENT TYPE: </span><div style={{marginTop:"18px",}}>{job.emptype}</div></div>
        {job.primtg!=""&&job.primtg!="Select a Primary tag for the Job"&&<div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head">PRIMARY TAG:</span><div style={{marginTop:"18px",}}>{job.primtg}</div></div>}
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head">TECHNICAL SKILLS:</span><div style={{marginTop:"18px",}}>{job.tags}</div></div>
        {job.locns!=""&&<div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head">LOCATIONS ALLOWED:</span><div style={{marginTop:"18px",}}>{job.locns}</div></div>}
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head">SALARY RANGE:</span><div style={{marginTop:"18px",}}>{`${job.minsal}  -  ${job.maxsal}`}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",}}><span className="head">BENEFITS:</span><div style={{marginTop:"18px",}}>{job.benefits}</div></div>

        <span className="head" style={{fontSize: "25px",marginLeft:"1.5%",}} >JOB DESCRIPTION:</span>
        <div style={{marginLeft:"10%",overflowX: "auto",overflowY: "auto",width:"80%",maxHeight:"400px",minHeight:"125px",padding:"2px",border:"solid",borderRadius:"4px"}}>
        <main dangerouslySetInnerHTML={{ __html: jobdesc }}></main></div><br/>

        {how2apply!=""&&how2apply!="<p><br></p>"&&<div style={{marginTop:"4%",marginBottom:"50px",minHeight:"300px", border:"solid",borderWidth:"1px",borderRadius:"7px",width:"60%",marginLeft:"20%"}}>
        <div className="top-text"   style={{display:"flex",flexDirection:"column",justifyItems:"center",alignItems:"center",width:"100%",padding:"5%"}}>
        <strong style={{fontSize: "25px",}} >How do you apply?</strong>
        
        <div style={{overflowX: "auto",overflowY: "auto",width:"80%",maxHeight:"400px",padding:"2px",border:"solid",}}><div  style={{marginTop:"1.5px"}} dangerouslySetInnerHTML={{ __html:how2apply}}/></div>
        
        </div><br/>
        </div>}
       
          </div>
          </main>
      </div>
  
      </div>
    </div>
  );
};

export default JobDetailsModal;
