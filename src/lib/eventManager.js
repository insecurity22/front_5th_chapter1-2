const eventMap = new Map();
/**
 *  Map {
 *    'button-click' => WeakMap { function1, function2, ... },
 *    'menu-open' => WeakMap { function3, function4, ... },
 *    ...
 *  }
 */

/**
 * @param {HTMLElement} root
 */
export function setupEventListeners(root) {
  eventMap.forEach((_, eventType) => {
    root.removeEventListener(eventType, handleEvent);
    root.addEventListener(eventType, handleEvent);
  });
}

function handleEvent(event) {
  const handlers = eventMap.get(event.type);
  if (!handlers) return;

  const handler = handlers.get(event.target);
  if (typeof handler === "function") {
    handler(event);
  }
}

/**
 * @param {HTMLElement} element = document.createElement("button")
 * @param {string} eventType = "button-click"
 * @param {Function} handler = () => { console.log('button clicked') }
 */
export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new WeakMap());
  }

  eventMap.get(eventType).set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) return;

  if (handler) {
    const handlers = eventMap.get(eventType);
    const currentHandler = handlers.get(element);

    // 현재 저장된 핸들러와 삭제하려는 핸들러가 일치하는 경우에만 삭제
    if (currentHandler === handler) {
      handlers.delete(element);
    }
  } else {
    // 핸들러가 제공되지 않은 경우, 해당 요소의 이벤트 타입 관련 모든 핸들러 제거
    eventMap.get(eventType).delete(element);
  }
}
