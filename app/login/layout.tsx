export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  );
}
