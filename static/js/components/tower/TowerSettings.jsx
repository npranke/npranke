import PropTypes from 'prop-types'
import { useRef } from 'react'

import useTimeRunner from '@components/hooks/TimeRunner'

function TowerSettings(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isTimeRunning,
        props.shouldTimeReset,
    )

    const twoDisks = useRef(null)
    const threeDisks = useRef(null)
    const fourDisks = useRef(null)
    const fiveDisks = useRef(null)

    function disksInputChangeHandler(event) {
        props.updateDisks(event.target.value)
    }

    function disksLabelKeyDownHandler(event) {
        const { value } = event.currentTarget.dataset

        if (event.key === ' ') {
            if (value !== props.disks.toString()) {
                props.updateDisks(value)
            }
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            if (value === '2') {
                threeDisks.current.focus()
                props.updateDisks('3')
            } else if (value === '3') {
                fourDisks.current.focus()
                props.updateDisks('4')
            } else if (value === '4') {
                fiveDisks.current.focus()
                props.updateDisks('5')
            } else if (value === '5') {
                twoDisks.current.focus()
                props.updateDisks('2')
            }
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            if (value === '2') {
                fiveDisks.current.focus()
                props.updateDisks('5')
            } else if (value === '3') {
                twoDisks.current.focus()
                props.updateDisks('2')
            } else if (value === '4') {
                threeDisks.current.focus()
                props.updateDisks('3')
            } else if (value === '5') {
                fourDisks.current.focus()
                props.updateDisks('4')
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
                                data-testid="two-disks-label-elem"
                                ref={ twoDisks }
                                onKeyDown={ disksLabelKeyDownHandler }
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
                                data-testid="three-disks-label-elem"
                                ref={ threeDisks }
                                onKeyDown={ disksLabelKeyDownHandler }
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
                                data-testid="four-disks-label-elem"
                                ref={ fourDisks }
                                onKeyDown={ disksLabelKeyDownHandler }
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
                                data-testid="five-disks-label-elem"
                                ref={ fiveDisks }
                                onKeyDown={ disksLabelKeyDownHandler }
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
                            moves:&emsp;
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
    shouldTimeReset: false,
    moves: 0,
}

TowerSettings.propTypes = {
    disks: PropTypes.number,
    isTimeRunning: PropTypes.bool,
    shouldTimeReset: PropTypes.bool,
    moves: PropTypes.number,
    updateDisks: PropTypes.func.isRequired,
}

export default TowerSettings
