"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, X } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
  author: string
}

interface BlogEditorProps {
  category: string
  post?: BlogPost | null
  onSave: () => void
  onCancel: () => void
}

export function BlogEditor({ category, post, onSave, onCancel }: BlogEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('Dongsoo Kim')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setAuthor(post.author)
    }
  }, [post])

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const savedPosts = localStorage.getItem('blog-posts')
      const allPosts = savedPosts ? JSON.parse(savedPosts) : []

      if (post) {
        // 수정 모드
        const updatedPosts = allPosts.map((p: BlogPost) => 
          p.id === post.id 
            ? { 
                ...p, 
                title, 
                content, 
                author,
                updatedAt: new Date().toISOString()
              }
            : p
        )
        localStorage.setItem('blog-posts', JSON.stringify(updatedPosts))
      } else {
        // 새 글 작성 모드
        const newPost: BlogPost = {
          id: Date.now().toString(),
          title,
          content,
          category,
          author,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        allPosts.push(newPost)
        localStorage.setItem('blog-posts', JSON.stringify(allPosts))
      }

      onSave()
    } catch (error) {
      console.error('저장 중 오류가 발생했습니다:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {post ? '글 수정' : '새 글 작성'}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              <X className="h-4 w-4 mr-1" />
              취소
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-1" />
              {loading ? '저장 중...' : '저장'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자 이름"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="글 내용을 입력하세요"
            rows={10}
            disabled={loading}
            className="resize-none"
          />
        </div>

        <div className="text-sm text-muted-foreground">
          카테고리: {category}
        </div>
      </CardContent>
    </Card>
  )
}
