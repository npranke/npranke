import PropTypes from 'prop-types'
import React from 'react'

import useTimeRunner from '@components/hooks/TimeRunner'

function TowerSettings(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isTimeRunning,
    )

    const twoDiscs = React.useRef(null)
    const threeDiscs = React.useRef(null)
    const fourDiscs = React.useRef(null)
    const fiveDiscs = React.useRef(null)

    function discsInputChangeHandler(event) {
        props.updateDiscs(event.target.value)
    }

    function discsLabelKeyUpHandler(event) {
        const { value } = event.currentTarget.dataset

        if (event.key === 'Enter' || event.key === ' ') {
            props.updateDiscs(value)
        } else if (event.key === 'ArrowRight') {
            if (value === '2') {
                threeDiscs.current.focus()
            } else if (value === '3') {
                fourDiscs.current.focus()
            } else if (value === '4') {
                fiveDiscs.current.focus()
            } else if (value === '5') {
                twoDiscs.current.focus()
            }
        } else if (event.key === 'ArrowLeft') {
            if (value === '2') {
                fiveDiscs.current.focus()
            } else if (value === '3') {
                twoDiscs.current.focus()
            } else if (value === '4') {
                threeDiscs.current.focus()
            } else if (value === '5') {
                fourDiscs.current.focus()
            }
        }
    }

    return (
        <div className="settings">
            <div className="left-text">
                <span className="discs-text">
                    <span className="discs-portion" id="discs-label">
                        discs:&ensp;
                    </span>
                    <span
                        className="discs-portion"
                        id="discs-radiogroup"
                        role="radiogroup"
                        aria-labelledby="discs-label"
                    >
                        <input
                            name="discs"
                            type="radio"
                            id="two-discs"
                            value="2"
                            onChange={ discsInputChangeHandler }
                            checked={ props.discs === 2 }
                            aria-checked={ props.discs === 2 }
                        />
                        <label
                            className="discs-portion number"
                            id="two-discs-label"
                            htmlFor="two-discs"
                            data-value="2"
                            ref={ twoDiscs }
                            onKeyUp={ discsLabelKeyUpHandler }
                            tabIndex={ props.discs === 2 ? '0' : '-1' }
                        >
                            2
                        </label>
                        <input
                            name="discs"
                            type="radio"
                            id="three-discs"
                            value="3"
                            onChange={ discsInputChangeHandler }
                            checked={ props.discs === 3 }
                            aria-checked={ props.discs === 3 }
                        />
                        <label
                            className="discs-portion number"
                            id="three-discs-label"
                            htmlFor="three-discs"
                            data-value="3"
                            ref={ threeDiscs }
                            onKeyUp={ discsLabelKeyUpHandler }
                            tabIndex={ props.discs === 3 ? '0' : '-1' }
                        >
                            3
                        </label>
                        <input
                            name="discs"
                            type="radio"
                            id="four-discs"
                            value="4"
                            onChange={ discsInputChangeHandler }
                            checked={ props.discs === 4 }
                            aria-checked={ props.discs === 4 }
                        />
                        <label
                            className="discs-portion number"
                            id="four-discs-label"
                            htmlFor="four-discs"
                            data-value="4"
                            ref={ fourDiscs }
                            onKeyUp={ discsLabelKeyUpHandler }
                            tabIndex={ props.discs === 4 ? '0' : '-1' }
                        >
                            4
                        </label>
                        <input
                            name="discs"
                            type="radio"
                            id="five-discs"
                            value="5"
                            onChange={ discsInputChangeHandler }
                            checked={ props.discs === 5 }
                            aria-checked={ props.discs === 5 }
                        />
                        <label
                            className="discs-portion number"
                            id="five-discs-label"
                            htmlFor="five-discs"
                            data-value="5"
                            ref={ fiveDiscs }
                            onKeyUp={ discsLabelKeyUpHandler }
                            tabIndex={ props.discs === 5 ? '0' : '-1' }
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
    )
}

TowerSettings.defaultProps = {
    discs: 3,
    isTimeRunning: false,
    moves: 0,
}

TowerSettings.propTypes = {
    discs: PropTypes.number,
    isTimeRunning: PropTypes.bool,
    moves: PropTypes.number,
    updateDiscs: PropTypes.func.isRequired,
}

export default TowerSettings
