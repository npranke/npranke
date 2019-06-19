import React from 'react'

import { getLocationPageTitle } from '../utils'
import Picture0 from '../../img/concentration-22332-pink-plateau.jpg'
import Picture1 from '../../img/concentration-22512-blue-center.jpg'
import Picture2 from '../../img/concentration-22585-teal-ripples.jpg'
import Picture3 from '../../img/concentration-22594-burgundy-spot.jpg'
import Picture4 from '../../img/concentration-23056-mauve-mound.jpg'
import Picture5 from '../../img/concentration-23080-lavendar-corner.jpg'
import Picture6 from '../../img/concentration-23103-light-pool.jpg'
import Picture7 from '../../img/concentration-23183-brown-variations.jpg'
import Picture8 from '../../img/concentration-23184-purple-surface.jpg'
import Picture9 from '../../img/concentration-23231-bright-swoop.jpg'
import Picture10 from '../../img/concentration-23233-dark-ridges.jpg'
import Picture11 from '../../img/concentration-23239-neon-plains.jpg'

class Concentration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPortrait: window.matchMedia(
                '(orientation: portrait)',
            ).matches,
        }

        this.updateIsPortrait = this.updateIsPortrait.bind(this)
    }

    componentDidMount() {
        document.title = getLocationPageTitle('concentration')

        window.matchMedia('(orientation: portrait)').addEventListener(
            'change',
            this.updateIsPortrait,
            false,
        )
    }

    componentWillUnmount() {
        window.matchMedia('(orientation: portrait)').removeEventListener(
            'change',
            this.updateIsPortrait,
            false,
        )
    }

    updateIsPortrait() {
        this.setState({
            isPortrait: window.matchMedia(
                '(orientation: portrait)',
            ).matches,
        })
    }

    render() {
        const board = this.state.isPortrait
            ? (
                <div className="board">
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture0 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture0 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture1 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture1 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture2 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture2 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture3 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture3 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture4 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture4 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture5 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture5 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture6 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture6 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture7 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture7 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture8 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture8 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture9 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture9 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture10 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture10 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture11 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture11 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="board">
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture0 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture0 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture1 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture1 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture2 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture2 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture3 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture3 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture4 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture4 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture5 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture5 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture6 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture6 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture7 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture7 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture8 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture8 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                    <div className="board-row-wrapper">
                        <div className="board-row">
                            <img
                                src={ Picture9 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture9 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture10 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture10 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture11 }
                                className="picture"
                                alt="mars"
                            />
                            <img
                                src={ Picture11 }
                                className="picture"
                                alt="mars"
                            />
                        </div>
                    </div>
                </div>
            )

        return (
            <main className="workbook workbook-concentration">
                <div className="concentration">
                    <div className="concentration-inner">
                        <div className="matches-wrapper">
                            <div className="matches">
                                <div className="matches-header">
                                    <div className="left-text">matches: 4</div>
                                    <div className="right-text">
                                        time: 00:00:00
                                    </div>
                                </div>
                                <div className="matches-pictures">
                                    <img
                                        src={ Picture0 }
                                        className="picture"
                                        alt="mars"
                                        id="first-match"
                                    />
                                    <img
                                        src={ Picture1 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture2 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture3 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture4 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture5 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture6 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture7 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture8 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture9 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture10 }
                                        className="picture"
                                        alt="mars"
                                    />
                                    <img
                                        src={ Picture11 }
                                        className="picture"
                                        alt="mars"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="board-wrapper">
                            { board }
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Concentration
