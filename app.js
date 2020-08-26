const expression = document.getElementById("expression");
const pretty = document.getElementById("pretty");
const result = document.getElementById("result");
let parenthesis = "keep";
let implicit = "hide";

// initialize with an example expression

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

  try {
    const latex = parsed
      ? parsed.toTex({ parenthesis: parenthesis, implicit: implicit })
      : ""; // export the expression to LaTeX

    // display and re-render the expression
    const elem = MathJax.Hub.getAllJax("pretty")[0];
    MathJax.Hub.Queue(["Text", elem, latex]);
  } catch (err) {}
};
