import React, { Component } from 'react';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import PropTypes from 'prop-types';

import { manualRefund } from '../../../utils/user/manualRefund';

import { buyTokens } from '../../../utils/user/buyTokens';

import { getTransactionsByAccount } from '../../../utils/transactions/getTransactionsByAccount';
import { getInvestorsTransactions } from '../../../utils/transactions/getInvestorsTransactions';

import { getTokenInfo } from '../../../middleware/tokenInfo';
import { getInvestorsInfo } from '../../../middleware/investorInfo';

class BuyTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {

      buyTokenPlaceholder: 'Enter Amount of WEI',

      eth: 0,

      isICO: true

    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
    updateTokenInfo: PropTypes.func.isRequired,
    updateInvestorInfo: PropTypes.func.isRequired,
    updateInvestorTransactionsICO: PropTypes.func.isRequired,
    updateInvestorTransactionsPreICO: PropTypes.func.isRequired
  }

  async updateInvestorTransactionsICO() {
    const { updateInvestorTransactionsICO } = this.props;
    const { isICO } = this.state;
    const info = await getInvestorsTransactions(isICO);
    updateInvestorTransactionsICO(info);
  }

  async updateInvestorTransactionsPreICO() {
    const { updateInvestorTransactionsPreICO } = this.props;
    const { isICO } = this.state;
    const info = await getInvestorsTransactions(!isICO);
    console.log("PREINVESTOR: ",info)
    updateInvestorTransactionsPreICO(info);
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;
    const info = await getTokenInfo();
    updateTokenInfo(info);
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    const result = await getTransactionsByAccount();
    updateTransactions(result);
  }

  async getInvestorInfo() {
    const { updateInvestorInfo } = this.props;
    const info = await getInvestorsInfo();
    updateInvestorInfo(info);
  }

  // eslint-disable-next-line
  async manualRefundETH() {
    await manualRefund()
      .then(async (result) => {
        console.log('manualRefund', result);
        await this.getTransactions();
      });
  }

  async buyToken() {
    const { eth } = this.state;
    this.setState({ buyTokenPlaceholder: 'Await response....' });
    await buyTokens(eth)
      .then(async (result) => {
        console.log('buyTokens', result);
        this.setState({ buyTokenPlaceholder: 'Congratulations!' });
        await this.getTransactions();
        await this.getMainInfo();
        await this.getInvestorInfo();
        await this.updateInvestorTransactionsICO();
        await this.updateInvestorTransactionsPreICO();
      });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h5>Enter Amount of WEI</h5>
              <Input
                value={this.state.eth}
                placeholder={this.state.buyTokenPlaceholder}
                onChange={e => this.setState({ eth: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <Row>
                <Col md={{ size: '3' }}>
                  <Button color="success" onClick={() => this.buyToken()} >Buy Tokens</Button>
                </Col>
                <Col md={{ size: '3', offset: 1 }}>
                  <Button color="danger" onClick={() => this.manualRefundETH()} >Refund ETH</Button>
                </Col>
              </Row>
            </CardBlock>
        </Card>
      </div>
    );
  }
}

export default BuyTokens;
