import { notFound } from 'next/navigation';
import { Video, VideoResponse } from '@/lib/types';
import { getApiUrl } from '@/lib/config';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import RelatedVideos from '@/components/RelatedVideos';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Box, Container, Grid, GridItem, VStack, Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getVideo(id: string): Promise<{ video: Video; relatedVideos: Video[] } | null> {
  try {
    const apiUrl = getApiUrl();
    console.log('API URL:', apiUrl, 'Environment:', process.env.NODE_ENV);
    
    const response = await fetch(`${apiUrl}/api/v1/videos/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data: VideoResponse = await response.json();
    return {
      video: data.video,
      relatedVideos: data.related_videos || []
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}


export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const result = await getVideo(id);
  
  if (!result) {
    notFound();
  }
  
  const { video, relatedVideos } = result;
  
  return (
    <>
      <AnimatedBackground />
      <Box 
        minH="100vh" 
        position="relative"
      >
      {/* TOP戻るボタン */}
      <Box position="fixed" top={4} left={4} zIndex={10}>
        <Button
          as={Link}
          href="/"
          bgGradient="linear(to-r, purple.400, pink.400)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, purple.500, pink.500)",
            transform: "translateY(-2px)",
            shadow: "lg"
          }}
          transition="all 0.2s"
          borderRadius="xl"
          fontWeight="bold"
          size="md"
          leftIcon={
            <Icon viewBox="0 0 24 24" boxSize={5}>
              <path
                fill="currentColor"
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              />
            </Icon>
          }
          shadow="xl"
          border="2px solid"
          borderColor="white"
          _dark={{ borderColor: "gray.700" }}
        >
          🏠 TOP
        </Button>
      </Box>
      
      <Container maxW="7xl" px={4} py={6}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Main content */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              {/* Video player */}
              <Box
                borderRadius="2xl"
                overflow="hidden"
                shadow="2xl"
                border="3px solid"
                borderColor="purple.200"
                _dark={{ borderColor: "purple.600" }}
              >
                <VideoPlayer video={video} />
              </Box>
              
              {/* Video info */}
              <VideoInfo video={video} />
              
        
            </VStack>
          </GridItem>
          
          {/* Sidebar */}
          <GridItem>
            <Box position="sticky" top={6}>
              <RelatedVideos videos={relatedVideos} currentVideoId={video.id} />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
    </>
  );
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { id } = await params;
  const result = await getVideo(id);
  
  if (!result) {
    return {
      title: 'Video Not Found'
    };
  }
  
  const { video } = result;
  
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