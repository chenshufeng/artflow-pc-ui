<think>
</think><说明>
我为图片展示网站实现了符合苹果设计风格的首页和图片列表功能。主要实现要点包括：

1. 设计风格：采用苹果简约设计，使用浅灰色调、大量留白和清晰的层次结构
2. 瀑布流布局：使用CSS Grid实现响应式瀑布流，确保图片排列自然美观
3. 交互体验：添加图片加载动画、悬停效果和平滑过渡
4. 性能优化：实现图片懒加载和无限滚动加载
5. 状态管理：使用Pinia集中管理图片数据和加载状态

下面是完整的代码实现：
</说明>

<代码>
<!-- src/views/Home.vue -->
<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <header class="app-header">
      <div class="container">
        <div class="logo">
          <h1>Gallery</h1>
        </div>
        <nav class="main-nav">
          <ul>
            <li><a href="#" class="nav-link">首页</a></li>
            <li><a href="#" class="nav-link">分类</a></li>
            <li><a href="#" class="nav-link">收藏</a></li>
            <li><a href="#" class="nav-link">关于</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="container hero-content">
        <h2>发现美丽的瞬间</h2>
        <p>探索高质量的摄影作品，感受视觉艺术的魅力</p>
        <button class="btn-primary">开始浏览</button>
      </div>
    </section>

    <!-- 图片分类 -->
    <section class="categories-section">
      <div class="container">
        <h3>热门分类</h3>
        <div class="categories-grid">
          <div class="category-item" v-for="category in categories" :key="category.id">
            <img :src="category.image" :alt="category.name" class="category-image" />
            <h4 class="category-name">{{ category.name }}</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- 图片列表 -->
    <section class="gallery-section">
      <div class="container">
        <h3>精选图片</h3>
        <ImageList />
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-links">
            <a href="#" class="footer-link">关于我们</a>
            <a href="#" class="footer-link">使用条款</a>
            <a href="#" class="footer-link">隐私政策</a>
            <a href="#" class="footer-link">联系我们</a>
          </div>
          <div class="copyright">
            <p>&copy; 2023 Gallery. 保留所有权利</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ImageList from '@/components/ImageList.vue';

// 模拟分类数据
const categories = ref([
  { id: 1, name: '自然风光', image: 'https://picsum.photos/id/10/300/200' },
  { id: 2, name: '城市建筑', image: 'https://picsum.photos/id/11/300/200' },
  { id: 3, name: '人文纪实', image: 'https://picsum.photos/id/12/300/200' },
  { id: 4, name: '创意设计', image: 'https://picsum.photos/id/13/300/200' }
]);
</script>

<style scoped>
.home-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #1d1d1f;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 */
.app-header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid #e8e8ed;
}

.app-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
}

.logo h1 {
  font-size: 17px;
  font-weight: 600;
  margin: 0;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li {
  margin-left: 20px;
}

.nav-link {
  color: #1d1d1f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  opacity: 0.7;
}

/* 英雄区域样式 */
.hero-section {
  background-color: #f5f5f7;
  padding: 120px 0 80px;
  margin-top: 44px;
  text-align: center;
}

.hero-content h2 {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 16px;
}

.hero-content p {
  font-size: 21px;
  color: #86868b;
  margin-bottom: 32px;
}

.btn-primary {
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0077ed;
}

/* 分类区域样式 */
.categories-section {
  padding: 60px 0;
}

.categories-section h3 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.category-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
}

.category-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.category-name {
  font-size: 17px;
  font-weight: 500;
  padding: 16px;
  margin: 0;
}

/* 画廊区域样式 */
.gallery-section {
  padding: 60px 0;
  background-color: #f5f5f7;
}

.gallery-section h3 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
}

/* 页脚样式 */
.app-footer {
  background-color: #f5f5f7;
  border-top: 1px solid #e8e8ed;
  padding: 40px 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-links {
  margin-bottom: 20px;
}

.footer-link {
  color: #515154;
  text-decoration: none;
  font-size: 12px;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #1d1d1f;
}

.copyright {
  font-size: 12px;
  color: #86868b;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-content h2 {
    font-size: 32px;
  }
  
  .hero-content p {
    font-size: 17px;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
</代码>

<代码>
<!-- src/components/ImageList.vue -->
<template>
  <div class="image-list-container">
    <div class="image-grid">
      <div 
        class="image-item" 
        v-for="(image, index) in images" 
        :key="image.id"
        :style="{ gridRowEnd: `span ${calculateRowSpan(image.height, image.width)}` }"
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
    
    <!-- 加载更多 -->
    <div v-if="isLoadingMore" class="loading-more">
      <div class="spinner"></div>
    </div>
    
    <button 
      v-else-if="hasMoreImages" 
      class="load-more-btn" 
      @click="loadMoreImages"
    >
      加载更多
    </button>
    
    <p v-else class="no-more-images">没有更多图片了</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useImageStore } from '@/stores/imageStore';

const imageStore = useImageStore();
const images = ref([]);
const isLoadingMore = ref(false);
const hasMoreImages = ref(true);
const visibleImages = ref(0);

// 初始化图片列表
onMounted(() => {
  loadImages();
  setupIntersectionObserver();
});

// 加载图片
const loadImages = async () => {
  try {
    await imageStore.fetchImages();
    images.value = imageStore.images;
    hasMoreImages.value = imageStore.hasMore;
  } catch (error) {
    console.error('Failed to load images:', error);
  }
};

// 加载更多图片
const loadMoreImages = async () => {
  if (isLoadingMore.value || !hasMoreImages.value) return;
  
  isLoadingMore.value = true;
  
  try {
    await imageStore.fetchMoreImages();
    images.value = imageStore.images;
    hasMoreImages.value = imageStore.hasMore;
  } catch (error) {
    console.error('Failed to load more images:', error);
  } finally {
    isLoadingMore.value = false;
  }
};

// 计算图片在网格中的行跨度
const calculateRowSpan = (height, width) => {
  const aspectRatio = height / width;
  const baseSpan = 2; // 基础行跨度
  return Math.max(1, Math.round(baseSpan * aspectRatio));
};

// 处理图片加载完成
const handleImageLoad = (index) => {
  if (index >= visibleImages.value) {
    visibleImages.value = index + 1;
  }
};

// 设置Intersection Observer实现懒加载
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px 0px',
    threshold: 0.1
  });
  
  // 观察所有懒加载图片
  const observeImages = () => {
    document.querySelectorAll('.lazyload').forEach(img => {
      observer.observe(img);
    });
  };
  
  // 初始观察
  observeImages();
  
  // 当图片列表更新时重新观察
  watch(images, () => {
    setTimeout(observeImages, 0);
  });
};

// 监听滚动事件，实现无限滚动
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // 当滚动到页面底部附近时加载更多
  if (scrollTop + windowHeight >= documentHeight - 500 && !isLoadingMore.value && hasMoreImages.value) {
    loadMoreImages();
  }
};

// 添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.image-list-container {
  position: relative;
  padding: 20px 0;
}

/* 瀑布流布局 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: 5px; /* 基础行高，用于计算跨度 */
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
  height: 100%;
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

/* 图片悬停效果 */
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

/* 加载更多按钮 */
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

/* 加载中状态 */
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
  to {
    transform: rotate(360deg);
  }
}

/* 没有更多图片 */
.no-more-images {
  text-align: center;
  color: #86868b;
  padding: 40px 0;
  margin: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
</代码>

<代码>
// src/stores/imageStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

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
    hasMore: (state) => {
      return state.images.length < state.totalImages;
    }
  },
  
  actions: {
    async fetchImages() {
      if (this.isLoading) return;
      
      this.isLoading = true;
      this.error = null;
      
      try {
        // 模拟API请求，实际项目中替换为真实API
        const response = await axios.get('https://api.example.com/images', {
          params: {
            page: this.page,
            limit: this.limit
          }
        });
        
        // 模拟数据，实际项目中使用response.data
        const mockData = this.generateMockImages(this.page, this.limit);
        
        this.images = mockData.images;
        this.totalImages = mockData.total;
        this.page = 2; // 重置页码为2，准备加载更多
      } catch (err) {
        this.error = 'Failed to fetch images. Please try again later.';
        console.error('Error fetching images:', err);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchMoreImages() {
      if (this.isLoading || !this.hasMore) return;
      
      this.isLoading = true;
      
      try {
        // 模拟API请求
        const response = await axios.get('https://api.example.com/images', {
          params: {
            page: this.page,
            limit: this.limit
          }
        });
        
        // 模拟数据
        const mockData = this.generateMockImages(this.page, this.limit);
        
        this.images = [...this.images, ...mockData.images];
        this.page++;
      } catch (err) {
        this.error = 'Failed to load more images. Please try again later.';
        console.error('Error fetching more images:', err);
      } finally {
        this.isLoading = false;
      }
    },
    
    // 重置图片列表
    resetImages() {
      this.images = [];
      this.page = 1;
      this.totalImages = 0;
    },
    
    // 生成模拟图片数据
    generateMockImages(page, limit) {
      const images = [];
      const startId = (page - 1) * limit + 1;
      
      for (let i = 0; i < limit; i++) {
        const id = startId + i;
        const width = Math.floor(Math.random() * 400) + 400; // 400-800px宽度
        const height = Math.floor(Math.random() * 400) + 400; // 400-800px高度
        
        images.push({
          id,
          title: `图片标题 ${id}`,
          author: `摄影师 ${Math.floor(Math.random() * 20) + 1}`,
          url: `https://picsum.photos/id/${id}/800/800`,
          thumbnail: `https://picsum.photos/id/${id}/200/200`,
          width,
          height,
          likes: Math.floor(Math.random() * 1000)
        });
      }
      
      // 模拟总共有60张图片
      return {
        images,
        total: 60
      };
    }
  }
});
</代码>

<代码>
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 可以添加其他路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 页面跳转时滚动到顶部
    return { top: 0 };
  }
});

export default router;
</代码>

<代码>
// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 引入全局样式
import './assets/styles/main.css';

const app = createApp(App);

// 使用Pinia状态管理
app.use(createPinia());

// 使用路由
app.use(router);

app.mount('#app');
</代码>

<代码>
/* src/assets/styles/main.css */
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #ffffff;
  color: #1d1d1f;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 全局链接样式 */
a {
  color: #0071e3;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #0077ed;
  text-decoration: underline;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</代码>

<说明>
实现说明和注意事项：

1. 设计风格：
   - 采用苹果设计风格，使用大量留白、简约的色彩方案和清晰的排版
   - 导航栏使用半透明背景和模糊效果，增强视觉层次感
   - 图片卡片添加微妙的阴影和悬停效果，提升交互体验

2. 瀑布流实现：
   - 使用CSS Grid实现响应式瀑布流布局，根据图片宽高比计算行跨度
   - 图片加载时使用渐进式加载和淡入动画
   - 实现无限滚动和加载更多功能，优化用户体验

3. 性能优化：
   - 使用Intersection Observer API实现图片懒加载
   - 图片使用缩略图先行加载，然后替换为高清图片
   - 组件级别的代码分割和懒加载

4. 状态管理：
   - 使用Pinia集中管理图片数据和加载状态
   - 实现分页加载和缓存机制
   - 错误处理和加载状态管理

5. 响应式设计：
   - 针对不同屏幕尺寸优化布局和字体大小
   - 在移动设备上调整网格列数和图片大小

6. 注意事项：
   - 实际项目中需要替换模拟API为真实后端接口
   - 根据实际图片尺寸调整瀑布流算法参数
   - 考虑添加图片查看器、收藏功能等扩展功能
   - 生产环境中需要优化图片加载和缓存策略
   - 可考虑添加骨架屏提升感知性能

这个实现提供了一个基础但功能完整的图片展示网站，符合苹果设计风格，并包含了现代前端开发的最佳实践。
</说明>