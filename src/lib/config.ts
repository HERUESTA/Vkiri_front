/**
 * アプリケーション設定
 */
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || (() => {
      // 開発環境では localhost を使用
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000';
      }
      // 本番環境では Fly.io を使用
      return 'https://vkiri-back.fly.dev';
    })(),
  },
  app: {
    name: 'VTube',
    version: '1.0.0',
  },
} as const;

/**
 * API URL を取得する関数
 */
export function getApiUrl(): string {
  return config.api.baseUrl;
}

/**
 * 環境を判定する関数
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
