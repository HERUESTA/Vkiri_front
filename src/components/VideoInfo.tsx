import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Box, 
  HStack, 
  Heading, 
  Text, 
  Avatar, 
  Tag, 
  Button, 
  Icon,
  Flex
} from '@chakra-ui/react';

interface VideoInfoProps {
  video: Video;
}

export default function VideoInfo({ video }: VideoInfoProps) {
  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      border="2px solid"
      borderColor="purple.100"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        bgGradient: "linear(to-r, purple.400, pink.400, blue.400)",
        borderTopRadius: "2xl"
      }}
    >
      <Heading
        as="h1"
        size="xl"
        bgGradient="linear(to-r, purple.600, pink.600)"
        bgClip="text"
        fontWeight="extrabold"
        mb={4}
        lineHeight="1.2"
      >
        ✨ {video.title}
      </Heading>
      
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ sm: "center" }}
        justify={{ sm: "space-between" }}
        gap={4}
        mb={4}
      >
        <HStack spacing={3}>
          <Avatar
            size="md"
            name={video.uploader_name}
            bg="gray.300"
            _dark={{ bg: "gray.600" }}
            color="gray.700"
          />
          <Box>
            <Link href={`/channel/${video.uploader_channel_id}`}>
              <Text
                fontWeight="bold"
                color="purple.600"
                _dark={{ color: "purple.300" }}
                _hover={{ color: "pink.500", _dark: { color: "pink.400" } }}
                transition="color 0.2s"
                fontSize="lg"
              >
                🎭 {video.uploader_name}
              </Text>
            </Link>
          </Box>
        </HStack>
        
        <HStack
          spacing={4}
          fontSize="sm"
          color="purple.500"
          _dark={{ color: "purple.400" }}
          fontWeight="medium"
        >
          <Text>👀 {video.view_count_formatted} views</Text>
          <Text>📅 {video.published_at_formatted}</Text>
          <Text>⏱️ {video.duration_formatted}</Text>
        </HStack>
      </Flex>
      
      {video.livers.length > 0 && (
        <Box mb={4}>
          <Heading
            as="h3"
            size="md"
            bgGradient="linear(to-r, purple.500, pink.500)"
            bgClip="text"
            fontWeight="bold"
            mb={2}
          >
            🌟 Featured Livers
          </Heading>
          <HStack wrap="wrap" spacing={2}>
            {video.livers.map((liver) => (
              <Link key={liver.id} href={`/liver/${liver.id}`}>
                <Tag
                  size="md"
                  colorScheme="blue"
                  borderRadius="full"
                  cursor="pointer"
                  _hover={{ 
                    bg: "blue.200", 
                    _dark: { bg: "blue.800" } 
                  }}
                  transition="background-color 0.2s"
                >
                  <Box mr={2}>
                    <Image
                      src={liver.avatar_url}
                      alt={liver.display_name}
                      width={20}
                      height={20}
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%' 
                      }}
                    />
                  </Box>
                  {liver.display_name}
                </Tag>
              </Link>
            ))}
          </HStack>
        </Box>
      )}
      
      <HStack spacing={2}>
        <Button
          as="a"
          href={video.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          bgGradient="linear(to-r, red.400, pink.400)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, red.500, pink.500)",
            transform: "translateY(-2px)",
            shadow: "lg"
          }}
          transition="all 0.2s"
          size="lg"
          borderRadius="xl"
          fontWeight="bold"
          leftIcon={
            <Icon viewBox="0 0 24 24" boxSize={5}>
              <path
                fill="currentColor"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </Icon>
          }
        >
          🎬 Watch on YouTube
        </Button>
      </HStack>
    </Box>
  );
}