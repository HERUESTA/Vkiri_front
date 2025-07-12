import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Tag,
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Center
} from '@chakra-ui/react';

interface RelatedVideosProps {
  videos: Video[];
  currentVideoId: number;
}

export default function RelatedVideos({ videos, currentVideoId }: RelatedVideosProps) {
  const filteredVideos = videos.filter(video => video.id !== currentVideoId);

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      border="2px solid"
      borderColor="blue.100"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        bgGradient: "linear(to-r, blue.400, purple.400, pink.400)",
        borderTopRadius: "2xl"
      }}
    >
      <Heading
        as="h2"
        size="lg"
        bgGradient="linear(to-r, blue.500, purple.500)"
        bgClip="text"
        fontWeight="extrabold"
        mb={4}
      >
        🎬 Related Videos
      </Heading>
      
      <VStack align="stretch" spacing={4}>
        {filteredVideos.length === 0 ? (
          <Center py={8}>
            <Text
              color="blue.500"
              _dark={{ color: "blue.400" }}
              fontSize="lg"
              fontWeight="medium"
            >
              😊 No related videos found
            </Text>
          </Center>
        ) : (
          filteredVideos.map((video) => (
            <LinkBox key={video.id} role="group">
              <Box
                _hover={{ 
                  bg: "blue.50", 
                  _dark: { bg: "blue.900" },
                  transform: "translateX(4px)",
                  shadow: "md"
                }}
                borderRadius="xl"
                p={3}
                transition="all 0.2s"
                border="1px solid"
                borderColor="blue.100"
                _dark={{ borderColor: "blue.700" }}
              >
                <HStack spacing={3} align="start">
                  <Box
                    position="relative"
                    w={40}
                    h={24}
                    bg="gray.200"
                    _dark={{ bg: "gray.600" }}
                    borderRadius="lg"
                    overflow="hidden"
                    flexShrink={0}
                  >
                    <AspectRatio ratio={16/9}>
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </AspectRatio>
                    <Box
                      position="absolute"
                      bottom={1}
                      right={1}
                      bg="blackAlpha.800"
                      color="white"
                      fontSize="xs"
                      px={1}
                      py={0.5}
                      borderRadius="sm"
                    >
                      {video.duration_formatted}
                    </Box>
                  </Box>
                  
                  <VStack flex={1} align="stretch" spacing={1} minW={0}>
                    <LinkOverlay as={Link} href={`/video/${video.id}`}>
                      <Heading
                        as="h3"
                        size="sm"
                        color="gray.800"
                        _dark={{ color: "white" }}
                        noOfLines={2}
                        _groupHover={{ color: "blue.600", _dark: { color: "blue.300" } }}
                        transition="color 0.2s"
                        fontWeight="bold"
                      >
                        🎥 {video.title}
                      </Heading>
                    </LinkOverlay>
                    <Text
                      fontSize="sm"
                      color="blue.600"
                      _dark={{ color: "blue.400" }}
                      mt={1}
                      fontWeight="medium"
                    >
                      🎭 {video.uploader_name}
                    </Text>
                    <HStack
                      fontSize="xs"
                      color="purple.500"
                      _dark={{ color: "purple.400" }}
                      spacing={2}
                      mt={1}
                      fontWeight="medium"
                    >
                      <Text>👀 {video.view_count_formatted}</Text>
                      <Text>✨</Text>
                      <Text>📅 {video.published_at_formatted}</Text>
                    </HStack>
                    
                    {video.livers.length > 0 && (
                      <HStack wrap="wrap" spacing={1} mt={2}>
                        {video.livers.slice(0, 2).map((liver) => (
                          <Tag
                            key={liver.id}
                            size="sm"
                            colorScheme="blue"
                            borderRadius="full"
                          >
                            <Box mr={1}>
                              <Image
                                src={liver.avatar_url}
                                alt={liver.display_name}
                                width={12}
                                height={12}
                                style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  borderRadius: '50%' 
                                }}
                              />
                            </Box>
                            {liver.display_name}
                          </Tag>
                        ))}
                        {video.livers.length > 2 && (
                          <Text
                            fontSize="xs"
                            color="gray.500"
                            _dark={{ color: "gray.400" }}
                          >
                            +{video.livers.length - 2} more
                          </Text>
                        )}
                      </HStack>
                    )}
                  </VStack>
                </HStack>
              </Box>
            </LinkBox>
          ))
        )}
      </VStack>
    </Box>
  );
}