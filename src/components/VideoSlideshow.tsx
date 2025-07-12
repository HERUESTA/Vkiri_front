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
  
  // レスポンシブ対応 - 1枚ずつ表示に変更
  const slidesToShow = 1;
  const slideHeight = useBreakpointValue({ base: '400px', md: '450px', lg: '500px' }) || '500px';

  // 動画配列をループ用に複製
  const loopedVideos = videos.length > 0 ? [...videos, ...videos, ...videos] : [];
  const totalVideos = loopedVideos.length;

  // 5秒ごとに自動スライド（無限ループ）
  useEffect(() => {
    if (!isAutoPlaying || videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // 最後の動画グループに到達したら最初にリセット
        if (nextIndex >= videos.length * 2) {
          return 0;
        }
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, videos.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= videos.length * 2) {
        return 0;
      }
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return videos.length * 2 - 1;
      }
      return prevIndex - 1;
    });
  };


  if (videos.length === 0) return null;

  return (
    <Box
      position="relative"
      height={slideHeight}
      overflow="hidden"
      bg="transparent"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: "linear(45deg, purple.500, pink.500, blue.500, cyan.400, purple.500)",
        bgSize: "400% 400%",
        animation: "rainbowMove 8s ease infinite",
        opacity: 0.1,
        zIndex: 0
      }}
      sx={{
        "@keyframes rainbowMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "@keyframes sparkle": {
          "0%, 100%": { opacity: 0.3, transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: 1, transform: "scale(1.2) rotate(180deg)" },
        },
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(120deg)" },
          "66%": { transform: "translateY(8px) rotate(240deg)" },
        },
        "@keyframes heartBeat": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      }}
    >
      {/* 浮遊する装飾要素 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={`decoration-${i}`}
          position="absolute"
          fontSize={`${12 + Math.random() * 20}px`}
          color={[
            "purple.300", "pink.300", "blue.300", "cyan.300", 
            "yellow.300", "green.300"
          ][i % 6]}
          top={`${10 + Math.random() * 80}%`}
          left={`${5 + Math.random() * 90}%`}
          zIndex={0}
          opacity={0.6}
          sx={{
            animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
          pointerEvents="none"
        >
          {["⭐", "🌟", "✨", "💫", "🎵", "🎶", "💖", "🌈", "🦄", "🎭", "🎪", "🎨"][i]}
        </Box>
      ))}

      {/* スライドコンテナ */}
      <Box
        position="relative"
        height="100%"
        zIndex={1}
      >
        <Box height="100%" px={4}>
          <Box
            display="flex"
            height="100%"
            transform={`translateX(-${currentIndex * 320}px)`}
            transition="transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            width={`${loopedVideos.length * 320}px`}
          >
            {loopedVideos.map((video, videoIndex) => (
              <Box
                key={`${video.id}-${videoIndex}`}
                flex="0 0 320px"
                height="100%"
                px={4}
                py={8}
              >
                <Link href={`/video/${video.id}`}>
                  <Box
                    height="100%"
                    position="relative"
                    borderRadius="3xl"
                    overflow="hidden"
                    bg="linear-gradient(145deg, rgba(139, 69, 19, 0.1), rgba(255, 20, 147, 0.1))"
                    border="3px solid"
                    borderColor="transparent"
                    bgGradient="linear(145deg, purple.400, pink.400, blue.400)"
                    bgClip="padding-box"
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: "-3px",
                      left: "-3px",
                      right: "-3px",
                      bottom: "-3px",
                      bgGradient: "linear(45deg, purple.400, pink.400, blue.400, cyan.400, purple.400)",
                      bgSize: "300% 300%",
                      borderRadius: "3xl",
                      zIndex: -1,
                      animation: "rainbowMove 3s linear infinite",
                    }}
                    _hover={{
                      transform: "translateY(-12px) scale(1.05) rotateY(5deg)",
                      shadow: "0 25px 50px rgba(139, 69, 19, 0.4), 0 0 30px rgba(255, 20, 147, 0.3)",
                      _before: {
                        animation: "rainbowMove 1s linear infinite",
                      }
                    }}
                    transition="all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    cursor="pointer"
                    sx={{
                      animation: "heartBeat 4s ease-in-out infinite",
                      animationDelay: `${videoIndex * 0.5}s`,
                    }}
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
                          opacity: 0.7,
                          filter: 'brightness(1.1) contrast(1.1) saturate(1.3)'
                        }}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgGradient="linear(135deg, rgba(139, 69, 19, 0.4), rgba(255, 20, 147, 0.3), rgba(0, 191, 255, 0.3))"
                      />
                      {/* キラキラエフェクト */}
                      {Array.from({ length: 6 }).map((_, sparkleIndex) => (
                        <Box
                          key={`sparkle-${sparkleIndex}`}
                          position="absolute"
                          fontSize="20px"
                          color="white"
                          top={`${20 + Math.random() * 60}%`}
                          left={`${20 + Math.random() * 60}%`}
                          sx={{
                            animation: `sparkle ${2 + Math.random()}s ease-in-out infinite`,
                            animationDelay: `${sparkleIndex * 0.3}s`,
                          }}
                        >
                          ✨
                        </Box>
                      ))}
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
                          bgGradient="linear(to-r, purple.500, pink.500)"
                          color="white"
                          borderRadius="full"
                          size="lg"
                          fontWeight="bold"
                          border="2px solid"
                          borderColor="white"
                          shadow="lg"
                          sx={{
                            animation: "float 3s ease-in-out infinite",
                          }}
                        >
                          ⏱️ {video.duration_formatted}
                        </Tag>
                        <Tag
                          bgGradient="linear(to-r, cyan.400, blue.500)"
                          color="white"
                          borderRadius="full"
                          size="sm"
                          fontWeight="bold"
                          border="2px solid"
                          borderColor="white"
                          shadow="lg"
                          sx={{
                            animation: "float 3s ease-in-out infinite",
                            animationDelay: "0.5s",
                          }}
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
                          textShadow="3px 3px 6px rgba(0,0,0,0.8)"
                          lineHeight={1.2}
                          bgGradient="linear(to-r, white, cyan.200, pink.200)"
                          bgClip="text"
                          sx={{
                            animation: "float 4s ease-in-out infinite",
                          }}
                        >
                          ✨ {video.title} ✨
                        </Heading>
                        
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          bgGradient="linear(to-r, purple.200, pink.200)"
                          bgClip="text"
                          textAlign="center"
                          textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                          sx={{
                            animation: "float 4s ease-in-out infinite",
                            animationDelay: "0.5s",
                          }}
                        >
                          🎭 {video.uploader_name} 🎭
                        </Text>
                      </VStack>

                      {/* 下部：VTuber情報とボタン */}
                      <VStack spacing={4}>
                        {video.livers.length > 0 && (
                          <Flex wrap="wrap" justify="center" gap={2}>
                            {video.livers.slice(0, 3).map((liver, liverIndex) => (
                              <Tag
                                key={liver.id}
                                bgGradient={liverIndex % 3 === 0 ? "linear(to-r, pink.400, purple.500)" : liverIndex % 3 === 1 ? "linear(to-r, blue.400, cyan.500)" : "linear(to-r, cyan.400, blue.500)"}
                                color="white"
                                borderRadius="full"
                                size="md"
                                fontWeight="bold"
                                border="2px solid"
                                borderColor="white"
                                shadow="lg"
                                sx={{
                                  animation: "heartBeat 2s ease-in-out infinite",
                                  animationDelay: `${liverIndex * 0.2}s`,
                                }}
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
                          bgGradient="linear(to-r, pink.400, purple.400, blue.400)"
                          color="white"
                          _hover={{
                            bgGradient: "linear(to-r, pink.500, purple.500, blue.500)",
                            transform: "translateY(-4px) scale(1.1)",
                            shadow: "0 15px 35px rgba(255, 20, 147, 0.4)"
                          }}
                          transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                          borderRadius="2xl"
                          fontWeight="bold"
                          size="lg"
                          border="3px solid"
                          borderColor="white"
                          sx={{
                            animation: "heartBeat 3s ease-in-out infinite",
                          }}
                          leftIcon={
                            <Icon viewBox="0 0 24 24" boxSize={6}>
                              <path
                                fill="currentColor"
                                d="M8 5v14l11-7z"
                              />
                            </Icon>
                          }
                        >
                          🎬 Watch Now 🎬
                        </Button>
                      </VStack>
                    </VStack>
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ナビゲーションボタン */}
        <IconButton
          aria-label="Previous slide"
          icon={
            <Icon viewBox="0 0 24 24" boxSize={8}>
              <path
                fill="currentColor"
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              />
            </Icon>
          }
          position="absolute"
          left={6}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, purple.600, pink.600)",
            transform: "translateY(-50%) scale(1.2) rotate(-10deg)",
            shadow: "0 10px 25px rgba(139, 69, 19, 0.4)"
          }}
          borderRadius="full"
          size="xl"
          border="3px solid"
          borderColor="white"
          shadow="xl"
          sx={{
            animation: "float 3s ease-in-out infinite",
          }}
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        />

        <IconButton
          aria-label="Next slide"
          icon={
            <Icon viewBox="0 0 24 24" boxSize={8}>
              <path
                fill="currentColor"
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              />
            </Icon>
          }
          position="absolute"
          right={6}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, purple.600, pink.600)",
            transform: "translateY(-50%) scale(1.2) rotate(10deg)",
            shadow: "0 10px 25px rgba(139, 69, 19, 0.4)"
          }}
          borderRadius="full"
          size="xl"
          border="3px solid"
          borderColor="white"
          shadow="xl"
          sx={{
            animation: "float 3s ease-in-out infinite",
            animationDelay: "1s",
          }}
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
          {Array.from({ length: videos.length }).map((_, index) => (
            <Box
              key={index}
              width="16px"
              height="16px"
              borderRadius="full"
              bg={index === (currentIndex % videos.length) ? "white" : "whiteAlpha.400"}
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
              transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              border="2px solid"
              borderColor={index === (currentIndex % videos.length) ? "purple.300" : "transparent"}
              shadow={index === (currentIndex % videos.length) ? "0 0 15px rgba(255, 255, 255, 0.8)" : "none"}
              sx={{
                animation: index === (currentIndex % videos.length) ? "heartBeat 1.5s ease-in-out infinite" : "none",
              }}
              _hover={{
                bg: "white",
                transform: "scale(1.4)",
                shadow: "0 0 20px rgba(255, 255, 255, 0.9)"
              }}
            />
          ))}
        </HStack>

        {/* 自動再生コントロール */}
        <IconButton
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          icon={
            <Icon viewBox="0 0 24 24" boxSize={6}>
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
          top={6}
          right={6}
          zIndex={2}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, cyan.500, blue.600)",
            transform: "scale(1.2) rotate(15deg)",
            shadow: "0 8px 20px rgba(0, 191, 255, 0.4)"
          }}
          borderRadius="full"
          size="lg"
          border="3px solid"
          borderColor="white"
          shadow="lg"
          sx={{
            animation: "float 2s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        />
      </Box>
    </Box>
  );
}