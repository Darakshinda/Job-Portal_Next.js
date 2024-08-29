import Footer from "@/Components/Footer";
import Sidebar from "@/Components/Sidebar";
import { cookies } from "next/headers";

const getAccountType = () => {
  const account_type = cookies().get("account_type")?.value;
  console.log(account_type);
  return account_type;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account_type = getAccountType();

  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <div className="flex">
          {account_type && <Sidebar isHirer={account_type === "job_hirer"} />}
          {children}
        </div>
      </main>
      <footer className="ps-[4.5rem] max-[450px]:ps-0">
        <Footer />
      </footer>
    </>
  );
}
