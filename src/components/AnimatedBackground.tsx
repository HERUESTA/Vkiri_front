'use client';

import { Box } from '@chakra-ui/react';

export default function AnimatedBackground() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      overflow="hidden"
      pointerEvents="none"
    >
      {/* 動的グラデーション背景 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(45deg, purple.400, pink.400, blue.400, purple.400, pink.400)"
        bgSize="400% 400%"
        sx={{
          animation: "gradientMove 15s ease infinite",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
        opacity={0.6}
        _dark={{ opacity: 0.3 }}
      />

      {/* 浮遊する大きな粒子 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={`large-${i}`}
          position="absolute"
          width="120px"
          height="120px"
          borderRadius="50%"
          bgGradient={
            i % 3 === 0
              ? "radial(circle, purple.300, transparent)"
              : i % 3 === 1
              ? "radial(circle, pink.300, transparent)"
              : "radial(circle, blue.300, transparent)"
          }
          top={`${20 + (i * 15)}%`}
          left={`${10 + (i * 12)}%`}
          sx={{
            animation: `floatMove ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
            "@keyframes floatMove": {
              "0%, 100%": {
                transform: "translateY(0px) rotate(0deg)",
                opacity: 0.7,
              },
              "33%": {
                transform: "translateY(-20px) rotate(120deg)",
                opacity: 1,
              },
              "66%": {
                transform: "translateY(10px) rotate(240deg)",
                opacity: 0.8,
              },
            },
          }}
          opacity={0.4}
          _dark={{ opacity: 0.2 }}
        />
      ))}

      {/* 中サイズの脈動する粒子 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={`medium-${i}`}
          position="absolute"
          width="60px"
          height="60px"
          borderRadius="50%"
          bg={
            i % 4 === 0
              ? "purple.200"
              : i % 4 === 1
              ? "pink.200"
              : i % 4 === 2
              ? "blue.200"
              : "cyan.200"
          }
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          sx={{
            animation: `pulseMove ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            "@keyframes pulseMove": {
              "0%, 100%": {
                transform: "scale(1)",
                opacity: 0.6,
              },
              "50%": {
                transform: "scale(1.1)",
                opacity: 0.9,
              },
            },
          }}
          opacity={0.3}
          _dark={{ opacity: 0.15 }}
        />
      ))}

      {/* 小さな星のような粒子 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Box
          key={`small-${i}`}
          position="absolute"
          width="12px"
          height="12px"
          borderRadius="50%"
          bg={
            i % 5 === 0
              ? "purple.400"
              : i % 5 === 1
              ? "pink.400"
              : i % 5 === 2
              ? "blue.400"
              : i % 5 === 3
              ? "cyan.400"
              : "yellow.400"
          }
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          sx={{
            animation: `floatStar ${6 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
            "@keyframes floatStar": {
              "0%, 100%": {
                transform: "translateY(0px) rotate(0deg)",
                opacity: 0.7,
              },
              "33%": {
                transform: "translateY(-20px) rotate(120deg)",
                opacity: 1,
              },
              "66%": {
                transform: "translateY(10px) rotate(240deg)",
                opacity: 0.8,
              },
            },
          }}
          opacity={0.6}
          _dark={{ opacity: 0.3 }}
          boxShadow="0 0 10px currentColor"
        />
      ))}

      {/* 回転するリング */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Box
          key={`ring-${i}`}
          position="absolute"
          width={`${200 + i * 100}px`}
          height={`${200 + i * 100}px`}
          border="2px solid"
          borderColor={
            i === 0 ? "purple.300" : i === 1 ? "pink.300" : "blue.300"
          }
          borderRadius="50%"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          sx={{
            animation: `rotateRing ${20 + i * 10}s linear infinite`,
            "@keyframes rotateRing": {
              from: { transform: "translate(-50%, -50%) rotate(0deg)" },
              to: { transform: "translate(-50%, -50%) rotate(360deg)" },
            },
          }}
          opacity={0.2}
          _dark={{ opacity: 0.1 }}
        />
      ))}

      {/* 煌めくエフェクト */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={`sparkle-${i}`}
          position="absolute"
          width="4px"
          height="4px"
          bg="white"
          borderRadius="50%"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          sx={{
            animation: `sparkleMove ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            "@keyframes sparkleMove": {
              "0%, 100%": {
                transform: "scale(1)",
                opacity: 0.6,
              },
              "50%": {
                transform: "scale(1.1)",
                opacity: 0.9,
              },
            },
          }}
          opacity={0.8}
          boxShadow="0 0 6px white, 0 0 12px white, 0 0 18px white"
        />
      ))}
    </Box>
  );
}