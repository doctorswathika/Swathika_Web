import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Find admin user
  const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) return new Response(JSON.stringify({ error: listErr.message }), { status: 500 });

  const admin = users.find((u: any) => u.email === "bbm.genai@gmail.com");
  if (!admin) return new Response(JSON.stringify({ error: "Admin user not found" }), { status: 404 });

  const { error } = await supabase.auth.admin.updateUserById(admin.id, {
    password: "BBMGenai@2026",
  });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
