import PropTypes from 'prop-types'
import React from 'react'

import useTimeRunner from '@components/hooks/TimeRunner'

function TowerSettings(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isTimeRunning,
        props.shouldResetTime,
    )

    const twoDisks = React.useRef(null)
    const threeDisks = React.useRef(null)
    const fourDisks = React.useRef(null)
    const fiveDisks = React.useRef(null)

    function disksInputChangeHandler(event) {
        props.updateDisks(event.target.value)
    }

    function disksLabelKeyUpHandler(event) {
        const { value } = event.currentTarget.dataset

        if (event.key === 'Enter' || event.key === ' ') {
            props.updateDisks(value)
        } else if (event.key === 'ArrowRight') {
            if (value === '2') {
                threeDisks.current.focus()
            } else if (value === '3') {
                fourDisks.current.focus()
            } else if (value === '4') {
                fiveDisks.current.focus()
            } else if (value === '5') {
                twoDisks.current.focus()
            }
        } else if (event.key === 'ArrowLeft') {
            if (value === '2') {
                fiveDisks.current.focus()
            } else if (value === '3') {
                twoDisks.current.focus()
            } else if (value === '4') {
                threeDisks.current.focus()
            } else if (value === '5') {
                fourDisks.current.focus()
            }
        }
    }

    return (
        <div className="settings">
            <div className="settings-inner">
                <div className="left-text">
                    <span className="disks-text">
                        <span className="disks-portion" id="disks-label">
                            disks:&ensp;
                        </span>
                        <span
                            className="disks-portion"
                            id="disks-radiogroup"
                            role="radiogroup"
                            aria-labelledby="disks-label"
                        >
                            <input
                                name="disks"
                                type="radio"
                                id="two-disks"
                                value="2"
                                onChange={ disksInputChangeHandler }
                                checked={ props.disks === 2 }
                                aria-checked={ props.disks === 2 }
                            />
                            <label
                                className="disks-portion number"
                                id="two-disks-label"
                                htmlFor="two-disks"
                                data-value="2"
                                ref={ twoDisks }
                                onKeyUp={ disksLabelKeyUpHandler }
                                tabIndex={ props.disks === 2 ? '0' : '-1' }
                            >
                                2
                            </label>
                            <input
                                name="disks"
                                type="radio"
                                id="three-disks"
                                value="3"
                                onChange={ disksInputChangeHandler }
                                checked={ props.disks === 3 }
                                aria-checked={ props.disks === 3 }
                            />
                            <label
                                className="disks-portion number"
                                id="three-disks-label"
                                htmlFor="three-disks"
                                data-value="3"
                                ref={ threeDisks }
                                onKeyUp={ disksLabelKeyUpHandler }
                                tabIndex={ props.disks === 3 ? '0' : '-1' }
                            >
                                3
                            </label>
                            <input
                                name="disks"
                                type="radio"
                                id="four-disks"
                                value="4"
                                onChange={ disksInputChangeHandler }
                                checked={ props.disks === 4 }
                                aria-checked={ props.disks === 4 }
                            />
                            <label
                                className="disks-portion number"
                                id="four-disks-label"
                                htmlFor="four-disks"
                                data-value="4"
                                ref={ fourDisks }
                                onKeyUp={ disksLabelKeyUpHandler }
                                tabIndex={ props.disks === 4 ? '0' : '-1' }
                            >
                                4
                            </label>
                            <input
                                name="disks"
                                type="radio"
                                id="five-disks"
                                value="5"
                                onChange={ disksInputChangeHandler }
                                checked={ props.disks === 5 }
                                aria-checked={ props.disks === 5 }
                            />
                            <label
                                className="disks-portion number"
                                id="five-disks-label"
                                htmlFor="five-disks"
                                data-value="5"
                                ref={ fiveDisks }
                                onKeyUp={ disksLabelKeyUpHandler }
                                tabIndex={ props.disks === 5 ? '0' : '-1' }
                            >
                                5
                            </label>
                        </span>
                    </span>
                </div>
                <div className="right-text">
                    <span className="moves-text">
                        <span className="moves-portion">
                            moves:&ensp;
                        </span>
                        <span className="moves-portion number">
                            {
                                props.moves < 10
                                    ? `0${props.moves}`
                                    : `${props.moves}`
                            }
                        </span>
                    </span>
                    <span className="time-text">
                        <span className="time-portion">
                            time:&emsp;
                        </span>
                        <span className="time-portion number">
                            { minutes }
                        </span>
                        <span className="time-portion">
                            &ensp;:&ensp;
                        </span>
                        <span className="time-portion number">
                            { seconds }
                        </span>
                        <span className="time-portion">
                            &ensp;:&ensp;
                        </span>
                        <span className="time-portion number">
                            { centiseconds }
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

TowerSettings.defaultProps = {
    disks: 3,
    isTimeRunning: false,
    shouldResetTime: false,
    moves: 0,
}

TowerSettings.propTypes = {
    disks: PropTypes.number,
    isTimeRunning: PropTypes.bool,
    shouldResetTime: PropTypes.bool,
    moves: PropTypes.number,
    updateDisks: PropTypes.func.isRequired,
}

export default TowerSettings
