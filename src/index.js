  
module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) {
    return false;
  }
  let open = bracketsConfig.map((pair) => pair[0]);
  let close = bracketsConfig.map((pair) => pair[1]);

  let relevant = bracketsConfig.reduce(
    (acc, [open, close]) => ({ ...acc, [close]: open }),
    {}
  );

  let stack = [];
  for (let char of str) {
    if (char === relevant[char] && stack.includes(relevant[char])) {
      if (relevant[char] !== stack.pop()) return false;
    } else if (open.includes(char)) {
      stack.push(char);
    } else if (close.includes(char) && relevant[char] !== stack.pop()) {
      return false;
    }
  }

  return stack.length === 0;
};
