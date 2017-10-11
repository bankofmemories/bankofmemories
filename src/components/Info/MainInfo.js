import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PropTypes from 'prop-types';

import { getTokenInfo } from '../../middleware/tokenInfo';

class MainInfo extends Component {
  static propTypes = {
    tokenInfo: PropTypes.object.isRequired,
    updateTokenInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getMainInfo();
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
        <h3>Main Info</h3>
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
              <td>{tokenInfo.totalTokens / 100}</td>
            </tr>
            <tr>
              <td>Sold Tokens</td>
              <td>{tokenInfo.soldTokens / 100}</td>
            </tr>
            <tr>
              <td>Left Tokens</td>
              <td>{tokenInfo.leftTokens / 100}</td>
            </tr>
            <tr>
              <td>Total ETH</td>
              <td>{tokenInfo.totalETH}</td>
            </tr>
            <tr>
              <td>Already Burn</td>
              <td>{tokenInfo.alreadyBurn}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MainInfo;
