// const { generateKey, encrypt } = require("crypto");

const { collapseTextChangeRangesAcrossMultipleVersions } = require("typescript")

console.log("JS 2 file loaded")
var _key = "" // TODO: Remove this from the client side
var _encryptedData = ""
var _hexEncryptedData = ""
var _iv = ""
var _name = "AES-GCM"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function bytesToASCIIString(bytes) {
    return String.fromCharCode.apply(null, new Uint8Array(bytes));
}

function bytesToHexString(bytes) {
    if (!bytes)
        return null;

    bytes = new Uint8Array(bytes);
    var hexBytes = [];

    for (var i = 0; i < bytes.length; ++i) {
        var byteString = bytes[i].toString(16);
        if (byteString.length < 2)
            byteString = "0" + byteString;
        hexBytes.push(byteString);
    }

    return hexBytes.join("");
}


function hexStringToUint8Array(hexString) {
    if (hexString.length % 2 != 0)
        throw "Invalid hexString";
    var arrayBuffer = new Uint8Array(hexString.length / 2);

    for (var i = 0; i < hexString.length; i += 2) {
        var byteValue = parseInt(hexString.substr(i, 2), 16);
        if (byteValue == NaN)
            throw "Invalid hexString";
        arrayBuffer[i / 2] = byteValue;
    }

    return arrayBuffer;
}

function asciiToUint8Array(str) {
    var chars = [];
    for (var i = 0; i < str.length; ++i)
        chars.push(str.charCodeAt(i));
    return new Uint8Array(chars);
}

function genKey() {
    window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256, //can be  128, 192, or 256
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
    .then(function(key){
        //returns a key object
        console.log(key);
        _key = key
    })
    .catch(function(err){
        console.error(err);
    });
    console.log("sleeping")

    setTimeout(() => {  console.log("Done sleeping!"); }, 6000);

    console.log("2")

}

function showKey() {
    
    window.crypto.subtle.exportKey("jwk", _key)
    .then(function(keydata){
        //returns the exported key data
        console.log(keydata);
        document.getElementById("key").innerText = keydata.k
    })
    .catch(function(err){
        console.error(err);
    });
    
}

function encryptt() {
    var textData = "hello"
    var enc = new TextEncoder(); // always utf-8
    var dec = new TextDecoder("utf-8");

    console.log(enc.encode(textData));
    // var data = enc.encode(textData)
    var data = asciiToUint8Array(textData)

    if (_iv === "" || _iv == null)
        _iv = window.crypto.getRandomValues(new Uint8Array(12))
    console.log(`iv: ${_iv}`)

    window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: _iv,

            //Additional authentication data (optional)
            // additionalData: ArrayBuffer,

            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        _key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    )
        .then(function (encrypted) {
            //returns an ArrayBuffer containing the encrypted data
            console.log("Enncrypted text")
            console.log(encrypted)
            console.log("toString")
            console.log( bytesToHexString(encrypted));

            _encryptedData = bytesToHexString(encrypted)
            _hexEncryptedData = bytesToHexString(encrypted)

            document.getElementById("theData").innerText = bytesToHexString(encrypted)

        })
        .catch(function (err) {
            console.error(err);
        });
}

function decryptt() {
    console.log(`iv: ${_iv}`)
    console.log("array buffer")
    console.log(_encryptedData)
    var payload = hexStringToUint8Array(_hexEncryptedData)
    

    window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: _iv, //The initialization vector you used to encrypt
            // additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
            tagLength: 128, //The tagLength you used to encrypt (if any)
        },
        _key, //from generateKey or importKey above
        payload //ArrayBuffer of the data
    )
    //returns an ArrayBuffer containing the decrypted data
    .then(function(decrypted){
        console.log(decrypted)
        console.log(bytesToASCIIString(decrypted));

        
        document.getElementById("theDecryptData").innerText = bytesToASCIIString(decrypted)
        // document.getElementById("theDecryptData").innerText = dec.decode(encrypted)
        
    })
    .catch(function(err){
        console.error(err);
    });
    
}

/* Event Listeners */
// document.getElementById("keyGen").addEventListener("click", genKey);


