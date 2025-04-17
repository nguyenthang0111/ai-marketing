import { PromptParam } from '@/models/prompt-param.model'

/**
 * Class to handle text variable highlighting and caret management in contenteditable elements.
 */
export class Highlight {
  /** @type {RegExp} Matches variables in format {{variableName}} */
  VARIABLE_PATTERN = /\{\{([a-zA-Z0-9_]+)\}\}/g

  /**
   * @typedef {Object} CaretPosition
   * @property {Node} node - The DOM node
   * @property {number} offset - Character offset within the node
   */

  /**
   * Finds caret position in element's text content
   * @param {HTMLElement} element
   * @returns {number}
   */
  saveCaretPosition(element) {
    if (!this.isValidElement(element)) return 0

    const selection = window.getSelection()
    if (!selection?.rangeCount) return 0

    const range = selection.getRangeAt(0)
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(element)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    return preCaretRange.toString().length
  }

  /**
   * Places caret at specified text offset
   * @param {HTMLElement} element
   * @param {number} offset
   */
  restoreCaretPosition(element, offset) {
    if (!this.isValidElement(element) || offset < 0) return

    const { node, nodeOffset } = this.findNodeAtOffset(element, offset)
    if (!node) return

    const selection = window.getSelection()
    const range = document.createRange()
    range.setStart(node, nodeOffset)
    range.collapse(true)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  /**
   * Wraps variables in highlight spans
   * @param {string} content
   * @returns {string}
   */
  highlightParam(content) {
    if (typeof content !== 'string') return ''
    return content.replace(
      this.VARIABLE_PATTERN,
      (_, variable) => `<span class="text-blue-600">{{${variable}}}</span>`
    )
  }

  /**
   * Removes highlight markup
   * @param {string} content
   * @returns {string}
   */
  removeHighlight(content) {
    if (typeof content !== 'string') return ''
    return content.replace(/<\/?span[^>]*>/gi, '')
  }

  /**
   * Gets unique variables from content
   * @param {string} content
   * @returns {PromptParam[]}
   */
  getParams(content) {
    if (typeof content !== 'string') return []

    const matches = [...content.matchAll(this.VARIABLE_PATTERN)]
    return [...new Set(matches.map((match) => match[1]))].map((param) => new PromptParam(param))
  }

  /**
   * Finds text node and offset for caret position
   * @private
   * @param {HTMLElement} element
   * @param {number} targetOffset
   * @returns {CaretPosition}
   */
  findNodeAtOffset(element, targetOffset) {
    let currentOffset = 0
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false)

    let node
    while ((node = walker.nextNode())) {
      const nodeLength = node.length
      if (currentOffset + nodeLength >= targetOffset) {
        return {
          node,
          nodeOffset: targetOffset - currentOffset
        }
      }
      currentOffset += nodeLength
    }

    return { node: null, nodeOffset: 0 }
  }

  /**
   * Validates element for caret operations
   * @private
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  isValidElement(element) {
    return element && element.nodeType === Node.ELEMENT_NODE
  }
}
