import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedVideosProps {
  videos: Video[];
  currentVideoId: number;
}

export default function RelatedVideos({ videos, currentVideoId }: RelatedVideosProps) {
  const filteredVideos = videos.filter(video => video.id !== currentVideoId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Related Videos
      </h2>
      
      <div className="space-y-4">
        {filteredVideos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No related videos found
          </p>
        ) : (
          filteredVideos.map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.id}`}
              className="block group"
            >
              <div className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors">
                <div className="relative w-40 h-24 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration_formatted}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {video.uploader_name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{video.view_count_formatted} views</span>
                    <span>•</span>
                    <span>{video.published_at_formatted}</span>
                  </div>
                  
                  {video.livers.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {video.livers.slice(0, 2).map((liver) => (
                        <span
                          key={liver.id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                        >
                          <Image
                            src={liver.avatar_url}
                            alt={liver.display_name}
                            width={12}
                            height={12}
                            className="w-3 h-3 rounded-full"
                          />
                          {liver.display_name}
                        </span>
                      ))}
                      {video.livers.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{video.livers.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}