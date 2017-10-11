import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import PropTypes from 'prop-types';

import moment from 'moment';

import React, { Component } from 'react';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import { finishMinting } from '../../../utils/debug/finishMinting';
import { setStartDatePreICO } from '../../../utils/debug/setStartDatePreICO';

import { getTransactionsByAccount } from '../../../utils/transactions/getTransactionsByAccount';
import { getTokenInfo } from '../../../middleware/tokenInfo';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class SetDatePreICO extends Component {
  constructor(props) {
    super(props);

    this.state = {

      startDate: 0,

      datePicker: 0,

    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
    updateTokenInfo: PropTypes.func.isRequired
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    const result = await getTransactionsByAccount();
    updateTransactions(result);
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;
    const info = await getTokenInfo();
    updateTokenInfo(info);
  }

  showTimePicker(x, event) {
    this.refs.timepicker.openDialog();
    this.setState({ datePicker: event });
  }

  showDatePicker() {
    this.refs.datepicker.openDialog();
  }

  setTimePicker(time) {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const timePicker = moment.utc(this.state.datePicker).add({ hours: hour, minutes: minute });
    // eslint-disable-next-line
    this.setState({ startDate: timePicker._d });
  }

  async setStartDate() {
    const { startDate } = this.state;

    const date = startDate / 1000;
    console.log('--------', date);

    await setStartDatePreICO(date).then(async (result) => {
      console.log('setICODate', result);
      await this.getTransactions();
      await this.getMainInfo();
    });
  }

  // eslint-disable-next-line
  async finish() {
    await finishMinting().then(async (result) => {
      console.log('finishMinting', result);
      await this.getTransactions();
      await this.getMainInfo();
    });
  }

  render() {
    return (
        <div>
          <div>
            <Card style={{ backgroundColor: 'whitesmoke' }}>
              <CardBlock>
                <h5>Enter Date for Start Pre-ICO</h5>
                  <Input
                    value={this.state.startDate}
                    placeholder="Date for start ICO"
                    onFocus={() => this.showDatePicker()}
                    onKeyDown={this.handleSubmit}
                  />
                  <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <div>
                      <DatePicker
                        id="dataPickerId"
                        onChange={(x, event) => { this.showTimePicker(x, event); } }
                        ref="datepicker"
                        style={{ display: 'none' }}
                      />
                      <TimePicker
                        id="timePickerId"
                        ref="timepicker"
                        style={{ display: 'none' }}
                        onChange={(x, event) => { this.setTimePicker(event); }}
                      />
                    </div>
                  </MuiThemeProvider>
                  <br/>
                  <Row>
                    <Col md={{ size: '3' }}>
                      <Button color="warning" onClick={() => this.setStartDate()} >
                        Start Pre-ICO
                      </Button>
                    </Col>
                  </Row>
              </CardBlock>
            </Card>
          </div>
        </div>
    );
  }
}

export default SetDatePreICO;
