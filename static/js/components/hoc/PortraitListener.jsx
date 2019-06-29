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

            this.mediaQueryList = window.matchMedia('(orientation: portrait)')
        }

        componentDidMount() {
            this.mediaQueryList.addListener(this.updateIsPortrait)
        }

        componentWillUnmount() {
            this.mediaQueryList.removeListener(this.updateIsPortrait)
        }

        updateIsPortrait() {
            this.setState({ isPortrait: this.mediaQueryList.matches })
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
