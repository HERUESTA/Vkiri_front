import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { 
  SimpleGrid, 
  Box, 
  VStack, 
  Heading, 
  Text, 
  HStack, 
  Tag, 
  AspectRatio,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
      {videos.map((video) => (
        <LinkBox key={video.id} role="group">
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="lg"
            overflow="hidden"
            shadow="sm"
            _hover={{ shadow: "md" }}
            transition="box-shadow 0.2s"
          >
            <AspectRatio ratio={16/9}>
              <Box position="relative" bg="gray.200" _dark={{ bg: "gray.600" }}>
                <Image
                  src={video.thumbnail_url}
                  alt={video.title}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.2s'
                  }}
                />
                <Box
                  position="absolute"
                  bottom={2}
                  right={2}
                  bg="blackAlpha.800"
                  color="white"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {video.duration_formatted}
                </Box>
              </Box>
            </AspectRatio>
            
            <VStack align="stretch" p={4} spacing={2}>
              <LinkOverlay as={Link} href={`/video/${video.id}`}>
                <Heading
                  as="h3"
                  size="sm"
                  color="gray.900"
                  _dark={{ color: "white" }}
                  noOfLines={2}
                  _groupHover={{ color: "blue.600", _dark: { color: "blue.400" } }}
                  transition="color 0.2s"
                >
                  {video.title}
                </Heading>
              </LinkOverlay>
              
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                {video.uploader_name}
              </Text>
              
              <HStack
                fontSize="xs"
                color="gray.500"
                _dark={{ color: "gray.400" }}
                spacing={2}
                mb={3}
              >
                <Text>{video.view_count_formatted} views</Text>
                <Text>•</Text>
                <Text>{video.published_at_formatted}</Text>
              </HStack>
              
              {video.livers.length > 0 && (
                <HStack wrap="wrap" spacing={1}>
                  {video.livers.slice(0, 3).map((liver) => (
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
                          width={16}
                          height={16}
                          style={{ 
                            width: '16px', 
                            height: '16px', 
                            borderRadius: '50%' 
                          }}
                        />
                      </Box>
                      {liver.display_name}
                    </Tag>
                  ))}
                  {video.livers.length > 3 && (
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{ color: "gray.400" }}
                      px={2}
                      py={1}
                    >
                      +{video.livers.length - 3}
                    </Text>
                  )}
                </HStack>
              )}
            </VStack>
          </Box>
        </LinkBox>
      ))}
    </SimpleGrid>
  );
}