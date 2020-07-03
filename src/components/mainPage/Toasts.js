import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Icon } from 'semantic-ui-react'
import { removeToast } from '../../actions'
import { getToastsMap } from '../../reducers/rootReducer'
import { getObjValues } from '../../utils'

class Toasts extends Component {
  static propTypes = {
    toastsMap: PropTypes.shape({}).isRequired,
    removeToast: PropTypes.func.isRequired
  }

  removeToast = toast => () => {
    const { removeToast } = this.props

    removeToast({
      toastId: toast.id
    })
  }

  renderToast = toast => {
    const { id, text, success } = toast
    const iconClassName = classnames('toast__icon', {
      toast__icon__success: success,
      toast__icon__error: !success
    })

    return (
      <div key={id} className="toast">
        <div className={iconClassName}>
          {success && <Icon name="check circle" size="large" />}
          {!success && <Icon name="warning circle" size="large" />}
        </div>
        <div className="toast__content">{text}</div>
        <button className="toast__dismiss" onClick={this.removeToast(toast)}>
          <Icon name="times" size="small" />
        </button>
      </div>
    )
  }

  render() {
    const toasts = getObjValues(this.props.toastsMap)

    return <section className="toasts">{toasts.map(this.renderToast)}</section>
  }
}

const mapStateToProps = state => ({
  toastsMap: getToastsMap(state)
})
export default connect(
  mapStateToProps,
  { removeToast }
)(Toasts)
