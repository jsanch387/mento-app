import TopNav from "../features/landing/components/TopNav";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNav />
      <div className="min-h-screen bg-primary flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
