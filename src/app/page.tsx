import { Video } from '@/lib/types';
import VideoGrid from '@/components/VideoGrid';
import { Box, Container, Heading, Text, VStack, Center } from '@chakra-ui/react';

async function getVideos(): Promise<Video[]> {
  try {
    // 環境に応じてAPIのURLを決定
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
                   (process.env.NODE_ENV === 'production' 
                     ? 'https://vkiri-back.fly.dev' 
                     : 'http://172.20.0.4:3000');
    
    // バックエンドAPIからビデオデータを取得
    const response = await fetch(`${apiUrl}/api/v1/videos`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();
  
  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="7xl" px={4} py={8}>
        <Box as="header" mb={8}>
          <Heading as="h1" size="2xl" color="gray.900" _dark={{ color: "white" }} mb={2}>
            VTube
          </Heading>
          <Text color="gray.600" _dark={{ color: "gray.400" }}>
            VTuber動画を見つけて楽しもう
          </Text>
        </Box>
        
        <Box as="main">
          {videos.length === 0 ? (
            <Center py={12}>
              <VStack spacing={4}>
                <Text fontSize="6xl" mb={4}>🎬</Text>
                <Heading as="h2" size="xl" color="gray.900" _dark={{ color: "white" }} mb={2}>
                  動画が見つかりません
                </Heading>
                <Text color="gray.600" _dark={{ color: "gray.400" }}>
                  APIが設定されていないか、動画がまだ登録されていません。
                </Text>
              </VStack>
            </Center>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </Box>
      </Container>
    </Box>
  );
}
