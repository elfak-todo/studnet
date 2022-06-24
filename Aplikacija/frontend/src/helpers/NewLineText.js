export const newLineText = (props) => {
    const text = props;
    return text.split('\n').map(str => <div>{str}</div>); 
}