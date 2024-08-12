export default function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex ps-[4.5rem]">{children}</div>
    </main>
  );
}
