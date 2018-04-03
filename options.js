var queryCount = 1;

// Saves options to chrome.storage.sync.
function save_options() {

    var envList = [
        document.getElementById('env-url-input1').value,
        document.getElementById('env-url-input2').value,
        document.getElementById('env-url-input3').value
    ]

    envList = envList.filter(x => { return x != '' });

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

    var envList = [];

    chrome.storage.sync.get(InitialData, function(items) {

        envList = items.envList.split(',');

        for (var i = 0; i < envList.length; i++) {
            document.getElementById('env-url-input' + (i + 1)).value = envList[i];
        }
    });
    document.getElementById('save-options').addEventListener('click', save_options);

    refreshTables();

    document.getElementById('add-query').addEventListener('click', function() {
        queryCount++;
        addNewQuery();
    });
}

function refreshTables() {
    var tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    for (var i = 0; i < queryCount; i++) {
        tableContainer.innerHTML +=
            '<input type="text" placeholder="Label"> ' +
            '<input type="text" placeholder="Table Name"> ' +
            '<input type="text" placeholder="Field Name">' +
            getOperatorSelectBox(i) + '<br>';
    }
}

function addNewQuery() {
    var tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML +=
        '<input type="text" placeholder="Label"> ' +
        '<input type="text" placeholder="Table Name"> ' +
        '<input type="text" placeholder="Field Name">' +
        getOperatorSelectBox(queryCount) + '<br>';
}

function getOperatorSelectBox(id) {
    return '<select id="' + id + '"><option value="like">LIKE</option><option value="equal">=</option></select>';
}

document.addEventListener('DOMContentLoaded', restore_options);