sap.ui.define([],
    function () {
        "use strict";
        const secret = "1fr78H2x10Iqhn3mO89L";
        return {

            encrypt: function (clear) {
                let cipher = CryptoJS.AES.encrypt(clear, secret);
                cipher = cipher.toString();
                return cipher;
            },

            decrypt: function (cipher) {
                let decipher = CryptoJS.AES.decrypt(cipher, secret);
                decipher = decipher.toString(CryptoJS.enc.Utf8);
                return decipher;
            },
        }
    })