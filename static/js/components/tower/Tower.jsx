import PropTypes from 'prop-types'
import React from 'react'

import withPortraitListener from '@components/hoc/PortraitListener'

export class Tower extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="tower">
                <div>tower</div>
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
