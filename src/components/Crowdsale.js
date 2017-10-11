import 'bootstrap/dist/css/bootstrap.css';
import { injectGlobal } from 'styled-components';

import { Container, Row, Col, Badge } from 'reactstrap';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TransactionActions from '../actions';

import ContractInfo from './Info/ContractInfo';
import InvestorInfo from './Info/InvestorInfo';

import MainInfo from './Info/MainInfo';
import ICOInfo from './Info/ICOInfo';
import PreICOInfo from './Info/PreICOInfo';

import InvestorsICO from './Info/InvestorsICO';
import InvestorsPreICO from './Info/InvestorsPreICO';

import Transactions from './Info/Transactions';

import GetPrice from './Function/User/GetPrice';
import BuyTokens from './Function/User/BuyTokens';

import GrantedWallets from './Function/Admin/GrantedWallets';
import ManualSend from './Function/Admin/ManualSend';
import TransferOwnership from './Function/Admin/TransferOwnership';

import SetDateICO from './Function/Debug/SetDateICO';
import SetDatePreICO from './Function/Debug/SetDatePreICO';

import SetFinishDateICO from './Function/Debug/SetFinishDateICO';
import SetFinishDatePreICO from './Function/Debug/SetFinishDatePreICO';

import TransferTokens from './Function/Debug/TransferTokens';

class Crowdsale extends Component {
  render() {
    const {
      transactions,
      contractInfo,
      investorInfo,
      tokenInfo,
      investorTransactionsPreICO,
      investorTransactionsICO,
      actions
    } = this.props;

    return (
        <Container>
          <br/>
          <br/>
          <h1>Ethereum BMC Token ICO</h1>
          <Col>
            <Row>
              <Col md={{ size: '5' }}>
                <br/>
                <br/>
                <br/>
                <ContractInfo contractInfo={contractInfo} updateICOInfo={actions.updateICOInfo} />
                <br/>
                <br/>
                <InvestorInfo investorInfo={investorInfo} updateInvestorInfo={actions.updateInvestorInfo} />
                <br/>
                <br/>
                <MainInfo tokenInfo={tokenInfo} updateTokenInfo={actions.updateTokenInfo} />
                <br/>
                <br/>
                <PreICOInfo tokenInfo={tokenInfo} updateTokenInfo={actions.updateTokenInfo} />
                <br/>
                <br/>
                <ICOInfo tokenInfo={tokenInfo} updateTokenInfo={actions.updateTokenInfo} />
                <br/>
                <br/>
                <br/>
                <br/>
              </Col>
              <Col md={{ size: '5', offset: 2 }}>
                <br/>
                <br/>
                <Row>
                  <Col>
                    <Col md={{ size: '3', offset: 5 }}>
                      <h6><Badge color="success" pill>for production</Badge></h6>
                    </Col>
                    <h3>User Functions</h3>
                    <hr color="success" className="my-3" />
                  </Col>
                </Row>
                <br/>
                <GetPrice />
                <br/>
                <BuyTokens
                  updateTransactions={actions.updateTransactions}
                  updateTokenInfo={actions.updateTokenInfo}
                  updateInvestorInfo={actions.updateInvestorInfo}
                  updateInvestorTransactionsICO={actions.updateInvestorTransactionsICO}
                  updateInvestorTransactionsPreICO={actions.updateInvestorTransactionsPreICO}
                  />
                <br/>
                <br/>
                <Row>
                  <Col>
                    <Col md={{ size: '3', offset: 5 }}>
                      <h6><Badge color="success" pill>for production</Badge></h6>
                    </Col>
                    <h3>Admin Functions</h3>
                    <hr color="success" className="my-3" />
                  </Col>
                </Row>
                <Row>
                <Col md={{ size: '12' }}>
                  <br/>
                  <GrantedWallets
                    updateTransactions={actions.updateTransactions}
                  />
                  <br/>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col md={{ size: '12' }}>
                    <ManualSend
                      updateTransactions={actions.updateTransactions}
                      updateTokenInfo={actions.updateTokenInfo}
                      updateInvestorInfo={actions.updateInvestorInfo}
                    />
                    <br/>
                  </Col>
                </Row>
                <br/>
                <Row>
                <Col md={{ size: '12' }}>
                  <TransferOwnership
                    updateTransactions={actions.updateTransactions}
                  />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </Col>
                </Row>
                <InvestorsPreICO investorTransactionsPreICO={investorTransactionsPreICO} updateInvestorTransactionsPreICO={actions.updateInvestorTransactionsPreICO}/>
                <br/>
                <br/>
                <InvestorsICO investorTransactionsICO={investorTransactionsICO} updateInvestorTransactionsICO={actions.updateInvestorTransactionsICO}/>
              </Col>
              </Row>
              <Row>
                <Col>
                  <br/>
                  <br/>
                  <Row>
                    <Col>
                      <Col md={{ size: '3', offset: 2 }}>
                        <h6><Badge color="danger" pill>only for Demo version</Badge></h6>
                      </Col>
                      <h3>Test & Debug</h3>
                      <hr color="red" className="my-3" />
                    </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col md={{ size: '5' }}>
                      <SetDatePreICO
                        updateTransactions={actions.updateTransactions}
                        updateTokenInfo={actions.updateTokenInfo}
                      />
                    </Col>
                    <br/>
                    <br/>
                    <Col md={{ size: '5', offset: 2 }}>
                      <SetDateICO
                        updateTransactions={actions.updateTransactions}
                        updateTokenInfo={actions.updateTokenInfo}
                      />
                    </Col>
                  </Row>
                  <br/>
                  <br/>
                  <Row>
                    <Col md={{ size: '5' }}>
                      <SetFinishDatePreICO
                        updateTransactions={actions.updateTransactions}
                        updateTokenInfo={actions.updateTokenInfo}
                      />
                    </Col>
                    <br/>
                    <br/>
                    <Col md={{ size: '5', offset: 2 }}>
                      <SetFinishDateICO
                        updateTransactions={actions.updateTransactions}
                        updateTokenInfo={actions.updateTokenInfo}
                      />
                    </Col>
                  </Row>
                  <br/>
                  <br/>
                  <Row>
                    <Col md={{ size: '5' }}>
                      <TransferTokens
                      updateInvestorInfo={actions.updateInvestorInfo}
                      updateTransactions={actions.updateTransactions}
                      />
                    </Col>
                    <br/>
                    <br/>
                  </Row>
                  <br/>
                  <br/>
                </Col>
              </Row>
              <br/>
              <br/>
              <Transactions transactions={transactions} updateTransactions={actions.updateTransactions} />
              <br/>
            <br/>
          </Col>
        </Container>
    );
  }
}

Crowdsale.propTypes = {
  transactions: PropTypes.array.isRequired,
  contractInfo: PropTypes.object.isRequired,
  investorInfo: PropTypes.object.isRequired,
  tokenInfo: PropTypes.object.isRequired,
  investorTransactionsICO: PropTypes.array.isRequired,
  investorTransactionsPreICO: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  contractInfo: state.contractInfo,
  investorInfo: state.investorInfo,
  tokenInfo: state.tokenInfo,
  investorTransactionsPreICO: state.investorTransactionsPreICO,
  investorTransactionsICO: state.investorTransactionsICO
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TransactionActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crowdsale);

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    background-color: whitesmoke;
    font-family: 'Roboto', sans-serif;
  }
`;
