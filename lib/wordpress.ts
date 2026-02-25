/**
 * WordPress REST API Client for ProductOS Blog
 * Provides typed functions for fetching posts, categories, and media
 */

const WORDPRESS_API_URL = 'https://yellow-cat-229404.hostingersite.com/wp-json/wp/v2';

// =============================================================================
// Types
// =============================================================================

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogFeaturedImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** Full blog post type with all details */
export interface WordPressPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author?: BlogAuthor;
  categories: BlogCategory[];
  tags?: BlogTag[];
  featuredImage?: BlogFeaturedImage;
  readingTime?: number;
}

/** Alias for WordPressPost - used interchangeably */
export type BlogPost = WordPressPost;

export interface GetPostsOptions {
  page?: number;
  perPage?: number;
  category?: number;
}

export interface GetPostsResponse {
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
}

// =============================================================================
// Raw WordPress API Types (internal use)
// =============================================================================

interface WPRendered {
  rendered: string;
}

interface WPAuthorRaw {
  id: number;
  name: string;
  avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
}

interface WPTermRaw {
  id: number;
  name: string;
  slug: string;
}

interface WPMediaRaw {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: {
      large?: { source_url: string; width: number; height: number };
      medium_large?: { source_url: string; width: number; height: number };
      medium?: { source_url: string; width: number; height: number };
      full?: { source_url: string; width: number; height: number };
    };
  };
}

interface WPPostRaw {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WPAuthorRaw[];
    'wp:featuredmedia'?: WPMediaRaw[];
    'wp:term'?: WPTermRaw[][];
  };
}

interface WPCategoryRaw {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

/** Strip HTML tags from string */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Calculate reading time in minutes */
function calculateReadingTime(content: string): number {
  const text = stripHtml(content);
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/** Extract author from embedded response */
function extractAuthor(embedded?: WPPostRaw['_embedded']): BlogAuthor | undefined {
  const author = embedded?.author?.[0];
  if (!author) return undefined;
  
  return {
    name: author.name || 'ProductOS Team',
    avatar: author.avatar_urls?.['96'] || author.avatar_urls?.['48'],
  };
}

/** Extract featured image from embedded response */
function extractFeaturedImage(embedded?: WPPostRaw['_embedded']): BlogFeaturedImage | undefined {
  const media = embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return undefined;

  const sizes = media.media_details?.sizes;
  const preferredSize = sizes?.large || sizes?.medium_large || sizes?.full;

  return {
    url: preferredSize?.source_url || media.source_url,
    width: preferredSize?.width || media.media_details?.width,
    height: preferredSize?.height || media.media_details?.height,
    alt: media.alt_text || undefined,
  };
}

/** Extract categories from embedded response */
function extractCategories(embedded?: WPPostRaw['_embedded']): BlogCategory[] {
  const terms = embedded?.['wp:term'];
  if (!terms?.[0]) return [];

  return terms[0].map((term: WPTermRaw) => ({
    id: term.id,
    name: term.name,
    slug: term.slug,
  }));
}

/** Extract tags from embedded response */
function extractTags(embedded?: WPPostRaw['_embedded']): BlogTag[] {
  const terms = embedded?.['wp:term'];
  if (!terms?.[1]) return [];

  return terms[1].map((term: WPTermRaw) => ({
    id: term.id,
    name: term.name,
    slug: term.slug,
  }));
}

/** Transform raw WP post to WordPressPost */
function transformToWordPressPost(raw: WPPostRaw): WordPressPost {
  return {
    id: raw.id,
    slug: raw.slug,
    title: stripHtml(raw.title.rendered),
    excerpt: stripHtml(raw.excerpt.rendered),
    content: raw.content.rendered,
    date: raw.date,
    modified: raw.modified,
    author: extractAuthor(raw._embedded),
    categories: extractCategories(raw._embedded),
    tags: extractTags(raw._embedded),
    featuredImage: extractFeaturedImage(raw._embedded),
    readingTime: calculateReadingTime(raw.content.rendered),
  };
}

// =============================================================================
// API Functions
// =============================================================================

/**
 * Fetch posts with pagination and optional category filter
 */
export async function getPosts(options: GetPostsOptions = {}): Promise<GetPostsResponse> {
  const { page = 1, perPage = 10, category } = options;

  try {
    const params = new URLSearchParams({
      _embed: 'true',
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (category) {
      params.set('categories', category.toString());
    }

    const response = await fetch(`${WORDPRESS_API_URL}/posts?${params}`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return { posts: [], totalPages: 0, totalPosts: 0 };
    }

    const rawPosts: WPPostRaw[] = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);

    return {
      posts: rawPosts.map(transformToWordPressPost),
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
}

/**
 * Fetch a single post by its slug
 * Returns null if post not found
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const params = new URLSearchParams({
      _embed: 'true',
      slug: slug,
    });

    const response = await fetch(`${WORDPRESS_API_URL}/posts?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const rawPosts: WPPostRaw[] = await response.json();

    if (rawPosts.length === 0) {
      return null;
    }

    return transformToWordPressPost(rawPosts[0]);
  } catch (error) {
    console.error(`Error fetching post "${slug}":`, error);
    return null;
  }
}

/**
 * Alias for getPostBySlug
 */
export const getPost = getPostBySlug;

/**
 * Fetch all posts (for static generation)
 */
export async function getAllPosts(options: { perPage?: number } = {}): Promise<WordPressPost[]> {
  const { perPage = 100 } = options;

  try {
    const params = new URLSearchParams({
      _embed: 'true',
      per_page: perPage.toString(),
    });

    const response = await fetch(`${WORDPRESS_API_URL}/posts?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const rawPosts: WPPostRaw[] = await response.json();
    return rawPosts.map(transformToWordPressPost);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<BlogCategory[]> {
  try {
    const params = new URLSearchParams({
      per_page: '100',
      hide_empty: 'true',
    });

    const response = await fetch(`${WORDPRESS_API_URL}/categories?${params}`, {
      next: { revalidate: 86400 }, // ISR: revalidate daily
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const rawCategories: WPCategoryRaw[] = await response.json();
    return rawCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch featured media by ID
 * Returns image details or null if not found
 */
export async function getFeaturedMedia(mediaId: number): Promise<BlogFeaturedImage | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/media/${mediaId}`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const media: WPMediaRaw = await response.json();
    const sizes = media.media_details?.sizes;
    const preferredSize = sizes?.large || sizes?.medium_large || sizes?.full;

    return {
      url: preferredSize?.source_url || media.source_url,
      width: preferredSize?.width || media.media_details?.width,
      height: preferredSize?.height || media.media_details?.height,
      alt: media.alt_text || undefined,
    };
  } catch (error) {
    console.error(`Error fetching media ${mediaId}:`, error);
    return null;
  }
}
