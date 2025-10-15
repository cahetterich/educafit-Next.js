// components/shell/AppShell.jsx
import RoleNavbar from './RoleNavbar';  // client
import Footer from './Footer';

export default function AppShell({ role, children }) {
  return (
    <div className="min-h-screen bg-[color:var(--edu-bg)] text-[color:var(--edu-fg)]">
      {/* passa só o role */}
      <RoleNavbar role={role} />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
