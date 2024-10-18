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
};
