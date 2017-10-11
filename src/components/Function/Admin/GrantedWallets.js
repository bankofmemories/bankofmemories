import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Button, Input, Row, Col, Card, CardBlock } from 'reactstrap';

import { setPrivilegedWallet } from '../../../utils/admin/setPrivilegedWallet';

import { removePrivilegedWallet } from '../../../utils/admin/removePrivilegedWallet';

import { getTransactionsByAccount } from '../../../utils/transactions/getTransactionsByAccount';

class GrantedWallets extends Component {
  constructor(props) {
    super(props);

    this.state = {

      addressPrivilegedWallet: '',

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

  async setPrivilegedWallet() {
    const { addressPrivilegedWallet } = this.state;

    await setPrivilegedWallet(addressPrivilegedWallet).then(async (result) => {
      console.log('setPrivlegedWallet', result);
      await this.getTransactions();
    });
  }

  async removePrivilegedWallet() {
    const { addressPrivilegedWallet } = this.state;

    await removePrivilegedWallet(addressPrivilegedWallet).then(async (result) => {
      console.log('removePrivlegedWallet', result);
      await this.getTransactions();
    });
  }

  render() {
    return (
        <div>
          <Card style={{ backgroundColor: 'whitesmoke' }}>
            <CardBlock>
              <h4>Granted Wallets</h4>
              <br/>
              <h5>Enter Address to privelege Wallet</h5>
              <Input
                value={this.state.addressPrivilegedWallet}
                placeholder="Enter Address to privilege Wallet"
                onChange={e => this.setState({ addressPrivilegedWallet: e.target.value })}
                onKeyDown={this.handleSubmit}
              />
              <br/>
              <Row>
                <Col md={{ size: '3' }}>
                  <Button color="success" onClick={() => this.setPrivilegedWallet()} >Grant Right</Button>
                </Col>
                <Col md={{ size: '3', offset: 1 }}>
                  <Button color="danger" onClick={() => this.removePrivilegedWallet()} >Revork Right</Button>
                </Col>
              </Row>
            </CardBlock>
          </Card>
        </div>
    );
  }
}

export default GrantedWallets;
