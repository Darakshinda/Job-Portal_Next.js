import React from 'react'

const ApplicantCard = ({ applicant }) => (
    <div className="flex items-center mb-4 bg-gray-800 p-4 rounded-lg">
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src={applicant.profilePicture || 'default-avatar.png'} alt={applicant.name} />
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium text-white">{applicant.applicant_name}</h4>
        <p className="text-gray-500">Email: {applicant.applicant_email}</p>
        <p className="text-gray-500">Phone: {applicant.applicant_phone}</p>
        <p className="text-gray-400">Applied on: {new Date(applicant.applied_at).toLocaleDateString()}</p>
        <p className="text-gray-300 mt-2">{applicant.cover_letter}</p>
        <div className="mt-2">
          <a href={applicant.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm mr-2">
            View Resume
          </a>
          <button className="btn btn-accent btn-sm disabled">View Full Application</button>
        </div>
      </div>
    </div>
  );
  

export default ApplicantCard