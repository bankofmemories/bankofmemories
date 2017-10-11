import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PropTypes from 'prop-types';

import { getICOInfo } from '../../middleware/contractInfo';

require('moment-duration-format');

class ContractInfo extends Component {
  static propTypes = {
    contractInfo: PropTypes.object.isRequired,
    updateICOInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getContractInfo();
  }

  async getContractInfo() {
    const { updateICOInfo } = this.props;
    const info = await getICOInfo();
    updateICOInfo(info);
  }

  render() {
    const { contractInfo } = this.props;
    return (
      <div>
        <h3>Contract Info</h3>
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
              <td>Address ICO</td>
              <td>{contractInfo.addressICO}</td>
            </tr>
            <tr>
              <td>Address Token</td>
              <td>{contractInfo.addressToken}</td>
            </tr>
            <tr>
              <td>Address Owner</td>
              <td>{contractInfo.addressOwner}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ContractInfo;
