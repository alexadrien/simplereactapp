import React, {Component} from 'react';
import './App.css';

import axios from 'axios';

//Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const currenciesArray = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR"
];

const currencies = currenciesArray.map((item) => <MenuItem key={item} value={item} primaryText={item}/>);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyValue: null,
      dateValue: new Date(),
      rates: []
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getData = this.getData.bind(this);
    this.tableItemsFromState = this.tableItemsFromState.bind(this);
  }

  tableItemsFromState = function(){
    return(Object.keys(this.state.rates).map((item) => <TableRow key={item}>
      <TableRowColumn>{item}</TableRowColumn>
      <TableRowColumn>{this.state.rates[item]}</TableRowColumn>
    </TableRow>));
};

  getData = async function() {
    const addZeroIfMissing = (nbr) => (nbr<10) ? "0"+nbr : nbr ;
    const dateParam = this.state.dateValue.getFullYear() + "-" + addZeroIfMissing(this.state.dateValue.getMonth()+1) + "-" + addZeroIfMissing(this.state.dateValue.getDate());
    const url = "https://api.fixer.io/"+dateParam+"?base=" + this.state.currencyValue;
    await axios.get(url).then((response) => this.setState({rates: response.data.rates})).catch(function(error) {
      console.log(error);
    });
  }

  handleCurrencyChange = async function(event, index, value) {
    await this.setState({currencyValue: value});
    if(this.state.dateValue){this.getData()}
  }
  handleDateChange = async function(event, date) {
    await this.setState({dateValue: date});
    if(this.state.currencyValue){this.getData()}
  }

  render() {
    return (<MuiThemeProvider>
      <div>
        <AppBar title="Formation Sipios"/>
        <Paper className="paper" zDepth={2}>
          <div id="requestSettings">
            <SelectField onChange={this.handleCurrencyChange} value={this.state.currencyValue} floatingLabelText="Currency">
              {currencies}
            </SelectField>
            <DatePicker defaultDate={this.state.dateValue} onChange={this.handleDateChange} floatingLabelText="Date" autoOk={false} minDate={new Date('1999-01-01T12:00:00')} maxDate={new Date()}/>
          </div>
          <Divider/>
          <div id="responseDisplayer">
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Currency name</TableHeaderColumn>
                  <TableHeaderColumn>Value</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.tableItemsFromState()}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    </MuiThemeProvider>);
  }
}

export default App;
