export type PostType = 'post' | 'evento'

export interface Post {
  id?: string
  title: string
  description: string
  imageUrl: string
  postType: PostType
  date?: number
  createdAt: number
}

export interface CreatePostPayload {
  title: string
  description: string
  imageUrl: string
  postType: PostType
  date?: number
}
