// @flow

import React, {PropTypes} from 'react';
import {asyncConnect as connect} from 'redux-connect';
import {changeMessageAction} from 'universal/home/actions';

const asyncActions = [{
  promise: ({store: {dispatch}}) => dispatch(changeMessageAction('Hello from the other side!')),
}];
const propTypes = {
  message: PropTypes.string.isRequired,
  changeMessage: PropTypes.func.isRequired,
  isChangingMessage: PropTypes.bool.isRequired,
};
const mapStateToProps = ({home}: any) => ({
  message: home.message,
  isChangingMessage: home.isChangingMessage,
});
const mapDispatchToProps = {
  changeMessage: changeMessageAction,
};

export const DashboardPage = ({message = '', isChangingMessage = false, changeMessage}: any) => (
  <div>
    <span>{message}</span>
    <br/>
    <button disabled={isChangingMessage} onClick={() => changeMessage('newMessage')}>React Some Button</button>
  </div>
);
DashboardPage.propTypes = propTypes;

export default connect(asyncActions, mapStateToProps, mapDispatchToProps)(DashboardPage);
