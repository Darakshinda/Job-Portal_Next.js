import React from 'react';
import Link from 'next/link';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex">
    <div className="relative">
  <div className="absolute top-0 left-0 pl-24 pt-16 text-white text-4xl">
    <strong>CodeUnity</strong>
  </div>
  <div className="text-5xl text-white pt-60 pl-24 tracking-wider leading-relaxed">
    <p>
      <strong>
        Get the <span style={{ color: "#9457CF" }}>best engineering</span><br />
        <span style={{ color: "#9457CF" }}>minds </span>
        to bring your product<br />vision to life.
      </strong>
    </p>
  </div>
</div>
      <div className="ml-16 mt-10 mr-8 mb-8 h-screen border border-white rounded-lg flex-1">
        <div className="h-full overflow-y-auto p-8">
          <div className='text-3xl text-white tracking-wider leading-relaxed font-bold pr-4 mb-8'>
            Connect with Top Engineers
          </div>
          <div className="flex space-x-6">
            <div className="flex flex-col flex-1">
              <label className="text-gray-500 font-medium" htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                className="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-500 font-medium" htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                className="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-gray-500 font-medium" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@work.com"
              className="mt-1 p-2 bg-gray-900 text-white rounded border border-gray-700"
            />
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-gray-500 font-medium" htmlFor="phoneNumber">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <div className="flex mt-1">
              <select
                className="p-2 bg-gray-900 text-white rounded-l border border-gray-700"
                style={{ minWidth: '90px' }}
              >
                <option value="India +91">India +91</option>
                {/* Add more options here if needed */}
              </select>
              <input
                id="phoneNumber"
                type="text"
                placeholder="00000 00000"
                inputMode="numeric"
                className="flex-1 p-2 bg-gray-900 text-white rounded-r border border-gray-700 ml-4"
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-gray-500 font-medium" htmlFor="skills">
              What skills are you hiring for? <span className="text-red-500">*</span>
            </label>
            <div className="flex mt-1">
              <input
                id="skills"
                type="text"
                placeholder="Technical Skills Required"
                className="p-2 bg-gray-900 text-white rounded border border-gray-700 flex-1"
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-gray-500 font-medium" htmlFor="skills">
              How did you hear about CodeUnity? <span className="text-red-500">*</span>
            </label>
            <div className="flex mt-1">
              <input
                id="skills"
                type="text"
                placeholder="How did you hear about us"
                className="p-2 bg-gray-900 text-white rounded border border-gray-700 flex-1"
              />
            </div>
          </div>
          
          <div className="mt-8 ">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: '#9457CF' }}>
  Hire Now
</button>

</div>
<div className='mt-8'>
<div className="bubble-element Text cpaKaPf0 " style={{
  whiteSpace: 'pre-wrap',
  overflow: 'visible',
  fontFamily: 'Space Grotesk',
  fontSize: '14px',
  fontWeight: 400,
  fontStyle: 'italic',
  color: 'rgb(136, 136, 137)',
  letterSpacing: '1px',
  wordSpacing: '1px',
  lineHeight: 1.4,
  borderRadius: '0px',
  opacity: 1,
  alignSelf: 'flex-start',
  minWidth: '0px',
  order: 17,
  minHeight: '32px',
  height: 'max-content',
  flexGrow: 0,
  flexShrink: 0,
  width: 'calc(100% + 0px)',
  margin: '-5px 0px 0px',
  zIndex: 211
}}>
  By submitting, you acknowledge that you have read and agreed to our {' '}
  <a href="https://s3.us-east-2.amazonaws.com/flexiple-marketing/pdf/terms-of-use.pdf" target="_blank"><strong><u><font color="#9457CF">Terms of Service</font></u></strong></a>{' '}
  and {' '}
  <a href="https://s3.us-east-2.amazonaws.com/flexiple-marketing/pdf/privacy-policy.pdf" target="_blank"><u><strong><font color="#9457CF">Privacy Policy</font></strong></u></a>.
</div>
</div>
<div className='justify-center text-center mt-8'>
<div className="bubble-element Text cpaKaOaE0" style={{ whiteSpace: 'pre-wrap', overflow: 'visible', fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.4, borderRadius: 0, opacity: 1, alignSelf: 'center', minWidth: '16px', order: 18, minHeight: '10px', height: 'max-content', flexGrow: 0, flexShrink: 0, width: 'auto', margin: '0px', zIndex: 203 }}>
  Already have an account? <font color="#9457CF"><Link href="/login" target="_blank">Login</Link></font>
</div>
</div>




        </div>
      </div>
    </div>
  );
};

export default Signup;
