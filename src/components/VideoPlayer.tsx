import { Video } from '@/lib/types';
import { AspectRatio, Box } from '@chakra-ui/react';

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <AspectRatio ratio={16/9}>
      <Box
        bg="black"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
      >
        <iframe
          src={video.youtube_embed_url}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </Box>
    </AspectRatio>
  );
}