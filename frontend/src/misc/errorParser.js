export default function parseErrors(payload) {
    let newMessage = payload.message.errors;
    if (typeof payload.message.message !== "undefined") {
        newMessage = payload.message.message;
    } else if (typeof newMessage === "undefined") {
        newMessage = "";
    } else if (typeof newMessage !== "string") {
        if (newMessage.length !== 0 && newMessage.length !== undefined) {
            newMessage = newMessage[0].msg + " " + newMessage[0].param;
        } else {
            newMessage = "Unknown error occurred.";
        }
    }
    return newMessage;
}
