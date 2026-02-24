import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Key,
  FileText,
  BarChart3,
  LogOut,
  ChevronLeft,
  BookOpen,
  Star,
  CalendarCheck,
  MessageSquare,
} from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";

const NAV_ITEMS = [
  { label: "API Keys", icon: Key, path: "/admin/api-keys" },
  { label: "Blog", icon: BookOpen, path: "/admin/blog" },
  { label: "Content", icon: FileText, path: "/admin/content" },
  { label: "Google Reviews", icon: MessageSquare, path: "/admin/google-reviews" },
  { label: "Testimonials", icon: Star, path: "/admin/testimonials" },
  { label: "Bookings", icon: CalendarCheck, path: "/admin/bookings" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out", description: "You have been signed out." });
    navigate("/admin/login");
  };

  return (
    <AdminGuard>
      <Helmet>
        <title>Admin Portal — Dr. Swathika Rajendran</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card/50 flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif-display text-lg font-semibold text-foreground">Admin Portal</h2>
            <p className="text-xs text-muted-foreground font-sans-body mt-1">Dr. Swathika Rajendran</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans-body transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Website
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans-body text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AdminGuard>
  );
}
