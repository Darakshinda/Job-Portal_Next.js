import Footer from "@/Components/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen bg-white w-full">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
