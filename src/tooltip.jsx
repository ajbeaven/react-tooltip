import _ from 'lodash'
import React, { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'

import PortalPopper from './portal-popper'

class Tooltip extends Component {
  static propTypes = {
    placement: PropTypes.string,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
  }

  static defaultProps = {
    placement: 'top',
    className: 'tooltip',
    wrapperClassName: '',
  }

  constructor (...props) {
    super(...props)

    this.state = {
      shouldShow: false,
    }
  }

  render () {
    const actionProps = this.props.visible == null ? {
      onMouseOver: () => this.setState({ shouldShow: true }),
      onMouseOut: () => this.setState({ shouldShow: false }),
    } : {}

    return (
      <span className={this.props.wrapperClassName}>
        {cloneElement(Children.only(this.props.children), {
          ref: 'target',
          ...actionProps,
        })}
        {this._popper()}
      </span>
    )
  }

  _popper () {
    if (this.props.visible !== true && (!this.state.shouldShow || this.props.visible === false)) return null

    const props = _.pick(this.props, 'title', 'placement', 'className', 'updateCue')

    return (
      <PortalPopper getTargetNode={() => this.refs.target} {...props} />
    )
  }
}

export default Tooltip
