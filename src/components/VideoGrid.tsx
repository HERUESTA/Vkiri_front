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
            borderRadius="2xl"
            overflow="hidden"
            shadow="lg"
            _hover={{ 
              shadow: "2xl", 
              transform: "translateY(-4px)",
              borderColor: "purple.300"
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            border="2px solid"
            borderColor="purple.100"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              bgGradient: "linear(to-r, purple.400, pink.400, blue.400)",
              opacity: 0,
              transition: "opacity 0.3s"
            }}
            _groupHover={{
              _before: { opacity: 1 }
            }}
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
                  color="gray.800"
                  _dark={{ color: "white" }}
                  noOfLines={2}
                  _groupHover={{ 
                    color: "purple.600", 
                    _dark: { color: "purple.300" } 
                  }}
                  transition="color 0.2s"
                  fontWeight="bold"
                >
                  {video.title}
                </Heading>
              </LinkOverlay>
              
              <Text
                fontSize="sm"
                color="purple.600"
                _dark={{ color: "purple.400" }}
                fontWeight="medium"
              >
                ✨ {video.uploader_name}
              </Text>
              
              <HStack
                fontSize="xs"
                color="pink.500"
                _dark={{ color: "pink.400" }}
                spacing={2}
                mb={3}
                fontWeight="medium"
              >
                <Text>👀 {video.view_count_formatted}</Text>
                <Text>💫</Text>
                <Text>📅 {video.published_at_formatted}</Text>
              </HStack>
              
              {video.livers.length > 0 && (
                <HStack wrap="wrap" spacing={1}>
                  {video.livers.slice(0, 3).map((liver, index) => (
                    <Tag
                      key={liver.id}
                      size="sm"
                      colorScheme={index % 3 === 0 ? "purple" : index % 3 === 1 ? "pink" : "blue"}
                      borderRadius="full"
                      variant="subtle"
                      fontWeight="bold"
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