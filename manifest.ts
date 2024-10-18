import { ManifestOptions } from 'vite-plugin-pwa';

export const manifest: Partial<ManifestOptions> = {
  short_name: 'Notes',
  name: 'Notes',
  start_url: '/index.html',
  display: 'standalone',
  background_color: '#fff',
  theme_color: '#fff',
  orientation: 'portrait-primary',
  description: 'A simple macOS notes clone',
  scope: '/',
  icons: [
    {
      src: '/icons/android-36x36.png',
      sizes: '36x36',
      type: 'image/png',
    },
    {
      src: '/icons/android-48x48.png',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      src: '/icons/android-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      src: '/icons/android-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      src: '/icons/android-144x144.png',
      sizes: '144x144',
      type: 'image/png',
    },
    {
      src: '/icons/android-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: '/icons/android-chrome-maskable-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/icons/android-chrome-maskable-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/icons/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  ],
};
