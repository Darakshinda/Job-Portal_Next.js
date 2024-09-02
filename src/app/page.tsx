import Navbar from "../Components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-[100dvh] flex flex-col items-center">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-start bg-primary-50 w-full h-full">
        <p className="max-w-6xl xl:text-5xl md:text-3xl text-2xl font-Nunito leading-relaxed font-semibold tracking-tighter text-neutral-800 text-center mt-12">
          &quot;Where Employers and Job Seekers Meet&quot; <br />
          Explore Opportunities Now
        </p>

        <Image
          src="/assets/icons/home.svg"
          alt="Hero Image"
          width={500}
          height={500}
          className="object-contain"
        />
        
      </div>
    </main>
  );
}
