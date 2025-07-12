'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Tag,
  Button,
  Icon,
  Flex,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react';

interface VideoSlideshowProps {
  videos: Video[];
}

export default function VideoSlideshow({ videos }: VideoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // レスポンシブ対応
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 3;
  const slideHeight = useBreakpointValue({ base: '400px', md: '450px', lg: '500px' }) || '500px';

  // 5秒ごとに自動スライド
  useEffect(() => {
    if (!isAutoPlaying || videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + slidesToShow >= videos.length ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, videos.length, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + slidesToShow >= videos.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? Math.max(0, videos.length - slidesToShow) : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (videos.length === 0) return null;

  return (
    <Box
      position="relative"
      height={slideHeight}
      overflow="hidden"
      bgGradient="linear(to-r, purple.900, pink.900, blue.900)"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: "linear(45deg, purple.600, pink.600, blue.600, purple.600)",
        bgSize: "400% 400%",
        animation: "gradientMove 20s ease infinite",
        opacity: 0.3,
        zIndex: 0
      }}
      sx={{
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      {/* スライドコンテナ */}
      <Box
        position="relative"
        height="100%"
        zIndex={1}
      >
        <Container maxW="7xl" height="100%">
          <Box
            display="flex"
            height="100%"
            transform={`translateX(-${currentIndex * (100 / slidesToShow)}%)`}
            transition="transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            width={`${(videos.length / slidesToShow) * 100}%`}
          >
            {videos.map((video, index) => (
              <Box
                key={video.id}
                flex={`0 0 ${100 / videos.length}%`}
                height="100%"
                px={4}
                py={8}
              >
                <Link href={`/video/${video.id}`}>
                  <Box
                    height="100%"
                    position="relative"
                    borderRadius="2xl"
                    overflow="hidden"
                    bg="blackAlpha.300"
                    backdropFilter="blur(10px)"
                    border="2px solid"
                    borderColor="whiteAlpha.300"
                    _hover={{
                      transform: "translateY(-8px) scale(1.02)",
                      borderColor: "whiteAlpha.500",
                      shadow: "2xl"
                    }}
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                  >
                    {/* 背景画像 */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      zIndex={0}
                    >
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        style={{ 
                          objectFit: 'cover',
                          opacity: 0.4
                        }}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgGradient="linear(to-t, blackAlpha.800, transparent, blackAlpha.400)"
                      />
                    </Box>

                    {/* コンテンツ */}
                    <VStack
                      position="relative"
                      zIndex={1}
                      height="100%"
                      justify="space-between"
                      align="stretch"
                      p={6}
                      color="white"
                    >
                      {/* 上部：時間表示 */}
                      <HStack justify="space-between">
                        <Tag
                          colorScheme="purple"
                          variant="solid"
                          borderRadius="full"
                          size="lg"
                          fontWeight="bold"
                        >
                          ⏱️ {video.duration_formatted}
                        </Tag>
                        <Tag
                          bg="whiteAlpha.300"
                          color="white"
                          borderRadius="full"
                          size="sm"
                          fontWeight="bold"
                        >
                          👀 {video.view_count_formatted}
                        </Tag>
                      </HStack>

                      {/* 中央：タイトルと説明 */}
                      <VStack align="stretch" spacing={4} flex={1} justify="center">
                        <Heading
                          as="h2"
                          size="xl"
                          fontWeight="extrabold"
                          noOfLines={2}
                          textAlign="center"
                          textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                          lineHeight={1.2}
                        >
                          ✨ {video.title}
                        </Heading>
                        
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color="purple.200"
                          textAlign="center"
                          textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                        >
                          🎭 {video.uploader_name}
                        </Text>
                      </VStack>

                      {/* 下部：VTuber情報とボタン */}
                      <VStack spacing={4}>
                        {video.livers.length > 0 && (
                          <Flex wrap="wrap" justify="center" gap={2}>
                            {video.livers.slice(0, 3).map((liver, liverIndex) => (
                              <Tag
                                key={liver.id}
                                colorScheme={liverIndex % 3 === 0 ? "pink" : liverIndex % 3 === 1 ? "blue" : "cyan"}
                                variant="solid"
                                borderRadius="full"
                                size="md"
                                fontWeight="bold"
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
                            ))}
                          </Flex>
                        )}

                        <Button
                          bgGradient="linear(to-r, pink.400, purple.400)"
                          color="white"
                          _hover={{
                            bgGradient: "linear(to-r, pink.500, purple.500)",
                            transform: "translateY(-2px)",
                            shadow: "lg"
                          }}
                          transition="all 0.2s"
                          borderRadius="xl"
                          fontWeight="bold"
                          size="lg"
                          leftIcon={
                            <Icon viewBox="0 0 24 24" boxSize={6}>
                              <path
                                fill="currentColor"
                                d="M8 5v14l11-7z"
                              />
                            </Icon>
                          }
                        >
                          🎬 Watch Now
                        </Button>
                      </VStack>
                    </VStack>
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Container>

        {/* ナビゲーションボタン */}
        <IconButton
          aria-label="Previous slide"
          icon={
            <Icon viewBox="0 0 24 24" boxSize={6}>
              <path
                fill="currentColor"
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              />
            </Icon>
          }
          position="absolute"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, purple.600, pink.600)",
            transform: "translateY(-50%) scale(1.1)"
          }}
          borderRadius="full"
          size="lg"
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        />

        <IconButton
          aria-label="Next slide"
          icon={
            <Icon viewBox="0 0 24 24" boxSize={6}>
              <path
                fill="currentColor"
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              />
            </Icon>
          }
          position="absolute"
          right={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, purple.600, pink.600)",
            transform: "translateY(-50%) scale(1.1)"
          }}
          borderRadius="full"
          size="lg"
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        />

        {/* インジケーター */}
        <HStack
          position="absolute"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={2}
          spacing={2}
        >
          {Array.from({ length: Math.ceil(videos.length / slidesToShow) }).map((_, index) => (
            <Box
              key={index}
              width="12px"
              height="12px"
              borderRadius="full"
              bg={index === Math.floor(currentIndex / slidesToShow) ? "white" : "whiteAlpha.400"}
              cursor="pointer"
              onClick={() => goToSlide(index * slidesToShow)}
              transition="all 0.2s"
              _hover={{
                bg: "white",
                transform: "scale(1.2)"
              }}
            />
          ))}
        </HStack>

        {/* 自動再生コントロール */}
        <IconButton
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          icon={
            <Icon viewBox="0 0 24 24" boxSize={5}>
              {isAutoPlaying ? (
                <path
                  fill="currentColor"
                  d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                />
              ) : (
                <path
                  fill="currentColor"
                  d="M8 5v14l11-7z"
                />
              )}
            </Icon>
          }
          position="absolute"
          top={4}
          right={4}
          zIndex={2}
          bg="whiteAlpha.300"
          color="white"
          _hover={{
            bg: "whiteAlpha.500",
            transform: "scale(1.1)"
          }}
          borderRadius="full"
          size="md"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        />
      </Box>
    </Box>
  );
}