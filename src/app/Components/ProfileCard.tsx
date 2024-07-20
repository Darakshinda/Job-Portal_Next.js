// components/JobCard.tsx
import Image from 'next/image'

const ProfileCard = () => {
  return (
    <div className="w-[400px] bg-gray-500 text-white rounded-lg">
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
          <img src={`https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg`} alt="Profile picture" />
        </div>
        <h2 className="text-2xl font-semibold">Seeker</h2>
        <p className="text-sm text-gray-400">Full Stack (BE-Heavy) Engineer</p>
        <div className="flex space-x-2 mt-3">
          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">NodeJS</span>
          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">AngularJS</span>
          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">HTML/CSS</span>
        </div>
        <div className="w-full mt-4">
          <hr className="border-gray-700" />
        </div>
        <p className="mt-4 text-sm text-center px-4">
          Seeker is a full stack developer with 12 years of experience in software development. Having held tech-leadership roles in fast-growing startups.
        </p>
        <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg">View Resume</button>
      </div>
    </div>
  )
}

export default ProfileCard
