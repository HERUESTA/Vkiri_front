'use client';

import React from 'react';
import Link from 'next/link';
import { Video } from '@/lib/types';
import {
  Box,
  Grid,
  AspectRatio,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';

interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, isLoading = false }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('xl', 'dark-lg');
  const textColor = useColorModeValue('gray.800', 'white');
  const metaColor = useColorModeValue('gray.600', 'gray.400');

  if (isLoading) {
    return (
      <Grid
        templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={6}
        w="100%"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={`skeleton-${i}`} bg={cardBg} borderRadius="xl" overflow="hidden" shadow={cardShadow}>
            <AspectRatio ratio={16/9}>
              <Skeleton w="100%" h="100%" />
            </AspectRatio>
            <Box p={4}>
              <VStack align="start" spacing={3}>
                <Skeleton height="20px" width="90%" />
                <Skeleton height="16px" width="60%" />
                <Skeleton height="14px" width="40%" />
              </VStack>
            </Box>
          </Box>
        ))}
      </Grid>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <Box 
        textAlign="center" 
        py={12}
        color="gray.500"
        _dark={{ color: "gray.400" }}
      >
        <Text fontSize="lg">動画が見つかりませんでした。</Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
      gap={6}
      w="100%"
    >
      {videos.map((video) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <Box
            bg={cardBg}
            borderRadius="xl"
            overflow="hidden"
            shadow={cardShadow}
            transition="all 0.3s ease"
            _hover={{
              transform: 'translateY(-4px)',
              shadow: '2xl',
            }}
            cursor="pointer"
          >
            {/* サムネイル部分 - 完全に分離 */}
            <Box position="relative">
              <AspectRatio ratio={16/9}>
                <Image
                  src={video.thumbnail_url}
                  alt={`${video.title}のサムネイル`}
                  objectFit="cover"
                  bg="gray.200"
                  _dark={{ bg: "gray.600" }}
                />
              </AspectRatio>
              
              {/* 時間バッジは AspectRatio の外側に配置 */}
              {video.duration_formatted && (
                <Badge
                  position="absolute"
                  bottom="2"
                  right="2"
                  bg="blackAlpha.800"
                  color="white"
                  fontSize="xs"
                  borderRadius="md"
                  px="2"
                  py="1"
                >
                  {video.duration_formatted}
                </Badge>
              )}
            </Box>
            
            {/* 動画情報部分 */}
            <Box p={4}>
              <VStack align="start" spacing={3}>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={textColor}
                  noOfLines={2}
                  lineHeight="1.3"
                  title={video.title}
                >
                  {video.title}
                </Text>
                
                <VStack align="start" spacing={1} w="100%">
                  {video.uploader_name && (
                    <Text fontSize="sm" color={metaColor} fontWeight="medium">
                      {video.uploader_name}
                    </Text>
                  )}
                  
                  <HStack spacing={2} fontSize="xs" color={metaColor}>
                    {video.view_count && (
                      <Text>{video.view_count.toLocaleString()} 回視聴</Text>
                    )}
                    {video.published_at && (
                      <Text>
                        {video.published_at_formatted}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

export default VideoGrid;