var queryCount = 0;
var queries = [];

// Saves options to chrome.storage.sync.
function save_options() {

    var envList = [
        document.getElementById('env-url-input1').value,
        document.getElementById('env-url-input2').value,
        document.getElementById('env-url-input3').value
    ]

    var queryLabels = document.querySelectorAll('input[name="label"]');
    var queryTables = document.querySelectorAll('input[name="table"]');
    var queryFields = document.querySelectorAll('input[name="field"]');
    var queryOperators = document.querySelectorAll('select[name="operator"]');
    queries = [];

    for (var i = 0; i < queryTables.length; i++) {
        var tmp = {
            label: queryLabels[i].value,
            table: queryTables[i].value,
            field:  queryFields[i].value,
            operator: queryOperators[i].value
        };
        
        queries.push(tmp);
    }

    envList = envList.filter(x => { return x != '' });

    chrome.storage.sync.set({
        queryList: {list: JSON.stringify(queries)},
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

        queries = JSON.parse(items.queryList.list);
        queryCount = queries.length;
        envList = items.envList.split(',');

        for (var i = 0; i < envList.length; i++) {
            document.getElementById('env-url-input' + (i + 1)).value = envList[i];
        }
    });
    document.getElementById('save-options').addEventListener('click', save_options);

    refreshTables();
}

function refreshTables() {
    var tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    for (var i = 0; i < queryCount; i++) {
        tableContainer.innerHTML += 
            '<input type="text" name="label" placeholder="Label" id="label'+i+'">'+
            '<input type="text" name="table" placeholder="Table Name" id="table'+i+'">'+
            '<input type="text" name="field" placeholder="Field Name" id="field'+i+'">' +
            getOperatorSelectBox(i) + ((i!=queryCount-1) ? '<br>' : '');
    }

    tableContainer.innerHTML += '<input id="add-query" type="button" value="+">';

    document.getElementById('add-query').addEventListener('click', function() {
        queryCount++;
        refreshTables();
    });
}

function getOperatorSelectBox(id) {
    return '<select name="operator" id="property'+id+'"><option value="like">LIKE</option><option value="equal">=</option></select>';
}

document.addEventListener('DOMContentLoaded', restore_options);