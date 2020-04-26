import { 
    getDataFieldValues, 
    prepareSelectOptions, 
    filterDataOnField, 
    groupByField, 
    sumGroupedData, 
    sortByField, 
    arraySlice, 
    applyFiltersToData, 
    getSummedGroups, 
    concatenateGroupedNames
} from '../lib/helpers';


test('getDataFieldValues', () => {
    let testData = [
        {'letter': 'a', 'number': 1},
        {'letter': 'b', 'number': 2}
    ];

    let result = getDataFieldValues(testData, 'letter');

    expect(result).toEqual([ "a", "b" ]);
});

test('prepareSelectOptions', () => {
    let testData = [
        'a', 'b', 'c'
    ];

    let result = prepareSelectOptions(testData);

    expect(result).toEqual([{'value': 'a', 'label': 'a'}, {'value': 'b', 'label': 'b'}, {'value': 'c', 'label': 'c'}]);
});

test('filterDataOnField', () => {
    let testData = [
        {'letter': 'a', 'number': 1},
        {'letter': 'a', 'number': 2},
        {'letter': 'a', 'number': 3},
        {'letter': 'a', 'number': 4},
        {'letter': 'b', 'number': 5},
        {'letter': 'b', 'number': 6},
        {'letter': 'b', 'number': 7},
        {'letter': 'b', 'number': 8}
    ];

    let filters = [
        {'value': 'a'}
    ];

    let result = filterDataOnField(testData, filters, 'letter');

    expect(result.length).toEqual(4);
});

test('groupByField', () => {
    let testData = [
        {'group': 'a', 'number': 1},
        {'group': 'a', 'number': 2},
        {'group': 'b', 'number': 3},
        {'group': 'b', 'number': 4},
        {'group': 'c', 'number': 5}
    ];

    let result = groupByField(testData, 'group');

    expect(result['a'][0]).toEqual(testData[0]);
    expect(result['b'][0]).toEqual(testData[2]);
    expect(result['c'][0]).toEqual(testData[4]);
});

test('sumGroupedData', () => {
    let testData = {
        '2020-04-24': [
            {'group': 'a', 'number': 1},
            {'group': 'a', 'number': 2},
            {'group': 'b', 'number': 3},
            {'group': 'b', 'number': 4},
            {'group': 'c', 'number': 5}
        ],
        '2020-04-25': [
            {'group': 'a', 'number': 6},
            {'group': 'a', 'number': 7},
            {'group': 'b', 'number': 8},
            {'group': 'b', 'number': 9},
            {'group': 'c', 'number': 10}
        ]
    };

    let result = sumGroupedData(testData, 'number');

    expect(result[0]['y']).toEqual(15);
    expect(result[1]['y']).toEqual(40);
});

test('sortByField', () => {
    let testData = [
        {'group': 'a', 'number': 1},
        {'group': 'b', 'number': 5},
        {'group': 'c', 'number': 2},
        {'group': 'd', 'number': 4},
        {'group': 'e', 'number': 3}
    ];

    let result = sortByField(testData, 'number');

    expect(result[0]['group']).toEqual('a');
    expect(result[1]['group']).toEqual('c');
    expect(result[2]['group']).toEqual('e');
});

test('arraySlice', () => {
    let testData1 = [
        'a', 'b', 'c', 'd', 'e'
    ];

    let result1 = arraySlice(testData1, 1, 2);

    expect(result1).toEqual(['b']);

    let testData2 = [];

    let result2 = arraySlice(testData2, 1, 2);

    expect(result2).toEqual(null);
});

test('applyFiltersToData', () => {
    let testData = [
        {'letter': 'a', 'number': 1},
        {'letter': 'a', 'number': 2},
        {'letter': 'a', 'number': 3},
        {'letter': 'b', 'number': 4},
        {'letter': 'b', 'number': 5},
        {'letter': 'b', 'number': 6},
        {'letter': 'c', 'number': 7},
        {'letter': 'c', 'number': 8},
        {'letter': 'c', 'number': 9},
        {'letter': 'd', 'number': 10}
    ];

    let filters = [
        {filters: [{'value': 'b'}, {'value': 'd'}], field: 'letter'},
        {filters: [{'value': 6}], field: 'number'}
    ];

    let result = applyFiltersToData(testData, filters);

    expect(result[0]).toEqual(testData[5]);
});

test('getSummedGroups', () => {
    
    let testData = {
        '2020-04-24': [
            { 'group': 'a', 'number': 1, 'value': 10 },
            { 'group': 'a', 'number': 2, 'value': 9 },
            { 'group': 'a', 'number': 3, 'value': 8 },
            { 'group': 'a', 'number': 4, 'value': 7 },
            { 'group': 'a', 'number': 5, 'value': 6 }
        ],
        '2020-04-25': [
            { 'group': 'b', 'number': 6, 'value': 5 },
            { 'group': 'b', 'number': 7, 'value': 4 },
            { 'group': 'b', 'number': 8, 'value': 3 },
            { 'group': 'b', 'number': 9, 'value': 2 },
            { 'group': 'b', 'number': 10, 'value': 1 }
        ]
    };

    let [number, value] = getSummedGroups(testData, ['number', 'value'], []);

    expect(number[0]['y']).toEqual(15);
    expect(value[0]['y']).toEqual(40);
});

test('concatenateGroupedNames', () => {
    let testData = {
        'group1': [{'value': 'a'}, {'value': 'b'}], 
        'group2': [{'value': 'z'}]
    };

    let result = concatenateGroupedNames(testData);

    expect(result).toEqual('group1: a, b group2: z');
});