'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Textarea,
  Button,
  Avatar,
  Icon,
  FormControl,
  Center
} from '@chakra-ui/react';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentSectionProps {
  videoId: number;
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    
    // TODO: Replace with actual API call
    try {
      // API call would use videoId here
      const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      
      if (response.ok) {
        const comment: Comment = {
          id: Date.now(),
          author: 'Anonymous User',
          content: newComment,
          timestamp: new Date().toLocaleString(),
          likes: 0,
        };
        
        setComments(prev => [comment, ...prev]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="2xl"
      p={6}
      shadow="xl"
      border="2px solid"
      borderColor="pink.100"
      _dark={{ borderColor: "pink.700" }}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        bgGradient: "linear(to-r, pink.400, purple.400, blue.400)",
        borderTopRadius: "2xl"
      }}
    >
      <Heading
        as="h2"
        size="lg"
        bgGradient="linear(to-r, pink.500, purple.500)"
        bgClip="text"
        fontWeight="extrabold"
        mb={6}
      >
        💬 Comments ({comments.length})
      </Heading>
      
      {/* Comment form */}
      <Box as="form" onSubmit={handleSubmitComment} mb={6}>
        <HStack align="start" spacing={3}>
          <Avatar
            size="md"
            name="User"
            bg="gray.300"
            _dark={{ bg: "gray.600" }}
            color="gray.700"
            flexShrink={0}
          />
          <VStack flex={1} align="stretch" spacing={2}>
            <FormControl>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="✨ Add a comment..."
                resize="none"
                rows={3}
                isDisabled={isLoading}
                focusBorderColor="pink.400"
                bg="pink.50"
                _dark={{ bg: "gray.700", color: "white" }}
                borderColor="pink.200"
                _dark={{ borderColor: "pink.600" }}
                borderRadius="xl"
                _focus={{
                  borderColor: "pink.400",
                  shadow: "0 0 0 1px var(--chakra-colors-pink-400)"
                }}
              />
            </FormControl>
            <HStack justify="end" spacing={2}>
              <Button
                variant="ghost"
                onClick={() => setNewComment('')}
                isDisabled={isLoading}
                color="pink.500"
                _dark={{ color: "pink.400" }}
                _hover={{ color: "pink.600", _dark: { color: "pink.300" } }}
                borderRadius="xl"
              >
                ❌ Cancel
              </Button>
              <Button
                type="submit"
                bgGradient="linear(to-r, pink.400, purple.400)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, pink.500, purple.500)",
                  transform: "translateY(-1px)",
                  shadow: "md"
                }}
                isDisabled={!newComment.trim() || isLoading}
                isLoading={isLoading}
                loadingText="Posting..."
                borderRadius="xl"
                fontWeight="bold"
                transition="all 0.2s"
              >
                💬 Comment
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Box>
      
      {/* Comments list */}
      <VStack align="stretch" spacing={4}>
        {comments.length === 0 ? (
          <Center py={8}>
            <Text
              color="pink.500"
              _dark={{ color: "pink.400" }}
              fontSize="lg"
              fontWeight="medium"
            >
              😊 No comments yet. Be the first to comment!
            </Text>
          </Center>
        ) : (
          comments.map((comment) => (
            <HStack key={comment.id} align="start" spacing={3}>
              <Avatar
                size="md"
                name={comment.author}
                bg="gray.300"
                _dark={{ bg: "gray.600" }}
                color="gray.700"
                flexShrink={0}
              />
              <VStack align="stretch" flex={1} spacing={1}>
                <HStack spacing={2} mb={1}>
                  <Text
                    fontWeight="bold"
                    color="purple.600"
                    _dark={{ color: "purple.300" }}
                  >
                    👤 {comment.author}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="pink.500"
                    _dark={{ color: "pink.400" }}
                  >
                    🕰️ {comment.timestamp}
                  </Text>
                </HStack>
                <Text
                  color="gray.700"
                  _dark={{ color: "gray.200" }}
                  mb={2}
                  bg="purple.50"
                  _dark={{ bg: "purple.900" }}
                  p={3}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="purple.100"
                  _dark={{ borderColor: "purple.700" }}
                >
                  {comment.content}
                </Text>
                <HStack
                  spacing={4}
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={
                      <Icon viewBox="0 0 24 24" boxSize={4}>
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </Icon>
                    }
                    _hover={{ color: "blue.600", _dark: { color: "blue.400" } }}
                    p={0}
                    h="auto"
                    minW="auto"
                  >
                    {comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    _hover={{ color: "blue.600", _dark: { color: "blue.400" } }}
                    p={0}
                    h="auto"
                    minW="auto"
                  >
                    Reply
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          ))
        )}
      </VStack>
    </Box>
  );
}