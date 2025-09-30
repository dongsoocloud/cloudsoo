"use client"

import { useState } from "react"
import { BlogCategorySelector } from "@/components/blog-category-selector"
import { BlogList } from "@/components/blog-list"
import { BlogEditor } from "@/components/blog-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editingPost, setEditingPost] = useState<any>(null)

  const categories = [
    { id: 'tech', name: '기술', description: '프로그래밍, 개발 관련 글' },
    { id: 'life', name: '일상', description: '일상생활, 개인적인 이야기' },
    { id: 'travel', name: '여행', description: '여행 경험, 추천 장소' },
    { id: 'study', name: '학습', description: '공부, 학습 노하우' },
    { id: 'project', name: '프로젝트', description: '프로젝트 경험, 포트폴리오' }
  ]

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setView('list')
  }

  const handleCreatePost = () => {
    setView('create')
  }

  const handleEditPost = (post: any) => {
    setEditingPost(post)
    setView('edit')
  }

  const handleBackToList = () => {
    setView('list')
    setEditingPost(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">카테고리를 선택하여 블로그를 관리하세요.</p>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {categories.find(c => c.id === selectedCategory)?.name} 카테고리
              </h2>
              <p className="text-muted-foreground">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                카테고리 선택으로 돌아가기
              </Button>
              {view === 'list' && (
                <Button onClick={handleCreatePost}>
                  새 글 작성
                </Button>
              )}
            </div>
          </div>

          {view === 'list' && (
            <BlogList 
              category={selectedCategory}
              onEdit={handleEditPost}
            />
          )}

          {view === 'create' && (
            <BlogEditor 
              category={selectedCategory}
              onSave={handleBackToList}
              onCancel={handleBackToList}
            />
          )}

          {view === 'edit' && (
            <BlogEditor 
              category={selectedCategory}
              post={editingPost}
              onSave={handleBackToList}
              onCancel={handleBackToList}
            />
          )}
        </div>
      )}
    </div>
  )
}
