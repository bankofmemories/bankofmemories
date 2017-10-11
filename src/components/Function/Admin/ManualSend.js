import React, { Component } from 'react';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import PropTypes from 'prop-types';

import { sendTokenToAddress } from '../../../utils/admin/sendTokenToAddress';

import { getTransactionsByAccount } from '../../../utils/transactions/getTransactionsByAccount';
import { getTokenInfo } from '../../../middleware/tokenInfo';
import { getInvestorsInfo } from '../../../middleware/investorInfo';

class ManualSend extends Component {
  constructor(props) {
    super(props);

    this.state = {

      manualInvestorAddress: '',
      manualInvestorToken: '',

    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
    updateTokenInfo: PropTypes.func.isRequired,
    updateInvestorInfo: PropTypes.func.isRequired
  }

  async getMainInfo() {
    const { updateTokenInfo } = this.props;
    const info = await getTokenInfo();
    updateTokenInfo(info);
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    await getTransactionsByAccount().then((result) => {
      updateTransactions(result);
    });
  }

  async getInvestorInfo() {
    const { updateInvestorInfo } = this.props;
    await getInvestorsInfo().then((result) => {
      updateInvestorInfo(result);
    });
  }

  async sendToAddress() {
    const {
      manualInvestorAddress, manualInvestorToken
    } = this.state;

    await sendTokenToAddress(manualInvestorAddress, manualInvestorToken).then(async (result) => {
      console.log('sendToAddress', result);
      await this.getTransactions();
      await this.getMainInfo();
      await this.getInvestorInfo();
    });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h4>Manual send Token to Investor</h4>
              <br/>
              <h5>Enter Investor's Address</h5>
              <Input
                value={this.state.manualInvestorAddress}
                placeholder="Enter Investor's Address"
                onChange={e => this.setState({ manualInvestorAddress: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <h5>Enter Amount of Token for Investor</h5>
              <Input
                value={this.state.manualInvestorToken}
                placeholder="Enter Amount of Token for Investor"
                onChange={e => this.setState({ manualInvestorToken: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <Row>
                <Col md={{ size: '3' }}>
                  <Button color="primary" onClick={() => this.sendToAddress()} >Send</Button>
                </Col>
              </Row>
            </CardBlock>
          </Card>
        </div>
    );
  }
}

export default ManualSend;
