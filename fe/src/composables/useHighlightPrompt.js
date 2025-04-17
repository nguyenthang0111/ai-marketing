import { ref, watch } from 'vue'
import { Highlight } from '@/helpers/highlight'
import debounce from 'lodash.debounce'

export function useHighlightPrompt(prompt, params, botData, containerRef) {
  const highlighter = new Highlight()

  watch(
    () => botData.prompt,
    (value) => {
      if (containerRef.value) {
        containerRef.value.innerHTML = highlighter.highlightParam(value)
      }
    }
  )

  const initializePrompt = () => {
    if (prompt.value) {
      containerRef.value.innerHTML = highlighter.highlightParam(prompt.value)
    }
  }

  const handleInput = debounce((e) => {
    if (!e.data)  return
    
    const elm = containerRef.value
    const caretOffset = highlighter.saveCaretPosition(elm)
    prompt.value = elm.innerText
    
    elm.innerHTML = highlighter.highlightParam(highlighter.removeHighlight(elm.innerHTML))
    highlighter.restoreCaretPosition(elm, caretOffset)
  }, 500)

  const getNewParams = () => {
    const detectedParams = highlighter.getParams(prompt.value)

    return detectedParams.filter(
      (detectedParam) =>
        !params.value.some(
          (existingParam) => existingParam.paramKey === detectedParam.paramKey
        )
    )
  }

  return {
    initializePrompt,
    handleInput,
    getNewParams
  }
}
