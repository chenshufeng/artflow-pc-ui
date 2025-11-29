import { defineStore } from 'pinia'
import axios from 'axios'

export const useImageStore = defineStore('image', {
  state: () => ({
    images: [],
    page: 1,
    limit: 12,
    totalImages: 0,
    isLoading: false,
    error: null
  }),
  getters: {
    hasMore: state => state.images.length < state.totalImages
  },
  actions: {
    async fetchImages() {
      if (this.isLoading) return
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/sd/file/pcList', {
          params: {
            pageNum: this.page,
            pageSize: this.limit
          }
        })
        const { items, total } = this.normalizeItems(response.data, this.page, this.limit)
        this.images = items
        this.totalImages = total ?? items.length
        this.page = this.page + 1
      } catch (err) {
        this.error = 'Failed to fetch images. Please try again later.'
        console.error('Error fetching images:', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchMoreImages() {
      if (this.isLoading || !this.hasMore) return
      this.isLoading = true
      try {
        const response = await axios.get('/sd/file/pcList', {
          params: {
            pageNum: this.page,
            pageSize: this.limit
          }
        })
        const { items, total } = this.normalizeItems(response.data, this.page, this.limit)
        this.images = [...this.images, ...items]
        if (total != null) this.totalImages = total
        this.page = this.page + 1
      } catch (err) {
        this.error = 'Failed to load more images. Please try again later.'
        console.error('Error fetching more images:', err)
      } finally {
        this.isLoading = false
      }
    },
    normalizeItems(data, page, limit) {
      const list = (data && (data.rows || data.list || data.items || data.data)) || []
      const total = (data && (data.total || data.count)) ?? (Array.isArray(list) ? list.length : 0)
      const startId = (page - 1) * limit + 1
      const items = (Array.isArray(list) ? list : []).map((it, i) => {
        const fileName = it.fileName || it.filename || it.name
        const builtUrl = fileName ? `/sd/file/download?fileName=${encodeURIComponent(fileName)}` : undefined
        const url = it.url || it.src || it.path || it.downloadUrl || it.fileUrl || builtUrl
        const thumbnail = it.thumbnail || it.thumbUrl || it.thumb || url
        const width = it.width || it.w || it.imageWidth || 800
        const height = it.height || it.h || it.imageHeight || 800
        return {
          id: it.id || it.fileId || it._id || startId + i,
          title: it.title || it.name || `图片标题 ${startId + i}`,
          author: it.author || it.uploader || it.user || '未知',
          url,
          thumbnail: thumbnail || url,
          width,
          height,
          likes: it.likes || 0
        }
      })
      return { items, total }
    },
    resetImages() {
      this.images = []
      this.page = 1
      this.totalImages = 0
    },
    generateMockImages(page, limit) {
      const images = []
      const startId = (page - 1) * limit + 1
      for (let i = 0; i < limit; i++) {
        const id = startId + i
        const width = Math.floor(Math.random() * 400) + 400
        const height = Math.floor(Math.random() * 400) + 400
        images.push({
          id,
          title: `图片标题 ${id}`,
          author: `摄影师 ${Math.floor(Math.random() * 20) + 1}`,
          url: `https://picsum.photos/id/${id}/800/800`,
          thumbnail: `https://picsum.photos/id/${id}/200/200`,
          width,
          height,
          likes: Math.floor(Math.random() * 1000)
        })
      }
      return { images, total: 60 }
    }
  }
})
