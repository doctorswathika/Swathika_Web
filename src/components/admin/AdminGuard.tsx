import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import Auth from "@/pages/Auth";

const ADMIN_EMAIL = "doctorswathika@gmail.com";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAdmin = (session: { user?: { email?: string | null } } | null) =>
      !!session?.user?.email && session.user.email.toLowerCase() === ADMIN_EMAIL;

    const evaluate = (session: any) => {
      if (!isAdmin(session)) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      setAuthorized(true);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      evaluate(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => evaluate(session));

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return <Auth />;
  }

  return <>{children}</>;
}
