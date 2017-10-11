import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import PropTypes from 'prop-types';

import { getTransactionsByAccount } from '../../utils/transactions/getTransactionsByAccount';

function txFormatter(cell) {
  return `<tr><td><a href="https://rinkeby.etherscan.io/tx/${cell}" target="_blank">${cell}</a></td><tr>`;
}

class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    updateTransactions: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.getTransactions();
  }

  async getTransactions() {
    const { updateTransactions } = this.props;

    const result = await getTransactionsByAccount();

    updateTransactions(result);
  }

  getAllTransactionByAddress() {
    return (
      <BootstrapTable height='350' scrollTop={ 'Bottom' } data={this.props.transactions} striped hover condensed>
        <TableHeaderColumn width='20%' dataAlign="center" dataField="hash" dataFormat={ txFormatter } isKey >HASH</TableHeaderColumn>
        <TableHeaderColumn width='20%' dataAlign="center" dataField="from" >FROM</TableHeaderColumn>
        <TableHeaderColumn width='20%' dataAlign="center" dataField="to" >TO</TableHeaderColumn>
        <TableHeaderColumn width='20%' dataAlign="center" dataField="value" >VALUE</TableHeaderColumn>
    </BootstrapTable>
    );
  }

  render() {
    return (
      <div>
        <h3>Transactions</h3>
        {this.getAllTransactionByAddress()}
      </div>
    );
  }
}

export default Transactions;
