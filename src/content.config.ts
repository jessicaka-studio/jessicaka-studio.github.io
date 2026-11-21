import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    // long = 長影片、short = 短影音、image = 圖片
    kind: z.enum(['long', 'short', 'image']),
    // 作品發布的平台
    platform: z.enum(['youtube', 'instagram', 'facebook', 'none']).default('none'),
    // 作品原始貼文網址（IG／FB 會用它跳轉）
    url: z.string().url().optional(),
    // YouTube 影片 ID（網址 v= 後面那串），填了才會嵌入播放器
    youtubeId: z.string().optional(),
    // 縮圖／圖片，放在 src/assets/works/，寫成 ../../assets/works/xxx.jpg
    // （不要放 public/，那裡的檔案不管作品公不公開都會被發布）
    thumb: image(),
    // 縮圖比例，決定排版：16:9 橫式、9:16 直式、1:1、4:5
    aspect: z.enum(['16:9', '9:16', '1:1', '4:5']).default('16:9'),
    tools: z.array(z.string()).default([]),
    // 預設不公開。確認可以公開（含 TVBS 取得同意）後才改成 true
    public: z.boolean().default(false),
    prompt: z.string().optional(),
    workflowUrl: z.string().optional(),
    // 範例資料標記，上線前整批刪掉
    sample: z.boolean().default(false),
  }),
});

export const collections = { works };
