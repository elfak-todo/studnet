export const newLineText = (text) => {
  return text.split("\n").map((str, i) => (
    <p key={i} className="m-0">
      {str}
    </p>
  ));
};
