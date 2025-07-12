'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Video, VideosResponse } from '@/lib/types';
import VideoGrid from '@/components/VideoGrid';
import AnimatedBackground from '@/components/AnimatedBackground';
import VideoSlideshow from '@/components/VideoSlideshow';
import Pagination from '@/components/Pagination';
import { Box, Container, Heading, Text, VStack, Center } from '@chakra-ui/react';

async function getVideos(page: number = 1, perPage: number = 20): Promise<VideosResponse> {
  try {
    // 本番バックエンドを使用
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://vkiri-back.fly.dev';
    
    // バックエンドAPIからビデオデータを取得（ページネーション対応）
    console.log('Fetching from URL:', `${apiUrl}/api/v1/videos?page=${page}&per_page=${perPage}`);
    const response = await fetch(`${apiUrl}/api/v1/videos?page=${page}&per_page=${perPage}`, {
      cache: 'no-store'
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      return {
        videos: [],
        pagination: {
          current_page: 1,
          total_pages: 1,
          total_count: 0,
          per_page: perPage
        }
      };
    }
    
    const data = await response.json();
    console.log('API data received:', { videosCount: data.videos?.length, pagination: data.pagination });
    return {
      videos: data.videos || [],
      pagination: data.pagination || {
        current_page: 1,
        total_pages: 1,
        total_count: 0,
        per_page: perPage
      }
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return {
      videos: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_count: 0,
        per_page: perPage
      }
    };
  }
}

export default function Home() {
  const router = useRouter();
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [slideshowVideos, setSlideshowVideos] = useState<Video[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 20
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // 0で初期化して、未初期化状態を表現
  const [initialized, setInitialized] = useState(false);
  
  // データ取得関数
  const fetchData = async (page: number) => {
    console.log('fetchData called with page:', page);
    setIsLoading(true);
    try {
      const response = await getVideos(page, 20);
      console.log('API response:', response);
      setVideos(response.videos);
      setPagination(response.pagination);
      
      // スライドショー用データは最新の動画を使用（ページ1のデータ）
      if (page === 1) {
        setSlideshowVideos(response.videos.slice(0, 4));
      } else if (slideshowVideos.length === 0) {
        // ページ1以外の場合は別途最新動画を取得
        const latestResponse = await getVideos(1, 4);
        setSlideshowVideos(latestResponse.videos);
      }
      console.log('Data loaded successfully, videos count:', response.videos.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`, { scroll: false });
  };
  
  // 初期化とURL解析
  useEffect(() => {
    console.log('Initial useEffect called');
    if (typeof window !== 'undefined' && !initialized) {
      const urlParams = new URLSearchParams(window.location.search);
      const pageFromUrl = parseInt(urlParams.get('page') || '1');
      console.log('Page from URL:', pageFromUrl);
      setCurrentPage(pageFromUrl);
      setInitialized(true);
    }
  }, [initialized]);

  // データ取得とページ変更時の処理
  useEffect(() => {
    if (initialized && currentPage > 0) {
      console.log('Data fetch useEffect called with currentPage:', currentPage);
      fetchData(currentPage);
    }
  }, [currentPage, initialized]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // ページトップへのスクロール
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);
  
  return (
    <>
      <AnimatedBackground />
      <Box 
        minH="100vh" 
        position="relative"
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
        </Container>

        {/* スライドショーセクション - 画面横いっぱい */}
        {slideshowVideos.length > 0 && (
          <VideoSlideshow videos={slideshowVideos} />
        )}

        <Container maxW="7xl" px={4} py={8}>
        
        <Box as="main">
          {!isLoading && videos.length === 0 && pagination.total_count === 0 ? (
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
            <VStack spacing={8} align="stretch">
              {/* All Videos セクションヘッダー */}
              <Box textAlign="center">
                <Heading 
                  as="h2" 
                  size="2xl" 
                  bgGradient="linear(to-r, purple.500, pink.500)" 
                  bgClip="text"
                  fontWeight="extrabold"
                  mb={2}
                >
                  🎥 All Videos
                </Heading>
                <Text 
                  fontSize="lg" 
                  color="purple.600" 
                  _dark={{ color: "purple.400" }}
                  fontWeight="medium"
                >
                  すべてのVTuber動画をチェック！
                </Text>
              </Box>
              
              {/* 動画グリッド */}
              <VideoGrid videos={videos} isLoading={isLoading} />
              
              {/* ページネーション */}
              {!isLoading && pagination.total_pages > 1 && (
                <Box mt={8}>
                  <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.total_pages}
                    totalCount={pagination.total_count}
                    perPage={pagination.per_page}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </Box>
              )}
            </VStack>
          )}
        </Box>
      </Container>
    </Box>
    </>
  );
}
