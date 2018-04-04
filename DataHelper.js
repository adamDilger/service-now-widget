var InitialData = {
    envList: 'downerdev1',
    queryList: JSON.stringify({list: [
        {
            label: "Business Rule",
            table: "sys_script",
            field: "Name",
            operator: "like"
        }
    ]})
}

function getDataObject(envArray, queryArray) {
    return {
        queryList: JSON.stringify({list: queryArray}),
        envList: envArray.join()
    };
}

function retrieveValuesFromObject(items) {
    return {
        queries: JSON.parse(items.queryList).list,
        envList: items.envList.split(',')
    };
}