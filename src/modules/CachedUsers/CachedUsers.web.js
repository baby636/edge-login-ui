import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import FontIcon from 'react-toolbox/lib/font_icon'
import t from 'lib/web/LocaleStrings'
import styles from './CachedUsers.webStyle'
import classnames from 'classnames'

import { selectUserToLogin, selectUserToDeleteFromUserCache } from './CachedUsers.action'
import { openWarningModal } from '../WarningModal/WarningModal.action'
import { openUserList, closeUserList } from '../Login/Login.action'

import cachedUserXButton from 'theme/cachedUserXButton.scss'
import cachedUserButton from 'theme/cachedUserButton.scss'

class UserList extends Component {

  _handleLoginUserPin = (user) => {
    // this.props.blurField.focus()
    this.props.dispatch(selectUserToLogin(user))
  }

  _handleDeleteUserCache = (user) => {
    // this.props.blurField.blur()
    this.props.dispatch(selectUserToDeleteFromUserCache(user))
    this.props.dispatch(
      openWarningModal(
        'deleteCachedUser',
        t('fragment_landing_account_delete_title'),
        String.format(t('fragment_landing_account_delete_message'), user)
      )
    )
  }

  render () {

    const renderValue = (item, idx) => {
      const userItemclassName = classnames(
        styles.useritem,
        item === this.props.selectedUserToLogin ? styles.useritemSelected : null
      )

      return (
        <li key={idx} className={styles.userList}>
          <div className={styles.userrows}>
            <span className={userItemclassName} onMouseDown={ e => this._handleLoginUserPin(item)}>{ item }</span>
            <span className={styles.userdelete} onMouseDown={ e => this._handleDeleteUserCache(item) }><FontIcon value='clear' /></span>
          </div>
        </li>
      );
    };

    var userList = (this.props.area === 'pinLogin') ? this.props.cachedUsersWithPinEnabled : this.props.users

    const containerClassname = classnames(
      { [styles.active]: this.props.showCachedUsers, },
      styles.dropdown,
      this.props.containerClassName
    )

    return (
      <div data-react-toolbox='dropdown' className={containerClassname}>
        { this.props.component }
        <ul className={classnames(this.props.userListClassName,styles.values)}>
          {_.map(userList, renderValue)}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({

  users: state.cachedUsers.users,
  selectedUserToLogin: state.cachedUsers.selectedUserToLogin,
  cachedUsersWithPinEnabled: state.cachedUsers.usersWithPinEnabled,
  showCachedUsers: state.login.showCachedUsers

}))(UserList)
