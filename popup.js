var options = {};

function loadData() {
    chrome.storage.sync.get(InitialData, function(items) {
        options = retrieveValuesFromObject(items);

        refreshEnvList();
        refreshTablesList();
    });
}

function refreshEnvList() {
    var container = document.getElementById('env-container');
    var tmp = '';

    console.log(options.savedEnv);

    for (var j = 0; j < options.envList.length; j++) {
        var url = options.envList[j];

        tmp += '<td><input class="env-radio" type="radio" name="env" id="' + url + '" ' + (url == options.savedEnv ? "checked>" : '>') +
            '<label for="' + url + '">' + url + '</label></td>';
    }

    container.innerHTML = tmp;
}

function refreshTablesList() {
    var tmp = '';

    for (var i = 0; i < options.queryList.length; i++) {
        var element = options.queryList[i];

        tmp += '<input type="radio" name="type" id="' + i + '" ' + (i == options.savedQueryIndex ? 'checked' : '') +
            '><label for="' + i + '">' + element.label + '</label><br>';
    }

    document.getElementById('table-radio-container').innerHTML = tmp;
    var searchText = document.getElementById('search-text');

    //set all to focus the textbox onchange
    var radios = document.getElementsByName('type');
    for (var i = 0, len = radios.length; i < len; i++) {
        radios[i].addEventListener('change', function() {
            searchText.focus();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {

    loadData();

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

        var elementId = document.querySelector('input[name="type"]:checked').id;
        var element = options.queryList[Number(elementId)];
        var mainUrl = document.querySelector('input[name="env"]:checked').id;

        var searchText = document.getElementById('search-text').value.replace(" ", "%20");
        var url = 'https://' + mainUrl + '.service-now.com/' + element.table + "_list.do?sysparm_query=" + element.field.toLowerCase() + element.operator + searchText;

        chrome.tabs.create({ url: url });

        chrome.storage.sync.set({
            savedQueryIndex: elementId,
            savedEnv: mainUrl
        });
    }, false);

    document.getElementById('search-text').focus();
}, false);