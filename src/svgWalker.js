const GRAPHICS = ['circle', 'ellipse', 'line', 'mesh', 'path', 'polygon', 'polyline', 'rect'];

const isGraphic = (name) => {
  return GRAPHICS.some((n) => {
    return name.toLowerCase() === n;
  });
}

const randomString = (length) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  if (! length) {
    length = Math.floor(Math.random() * chars.length);
  }
  var str = '';
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

const parseNode = (node, idMap) => {
  let name = node.nodeName;
  let nodeId = node.getAttribute("id");
  if (nodeId) {
    console.log('found id', nodeId, 'on', name);
    let guid = randomString(20);
    idMap[nodeId] = guid
  }
  if (isGraphic(name)) {
    let currentValue = node.getAttribute("vector-effect");
    if (currentValue !== "non-scaling-stroke") {
      node.setAttribute('vector-effect','non-scaling-stroke');
    }
  }
  [].forEach.call(node.children, (n) => {
    parseNode(n, idMap);
  });;

}

const replaceIds = (svg, idMap) => {
  let svgContents = svg.documentElement.innerHTML.toString();
  Object.keys(idMap).forEach((id) => {
    let re = new RegExp(id, 'g');
    svgContents = svgContents.replace(re, idMap[id]);
  });
  svg.documentElement.innerHTML = svgContents;
}

export const convertToDOM = (svgString) => {
  let parser = new DOMParser();
  return parser.parseFromString(svgString, 'image/svg+xml');
}

export const addVectorEffect = (svgString) => {
  let svg = convertToDOM(svgString);
  let idMap = {};
  parseNode(svg.documentElement, idMap);
  replaceIds(svg, idMap);
  console.log(svg.documentElement);
  return svg;
}
