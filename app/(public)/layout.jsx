// app/(public)/layout.jsx
import Navbar from '../../components/layout/Navbar';
import ConditionalFooter from '../../components/layout/ConditionalFooter';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[color:var(--edu-bg)] text-[color:var(--edu-fg)]">
      <Navbar />
      <main className="container-edu py-4">{children}</main>
      <ConditionalFooter />
    </div>
  );
}
