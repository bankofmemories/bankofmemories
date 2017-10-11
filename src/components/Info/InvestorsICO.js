import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import PropTypes from 'prop-types';

import { getInvestorsTransactions } from '../../utils/transactions/getInvestorsTransactions';

function linkFormatter(cell) {
  return `<tr><td><a href="https://rinkeby.etherscan.io/address/${cell}" target="_blank">${cell}</a></td><tr>`;
}

class InvestorsICO extends Component {
  static propTypes = {
    investorTransactionsICO: PropTypes.array.isRequired,
    updateInvestorTransactionsICO: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getTransactions();
  }

  async getTransactions() {
    const { updateInvestorTransactionsICO } = this.props;

    const isICO = true;

    const ICOInvestors = await getInvestorsTransactions(isICO);

    updateInvestorTransactionsICO(ICOInvestors);
  }
  getTransactionByInvestor() {
    return (
      <BootstrapTable height='270' scrollTop={ 'Bottom' } data={this.props.investorTransactionsICO} striped hover condensed>
        <TableHeaderColumn width='20%' dataFormat={ linkFormatter } dataField="address" isKey >From</TableHeaderColumn>
        <TableHeaderColumn width='20%' dataField="count" >Value</TableHeaderColumn>
    </BootstrapTable>
    );
  }

  render() {
    return (
      <div>
        <h3>ICO Investors</h3>
        <hr color="blue" className="my-3" />
        <br/>
        {this.getTransactionByInvestor()}
      </div>
    );
  }
}

export default InvestorsICO;
