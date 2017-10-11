import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import { transferTokens } from '../../../utils/debug/transferTokens';

import { getTransactionsByAccount } from '../../../utils/transactions/getTransactionsByAccount';
import { getInvestorsInfo } from '../../../middleware/investorInfo';

class TransferTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {

      addressTo: '',
      addressAmount: 0,

    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
    updateInvestorInfo: PropTypes.func.isRequired
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

  async transfer() {
    const {
      addressTo, addressAmount
    } = this.state;
    await transferTokens(addressTo, addressAmount).then(async (result) => {
      console.log('transfer', result);
      await this.getTransactions();
      await this.getInvestorInfo();
    });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h4>Transfer Tokens</h4>
              <br/>
              <Row>
                <Col md={{ size: '7' }}>
                  <h5>To</h5>
                  <Input
                    value={this.state.addressTo}
                    placeholder="Enter address of Investor"
                    onChange={e => this.setState({ addressTo: e.target.value })}
                    onKeyDown={this.handleSubmit}
                  />
                </Col>
                <Col md={{ size: '5' }}>
                  <h5>Amount</h5>
                  <Input
                    value={this.state.addressAmount}
                    placeholder="Enter Amount of Tokens"
                    onChange={e => this.setState({ addressAmount: e.target.value })}
                    onKeyDown={this.handleSubmit}
                  />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col md={{ size: '4' }}>
                  <Button color="primary" onClick={() => this.transfer()} >Transfer</Button>
                </Col>
              </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default TransferTokens;

