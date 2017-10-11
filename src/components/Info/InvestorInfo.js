import React, { Component } from 'react';
import { Table } from 'reactstrap';

import PropTypes from 'prop-types';

import { getInvestorsInfo } from '../../middleware/investorInfo';

class InvestorInfo extends Component {
  static propTypes = {
    investorInfo: PropTypes.object.isRequired,
    updateInvestorInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getInvestorInfo();
  }

  async getInvestorInfo() {
    const { updateInvestorInfo } = this.props;

    const info = await getInvestorsInfo();

    updateInvestorInfo(info);
  }

  render() {
    const { investorInfo } = this.props;

    return (
      <div>
        <h3>Investor Info</h3>
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
              <td>Investor Token (Pre-ICO)</td>
              <td>{investorInfo.investorsTokensPreICO / 100} {investorInfo.symbol}</td>
            </tr>
            <tr>
              <td>Investor Token (ICO)</td>
              <td>{investorInfo.investorsTokensICO / 100} {investorInfo.symbol}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default InvestorInfo;
