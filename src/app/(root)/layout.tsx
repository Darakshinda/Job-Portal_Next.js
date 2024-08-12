import Footer from "@/Components/Footer";
import Sidebar from "@/Components/HireDashSidebar";
import { cookies } from "next/headers";

const getIsHirer = () => {
  const account_type = cookies().get("account_type")?.value;
  console.log(account_type);
  return account_type === "job_hirer";
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <div className="flex">
          <Sidebar isHirer={getIsHirer()} />
          {children}
        </div>
      </main>
      <footer className="ps-[4.5rem]">
        <Footer />
      </footer>
    </>
  );
}
