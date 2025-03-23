export default function encodeToBase64(text: string) {
    // Use TextEncoder to get UTF-8 bytes
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(text);

    // Convert the byte array into a binary string
    let binaryString = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
        binaryString += String.fromCharCode(utf8Bytes[i]);
    }

    // Encode the binary string to Base64
    return btoa(binaryString);
}