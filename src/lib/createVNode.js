export function createVNode(type, props, ...children) {
  return {
    type,
    props,
    children: flattenChildren(children),
  };
}

function flattenChildren(children) {
  return children?.reduce((acc, child) => {
    if (Array.isArray(child)) {
      return acc.concat(flattenChildren(child));
    }

    if (child === null || child === undefined || typeof child === "boolean") {
      return acc;
    }

    acc.push(child);

    return acc;
  }, []);
}
