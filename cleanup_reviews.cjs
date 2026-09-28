const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables from .env.local manually
const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|^'|"$|'$/g, '');
  }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function cleanDuplicates() {
  console.log("Fetching all reviews...");
  const { data: reviews, error } = await supabase
    .from('google_reviews')
    .select('*')
    .order('review_time', { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return;
  }

  console.log(`Found ${reviews.length} total reviews.`);

  const seenAuthors = new Set();
  const duplicateIds = [];

  for (const review of reviews) {
    const key = review.author_name;
    
    if (seenAuthors.has(key)) {
      // Duplicate found
      duplicateIds.push(review.id);
    } else {
      seenAuthors.add(key);
    }
  }

  console.log(`Found ${duplicateIds.length} duplicates to delete.`);

  if (duplicateIds.length === 0) {
    console.log("No duplicates found! You're good to go.");
    return;
  }

  // Delete them in batches
  for (let i = 0; i < duplicateIds.length; i += 10) {
    const batch = duplicateIds.slice(i, i + 10);
    const { error: deleteError } = await supabase
      .from('google_reviews')
      .delete()
      .in('id', batch);
      
    if (deleteError) {
      console.error(`Error deleting batch ${i}:`, deleteError);
    } else {
      console.log(`Deleted batch of ${batch.length} duplicates.`);
    }
  }

  console.log("Cleanup complete!");
}

cleanDuplicates();
