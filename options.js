// Saves options to chrome.storage.sync.
function save_options() {
    var url = document.getElementById('main-url').value;

    chrome.storage.sync.set(InitialData, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    console.log("restore_options");
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(InitialData, function(items) {
        document.getElementById('main-url').value = items.mainUrlOption;
    });
    document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', restore_options);