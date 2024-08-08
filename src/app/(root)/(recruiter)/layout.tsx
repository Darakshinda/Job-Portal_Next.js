import Sidebar from "@/Components/HireDashSidebar";

export default function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
