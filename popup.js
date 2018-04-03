var mainUrl;
var envUrls;

function loadData() {
    chrome.storage.sync.get(InitialData, function(items) {
        mainUrl = items.mainUrlOption;

        envUrls = items.envList.split(',');

        refreshUI();
    });
}

function getMainUrl() {

    mainUrl = document.querySelector('input[name="env"]:checked').id;

    return 'https://' + mainUrl + ".service-now.com";
}

function refreshUI() {
    var container = document.getElementById('env-container');
    var tmp = '';

    for (var j = 0; j < envUrls.length; j++) {
        var url = envUrls[j];

        if (j == 0) {
            tmp += '<input type="radio" name="env" id="' + url + '" checked>' + url + '<br>';
        } else {
            tmp += '<input type="radio" name="env" id="' + url + '">' + url + '<br>';
        }
    }

    container.innerHTML = tmp;
}


document.addEventListener('DOMContentLoaded', function() {

    loadData();

    var queries = [{
        name: "Business Rules",
        table: "sys_script",
        field: "Name",
        operator: "LIKE"
    }]

    var tables = [{
            table: 'sys_script',
            name: 'Business Rules'
        },
        {
            table: 'sys_script_include',
            name: 'Script Includes'
        },
        {
            table: 'sys_ui_page',
            name: 'UI Pages'
        },
        {
            table: 'wot',
            name: 'WOT'
        },
        {
            table: 'user',
            name: 'User'
        }
    ];

    var tmp = '';
    tables.forEach(element => {
        tmp += '<input type="radio" name="type" id="' + element.table + '">' + element.name + '<br>';
    });

    document.getElementById('table-radio-container').innerHTML = tmp;
    document.getElementById('sys_script').setAttribute('checked', 'true');

    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

        var table = document.querySelector('input[name="type"]:checked').id;
        var searchText = document.getElementById('search-text').value.replace(" ", "%20");
        var url = getMainUrl() + '/' + table + "_list.do?sysparm_query=nameLIKE" + searchText + "&sysparm_first_row=1&sysparm_view=&sysparm_choice_query_raw=&sysparm_list_header_search=true";

        //recreate url if wot
        if (table == 'wot') {
            url = getMainUrl() + '/wm_task_list.do?sysparm_query=u_primary_contract!%3DSDU%5Estate!%3D7%5Enumber%3D' + searchText;
        } else if (table == 'user') {
            url = getMainUrl() + '/sys_user_list.do?sysparm_query=nameLIKE' + searchText;
        }

        chrome.tabs.create({ url: url });

    }, false);

}, false);