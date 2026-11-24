import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pciuhptokthbbyyjbnaf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjaXVocHRva3RoYmJ5eWpibmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTY1MTAsImV4cCI6MjA4Njg5MjUxMH0.Xf4D3RZKX4uNrFCAGQkGz63pPi0YssvAIB3uvTaXCBI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  // Fetch ALL reviews, newest first (by review_time, then created_at as fallback)
  const { data, error } = await supabase
    .from("google_reviews")
    .select("id, author_name, rating, review_time, is_displayed")
    .order("review_time", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error.message);
    process.exit(1);
  }

  console.log(`Total reviews in DB: ${data.length}`);
  data.forEach((r, i) => {
    const time = r.review_time ? new Date(r.review_time * 1000).toLocaleDateString("en-IN") : "no date";
    const status = r.is_displayed ? "✅ shown" : "❌ hidden";
    console.log(`  ${i + 1}. [${status}] ${r.author_name} — ${time} (id: ${r.id})`);
  });

  // Keep the top 10 as "displayed", hide everything else
  const toKeep = data.slice(0, 10).map(r => r.id);
  const toHide = data.slice(10).map(r => r.id);

  console.log(`\nKeeping latest ${toKeep.length} review(s) visible.`);
  console.log(`Hiding ${toHide.length} older review(s).`);

  if (toHide.length === 0) {
    console.log("Nothing to hide — you have 10 or fewer reviews total.");
    return;
  }

  // Ensure the top 10 are visible
  const { error: showErr } = await supabase
    .from("google_reviews")
    .update({ is_displayed: true })
    .in("id", toKeep);

  if (showErr) {
    console.error("Error showing top 10:", showErr.message);
    process.exit(1);
  }

  // Hide the rest
  const { error: hideErr } = await supabase
    .from("google_reviews")
    .update({ is_displayed: false })
    .in("id", toHide);

  if (hideErr) {
    console.error("Error hiding old reviews:", hideErr.message);
    process.exit(1);
  }

  console.log("✅ Done! Latest 10 are visible; older ones are hidden.");
}

main();
