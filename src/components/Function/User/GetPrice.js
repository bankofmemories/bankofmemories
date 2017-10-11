import React, { Component } from 'react';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import { getPriceToken } from '../../../utils/user/getPriceToken';
import { showPriceToken } from '../../../utils/user/showPriceToken';
import { checkWrapperBalance } from '../../../utils/debug/checkWrapperBalance';

import { getBalanceContract } from '../../../utils/contract/getBalanceContract';

class GetPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {

      tokenPricePlaceholder: 'Current Token Price',
      currentTokenPrice: ''
    };
  }

  // eslint-disable-next-line
  async getTokenPrice() {
    this.setState({ tokenPricePlaceholder: 'Await response' });
    const request = await getPriceToken().then((data) => {
      this.setState({ tokenPricePlaceholder: data });
    });
    console.log(request);
  }

  async showTokenPrice() {
    await showPriceToken().then((result) => {
      this.setState({ currentTokenPrice: result });
      console.log(['currentTokenPrice', result]);

      this.checkWrapperBalance();

      this.getBalanceContract();
    });
  }

  // eslint-disable-next-line
  async checkWrapperBalance() {
    await checkWrapperBalance().then((result) => {
      console.log('checkWrapperBalance', result);
    });
  }

  // eslint-disable-next-line
  async getBalanceContract() {
    await getBalanceContract().then((result) => {
      console.log('getBalanceContract', result);
    });
  }

  render() {
    return (
      <div>
        <Card style={{ backgroundColor: 'whitesmoke' }}>
          <CardBlock>
            <h5>Get Current Token Price</h5>
            <Input
              value={this.state.currentTokenPrice}
              placeholder={this.state.tokenPricePlaceholder}
            />
            <br/>
            <Row>
              <Col md={{ size: '3' }}>
                <Button color="info" onClick={() => this.getTokenPrice()} >Get Price</Button>
              </Col>
              <Col md={{ size: '3', offset: 1 }}>
                <Button color="warning" onClick={() => this.showTokenPrice()} >Show Price</Button>
              </Col>
            </Row>
          </CardBlock>
      </Card>
    </div>
    );
  }
}

export default GetPrice;
