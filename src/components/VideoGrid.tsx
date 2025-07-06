import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/video/${video.id}`}
          className="block group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-600">
              <Image
                src={video.thumbnail_url}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration_formatted}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {video.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {video.uploader_name}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>{video.view_count_formatted} views</span>
                <span>•</span>
                <span>{video.published_at_formatted}</span>
              </div>
              
              {video.livers.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {video.livers.slice(0, 3).map((liver) => (
                    <span
                      key={liver.id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                    >
                      <Image
                        src={liver.avatar_url}
                        alt={liver.display_name}
                        width={16}
                        height={16}
                        className="w-4 h-4 rounded-full"
                      />
                      {liver.display_name}
                    </span>
                  ))}
                  {video.livers.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      +{video.livers.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}