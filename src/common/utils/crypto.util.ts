import * as CryptoJS from "crypto-js";

export class CryptoUtil {
    private static secretKey: CryptoJS.lib.WordArray;
    private static iv: CryptoJS.lib.WordArray;

    private static loadKeys() {
        if (!this.secretKey || !this.iv) {
            const key = process.env.CRYPTO_KEY;
            const iv  = process.env.CRYPTO_IV;

            if (!key) throw new Error("CRYPTO_KEY no definida en variables de entorno");
            if (!iv) throw new Error("CRYPTO_IV no definida en variables de entorno");

            this.secretKey = CryptoJS.enc.Utf8.parse(key);
            this.iv        = CryptoJS.enc.Utf8.parse(iv);
        }
    }

    static encrypt(text: string): string {
        this.loadKeys();

        const encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(text),
            this.secretKey,
            {
                iv      : this.iv,
                mode    : CryptoJS.mode.CBC,
                padding : CryptoJS.pad.Pkcs7,
            }
        );

        return encrypted.toString();
    }

    static decrypt(encryptedText: string): string {
        this.loadKeys();

        const decrypted = CryptoJS.AES.decrypt(
            encryptedText,
            this.secretKey,
            {
                iv      : this.iv,
                mode    : CryptoJS.mode.CBC,
                padding : CryptoJS.pad.Pkcs7,
            }
        );

        return CryptoJS.enc.Utf8.stringify(decrypted);
    }
}
