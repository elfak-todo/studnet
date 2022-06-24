export const newLineText = (text) => {
  return text.split("\n").map((str, i) => (
    <div key={i} className="m-0">
      {str}
    </div>
  ));
};
