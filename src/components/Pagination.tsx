'use client';

import React from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
  isLoading = false,
}) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('purple.200', 'purple.600');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const activeGradient = 'linear(to-r, purple.400, pink.400, blue.400)';
  
  // ページネーションで表示するページ番号を計算
  const getVisiblePages = () => {
    const delta = 2; // 現在のページの前後に表示するページ数
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [];

  // 開始・終了位置の計算
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      bg={bg}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      border="2px solid"
      borderColor={borderColor}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        bgGradient: activeGradient,
        borderTopRadius: "2xl"
      }}
    >
      <Stack spacing={4} align="center">
        {/* 件数表示 */}
        <Text
          fontSize="sm"
          color={textColor}
          fontWeight="medium"
          textAlign="center"
        >
          🎬 {startItem}-{endItem} / {totalCount.toLocaleString()}件の動画 ✨
        </Text>

        {/* ページネーションボタン */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          gap={4}
          w="100%"
          justify="center"
        >
          {/* モバイル用簡易表示 */}
          <HStack spacing={2} display={{ base: 'flex', md: 'none' }}>
            <IconButton
              aria-label="前のページ"
              icon={<ChevronLeftIcon />}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              size="sm"
              bgGradient={currentPage === 1 ? undefined : activeGradient}
              color={currentPage === 1 ? textColor : 'white'}
              _hover={{
                transform: currentPage === 1 ? undefined : 'scale(1.05)',
                shadow: 'lg'
              }}
              transition="all 0.2s"
            />
            
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={textColor}
              px={2}
            >
              {currentPage} / {totalPages}
            </Text>

            <IconButton
              aria-label="次のページ"
              icon={<ChevronRightIcon />}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              size="sm"
              bgGradient={currentPage === totalPages ? undefined : activeGradient}
              color={currentPage === totalPages ? textColor : 'white'}
              _hover={{
                transform: currentPage === totalPages ? undefined : 'scale(1.05)',
                shadow: 'lg'
              }}
              transition="all 0.2s"
            />
          </HStack>

          {/* デスクトップ用詳細表示 */}
          <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
            {/* 前へボタン */}
            <IconButton
              aria-label="前のページ"
              icon={<ChevronLeftIcon />}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              size="md"
              bgGradient={currentPage === 1 ? undefined : activeGradient}
              color={currentPage === 1 ? textColor : 'white'}
              _hover={{
                transform: currentPage === 1 ? undefined : 'scale(1.05)',
                shadow: 'lg'
              }}
              transition="all 0.2s"
              borderRadius="xl"
            />

            {/* ページ番号ボタン */}
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <Text
                    key={`dots-${index}`}
                    px={2}
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    ...
                  </Text>
                );
              }

              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;

              return (
                <Button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  disabled={isLoading}
                  size="md"
                  minW="48px"
                  h="48px"
                  borderRadius="xl"
                  fontWeight="bold"
                  fontSize="lg"
                  bgGradient={isActive ? activeGradient : undefined}
                  color={isActive ? 'white' : textColor}
                  bg={isActive ? undefined : 'transparent'}
                  border="2px solid"
                  borderColor={isActive ? 'transparent' : borderColor}
                  _hover={{
                    transform: isActive ? 'scale(1.05)' : 'scale(1.02)',
                    shadow: isActive ? 'lg' : 'md',
                    bgGradient: isActive ? activeGradient : 'linear(to-r, purple.50, pink.50, blue.50)',
                    borderColor: isActive ? 'transparent' : 'purple.300'
                  }}
                  transition="all 0.2s ease"
                  _active={{
                    transform: 'scale(0.98)'
                  }}
                >
                  {pageNumber}
                </Button>
              );
            })}

            {/* 次へボタン */}
            <IconButton
              aria-label="次のページ"
              icon={<ChevronRightIcon />}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              size="md"
              bgGradient={currentPage === totalPages ? undefined : activeGradient}
              color={currentPage === totalPages ? textColor : 'white'}
              _hover={{
                transform: currentPage === totalPages ? undefined : 'scale(1.05)',
                shadow: 'lg'
              }}
              transition="all 0.2s"
              borderRadius="xl"
            />
          </HStack>
        </Flex>

        {/* 追加情報（デスクトップのみ） */}
        <Text
          fontSize="xs"
          color={textColor}
          opacity={0.8}
          textAlign="center"
          display={{ base: 'none', md: 'block' }}
        >
          💫 ページを移動して素敵な動画を見つけよう！ 💫
        </Text>
      </Stack>
    </Box>
  );
};

export default Pagination;