export const slicedString = (str, index, number) => {
    if(!str) return "";
    let dots = '';
    let chunks = str.split(' ');
    if(chunks.length > number){
        chunks = chunks.slice(index, number);
        dots = '.. .';
    }
    str = chunks.join(' ') + dots;
    return str;
}