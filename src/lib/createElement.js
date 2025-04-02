import { addEvent } from "./eventManager";

/**
 * [vNode -> 실제 DOM 요소로 변환]
 * 1. Array
 * [
 *   { type: 'div', props: null, children: [ '첫 번째' ] },
 *   { type: "span", props: null, children: ['두 번째'] },
 * ] -> fragment
 *
 * 2. Object
 * { type: 'div', props: null, children: [ '첫 번째' ] },
 * {
 *   type: [Function: FuncComponent],
 *   props: { text: 'Hello' },
 *   children: []
 * },
 * {
 *   type: 'ul',
 *   props: {},
 *   children: [
 *     { type: 'li', props: [Object], children: [Array] },
 *     { type: 'li', props: [Object], children: [Array] },
 *     { type: 'li', props: [Object], children: [Array] }
 *   ]
 * } -> element
 *
 * 3. Other
 * undefined, null, false, true -> textNode
 * string, number -> textNode
 */

export function createElement(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  const isArray = Array.isArray(vNode);
  if (isArray) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const childElement = createElement(child);
      fragment.appendChild(childElement);
    });
    return fragment;
  }

  const isFunction = typeof vNode.type === "function";
  if (isFunction) {
    throw new Error("Function components are not supported yet");
  }

  const isHTMLTag = typeof vNode.type === "string";
  if (isHTMLTag) {
    const $element = document.createElement(vNode.type);

    if (vNode.props) {
      updateAttributes($element, vNode.props);
    }

    if (vNode.children) {
      for (const child of vNode.children) {
        const $childElement = createElement(child);
        $element.appendChild($childElement);
      }
    }

    return $element;
  }
}

// [DOM attributes & event listeners]
function updateAttributes($el, props) {
  if (!props) return;

  Object.entries(props).forEach(([key, value]) => {
    // remove attribute
    if (value === null || value === undefined) {
      $el.removeAttribute(key);
      return;
    }

    // style
    if (key === "style" && typeof value === "string") {
      $el.style.cssText = value;
      return;
    }

    // className
    if (key === "className") {
      $el.setAttribute("class", value);
      return;
    }

    // event listener(onClick, onChange, onMouseEnter, onMouseLeave, ...)
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.toLowerCase().substring(2);
      addEvent($el, eventType, value);
      return;
    }

    // data-* attributes
    if (key.startsWith("data-")) {
      $el.setAttribute(key, value);
    } else {
      $el[key] = value;
    }
  });
}
