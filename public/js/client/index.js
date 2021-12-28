const { generateKey, encrypt } = require("crypto");

console.log("JS 2 file loaded")


function genKey() {
    window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256, //can be  128, 192, or 256
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
    .then(function(key){
        //returns a key object
        console.log(key);
    })
    .catch(function(err){
        console.error(err);
    });
    
}

function encrypt() {
    var data = "hello"

    window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: window.crypto.getRandomValues(new Uint8Array(12)),

            //Additional authentication data (optional)
            additionalData: ArrayBuffer,

            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    )
        .then(function (encrypted) {
            //returns an ArrayBuffer containing the encrypted data
            console.log(new Uint8Array(encrypted));
        })
        .catch(function (err) {
            console.error(err);
        });
}


/* Event Listeners */
// document.getElementById("keyGen").addEventListener("click", genKey);


