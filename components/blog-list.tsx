"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Calendar, User } from "lucide-react"
import { BlogEditor } from "./blog-editor"

interface BlogPost {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
  author: string
}

interface BlogListProps {
  category: string
  onEdit: (post: BlogPost) => void
}

export function BlogList({ category, onEdit }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 로컬 스토리지에서 블로그 포스트 불러오기
    const savedPosts = localStorage.getItem('blog-posts')
    if (savedPosts) {
      const allPosts = JSON.parse(savedPosts)
      const categoryPosts = allPosts.filter((post: BlogPost) => post.category === category)
      setPosts(categoryPosts.sort((a: BlogPost, b: BlogPost) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ))
    }
    setLoading(false)
  }, [category])

  const handleDelete = (postId: string) => {
    if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
      const savedPosts = localStorage.getItem('blog-posts')
      if (savedPosts) {
        const allPosts = JSON.parse(savedPosts)
        const updatedPosts = allPosts.filter((post: BlogPost) => post.id !== postId)
        localStorage.setItem('blog-posts', JSON.stringify(updatedPosts))
        
        // 현재 카테고리의 포스트만 다시 필터링
        const categoryPosts = updatedPosts.filter((post: BlogPost) => post.category === category)
        setPosts(categoryPosts.sort((a: BlogPost, b: BlogPost) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ))
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
          <p className="text-sm text-muted-foreground mt-2">새 글을 작성해보세요!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(post)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  수정
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  삭제
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              {post.content.length > 150 
                ? post.content.substring(0, 150) + '...' 
                : post.content
              }
            </p>
            {post.updatedAt !== post.createdAt && (
              <Badge variant="secondary" className="mt-2">
                수정됨
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
