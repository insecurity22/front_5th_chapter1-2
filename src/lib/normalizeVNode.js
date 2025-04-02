// normalized VNode(Virtual Node)
export function normalizeVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return "";
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    const component = vNode.type;
    const children = vNode.children?.map((child) => normalizeVNode(child));
    const props = { ...vNode.props, children };
    return normalizeVNode(component(props));
  }

  return vNode;
}
