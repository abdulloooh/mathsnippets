const expression = document.getElementById("expression");
const pretty = document.getElementById("pretty");
const result = document.getElementById("result");
let parenthesis = "keep";
let implicit = "hide";

// initialize with an example expression
expression.value = `
# You can add comment by placing asterisk in front of your input
#watch the examples below
#this is the current
I = 3ampere
#this is  the voltage
V= 5volts
#now we calculate the power
P = I * V
#energy
t = 3 s
E = P * t
`;
pretty.innerHTML =
  "$$" +
  math.parse(expression.value).toTex({ parenthesis: parenthesis }) +
  "$$";
result.innerHTML = math.format(math.evaluate(expression.value));

expression.oninput = function () {
  let parsed = null;

  try {
    parsed = math.parse(expression.value); // parse the expression

    result.innerHTML = math.format(parsed.compile().evaluate()); // evaluate the result of the expression
  } catch (error) {
    result.innerHTML =
      '<span style="color: red;">' + error.toString() + "</span>";
  }
};
