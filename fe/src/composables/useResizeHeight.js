import { ref, onBeforeUnmount } from 'vue'

export function useResizeHeight(minHeight = 200) {
  const containerRef = ref(null)
  const isResizing = ref(false)
  let startHeight = 0
  let startY = 0

  const startResize = (e) => {
    isResizing.value = true
    startY = e.clientY
    startHeight = containerRef.value.offsetHeight
    
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)
  }

  const handleResize = (e) => {
    if (!isResizing.value) return
    
    const deltaY = e.clientY - startY
    const newHeight = Math.max(minHeight, startHeight + deltaY)
    containerRef.value.style.height = `${newHeight}px`
  }

  const stopResize = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', stopResize)
  }

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', stopResize)
  })

  return {
    isResizing,
    containerRef,
    startResize
  }
}
