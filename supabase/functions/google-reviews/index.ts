import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const sb = createClient(supabaseUrl, serviceRoleKey);

    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    const placeId = Deno.env.get('GOOGLE_PLACE_ID');

    if (!apiKey || !placeId) {
      return new Response(
        JSON.stringify({ error: 'Google Places API key or Place ID not configured', reviews: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Fetch reviews from Google Places API
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status !== 'OK' || !data.result?.reviews) {
      return new Response(
        JSON.stringify({ error: data.error_message || 'No reviews found', reviews: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const reviews = data.result.reviews.map((r: any) => ({
      review_id: `google_${r.time}`,
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      profile_photo_url: r.profile_photo_url || null,
      relative_time: r.relative_time_description,
      review_time: r.time,
    }));

    // Upsert reviews into DB (don't change is_displayed)
    for (const review of reviews) {
      const { data: existing } = await sb
        .from('google_reviews')
        .select('id')
        .eq('review_id', review.review_id)
        .maybeSingle();

      if (!existing) {
        await sb.from('google_reviews').insert(review);
      } else {
        await sb.from('google_reviews')
          .update({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            profile_photo_url: review.profile_photo_url,
            relative_time: review.relative_time,
          })
          .eq('review_id', review.review_id);
      }
    }

    // Return all reviews from DB
    const { data: allReviews } = await sb
      .from('google_reviews')
      .select('*')
      .order('review_time', { ascending: false });

    return new Response(
      JSON.stringify({ reviews: allReviews || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Google reviews error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Google reviews', reviews: [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});