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
    <Box 
      minH="100vh" 
      bgGradient="linear(to-br, purple.50, pink.50, blue.50)" 
      _dark={{ bgGradient: "linear(to-br, purple.900, pink.900, blue.900)" }}
    >
      <Container maxW="7xl" px={4} py={8}>
        <Box as="header" mb={8} textAlign="center">
          <VStack spacing={4}>
            <Heading 
              as="h1" 
              size="3xl" 
              bgGradient="linear(to-r, purple.400, pink.400, blue.400)" 
              bgClip="text"
              fontWeight="extrabold"
              mb={2}
              textShadow="2px 2px 4px rgba(0,0,0,0.1)"
            >
              ✨ VTube ✨
            </Heading>
            <Text 
              fontSize="xl" 
              color="purple.600" 
              _dark={{ color: "purple.300" }}
              fontWeight="medium"
            >
              🌟 VTuber動画を見つけて楽しもう！ 🌟
            </Text>
            <Box
              w="100px"
              h="4px"
              bgGradient="linear(to-r, purple.400, pink.400, blue.400)"
              borderRadius="full"
              mx="auto"
            />
          </VStack>
        </Box>
        
        <Box as="main">
          {videos.length === 0 ? (
            <Center py={12}>
              <VStack spacing={6}>
                <Box
                  bg="white"
                  _dark={{ bg: "gray.800" }}
                  p={8}
                  borderRadius="3xl"
                  shadow="2xl"
                  border="3px solid"
                  borderColor="purple.200"
                >
                  <VStack spacing={4}>
                    <Text fontSize="8xl" mb={4}>🎬✨</Text>
                    <Heading 
                      as="h2" 
                      size="xl" 
                      color="purple.600" 
                      _dark={{ color: "purple.300" }} 
                      mb={2}
                      textAlign="center"
                    >
                      まだ動画がないよ〜！
                    </Heading>
                    <Text 
                      color="purple.500" 
                      _dark={{ color: "purple.400" }}
                      textAlign="center"
                      fontSize="lg"
                    >
                      素敵なVTuber動画をお待ちください💫
                    </Text>
                  </VStack>
                </Box>
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
