import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import { setTransferOwnership } from '../../../utils/admin/setTransferOwnership';
import { burnTokens } from '../../../utils/admin/burnTokens';

import { getTransactionsByAccount } from '../../../utils/transactions/getTransactionsByAccount';

class TransferOwnership extends Component {
  constructor(props) {
    super(props);

    this.state = {

      addressTransfer: '',

    };
  }

  static propTypes = {
    updateTransactions: PropTypes.func.isRequired,
  }

  async getTransactions() {
    const { updateTransactions } = this.props;
    const result = await getTransactionsByAccount();
    updateTransactions(result);
  }

  async setTransferOwnership() {
    const { addressTransfer } = this.state;

    await setTransferOwnership(addressTransfer).then(async (result) => {
      console.log('setTransferOwnership', result);
      await this.getTransactions();
    });
  }

  // eslint-disable-next-line
  async burnTokens() {
    await burnTokens().then((result) => {
      console.log('burnTokens', result);
    });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h4>Transfer Ownership</h4>
              <br/>
              <h5>Enter New Owner Address</h5>
              <Input
                value={this.state.addressTransfer}
                placeholder="Enter New Owner Address"
                onChange={e => this.setState({ addressTransfer: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <Row>
                <Col md={{ size: '3' }}>
                  <Button color="warning" onClick={() => this.setTransferOwnership()} >Send</Button>
                </Col>
              </Row>
            </CardBlock>
          </Card>
          <br />
          <Button color="danger" onClick={() => this.burnTokens()} >Burn Tokens</Button>
          <br />
          <br />
          <br />
        </div>
    );
  }
}

export default TransferOwnership;
