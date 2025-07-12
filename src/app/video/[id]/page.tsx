import { notFound } from 'next/navigation';
import { Video } from '@/lib/types';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import CommentSection from '@/components/CommentSection';
import RelatedVideos from '@/components/RelatedVideos';
import { Box, Container, Grid, GridItem, VStack } from '@chakra-ui/react';

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getVideo(id: string): Promise<Video | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://vkiri-back.fly.dev';
    console.log('API URL:', apiUrl, 'Environment:', process.env.NODE_ENV);
    
    const response = await fetch(`${apiUrl}/api/v1/videos/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.video;
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

async function getRelatedVideos(videoId: string): Promise<Video[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://vkiri-back.fly.dev';
    const response = await fetch(`${apiUrl}/api/v1/videos/${videoId}/related`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Error fetching related videos:', error);
    return [];
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = await getVideo(id);
  
  if (!video) {
    notFound();
  }
  
  const relatedVideos = await getRelatedVideos(id);
  
  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="7xl" px={4} py={6}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Main content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Video player */}
              <VideoPlayer video={video} />
              
              {/* Video info */}
              <VideoInfo video={video} />
              
              {/* Comments */}
              <CommentSection videoId={video.id} />
            </VStack>
          </GridItem>
          
          {/* Sidebar */}
          <GridItem>
            <RelatedVideos videos={relatedVideos} currentVideoId={video.id} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { id } = await params;
  const video = await getVideo(id);
  
  if (!video) {
    return {
      title: 'Video Not Found'
    };
  }
  
  return {
    title: video.title,
    description: `${video.uploader_name} - ${video.view_count_formatted} views - ${video.published_at_formatted}`,
    openGraph: {
      title: video.title,
      description: `${video.uploader_name} - ${video.view_count_formatted} views`,
      images: [video.thumbnail_url],
      type: 'video.other',
      url: video.youtube_url,
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: `${video.uploader_name} - ${video.view_count_formatted} views`,
      images: [video.thumbnail_url],
    },
  };
}