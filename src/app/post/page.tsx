"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../Navbar";
import JobList from "../Components/JobList";
import {JobCard} from "../../stories/Job-Card";
import {NavBar} from "../../stories/NavBar";
import { title } from "process";
import { Jodit } from 'jodit-react';
import {TextInput,TextArea} from "../../stories/TextInput";import { Tags } from '@/stories/Tags';
import { Select } from '@/stories/Dropdown';
import JoditEditorComponent from '../Components/Jodit-Editor';
import UploadButton from '../Components/ImgUpload';
import Checkbox from '../Components/check';
import SelectedOptions from '../Components/Options';
import "../Components/Form.css";
import locnOpns from "../post/data/location.json";import tagOpns from "../post/data/tags.json";import benefitOpns from "../post/data/benefits.json";
import emptype from "../post/data/emptype.json";import primTag from "../post/data/primTag.json";import minSal from "../post/data/minsalary.json";
import maxSal from "../post/data/maxsalary.json";



/**
 * Primary UI component for user interaction
 */



export default function Home() {
    const [user, setuser] = useState({
      company_name: "", position: "", emptype: "Full-time", primary_tag: "Software Development", tags: "", location_restriction: '',
      logo: '', annual_salary_min: "", annual_salary_max: '', job_description: '', benefits: '', how_to_apply: '', apply_email_address: '', apply_url: '',
      company_twitter: '', company_email: '', invoice_email: '', invoice_address: '', invoice_notes: '', pay_later: false, pltrEml: '', feedback: '',bgcolor:'#fefba4'
    });

    const handleChange = (key, value) => {
        setuser((prevState) => {
          if (prevState[key] === value) {
            return prevState; // Prevent unnecessary state updates
          }
          return {
            ...prevState,
            [key]: key.includes('annual_salary') ? Number(value.replace(/[^0-9]/g, '')) : value,
          };
        });
      };
      
  
  
  const [v27type, set27type] = useState<number>(1);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const b=`USD 10000 per year,USD $20,000 per year,USD $30,000 per year,USD $40,000 per year,USD $50,000 per year,USD $60,000 per year,USD $70,000 per year,USD $80,000 per year,USD $90,000 per year,USD $100,000 per year,USD $110,000 per year,USD $120,000 per year,USD $130,000 per year,USD $140,000 per year,USD $150,000 per year,USD $160,000 per year,USD $170,000 per year,USD $180,000 per year,USD $190,000 per year,USD $200,000 per year,USD $210,000 per year,USD $220,000 per year,USD $230,000 per year,USD $240,000 per year,USD $250,000 per year,USD $260,000 per year,USD $270,000 per year,USD $280,000 per year,USD $290,000 per year,USD $300,000 per year,USD $310,000 per year,USD $320,000 per year,USD $330,000 per year,USD $340,000 per year,USD $350,000 per year,USD $360,000 per year,USD $370,000 per year,USD $380,000 per year,USD $390,000 per year,USD $400,000 per year,USD $410,000 per year,USD $420,000 per year,USD $430,000 per year,USD $440,000 per year,USD $450,000 per year,USD $460,000 per year,USD $470,000 per year,USD $480,000 per year,USD $490,000 per year,USD $500,000 per year,USD $510,000 per year,USD $520,000 per year,USD $530,000 per year,USD $540,000 per year,USD $550,000 per year,USD $560,000 per year,USD $570,000 per year,USD $580,000 per year,USD $590,000 per year,USD $600,000 per year,USD $610,000 per year,USD $620,000 per year,USD $630,000 per year,USD $640,000 per year,USD $650,000 per year,USD $660,000 per year,USD $670,000 per year,USD $680,000 per year,USD $690,000 per year,USD $700,000 per year,USD $710,000 per year,USD $720,000 per year,USD $730,000 per year,USD $740,000 per year,USD $750,000 per year`
const c=b.split(",USD").join("<USD");

let comp = user.company_name, pos = user.position, jobdesc = user.job_description, how2apply = user.how_to_apply;
if(comp=="") comp="Company";if(pos=="") pos="Position";if(jobdesc=="") jobdesc=`The description of the job position will appear here. Write this in the "Job Description" box above.`;
const disp=()=>console.log(user);

const handleSubmit = () => {
  const url = `${baseUrl}/jobs/create/`;
  const token = localStorage.getItem('access_token'); // Assuming you store your JWT token in localStorage

  axios.post(url, user, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(response => {
      console.log(response.data);
      alert('Job registered successfully');
  })
  .catch(error => {
      console.error('There was an error registering the job!', error);
      alert('Failed to register the job');
  });
};


return (
    <main className="bg-base-100">
      <main className=" fixed bottom-0 z-10 left-[2.5%] w-full" style={{width:"60%",}}>
      <JobCard imgflg bdg imgsrc={user.logo} bgcolor={user.bgcolor} position={user.position} company_name={user.company_name} location_restriction={user.location_restriction} tags={user.tags} created_at="5/17/2024 23:11:25"/></main>
       <NavBar endIcon={false} post={true}/>
       <div className=" fixed bottom-0 z-10 w-full" style={{width:"30%",height:"22%",marginLeft:"60%",backgroundColor:"white",border:"shadow",borderWidth:"2px",display:"flex",justifyItems:"center",alignItems:"center"}}>
        <button className='btn btn-error ml-[5%] text-white font-bold'  style={{width:"90%",height:"50%",}} onClick={handleSubmit}>Post Job</button></div>

       <div className="group">
        <div className="group-heading">LET'S START</div>

        <span className="head">COMPANY NAME*</span>
        <TextInput keyy='company_name' val={user.company_name} placeholder={`Company name`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc.</span>
        
        <span className="head">POSITION*</span>
        <TextInput keyy='position' val={user.position} placeholder={`Position`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}> Please specify as single job position like "Marketing Manager" or "Node JS Developer", not a sentence like "Looking for PM / Biz Dev / Manager". We know your job is important but please DO NOT WRITE IN FULL CAPS. If posting multiple roles, please create multiple job posts. A job post is limited to a single job. We only allow real jobs, absolutely no MLM-type courses "learn how to work online" please.</span>
        
        <span className="head">EMPLOYMENT TYPE*</span>
        <Select keyy='emptype' onChange={handleChange} req={true} cls="input_company" body={emptype}/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}></span>

        <span className="head">PRIMARY TAG</span>
        <Select keyy='primary_tag' onChange={handleChange} req={true} cls="input_company" body={primTag}/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}></span>
        
        <span className="head">TAGS, KEYWORDS OR STACK*</span>
        <Tags keyy='tags' cls="input_company" settgs={handleChange} dynamic={true} options={tagOpns}/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Short tags are preferred. Use tags like industry and tech stack. The first 3 or 4 tags are shown on the site, the other tags aren't but the job will be shown on each tag specific page (like /remote-react-jobs). We also sometimes generate tags automatically after you post/edit to supplement.</span>

        <span className="head">JOB IS RESTRICTED TO LOCATIONS?</span>
        <Tags keyy='location_restriction' cls="input_company" settgs={handleChange} dynamic={true} options={locnOpns}/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>If you'd only like to hire people from a specific location or timezone this remote job is restricted to (e.g. Europe, United States or Japan). If not restricted, please leave it as "Worldwide". The less restricted this is, the more applicants you will get. Keeping it "Worldwide" is highly recommended as you'll have access to a worldwide pool of talent. To promote fairness in remote work positions, worldwide jobs are ranked higher.</span>

       </div>

       <div className="group">
        <div className="group-heading">COMPANY</div>

        <span className="head">COMPANY TWITTER</span>
        <TextInput keyy='company_twitter' val={user.company_twitter} placeholder={`username`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Twitter username without @. Not required, but used to tag your company when we tweet out your job post.</span>
        
        <span className="head">COMPANY EMAIL* {`(STAYS PRIVATE, FOR INVOICE + EDIT LINK)`}</span>
        <TextInput keyy='company_email' val={user.company_email} placeholder={``} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Make sure this email is accessible by you! We use this to send the invoice and edit link. We can not and do not manually resend it! If you use your company domain (same as company name), we will show a [ Verified ] tag on your job post.</span>
        
        <span className="head">INVOICE EMAIL {`(STAYS PRIVATE)`}</span>
        <TextInput keyy='invoice_email' val={user.invoice_email} placeholder={``} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>We send a copy of the invoice and edit link to here too. You can write your finance department or accountant expenses email here so they get a copy of the invoice for your bookkeeping.</span>

        <span className="head">INVOICE ADDRESS*</span>
        <TextArea keyy="invoice_address" val={user.invoice_address} placeholder={`e.g. your company's full name and full invoice address, including building, street, city and country; also things like your VAT number, this is shown on the invoice.`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>{`Specify your company address here and we'll put it on your invoice for your bookkeeping. Be sure to [ Save changes ] in bottom right after editing your invoice address. Then it'll be instantly updated on the invoice.`}</span>
        
        <span className="head">INVOICE NOTES / PO NUMBER</span>
        <TextInput keyy='invoice_notes' val={user.invoice_notes} placeholder={`e.g. PO number 1234`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Not required. Add notes here that you'd like to see on the invoice/receipt such as a Purchase Order number or any other internal notes you need for reference. You can add or edit this later.</span>

        <span className="head">PAY LATER</span>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>{`Need to get approval for this payment? Or send the invoice to your finance department first? No problem, we'll save your job post and send you (and your finance department below) a payment link. Once it's paid we immediately publish it!`}</span>

        <span className="head">PAY LATER EMAIL*</span>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>We will send a link to pay for this job to this email address.</span>
       
       </div>

       <div className="group">
        <div className="group-heading">JOB DETAILS</div>

        <span className="head">{`COMPANY LOGO (.JPG OR .PNG, SQUARE OR ROUND)`}</span>
        <div style={{marginLeft:"1.4%"}}><UploadButton keyy="logo" onChange={handleChange}/></div>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Twitter username without @. Not required, but used to tag your company when we tweet out your job post.</span>
        
        <span className="head">JOB DESCRIPTION*</span>
        <div style={{marginLeft:"1.4%",marginRight:"2%"}}><JoditEditorComponent keyy="job_description" value={user.job_description} onChange={handleChange}/></div>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Click anywhere outside the editor to save</span>
        
        <div>
      <span className="head">{`ANNUAL SALARY OR COMPENSATION IN USD (GROSS, ANNUALIZED, FULL-TIME-EQUIVALENT (FTE) IN USD EQUIVALENT)*`}</span>
      <div style={{marginLeft:"18%"}}>
        <div style={{display:"inline"}}>
          <Select 
            keyy="annual_salary_min" 
            onChange={(key, value) => handleChange(key, value)} 
            req={true} 
            cls="input_company" 
            body={minSal} 
            type="small" 
          />
        </div> 
        <a style={{display:"inline",fontSize:"30px",marginLeft:"1%"}}>{`-`}</a>
        <div style={{display:"inline"}}>
          <Select 
            keyy="annual_salary_max" 
            onChange={(key, value) => handleChange(key, value)} 
            req={true} 
            cls="input_company" 
            body={maxSal} 
            type="small"
          />
        </div> 
      </div>
      <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>
        It's illegal to not share salary range on job posts since 2021. Posts without salary will automatically show an estimate of salary based on similar jobs. Remote job postings are legally required to show a salary compensation range in many U.S. states and countries. Google does NOT index jobs without salary data. If it's a short-term gig, use the annual full-time equivalent. For example, if it's a 2-week project for $2,000, the annual equivalent would be $2,000 / 2 weeks * 52 weeks = $52,000. Please use USD equivalent. We don't have currency built-in yet and we'd like to use this salary data to show salary trends in remote work. Remote OK is a supporter of #OpenSalaries.
      </span>
    </div>

        <span className="head">BENEFITS*</span>
        <div style={{marginLeft:"1.4%"}}><SelectedOptions options={benefitOpns} keyy="benefits" onChange={handleChange} /></div>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}></span>
        
        <span className="head">HOW TO APPLY?</span>
        <div style={{marginLeft:"1.4%",marginRight:"2%"}}><JoditEditorComponent keyy="how_to_apply" value={user.how_to_apply} onChange={handleChange}/></div>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>Click anywhere outside the editor to save</span>

        <span className="head">EMAIL TO GET JOB APPLICATIONS VIA APPLICANT AI (OUR OWN ATS)*</span>
        <TextInput keyy='apply_email_address' val={user.apply_email_address} placeholder={`Apply email address`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>{`Need to get approval for this payment? Or send the invoice to your finance department first? No problem, we'll save your job post and send you (and your finance department below) a payment link. Once it's paid we immediately publish it!`}</span>

        <span className="head">APPLY URL</span>
        <TextInput keyy='apply_url' val={user.apply_url} placeholder={`https://`} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>If you'd like to use your own apply form or ATS you can enter the URL here for people to apply. Jobs that use our own Applicant AI ATS generally receive more applicants.</span>
       
       </div>

       <div className="group">
        <div className="group-heading">FEEDBACK BOX</div>

        <span className="head">FEEDBACK ABOUT CODEUNITY</span>
        <TextArea keyy="feedback" val={user.feedback} onChange={handleChange} req={true} cls="input_company"/>
        <span className="info" style={{marginTop:"8px", marginLeft:"18px",width: "95%",}}>{`This isn't part of the job post. If you have any feature requests or general feedback about posting a job Remote OK, leave it here. Please be radically honest, I'm always improving the site and act on your feedback fast. It's most important that you're happy with the site and I want you to keep coming back to post here!`}</span>
 
       </div>
       <div className="group">
          <div className="group-heading">Preview</div>
          <main className="w-full"><br/>
          <div className="top-text"   style={{display:"flex",flexDirection:"column",justifyItems:"center",alignItems:"center",width:"100%"}}>
        <strong >Here's a preview of how your job post will look like</strong>
        <p  style={{marginTop:"1.5px"}}>Don't worry if it's not perfect the first time: your job is fully editable for free after posting it!</p>
        </div><br/>
          <div style={{marginTop:"5px",marginBottom:"50px", border:"shadow",borderWidth:"1px",borderRadius:"7px",width:"95%",marginLeft:"2.5%"}}>
          <div style={{marginLeft:"2%",marginTop:"1%"}}><JobCard imgflg bdg imgsrc={user.logo} cls="bg-yellow-100 w-12wh" position={user.position} company_name={user.company_name} location_restriction={user.location_restriction} tags={user.tags} created_at="5/17/2024 23:11:25"/></div>
          <div style={{display:"flex",flexDirection:"column",justifyItems:"center",alignItems:"center",width:"100%"}}><h1 style={{textAlign:"left"}}>
        <div style={{fontSize: "35px",marginTop:"3%"}}>
        <span>{comp}</span> is hiring a
        </div> <b style={{fontSize: "35px",}}>Remote <span>{pos}</span></b>
        <main dangerouslySetInnerHTML={{ __html: jobdesc }}></main>
        </h1></div>
        <div style={{marginTop:"4%",marginBottom:"50px",minHeight:"300px", border:"solid",borderWidth:"1px",borderRadius:"7px",width:"60%",marginLeft:"20%"}}>
        <div className="top-text"   style={{display:"flex",flexDirection:"column",justifyItems:"center",alignItems:"center",width:"100%",padding:"5%"}}>
        <strong style={{fontSize: "25px",}} >How do you apply?</strong>
        {how2apply==""&&<p  style={{marginTop:"5px"}}>{`Here the instructions go on how to apply for this job. Write them in the "How to Apply?" box.`}</p>}
        <div  style={{marginTop:"1.5px"}} dangerouslySetInnerHTML={{ __html:how2apply}}/>
        <div className="border border-gray-300 rounded-md px-2 py-2"  style={{borderStyle:"dotted",height:"5%",marginTop:"15px",fontSize: "16px",color:"#C7C7C7"}}>Apply for this job</div>
        </div><br/>
        </div>
          </div>
          </main>
      </div>

  <div style={{height:"200px"}}></div>
     
    </main>
    
  );
}