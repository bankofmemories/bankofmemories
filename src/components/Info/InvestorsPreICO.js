import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import PropTypes from 'prop-types';

import { getInvestorsTransactions } from '../../utils/transactions/getInvestorsTransactions';

function linkFormatter(cell) {
  return `<tr><td><a href="https://rinkeby.etherscan.io/address/${cell}" target="_blank">${cell}</a></td><tr>`;
}

class InvestorsPreICO extends Component {
  static propTypes = {
    investorTransactionsPreICO: PropTypes.array.isRequired,
    updateInvestorTransactionsPreICO: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getTransactions();
  }

  async getTransactions() {
    const { updateInvestorTransactionsPreICO } = this.props;

    const isICO = true;

    const PreICOInvestors = await getInvestorsTransactions(!isICO);

    updateInvestorTransactionsPreICO(PreICOInvestors);
  }
  getTransactionByInvestor() {
    return (
      <BootstrapTable height='270' scrollTop={ 'Bottom' } data={this.props.investorTransactionsPreICO} striped hover condensed>
        <TableHeaderColumn width='20%' dataFormat={ linkFormatter } dataField="address" isKey >From</TableHeaderColumn>
        <TableHeaderColumn width='20%' dataField="count" >Value</TableHeaderColumn>
    </BootstrapTable>
    );
  }

  render() {
    return (
      <div>
        <h3>Pre-ICO Investors</h3>
        <hr color="blue" className="my-3" />
        <br/>
        {this.getTransactionByInvestor()}
      </div>
    );
  }
}

export default InvestorsPreICO;
