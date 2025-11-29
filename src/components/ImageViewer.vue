<template>
  <div class="viewer" @click.self="close" @wheel.prevent="onWheel">
    <button class="close-btn" @click="close">×</button>
    <button class="nav-btn prev" @click="prev">‹</button>
    <button class="nav-btn next" @click="next">›</button>
    <div class="content">
      <img
        :src="currentImage.url || currentImage.thumbnail"
        :alt="currentImage.title"
        class="image"
        :style="{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, cursor: scale>1 ? (dragging ? 'grabbing' : 'grab') : 'default' }"
        @mousedown="onMouseDown"
        @dblclick="onDblClick"
      />
      <div class="meta">
        <h4 class="title">{{ currentImage.title }}</h4>
        <p class="author">{{ currentImage.author }}</p>
        <p class="hint">滚轮缩放，拖拽移动，双击放大</p>
      </div>
    </div>
    <div class="zoom-controls">
      <button class="zoom-btn" @click="zoomOut">-</button>
      <button class="zoom-btn" @click="zoomIn">+</button>
      <button class="zoom-btn" @click="resetView">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 }
})
const emit = defineEmits(['close'])

const index = ref(props.startIndex)
watch(() => props.startIndex, v => { index.value = v })

const currentImage = computed(() => props.images[index.value] || {})

const close = () => emit('close')
const prev = () => { if (props.images.length) index.value = (index.value - 1 + props.images.length) % props.images.length }
const next = () => { if (props.images.length) index.value = (index.value + 1) % props.images.length }

const onKey = e => {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

onMounted(() => { window.addEventListener('keydown', onKey) })
onUnmounted(() => { window.removeEventListener('keydown', onKey) })

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const dragging = ref(false)
let startX = 0
let startY = 0

const clamp = v => Math.min(Math.max(v, 1), 4)
const zoomIn = () => { scale.value = clamp(scale.value + 0.2) }
const zoomOut = () => { scale.value = clamp(scale.value - 0.2) }
const resetView = () => { scale.value = 1; translateX.value = 0; translateY.value = 0 }

const onWheel = e => { const delta = e.deltaY > 0 ? -0.2 : 0.2; scale.value = clamp(scale.value + delta) }

const onMouseDown = e => {
  if (scale.value <= 1) return
  dragging.value = true
  startX = e.clientX - translateX.value
  startY = e.clientY - translateY.value
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = e => {
  if (!dragging.value) return
  translateX.value = e.clientX - startX
  translateY.value = e.clientY - startY
}

const onMouseUp = () => {
  dragging.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

const onDblClick = () => {
  if (scale.value === 1) { scale.value = 2 } else { resetView() }
}

watch(index, () => { resetView() })
</script>

<style scoped>
.viewer {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.content {
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image {
  max-width: 90vw;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  user-select: none;
}
.meta {
  color: #fff;
  margin-top: 12px;
  text-align: center;
}
.title {
  font-size: 18px;
  margin: 0;
}
.author {
  font-size: 13px;
  opacity: 0.8;
  margin: 6px 0 0;
}
.hint {
  font-size: 12px;
  opacity: 0.7;
  margin: 6px 0 0;
}
.close-btn {
  position: fixed;
  top: 20px;
  right: 24px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  font-size: 22px;
  color: #fff;
  background: rgba(255,255,255,0.12);
  cursor: pointer;
}
.nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 24px;
  font-size: 28px;
  color: #fff;
  background: rgba(255,255,255,0.12);
  cursor: pointer;
}
.nav-btn.prev { left: 24px }
.nav-btn.next { right: 24px }

.zoom-controls {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
}
.zoom-btn {
  min-width: 44px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  color: #fff;
  background: rgba(255,255,255,0.12);
  cursor: pointer;
}
</style>
