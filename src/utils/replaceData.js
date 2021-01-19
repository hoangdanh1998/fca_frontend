export default function replaceData(data, from, to) {
  const cutedElement = data.splice(from, 1)[0];
  data.splice(to, 0, cutedElement);
}
