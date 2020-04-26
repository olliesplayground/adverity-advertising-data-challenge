let apiData = require('./data/api2.json');
let fs = require('fs');

let _ = require('lodash');
// import filter from 'lodash/filter'
// import forEach  from 'lodash/forEach'
// import map from 'lodash/map'
// import groupBy from 'lodash/groupBy'
// import pick from 'lodash/pick'
// import sumBy from 'lodash/sumBy'

function groupByField(data, field) {
  return _.groupBy(data, field);
}

function sumGroupedData(data, field) {
  return _.map(data, (item, group) => {
    return {
      'x': new Date(group),
      'y': _.sumBy(item, field)
    };
  });
}

var groupedData = groupByField(apiData, 'date');

let clicksData = sumGroupedData(groupedData, 'clicks');
// let impressionsData = sumGroupedData(groupedData, 'impressions');

console.log(clicksData)
// console.log(impressionsData)

// const ans = _(apiData)
//   .groupBy('date')
//   .map((group, id) => ({
//     group: new Date(id),
//     clicks: _.sumBy(group, 'clicks'),
//     impressions: _.sumBy(group, 'impressions')
//   }))
//   .value();

// console.log(ans)