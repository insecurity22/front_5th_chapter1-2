import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

/**
 * 속성 비교, 변경된 속성만 수정
 */
function updateAttributes(target, originNewProps, originOldProps) {
  if (!target || !originNewProps) return;

  Object.entries(originNewProps).forEach(([key, value]) => {
    if (key === "className") {
      target.setAttribute("class", value);
    } else if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase();
      /**
       * onClick -> click
       * onMouseEnter -> mouseenter
       * onMouseLeave -> mouseleave
       * onMouseMove -> mousemove
       * onMouseDown -> mousedown
       * onMouseUp -> mouseup
       * onMouseOut -> mouseout
       * ...
       */
      addEvent(target, eventType, value);
    } else {
      target.setAttribute(key, value);
    }
  });

  /**
   * 더 이상 필요하지 않은 속성이나 이벤트 리스너 제거
   */
  Object.entries(originOldProps).forEach(([key, oldValue]) => {
    const isPropRemoved = originNewProps[key] === undefined;
    if (isPropRemoved) {
      if (key === "className") {
        target.removeAttribute("class");
      } else if (key.startsWith("on") && typeof oldValue === "function") {
        const eventType = key.slice(2).toLowerCase();
        removeEvent(target, eventType);
      } else {
        target.removeAttribute(key);
      }
    }
  });
}

/**
 * 트리 구조(노드 전체) 비교, 변경된 노드만 수정
 * - oldNode : 이전 노드
 * - newNode : 최신 노드
 */
export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parentElement.appendChild(createElement(newNode));
    return;
  }

  if (!newNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    return;
  }

  if (typeof newNode === "string") {
    const textNode = parentElement.childNodes[index];
    if (textNode.textContent !== newNode) {
      textNode.textContent = newNode;
    }
    return;
  }

  const $element = parentElement.childNodes[index];
  if (!$element) return;

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(createElement(newNode), $element);
    return;
  }

  updateAttributes($element, newNode.props, oldNode.props);

  const newLength = newNode.children?.length;
  const oldLength = oldNode.children?.length;
  for (let i = 0; i < newLength || i < oldLength; i++) {
    updateElement($element, newNode.children[i], oldNode.children[i], i);
  }
}

/**
 * 1) 얕은 복사(Shallow Copy)
 * const newNode = {
 *   type: "div",
 *   props: { onClick: oldNode.props.onClick },
 *   children: oldNode.children,
 * }
 */
