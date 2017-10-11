import moment from 'moment';

import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PropTypes from 'prop-types';

import { getTokenInfo } from '../../middleware/tokenInfo';

class ICOInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {

      dateUnix: 1515023940,

      dateLeft: 0,

    };
  }

  static propTypes = {
    tokenInfo: PropTypes.object.isRequired,
    updateTokenInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getMainInfo();
  }

  componentDidMount() {
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  async updateCountdown() {
    const now = moment().format();
    const finish = moment.unix(this.state.dateUnix).format();

    const finishTime = moment(finish);
    const nowTime = moment(now);
    const different = finishTime.diff(nowTime);

    const leftDate = moment.duration(different).format('d [days] h [hours] mm [minutes] ss [seconds]');

    this.setState({ dateLeft: leftDate });
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;

    const info = await getTokenInfo();

    updateTokenInfo(info);
  }

  render() {
    const { tokenInfo } = this.props;

    return (
      <div>
        <h3>ICO Info</h3>
        <hr color="blue" className="my-3" />
        <br/>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Info</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Tokens</td>
              <td>{tokenInfo.totalTokensICO / 100}</td>
            </tr>
            <tr>
              <td>Sold Tokens</td>
              <td>{tokenInfo.soldTokensICO / 100}</td>
            </tr>
            <tr>
              <td>Left Tokens</td>
              <td>{tokenInfo.leftTokensICO / 100}</td>
            </tr>
            <tr>
              <td>Total ETH</td>
              <td>{tokenInfo.totalETHICO}</td>
            </tr>
            <tr>
              <td>Investors Count</td>
              <td>{tokenInfo.investorsCountICO}</td>
            </tr>
            <tr>
              <td>Date Start</td>
              <td>{tokenInfo.dateStartICO}</td>
            </tr>
            <tr>
              <td>Date Finish</td>
              <td>{tokenInfo.dateFinishICO}</td>
            </tr>
            <tr>
              <td>Date Left</td>
              <td>{this.state.dateLeft}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ICOInfo;
