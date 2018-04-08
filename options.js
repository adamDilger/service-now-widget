var statusHeader;
var queryContainer;
var addQueryBtn;

var queryCount = 0;
var queries = [];
var envList = [];
var hasNewQuery = false;

// Saves options to chrome.storage.sync.
function save_options() {

    var envList = [
        document.getElementById('env-url-input1').value,
        document.getElementById('env-url-input2').value,
        document.getElementById('env-url-input3').value,
        document.getElementById('env-url-input4').value,
        document.getElementById('env-url-input5').value,
        document.getElementById('env-url-input6').value
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
            field: queryFields[i].value,
            operator: queryOperators[i].value
        };

        queries.push(tmp);
    }

    queries = queries.filter(item => {
        return (item.field != '' && item.label != '' && item.operator != '' && item.table != '');
    });

    envList = envList.filter(x => { return x != '' });

    chrome.storage.sync.set(getDataObject(envList, queries),
        function() {
            statusHeader.textContent = 'Options saved.';
            setTimeout(function() {
                statusHeader.textContent = '';
            }, 1000);

            queryContainer.innerHTML = '';
            addQueryBtn.disabled = false;
            hasNewQuery = false;
            refreshTables();
        });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

    chrome.storage.sync.get(InitialData, function(items) {

        var tmp = retrieveValuesFromObject(items);
        queries = tmp.queryList;
        queryCount = queries.length;
        envList = tmp.envList;

        for (var i = 0; i < envList.length; i++) {
            document.getElementById('env-url-input' + (i + 1)).value = envList[i];
        }

        refreshTables();
    });

    addQueryBtn = document.getElementById('add-query');
    statusHeader = document.getElementById('status');
    queryContainer = document.getElementById('query-container');

    document.getElementById('save-options').addEventListener('click', save_options);
    addQueryBtn.addEventListener('click', function() {
        queryCount++;
        addQuery();
    });

}

function refreshTables() {
    var tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    for (var i = 0; i < queryCount; i++) {

        tableContainer.innerHTML +=
            '<input type="text" name="label" placeholder="Label" id="label' + i + '" value="' + queries[i].label + '">' +
            '<input type="text" name="table" placeholder="Table Name" id="table' + i + '" value="' + queries[i].table + '">' +
            '<input type="text" name="field" placeholder="Field Name" id="field' + i + '" value="' + queries[i].field + '">' +
            getOperatorSelectBox(i) + ((i != queryCount - 1) ? '<br>' : '');
    }
}

function addQuery() {
    if (!hasNewQuery) {
        var i = queryCount - 1;
        queryContainer.innerHTML +=
            '<input type="text" name="label" placeholder="Label" id="label' + i + '">' +
            '<input type="text" name="table" placeholder="Table Name" id="table' + i + '">' +
            '<input type="text" name="field" placeholder="Field Name" id="field' + i + '">' +
            getOperatorSelectBox(i) + ((i != queryCount - 1) ? '<br>' : '');

        addQueryBtn.disabled = true;
        hasNewQuery = true;
    }
}

function getOperatorSelectBox(id) {
    return '<select name="operator" id="property' + id + '"><option value="LIKE">LIKE</option><option value="equal">=</option></select>';
}

document.addEventListener('DOMContentLoaded', restore_options);