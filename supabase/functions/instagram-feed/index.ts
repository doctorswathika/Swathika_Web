import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: 'Instagram access token not configured', reels: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=20&access_token=${accessToken}`
    );
    const data = await res.json();

    if (data.error) {
      console.error('Instagram API error:', data.error);
      return new Response(
        JSON.stringify({ error: data.error.message, reels: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const reels = (data.data || [])
      .filter((item: any) => item.media_type === 'VIDEO')
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        caption: item.caption || '',
        mediaUrl: item.media_url,
        thumbnailUrl: item.thumbnail_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
      }));

    return new Response(
      JSON.stringify({ reels }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Instagram feed error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Instagram feed', reels: [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});