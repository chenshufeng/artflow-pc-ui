<template>
  <div class="home-container">
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

    <section class="hero-section">
      <div class="container hero-content">
        <h2>发现美丽的瞬间</h2>
        <p>探索高质量的摄影作品，感受视觉艺术的魅力</p>
        <button class="btn-primary">开始浏览</button>
      </div>
    </section>

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

    <section class="gallery-section">
      <div class="container">
        <h3>精选图片</h3>
        <ImageList />
      </div>
    </section>

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
import { ref } from 'vue'
import ImageList from '../components/ImageList.vue'

const categories = ref([
  { id: 1, name: '自然风光', image: 'https://picsum.photos/id/10/300/200' },
  { id: 2, name: '城市建筑', image: 'https://picsum.photos/id/11/300/200' },
  { id: 3, name: '人文纪实', image: 'https://picsum.photos/id/12/300/200' },
  { id: 4, name: '创意设计', image: 'https://picsum.photos/id/13/300/200' }
])
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

