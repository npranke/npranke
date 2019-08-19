import PropTypes from 'prop-types'
import React from 'react'

import TowerSettings from '@components/tower/TowerSettings'
import withPortraitListener from '@components/hoc/PortraitListener'

import { sendEvent } from '@utils'

export class Tower extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isTimeRunning: false,
            moves: 0,
            discs: 3,
        }

        this.updateDiscs = this.updateDiscs.bind(this)
    }

    updateDiscs(discs) {
        const updatedDiscs = parseInt(discs, 10)

        sendEvent('tower', 'select', `discs-${updatedDiscs}`)

        this.setState({ discs: updatedDiscs })
    }

    render() {
        return (
            <div className="tower">
                <div className="settings-wrapper">
                    <TowerSettings
                        discs={ this.state.discs }
                        isTimeRunning={ this.state.isTimeRunning }
                        moves={ this.state.moves }
                        updateDiscs={ this.updateDiscs }
                    />
                </div>
            </div>
        )
    }
}

Tower.defaultProps = {
    isPortrait: false,
}

Tower.propTypes = {
    isPortrait: PropTypes.bool,
}

export default withPortraitListener(Tower)
