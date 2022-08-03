const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 
const initVectorString = process.env.IV; 
const SecuritykeyString = process.env.SECURITY_KEY;
const initVector = Buffer.from(initVectorString, "hex");  
const Securitykey = Buffer.from(SecuritykeyString, "hex");

module.exports = {
    encrypt: function(text) {
        const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
        let encryptedData = cipher.update(text, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    },
    decrypt: function(text) {
        const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
        let decryptedData = decipher.update(text, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    },
};