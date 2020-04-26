import _ from 'lodash';

export const getDataFieldValues = (data, field) => {
    return [...new Set(data.map((item) => {
        return item[field];
    }))];
};

export const prepareSelectOptions = data => {
    return _.map(data, (item) => {
        return {value: item, label: item};
    });
};

export const filterDataOnField = (data, filters, field) => {
    if (!filters || filters.length === 0) {
        return data;
    }

    let results = [];
    _.forEach(filters, (filter) => {
        results = [...results, _.filter(data, {[field]: filter.value})];
    });
    return _.flattenDeep(results);
};

export const groupByField = (data, field) => {
    return _.groupBy(data, field);
};

export const sumGroupedData = (data, field) => {
    return _.map(data, (item, group) => {
        return {
        'x': new Date(group),
        'y': _.sumBy(item, field)
        };
    });
};

export const sortByField = (data, field) => {
    return _.sortBy(data, [field]);
};

export const arraySlice = (array, start, end) => {
    let length = array.length;
    return length === 0 ? null : _.slice(array, start, (end ?? length));
};

export const applyFiltersToData = (data, filters) => {
    let filter = _.nth(filters);

    if (!filter) {
        return data;
    }

    let filteredData = filterDataOnField(
        data, 
        filter.filters, 
        filter.field
    );

    return applyFiltersToData(filteredData, arraySlice(filters, 1));
};

export const getSummedGroups = (data, groups, accumulator) => {
    let group = _.nth(groups);

    if (!group) {
        return accumulator;
    }
    
    accumulator = [...accumulator, sumGroupedData(data, group)];

    return getSummedGroups(data, arraySlice(groups, 1), accumulator);
};

export const concatenateGroupedNames = (groups) => {
    return _.transform(groups, (result, values, group) => {
        values = !values || values.length === 0 ? [{value: 'All'}] : values;
        let v = _.reduce(values, (accumulator, item) => {
            return [...accumulator,  item.value];
        }, []);
        console.log('result', result, 'v', v, 'group', group);
        result.push(group + ': ' + _.join(v, ', '));
    }, []).join(' ');
};