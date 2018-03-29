// Saves options to chrome.storage.sync.
function save_options() {
    var envList = [
        document.getElementById('env-url-input1').value,
        document.getElementById('env-url-input2').value,
        document.getElementById('env-url-input3').value
    ]

    envList = envList.filter(x => { x == false });

    chrome.storage.sync.set({
        envList: envList.join()
    }, function() {
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
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(InitialData, function(items) {
        document.getElementById('main-url').value = items.mainUrlOption;
    });
    document.getElementById('save').addEventListener('click', save_options);
    document.getElementById('new-environment').addEventListener('click', createNewEnvironmentUrl);
}

function saveNewUrl() {
    var container = document.getElementById('new-env-url');
    var name = document.getElementById('env-name-input').value;
    var url = document.getElementById('env-url-input').value;

    chrome.storage.sync.set({
        envArray: JSON.stringify(envArray || [])
    }, function() {
        // Update status to let user know options were saved.
        status.textContent = '';
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            container.innerHTML = '';
        }, 1000);
    });
}

function refreshEnviromentUrls() {
    chrome.storage.sync.get(InitialData, function(items) {
        var tmp = '';

        items.envArray.forEach(element => {

        });
    });
}

document.addEventListener('DOMContentLoaded', restore_options);