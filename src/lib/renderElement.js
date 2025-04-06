import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  const newVNode = normalizeVNode(vNode);
  const oldVNode = container._vNode;

  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  if (!oldVNode) {
    const $element = createElement(newVNode);
    container.appendChild($element);
  } else {
    // 이후에는 updateElement로 기존 DOM을 업데이트한다.
    updateElement(container, newVNode, oldVNode);
  }

  // 현재 가상 DOM 저장
  container._vNode = newVNode;

  // 렌더링이 완료되면 container에 이벤트를 등록한다.
  setupEventListeners(container);
}
