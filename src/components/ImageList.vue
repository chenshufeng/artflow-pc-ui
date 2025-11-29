<template>
  <div class="image-list-container">
    <div class="image-grid">
      <div
        class="image-item"
        v-for="(image, index) in images"
        :key="image.id"
      >
        <div class="image-wrapper">
          <img
            :src="image.thumbnail"
            :data-src="image.url"
            :alt="image.title"
            class="grid-image lazyload"
            @load="handleImageLoad(index)"
            loading="lazy"
          />
          <div class="image-overlay">
            <h4 class="image-title">{{ image.title }}</h4>
            <p class="image-author">{{ image.author }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoadingMore" class="loading-more">
      <div class="spinner"></div>
    </div>
    <button v-else-if="hasMoreImages" class="load-more-btn" @click="loadMoreImages">加载更多</button>
    <p v-else class="no-more-images">没有更多图片了</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useImageStore } from '../stores/imageStore'

const imageStore = useImageStore()
const images = ref([])
const isLoadingMore = ref(false)
const hasMoreImages = ref(true)
const visibleImages = ref(0)

onMounted(() => {
  loadImages()
  setupIntersectionObserver()
})

const loadImages = async () => {
  try {
    await imageStore.fetchImages()
    images.value = imageStore.images
    hasMoreImages.value = imageStore.hasMore
  } catch (error) {
    console.error('Failed to load images:', error)
  }
}

const loadMoreImages = async () => {
  if (isLoadingMore.value || !hasMoreImages.value) return
  isLoadingMore.value = true
  try {
    await imageStore.fetchMoreImages()
    images.value = imageStore.images
    hasMoreImages.value = imageStore.hasMore
  } catch (error) {
    console.error('Failed to load more images:', error)
  } finally {
    isLoadingMore.value = false
  }
}


const handleImageLoad = index => {
  if (index >= visibleImages.value) {
    visibleImages.value = index + 1
  }
}

const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.getAttribute('data-src')
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          img.classList.add('loaded')
        }
        observer.unobserve(img)
      }
    })
  }, { rootMargin: '200px 0px', threshold: 0.1 })

  const observeImages = () => {
    document.querySelectorAll('.lazyload').forEach(img => {
      observer.observe(img)
    })
  }

  observeImages()
  watch(images, () => { setTimeout(observeImages, 0) })
}

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  if (scrollTop + windowHeight >= documentHeight - 500 && !isLoadingMore.value && hasMoreImages.value) {
    loadMoreImages()
  }
}

onMounted(() => { window.addEventListener('scroll', handleScroll) })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
.image-list-container {
  position: relative;
  padding: 20px 0;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}

.image-item {
  position: relative;
  transition: all 0.3s ease;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  aspect-ratio: 1 / 1;
}

.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
  opacity: 0;
}

.grid-image.loaded {
  opacity: 1;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.image-item:hover .image-overlay {
  transform: translateY(0);
}

.image-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px;
}

.image-author {
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
}

.load-more-btn {
  display: block;
  margin: 40px auto;
  padding: 10px 20px;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #0077ed;
}

.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0071e3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg) }
}

.no-more-images {
  text-align: center;
  color: #86868b;
  padding: 40px 0;
  margin: 0;
}

@media (max-width: 1024px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
}
</style>
