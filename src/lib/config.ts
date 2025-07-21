/**
 * API URL を取得する関数
 * 環境変数が設定されていない場合のみフォールバックロジックを実行
 */
export function getApiUrl(): string {
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });

  // 環境変数が明示的に設定されている場合はそれを使用
  if (process.env.NEXT_PUBLIC_API_URL) {
    console.log('Using NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Vercel環境の判定
  if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
    console.log('Production environment detected, using Fly.io URL');
    return 'https://vkiri-back.fly.dev';
  }

  // 開発環境のフォールバック
  console.log('Development environment detected, using localhost');
  return 'http://localhost:3000';
}

/**
 * アプリケーション設定
 */
export const config = {
  api: {
    baseUrl: getApiUrl(),
  },
  app: {
    name: 'VTube',
    version: '1.0.0',
  },
} as const;

/**
 * 環境を判定する関数
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
