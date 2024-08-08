// components/JobCard.tsx
import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="w-[300px] bg-[#5A72A0] text-white rounded-xl snap-start">
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 mb-4">
          <Image
            src="/assets/images/default-profile.webp"
            alt="Profile picture"
            fill
            sizes="100%"
          />
        </div>
        <h2 className="text-xl font-semibold">Seeker</h2>
        <p className="text-sm text-gray-200">Full Stack (BE-Heavy) Engineer</p>
        <div className="space-x-2 mt-2">
          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
            NodeJS
          </span>
          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
            AngularJS
          </span>
          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
            HTML/CSS
          </span>
        </div>
        <hr className="border-[1px] border-gray-700 w-full mt-4" />
        <p className="mt-4 text-sm text-center px-4">
          Seeker is a full stack developer with 12 years of experience in
          software development. Having held tech-leadership roles in
          fast-growing startups.
        </p>
        <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg">
          View Resume
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
