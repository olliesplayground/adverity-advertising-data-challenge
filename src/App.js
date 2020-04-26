import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _ from 'lodash';

import apiData from './data/api.json';
import Chart from './components/Chart';
import MultiSelect from './components/MultiSelect';
import PrimaryButton from './components/PrimaryButton';
import HeaderText from './components/HeaderText';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function getDataFieldValues(data, field) {
  return [...new Set(data.map((item) => {
    return item[field];
  }))];
}

function prepareSelectOptions(data) {
  return data.map((item) => {
    return {value: item, label: item};
  });
}

function filterDataOnField(data, filters, field) {
  if (!filters || filters.length === 0) {
    return data;
  }

  let results = [];
  _.forEach(filters, (filter) => {
    results = [...results, _.filter(data, {[field]: filter.value})];
  });
  return _.flattenDeep(results);
}

function groupByField(data, field) {
  return _.groupBy(data, field);
  //return _.mapValues(_.groupBy(data, field), clist => clist.map(item => _.omit(item, field)));
}

function sumGroupedData(data, field) {
  return _.map(data, (item, group) => {
    return {
      'x': new Date(group),
      'y': _.sumBy(item, field)
    };
  });
}

function sortByField(data, field) {
  return _.sortBy(data, [field]);
}

function getClickAndImpressionData(data, datasourceFilters, campaignFilters) {
  let datasourceFilteredData = filterDataOnField(
    data, 
    datasourceFilters, 
    'datasource'
  );

  let campaignFilteredData = filterDataOnField(
    datasourceFilteredData, 
    campaignFilters, 
    'campaign'
  );

  let groupedData = groupByField(campaignFilteredData, 'date');

  let clicksData = sumGroupedData(groupedData, 'clicks');
  let impressionsData = sumGroupedData(groupedData, 'impressions');

  return {clicksData: sortByField(clicksData, 'x'), impressionsData: sortByField(impressionsData, 'x')};
}

function App() {
  let clickAndImpressionData = getClickAndImpressionData(apiData, [], []);

  let datasources = getDataFieldValues(apiData, 'datasource');
  let campaigns = getDataFieldValues(apiData, 'campaign');

  const [datasourceOptions, setDatasourceOptions] = useState(prepareSelectOptions(datasources));
  const [datasourcesValue, setDatasourcesValue] = useState(null);
  const [campaignOptions, setCampaignOptions] = useState(prepareSelectOptions(campaigns));
  const [campaignsValue, setCampaignsValue] = useState(null);

  const [clicksData, setClicksData] = useState(clickAndImpressionData.clicksData);
  const [impressionsData, setImpressionsData] = useState(clickAndImpressionData.impressionsData);

  function handleDatasourceChange(selectedOption) {
    setDatasourcesValue(selectedOption);
  }

  function handleCampaignChange(selectedOption) {
    setCampaignsValue(selectedOption);
  }

  function handleApply(e) {
    let clickAndImpressionData = getClickAndImpressionData(apiData, datasourcesValue, campaignsValue);
    
    setClicksData(clickAndImpressionData.clicksData);
    setImpressionsData(clickAndImpressionData.impressionsData);
  }

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <HeaderText text="Adverity Advertising Data ETL-V Challenge" />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <div className="content bordered padded margined">
              <HeaderText text="Filter dimension values" />
              <MultiSelect 
                  name="Datasource" 
                  tooltip={true} 
                  tooltipText="Select zero to N Datasources (zero means all)"
                  options={datasourceOptions} 
                  value={datasourcesValue} 
                  onChangeHandler={handleDatasourceChange}
              />
              <MultiSelect 
                  name="Campaigns" 
                  tooltip={true} 
                  tooltipText="Select zero to N Campaigns (zero means all)"
                  options={campaignOptions} 
                  value={campaignsValue} 
                  onChangeHandler={handleCampaignChange}
              />
              <PrimaryButton 
                text="Apply" 
                tooltip={true} 
                tooltipText="Hit Apply to filter the chart to show a timeseries for both Clicks and Impressions for the given Datasources and Campaigns - logical AND"
                onClickHandler={handleApply}
              />
            </div>
          </Col>
          <Col sm={9}>
            <div className="content bordered padded margined">
              <Chart 
                name="Clicks & Impressions" 
                clicksData={clicksData}
                impressionsData={impressionsData}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
