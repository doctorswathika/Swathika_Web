import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_HANDLE = "@drswathikarajendran";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'YouTube API key not configured', videos: [], shorts: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Step 1: Get channel ID from handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items || channelData.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Channel not found', videos: [], shorts: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const channelId = channelData.items[0].id;

    // Step 2: Search for latest video (non-short, longer than 60s typically)
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=10&key=${apiKey}`
    );
    const videosData = await videosRes.json();

    const allVideoIds = (videosData.items || []).map((item: any) => item.id.videoId).filter(Boolean);

    // Step 3: Get video details to distinguish shorts from regular videos
    let videos: any[] = [];
    let shorts: any[] = [];

    if (allVideoIds.length > 0) {
      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${allVideoIds.join(',')}&key=${apiKey}`
      );
      const detailsData = await detailsRes.json();

      for (const video of (detailsData.items || [])) {
        const duration = video.contentDetails?.duration || '';
        // Parse ISO 8601 duration - shorts are typically ≤60 seconds
        const isShort = isShortDuration(duration);
        
        const videoInfo = {
          id: video.id,
          title: video.snippet?.title || '',
          thumbnail: video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url || '',
          publishedAt: video.snippet?.publishedAt || '',
        };

        if (isShort) {
          shorts.push(videoInfo);
        } else {
          videos.push(videoInfo);
        }
      }
    }

    // Return latest 1 video and latest 3 shorts
    return new Response(
      JSON.stringify({
        videos: videos.slice(0, 1),
        shorts: shorts.slice(0, 3),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('YouTube feed error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch YouTube feed', videos: [], shorts: [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});

function isShortDuration(isoDuration: string): boolean {
  // Parse PT#M#S or PT#S format
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return false;
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds <= 60;
}
