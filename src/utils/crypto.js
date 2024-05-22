import CryptoJS from 'crypto-js'

export async function encryptRSA(publicKeyPem, data) {
    const publicKey = await importPublicKey(publicKeyPem);
    const encoded = new TextEncoder().encode(data);

    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encoded
    );

    return new Uint8Array(encrypted);
}

async function importPublicKey(pem) {
    const pemContents = pem
    //  pem.replace(/(-----(BEGIN|END) (RSA )?PUBLIC KEY-----|[\n\r])/g, '');

    const binaryDer = window.atob(pemContents);
    if (window.crypto && window.crypto.subtle) { 
        return window.crypto.subtle.importKey(
            "spki",
            str2ab(binaryDer),
            {
                name: "RSA-OAEP",
                hash: {name: "SHA-256"},
            },
            true,
            ["encrypt"]
        );
    } else {
        console.error("Web Cryptography API not supported.");
    }
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export function uint8ArrayToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function decryptAES(encryptedData, secretKey) {
    // Chuyển đổi dữ liệu đã mã hóa từ Base64 sang WordArray của CryptoJS
    const encryptedWA = CryptoJS.enc.Base64.parse(encryptedData);
    
    // Tạo một key từ secretKey
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    
    // IV có kích thước bằng với kích thước khối (16 byte) và được lưu ở đầu dữ liệu mã hóa
    // Chúng ta sẽ tách IV từ dữ liệu mã hóa
    const iv = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(0, 4), 16);
    
    // Dữ liệu mã hóa thực sự bắt đầu sau IV
    const ciphertext = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(4), encryptedWA.sigBytes - 16);
    
    // Thực hiện giải mã sử dụng chế độ CFB và không padding
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.NoPadding
        }
    );
    
    // Chuyển kết quả giải mã từ WordArray sang chuỗi Utf8
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encryptAES(text, secretKey) {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.lib.WordArray.random(128 / 8); // Tạo IV ngẫu nhiên

    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });

    // Kết quả trả về từ CryptoJS.AES.encrypt là một đối tượng chứa iv, salt và ciphertext.
    // Chúng ta cần chuyển đổi cả iv và ciphertext sang dạng chuỗi để có thể ghép chúng lại với nhau.
    // Để tránh lỗi, chúng ta nên kiểm tra cả hai phần iv và ciphertext có tồn tại trước khi thực hiện bất kỳ thao tác nào.
    const ivHex = iv.toString(CryptoJS.enc.Hex);
    const cipherTextHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    // Ghép IV và ciphertext, sau đó chuyển kết quả thành Base64
    const combinedCipher = ivHex + cipherTextHex;
    return CryptoJS.enc.Hex.parse(combinedCipher).toString(CryptoJS.enc.Base64);
}