const checkType = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}px`;
};

export default function marginAndPaddingClassifiers(margin) {
  let parsedValue = '';
  if (margin.length === 1) {
    parsedValue = checkType(margin[0]);
  }
  if (margin.length === 2) {
    parsedValue = `${checkType(margin[0])} ${checkType(margin[1])}`;
  }
  if (margin.length === 3) {
    parsedValue = `${checkType(margin[0])} ${checkType(margin[1])} ${checkType(margin[3])}`;
  }
  if (margin.length === 4) {
    parsedValue = `${checkType(margin[0])} ${checkType(margin[1])} ${checkType(margin[2])} ${checkType(margin[3])}`;
  }
  return parsedValue;
}
