import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "VTube - VTuber動画プラットフォーム",
  description: "VTuber動画を見つけて楽しもう",
};

export default function RootLayout({ 
  children,
 }: { 
  children: React.ReactNode,
 }) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
