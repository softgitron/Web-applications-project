const parser = new DOMParser();

export default function clean(object) {
    // Cleanup escape characters
    // https://stackoverflow.com/questions/3700326/decode-amp-back-to-in-javascript
    // https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
    object.map(post => {
        Object.keys(post).map(key => {
            if (post[key] && typeof post[key] === "string") {
                post[key] = cleanString(post[key]);
            }
            return key;
        });
        return post;
    });
    return object;
}

export function cleanString(string) {
    return parser.parseFromString("<!doctype html><body>" + string, "text/html").body.textContent;
}
