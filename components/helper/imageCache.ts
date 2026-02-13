import { useState, useEffect } from 'react';

interface CacheItem {
  dataUrl: string;
  timestamp: number;
  expiresAt: number;
}

class ImageCache {
  private cache = new Map<string, CacheItem>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor() {
    // Clean up expired cache items every minute
    setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  private isExpired(item: CacheItem): boolean {
    return Date.now() > item.expiresAt;
  }

  async getImage(url: string): Promise<string> {
    // Check if image is in cache and not expired
    const cachedItem = this.cache.get(url);
    if (cachedItem && !this.isExpired(cachedItem)) {
      console.log(`✅ Cache hit for: ${url}`);
      return cachedItem.dataUrl;
    }

    console.log(`🔄 Fetching and caching: ${url}`);

    try {
      // For Dropbox URLs, use a different approach since they block CORS
      if (url.includes('dropbox.com')) {
        // Create a proxy approach - use the original URL since we can't fetch it directly
        // Instead, we'll rely on browser's native image loading which handles CORS differently
        console.log(`📦 Dropbox URL detected, using direct loading: ${url}`);
        
        // Cache the original URL with shorter duration
        const now = Date.now();
        this.cache.set(url, {
          dataUrl: url,
          timestamp: now,
          expiresAt: now + (2 * 60 * 1000) // 2 minutes for Dropbox images
        });
        return url;
      }

      // For non-Dropbox URLs, try to fetch and cache
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      
      // Convert blob to data URL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Store in cache
      const now = Date.now();
      this.cache.set(url, {
        dataUrl,
        timestamp: now,
        expiresAt: now + this.CACHE_DURATION
      });

      console.log(`✅ Successfully cached: ${url}`);
      return dataUrl;
    } catch (error) {
      console.error(`❌ Error caching image ${url}:`, error);
      
      // Store original URL in cache with shorter duration to avoid repeated errors
      const now = Date.now();
      this.cache.set(url, {
        dataUrl: url,
        timestamp: now,
        expiresAt: now + (30 * 1000) // 30 seconds for failed images
      });
      
      // Return original URL if caching fails
      return url;
    }
  }

  // Preload multiple images
  async preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.getImage(url));
    await Promise.allSettled(promises);
  }

  // Clear all cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache size (number of items)
  getCacheSize(): number {
    return this.cache.size;
  }

  // Get cache info for debugging
  getCacheInfo(): Array<{ url: string; size: number; age: number; expiresIn: number }> {
    const now = Date.now();
    return Array.from(this.cache.entries()).map(([url, item]) => ({
      url,
      size: item.dataUrl.length,
      age: now - item.timestamp,
      expiresIn: item.expiresAt - now
    }));
  }

  // Debug method to log cache status
  debugCache(): void {
    console.log('🗂️ Image Cache Debug Info:');
    console.log(`Cache size: ${this.cache.size} items`);
    console.log('Cache contents:');
    this.getCacheInfo().forEach(item => {
      console.log(`  - ${item.url.substring(0, 50)}... (${Math.round(item.age / 1000)}s old, expires in ${Math.round(item.expiresIn / 1000)}s)`);
    });
  }
}

// Create singleton instance
export const imageCache = new ImageCache();

// React hook for using image cache
export const useCachedImage = (url: string) => {
  const [cachedUrl, setCachedUrl] = useState<string>(url);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      if (!url) return;

      setIsLoading(true);
      setError(null);

      try {
        const cached = await imageCache.getImage(url);
        if (isMounted) {
          setCachedUrl(cached);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load image');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { cachedUrl, isLoading, error };
};
