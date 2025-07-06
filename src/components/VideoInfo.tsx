import { Video } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface VideoInfoProps {
  video: Video;
}

export default function VideoInfo({ video }: VideoInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {video.title}
      </h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {video.uploader_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <Link
              href={`/channel/${video.uploader_channel_id}`}
              className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              {video.uploader_name}
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{video.view_count_formatted} views</span>
          <span>{video.published_at_formatted}</span>
          <span>{video.duration_formatted}</span>
        </div>
      </div>
      
      {video.livers.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Featured Livers
          </h3>
          <div className="flex flex-wrap gap-2">
            {video.livers.map((liver) => (
              <Link
                key={liver.id}
                href={`/liver/${liver.id}`}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <Image
                  src={liver.avatar_url}
                  alt={liver.display_name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full"
                />
                {liver.display_name}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <a
          href={video.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}