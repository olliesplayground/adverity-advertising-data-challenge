This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Adverity Advertising Data ETL-V Challenge - React Solution

### By Ollie Finn

## Description 

This project attempts to answer the technical brief describing the ETL-V Technical Challenge whereby a dataset is provided and an interface is required to aggregate and visualise this data.

A sample data point looks like the following:

```json
{
    "date": "2019-01-31",
    "datasource": "Google Adwords",
    "campaign": "New General Campaign - CAN - Desktop",
    "clicks": 17,
    "impressions": 481
}
```

The solution must provide a method of filtering the data on both the `datasource` and `campaign` fields, and aggregate the `clicks` and `impressions` fields, displaying the results in a chart that shows these two metrics by date.

The solution should be developed in [https://reactjs.org/](React), while also using:

- create-react-app to bootstrap your application  
- a proper design of your components  
- react hooks to manage state and side effects  
- lodash to transform your data  
- an idiomatic functional programming approach with javascript / es6  

## Solution

This solution attempts to keep the interface and architecture as simple as possible, while also making it easy to extend. For the interface, the following have been used:

- [https://react-bootstrap.github.io/](React Bootstrap)
- [https://react-select.com/](React Select)
- [https://fontawesome.com/](Fontawesome)
- [https://canvasjs.com/react-charts/](CanvasJS React)

These were selected to shorten the development time to use pre-built, well-tested frameworks.

#### Note! 
Although the dataset was provided in CSV format, from [http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv](here), for this solution it has been converted to JSON format for easier manipulation and processing.

### Components

Several components have been included in this project to allow for easier development and reuse, these can be found in the `./src/components` directory.

### Data Processing

All data processing is done by a set of functions that can be found in the `./src/lib/helpers.js` file. These functions attempt to closely follow fundamental functional programming practices, in particular, data immutability.

All functions in the `./src/lib/helpers.js` file have accompanying unit tests that can be found in `./src/__tests__/helperTest.js`. These tests can be executed by running the following from the project root:

```
yarn unit
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn unit`

Runs unit tests against the helper function in `./src/lib/helpers.js`
