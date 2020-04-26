import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import _ from 'lodash';


import apiData from './data/api.json';

import CanvasJSReact from './lib/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

  const chartOptions = {
    theme: "light",
    title: {
      text: "Clicks & Impressions"
    },
    subtitles: [{
      text: "-"
    }],
    toolTip: {
      shared: true
    },
    data: [
    {
      type: "line",
      name: "Clicks",
      axisYIndex: 0,
      showInLegend: true,
      xValueFormatString: "DD MMM YYYY",
      yValueFormatString: "#,##0.##",
      dataPoints: clicksData
    },
    {
      type: "line",
      name: "Impressions",
      axisYIndex: 1,
      axisYType: "secondary",
      showInLegend: true,
      xValueFormatString: "DD MMM YYYY",
      yValueFormatString: "#,##0.##",
      dataPoints: impressionsData
    }
    ]
  };

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
      <Container  fluid>
        <Row>
          <Col>
            <div className="App-header">
              Adverity Advertising Data ETL-V Challenge
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <div className="content bordered padded margined">
              <div className="App-header">
                Filter dimension values
              </div>
              <div>
                <span className="heading-inline">Datasource</span> <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Select zero to N Datasources (zero means all)
                    </Tooltip>
                  }
                ><FontAwesomeIcon icon={faInfoCircle} /></OverlayTrigger>
              </div>
              <div>
                <Select
                  options={datasourceOptions} 
                  value={datasourcesValue} 
                  isMulti={true} 
                  onChange={handleDatasourceChange}
                />
              </div>
              <div>
                <span className="heading-inline">Campaigns</span> <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Select zero to N Campaigns (zero means all)
                    </Tooltip>
                  }
                ><FontAwesomeIcon icon={faInfoCircle} /></OverlayTrigger>
              </div>
              <div>
                <Select
                  options={campaignOptions} 
                  value={campaignsValue}
                  isMulti={true} 
                  onChange={handleCampaignChange}
                />
              </div>
              <div>
                <Button 
                  variant="primary" 
                  onClick={handleApply}
                >Apply</Button>{' '}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      Hit Apply to filter the chart to show a timeseries for both Clicks and Impressions for the given Datasources and Campaigns - logical AND
                    </Tooltip>
                  }
                ><FontAwesomeIcon icon={faInfoCircle} /></OverlayTrigger>
              </div>
            </div>
          </Col>
          <Col sm={9}>
            <div className="content bordered padded margined">
              <CanvasJSChart options = {chartOptions}
                  /* onRef={ref => this.chart = ref} */
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
