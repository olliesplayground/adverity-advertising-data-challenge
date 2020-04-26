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