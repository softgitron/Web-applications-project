import { Remarkable } from "remarkable";

const md = new Remarkable();
export default function getRawMarkup(text) {
    // https://reactjs.org/
    return { __html: md.render(text) };
}
