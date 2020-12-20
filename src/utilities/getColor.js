const colors = [
  "#f50",
  "#2db7f5",
  "#87d068",
  "#108ee9",
  "#673AB7",
  "#F9A825",
  "#BA68C8",
];

const getColor = (text) => {
  let value = 0;
  for (let c of text) {
    value += c.charCodeAt();
  }
  value %= colors.length;
  return colors[value];
};

export default getColor;
