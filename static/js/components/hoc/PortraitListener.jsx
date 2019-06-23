import React from 'react'

function withPortraitListener(Component) {
    return class extends React.Component {
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
            return (
                <Component
                    isPortrait={ this.state.isPortrait }
                    { ...this.props }
                />
            )
        }
    }
}

export default withPortraitListener
