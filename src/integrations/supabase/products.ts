// --- Updated Product type definition ---
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  category?: string;
  imageUrl?: string;
  product_images?: {
    id: string;
    src: string;
    alt?: string;
  }[];
  product_videos?: {  // Added this field
    id: string;
    video_url: string;
    title?: string;
    description?: string;
    created_at?: string;
  }[];
  rating?: number;
  reviewCount?: number;
  inventory?: number;
  location?: string;
  status?: string;
  created_at?: string;
  tags?: string[];
  flash_deal?: boolean;
  flash_start_time?: string;
  views?: number;
  saves?: number;
  seller_trust_score?: number;
  last_activity?: string;
  seller_id?: string;
  sellers?: {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    verified: boolean;
    rating?: number;
    total_sales: number;
    followers_count: number;
    trust_score: number;
  };
}

// --- Updated fetchAllProducts to include videos ---
export async function fetchAllProducts(): Promise<Product[]> {
  const { supabase } = await import('./client');

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        id,
        src,
        alt
      ),
      product_videos (  // Added this relation
        id,
        video_url,
        title,
        description,
        created_at
      ),
      sellers (
        id,
        name,
        description,
        image_url,
        verified,
        rating,
        total_sales,
        followers_count,
        trust_score
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

// --- Updated fetchProductById to include videos ---
export async function fetchProductById(productId: string): Promise<Product> {
  const { supabase } = await import('./client');

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        id,
        src,
        alt
      ),
      product_videos (  // Added this relation
        id,
        video_url,
        title,
        description,
        created_at
      ),
      sellers (
        id,
        name,
        description,
        image_url,
        verified,
        rating,
        total_sales,
        followers_count,
        trust_score
      )
    `)
    .eq('id', productId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product:', error);
    throw error;
  }

  if (!data) {
    throw new Error('Product not found');
  }

  return data;
}

// --- Updated fetchFlashDeals to include videos ---
export async function fetchFlashDeals(category?: string): Promise<Product[]> {
  const { supabase } = await import('./client');

  let query = supabase
    .from('products')
    .select(`
      *,
      product_images (
        id,
        src,
        alt
      ),
      product_videos (  // Added this relation
        id,
        video_url,
        title,
        description,
        created_at
      )
    `)
    .eq('flash_deal', true)
    .gte('flash_start_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  // Filter by category if provided
  if (category) {
    query = query.contains('tags', [category]);
  }

  const { data, error } = await query.order('flash_start_time', { ascending: false });

  if (error) {
    console.error('Error fetching flash deals:', error);
    throw error;
  }

  return data || [];
}