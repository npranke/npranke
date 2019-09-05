import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

import TowerDisk from '@components/tower/TowerDisk'

import useOffsetListener from '@components/hooks/OffsetListener'

export const spec = {
    drop: (props) => {
        return { toLocation: props.location }
    },
    canDrop: (props, monitor) => {
        const diskid = parseInt(monitor.getItem().diskid, 10)
        const topDisk = parseInt(props.diskids[props.diskids.length - 1], 10)

        return (
            !props.isComplete
            && (props.diskids.length === 0 || diskid < topDisk)
        )
    },
}

export function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

export function TowerLocation(props) {
    const locationRef = React.useRef(null)
    const { height, width } = useOffsetListener(locationRef)

    let diskHeight, diskWidth, scaleFactor

    if (props.isPortrait) {
        diskHeight = 904
        diskWidth = 329
        scaleFactor = 1

        if (diskHeight > height) {
            scaleFactor = height / diskHeight
            diskWidth *= scaleFactor
            diskHeight = height
        }

        const availableWidth = width * 0.7
        const disksWidth = diskWidth * props.disks

        if (disksWidth > availableWidth) {
            scaleFactor = availableWidth / disksWidth
            diskWidth = availableWidth / props.disks
            diskHeight *= scaleFactor
        }
    } else {
        diskHeight = 329
        diskWidth = 904
        scaleFactor = 1

        if (diskWidth > width) {
            scaleFactor = width / diskWidth
            diskHeight *= scaleFactor
            diskWidth = width
        }

        const availableHeight = height * 0.7
        const disksHeight = diskHeight * props.disks

        if (disksHeight > availableHeight) {
            scaleFactor = availableHeight / disksHeight
            diskHeight = availableHeight / props.disks
            diskWidth *= scaleFactor
        }
    }

    let towerDisks = props.tower[
        props.isPortrait ? 'portrait' : 'landscape'
    ].filter((disk) => {
        return props.diskids.indexOf(disk.diskid) !== -1
    }).map((disk) => {
        return (
            <React.Fragment key={ disk.diskid }>
                <div
                    className="disk-wrapper"
                    style={ { height: diskHeight, width: diskWidth } }
                >
                    <TowerDisk
                        diskid={ disk.diskid }
                        diskids={ props.diskids }
                        image={ disk.image }
                        isComplete={ props.isComplete }
                        moveDisk={ props.moveDisk }
                        location={ props.location }
                    />
                </div>
            </React.Fragment>
        )
    })

    if (props.isPortrait) {
        towerDisks.reverse()
    }

    if (props.isComplete) {
        towerDisks = (
            <a
                className="location-section"
                onClick={ props.tower.clickHandler }
                href={ props.tower.link }
                target="_blank"
                rel="noreferrer noopener external"
                aria-label="NASA/JPL Space Images"
            >
                { towerDisks }
            </a>
        )
    }

    towerDisks = (
        <div
            className={
                'location-section disks '
                + `${props.location} `
                + `${props.isComplete ? 'complete' : 'notcomplete'}`
            }
        >
            { towerDisks }
        </div>
    )

    return props.isPortrait ? props.connectDropTarget(
        <div className="location" ref={ locationRef }>
            <div className="location-section name">
                <div className="name-text">
                    { props.location }
                </div>
            </div>
            { towerDisks }
        </div>,
    ) : props.connectDropTarget(
        <div className="location" ref={ locationRef }>
            { towerDisks }
            <div className="location-section name">
                <div className="name-text">
                    { props.location }
                </div>
            </div>
        </div>,
    )
}

TowerLocation.defaultProps = {
    connectDropTarget: undefined,
    diskids: [],
    isComplete: false,
    isPortrait: false,
}

TowerLocation.propTypes = {
    connectDropTarget: PropTypes.func,
    diskids: PropTypes.arrayOf(PropTypes.string),
    disks: PropTypes.number.isRequired,
    isComplete: PropTypes.bool,
    isPortrait: PropTypes.bool,
    location: PropTypes.string.isRequired,
    moveDisk: PropTypes.func.isRequired,
    tower: PropTypes.shape({
        clickHandler: PropTypes.func.isRequired,
        landscape: PropTypes.arrayOf(
            PropTypes.shape({
                diskid: PropTypes.string.isRequired,
                image: PropTypes.node.isRequired,
            }).isRequired,
        ).isRequired,
        link: PropTypes.string.isRequired,
        portrait: PropTypes.arrayOf(
            PropTypes.shape({
                diskid: PropTypes.string.isRequired,
                image: PropTypes.node.isRequired,
            }).isRequired,
        ).isRequired,
    }).isRequired,
}

export default DropTarget('disk', spec, collect)(TowerLocation)
