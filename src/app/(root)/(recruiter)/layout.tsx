export default function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex ps-[4.5rem] max-[450px]:ps-0">{children}</div>
    </main>
  );
}
