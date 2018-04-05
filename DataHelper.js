var InitialData = {
    envList: 'exampledev1',
    queryList: JSON.stringify({
        list: [{
            label: "Business Rule",
            table: "sys_script",
            field: "Name",
            operator: "LIKE"
        }]
    }),
    savedEnv: 'exampledev1',
    savedQueryIndex: 0
}

function getDataObject(envArray, queryArray) {
    return {
        queryList: JSON.stringify({ list: queryArray }),
        envList: envArray.join(),
        savedEnv: envArray[0]
    };
}

function retrieveValuesFromObject(items) {
    return {
        queryList: JSON.parse(items.queryList).list,
        envList: items.envList.split(','),
        savedEnv: items.savedEnv,
        savedQueryIndex: items.savedQueryIndex
    };
}