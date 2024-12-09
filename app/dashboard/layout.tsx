import SideNav from "../features/dashboard/components/SideNav";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SideNav />
      <div>{children}</div>
    </div>
  );
}
