import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

/**
 * 속성 비교, 변경된 속성만 수정
 */
function updateAttributes(target, originNewProps, originOldProps) {
  const newProps = originNewProps || {};
  const oldProps = originOldProps || {};

  /**
   * 더 이상 필요하지 않은 속성이나 이벤트 리스너 제거
   */
  Object.entries(oldProps).forEach(([key, oldValue]) => {
    const isPropRemoved = newProps[key] === undefined;
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

  Object.entries(newProps).forEach(([attr, value]) => {
    if (attr === "className") {
      target?.setAttribute("class", value);
    } else if (attr.startsWith("on") && typeof value === "function") {
      const eventType = attr.slice(2).toLowerCase();
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
      target?.setAttribute(attr, value);
    }
  });
}

/**
 * 요소를 업데이트합니다. (트리 구조(노드 전체) 비교, 변경된 노드만 수정)
 * - newNode : 최신 가상 DOM 노드
 * - oldNode : 이전 가상 DOM 노드
 */
export function updateElement(parentElement, newNode, oldNode, index = 0) {
  const $element = parentElement?.childNodes?.[index];

  if (!oldNode) {
    parentElement.appendChild(createElement(newNode));
    return;
  }

  if (!newNode) {
    parentElement.removeChild($element);
    return;
  }

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(createElement(newNode), $element);
    return;
  }

  if (typeof newNode === "string") {
    const textNode = $element;
    if (textNode && textNode.textContent !== newNode) {
      textNode.textContent = newNode;
    }
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
