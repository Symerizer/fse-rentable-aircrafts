chrome.storage.sync.get("userkey", function (data) {
    document.getElementById("userkey").value = data.userkey
})

function saveKey (e) {
    e.preventDefault()
    chrome.storage.sync.set({
        userkey: document.getElementById("userkey").value
    }, function () {
        document.getElementById("status").innerText = "Saved!"
    })
}


document.getElementById("saveBtn").addEventListener('click', saveKey)