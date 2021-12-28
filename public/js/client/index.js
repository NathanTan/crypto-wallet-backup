// const { generateKey, encrypt } = require("crypto");

console.log("JS 2 file loaded")
var _key = "" // TODO: Remove this from the client side
var _encryptedData = ""
var _iv = ""

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    var data = new Uint8Array(textData)

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
            console.log(encrypted)
            console.log(new Uint8Array(encrypted));

            _encryptedData =encrypted

            document.getElementById("theData").innerText = dec.decode(encrypted)

        })
        .catch(function (err) {
            console.error(err);
        });
}

function decryptt() {
    console.log(`iv: ${_iv}`)
    console.log("array buffer")
    console.log(_encryptedData)
    window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: _iv, //The initialization vector you used to encrypt
            // additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
            tagLength: 128, //The tagLength you used to encrypt (if any)
        },
        _key, //from generateKey or importKey above
        _encryptedData //ArrayBuffer of the data
    )
    //returns an ArrayBuffer containing the decrypted data
    .then(function(decrypted){
        console.log(decrypted)
        console.log(new Uint8Array(decrypted));

        
        // document.getElementById("theDecryptData").innerText = dec.decode(encrypted)
        // document.getElementById("theDecryptData").innerText = dec.decode(encrypted)
        
    })
    .catch(function(err){
        console.error(err);
    });
    
}

/* Event Listeners */
// document.getElementById("keyGen").addEventListener("click", genKey);


