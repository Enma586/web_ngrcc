import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Post, CreatePostPayload, PostType } from '@/types'

const COLLECTION_NAME = 'posts'

function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Partial<T> = {}
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }
  return result
}

export const postService = {
  async createPost(payload: CreatePostPayload): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...stripUndefined(payload as unknown as Record<string, unknown>),
      createdAt: Date.now(),
    })
    return docRef.id
  },

  async getAllPosts(): Promise<Post[]> {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const posts: Post[] = []
    snapshot.forEach((doc) => {
      const data = doc.data() as DocumentData
      posts.push({
        id: doc.id,
        title: data.title ?? '',
        description: data.description ?? '',
        imageUrl: data.imageUrl ?? '',
        postType: (data.postType as PostType) ?? 'post',
        date: data.date,
        createdAt: data.createdAt ?? 0,
      })
    })
    return posts
  },

  async updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<void> {
    const postRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(postRef, stripUndefined(data as unknown as Record<string, unknown>))
  },

  async deletePost(id: string): Promise<void> {
    const postRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(postRef)
  },
}
