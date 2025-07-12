'use client';
import { Video } from '@/lib/types';
import VideoGrid from '@/components/VideoGrid';

async function getVideos(): Promise<Video[]> {
  try {
    // 環境に応じてAPIのURLを決定
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
                   (process.env.NODE_ENV === 'production' 
                     ? 'https://vkiri-back.fly.dev' 
                     : 'http://172.20.0.4:3000');
    
    // バックエンドAPIからビデオデータを取得
    const response = await fetch(`${apiUrl}/api/v1/videos`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            VTube
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            VTuber動画を見つけて楽しもう
          </p>
        </header>
        
        <main>
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                動画が見つかりません
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                APIが設定されていないか、動画がまだ登録されていません。
              </p>
            </div>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </main>
      </div>
    </div>
  );
}
