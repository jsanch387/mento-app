import AuthInitializer from "../features/auth/AuthInitializer";
import SideNav from "../features/dashboard/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <AuthInitializer />
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow  md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
