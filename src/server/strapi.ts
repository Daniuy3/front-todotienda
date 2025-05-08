"use server"

import axios from 'axios';


const client = axios.create({
  baseURL: process.env.STRAPI_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`,
    },
});

interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

interface ImageFormats {
    thumbnail: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    large?: ImageFormat;
}

interface Cover {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Category {
    name: string;
    slug: string;
    id: number;
    cover: Cover;
}

export interface CategoriesResponse {
    data: Category[];
}

const parseCoverUrl = (cover: Cover) => {

    return {
        ...cover,
        formats: {
            thumbnail: cover.formats.thumbnail &&{
                ...cover.formats.thumbnail,
                url: process.env.STRAPI_URL + cover.formats.thumbnail.url,
            } || undefined,
            medium: cover.formats.medium && {
                ...cover.formats.medium,
                url: process.env.STRAPI_URL + cover.formats.medium.url,
            } || undefined,
            small: cover.formats.small && {
                ...cover.formats.small,
                url: process.env.STRAPI_URL + cover.formats.small.url,
            } || undefined,
            large: cover.formats.large && {
                ...cover.formats.large,
                url: process.env.STRAPI_URL + cover.formats.large.url,
            } || undefined,
        },
        url: process.env.STRAPI_URL + cover.url,
    };
}
export const getCategories = async () => {
  try {
    const response = await client.get<CategoriesResponse>('/api/categories?select=name&select=slug&populate=cover');
    return response.data.data.map((category) => ({
      ...category,
        cover: parseCoverUrl(category.cover),
        
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export interface MonthlyArticle {
    id: number;
    documentId: string;
    title: string;
    description: string | null;
    slug: string;
    new: boolean;
    imported: boolean | null;
    price: number;
    discount_price: number;
    available: boolean;
    stock: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    monthly: boolean;
    cover: Cover;
    category: Omit<Category, 'cover'>;
}

export interface MonthlyResponse {
    data: MonthlyArticle[];
}
export const getMonthly = async () => {
    try {
        const response = await client.get<MonthlyResponse>('/api/articles?filters[monthly][$eq]=true&populate=cover&populate=category');
    
        return {
            ...response.data.data[0],
            cover: parseCoverUrl(response.data.data[0].cover),
            slug: response.data.data[0].category.slug + '/' + response.data.data[0].slug,
        }

    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const getNews = async () => {
    try {
        const response = await client.get<MonthlyResponse>('/api/articles?filters[new][$eq]=true&populate=cover&populate=category&pagination[pageSize]=6');
        
        return response.data.data.map((article) => ({
            ...article,
            cover: parseCoverUrl(article.cover),
            slug: article.category.slug + '/' + article.slug,
        }))

    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export interface CategoriesWithArticles extends Category {
    articles: MonthlyArticle[];
}

export interface CategoriesWithArticlesResponse {
    data: CategoriesWithArticles[];
}

export const getCategoriesWithProducts = async () => {
    try {
        const response = await client.get<CategoriesWithArticlesResponse>('/api/categories?populate=articles.cover');

        return response.data.data.map((category) => ({
            ...category,
            articles: category.articles.map((article) => ({
                ...article,
                cover: parseCoverUrl(article.cover),
                slug: category.slug + '/' + article.slug,
            })),
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const getCategoryBySlug = async (slug: string) => {
    try {
        const response = await client.get<CategoriesWithArticlesResponse>(`/api/categories?filters[slug][$eq]=${slug}&populate=articles.cover`);

        return response.data.data.map((category) => ({
            ...category,
            articles: category.articles.map((article) => ({
                ...article,
                cover: parseCoverUrl(article.cover),
                slug: category.slug + '/' + article.slug,
            })),
        }))[0];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const getArticleBySlug = async (slug: string) => {
    try {
        const response = await client.get<CategoriesWithArticlesResponse>(`/api/articles?filters[slug][$eq]=${slug}&populate=cover`);

        return {
            ...response.data.data[0],
            cover: parseCoverUrl(response.data.data[0].cover),
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}


export type ArticleSearch = Pick<MonthlyArticle, "slug" | "category" | "title">

interface ArticleSearchResponse {
    data: ArticleSearch[];
}

export const getAllArticles = async () => {
    try {
        const response = await client.get<ArticleSearchResponse>(`/api/articles?select=slug&select=title&populate=category`);

        return response.data.data.map(({category, slug, title}) => {
            return {    
                slug: category.slug + '/' + slug,
                title
            }
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}