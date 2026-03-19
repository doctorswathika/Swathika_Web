import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ADMIN_EMAIL = "bbm.genai@gmail.com";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || session.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        navigate("/auth", { replace: true });
        return;
      }
      setAuthorized(true);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session || session.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        navigate("/auth", { replace: true });
        return;
      }
      setAuthorized(true);
      setLoading(false);
    });

    checkAdmin();
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
