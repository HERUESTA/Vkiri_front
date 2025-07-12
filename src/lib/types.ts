export interface Video {
  id: number;
  youtube_id: string;
  title: string;
  thumbnail_url: string;
  duration_seconds: number;
  duration_formatted: string;
  view_count: number;
  view_count_formatted: string;
  uploader_name: string;
  uploader_channel_id: string;
  published_at: string;
  published_at_formatted: string;
  youtube_url: string;
  youtube_embed_url: string;
  created_at: string;
  updated_at: string;
  livers: Liver[];
}

export interface Liver {
  id: number;
  name: string;
  display_name: string;
  channel_id: string;
  channel_url: string;
  avatar_url: string;
  video_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}

export interface VideosResponse {
  videos: Video[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}

export interface LiversResponse {
  livers: Liver[];
}

export interface VideoResponse {
  video: Video;
  related_videos?: Video[];
}

export interface LiverResponse {
  liver: Liver;
}

export interface LiverVideosResponse {
  liver: Liver;
  videos: Video[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}
