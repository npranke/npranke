import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import ConcentrationBoard from '../../components/ConcentrationBoard'

Enzyme.configure({ adapter: new Adapter() })

const pictures = Array.from({ length: 12 }, (value, integer) => {
    return `${integer}`
}).reduce((pictureAccumulator, pictureid) => {
    pictureAccumulator[`picture${pictureid}-a`] = {
        id: `${pictureid}-a`,
        pictureid,
        back: <img src="" alt="" />,
        front: <img src="" alt="" />,
        matched: <img src="" alt="" />,
    }

    pictureAccumulator[`picture${pictureid}-b`] = {
        id: `${pictureid}-b`,
        pictureid,
        back: <img src="" alt="" />,
        front: <img src="" alt="" />,
        matched: <img src="" alt="" />,
    }

    return pictureAccumulator
}, {})

const boardOrder = Array.from({ length: 12 }, (value, integer) => {
    return `picture${integer}-a`
}).concat(Array.from({ length: 12 }, (value, integer) => {
    return `picture${integer}-b`
}))

describe('ConcentrationBoard', () => {
    test('has 4 rows when not isPortrait', () => {
        const concentrationBoard = shallow(
            <ConcentrationBoard
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(
            concentrationBoard.find(
                '.board-row-wrapper ConcentrationBoardRow',
            ),
        ).toHaveLength(4)
    })

    test('has 6 rows when isPortrait', () => {
        const concentrationBoard = shallow(
            <ConcentrationBoard
                isPortrait
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(
            concentrationBoard.find(
                '.board-row-wrapper ConcentrationBoardRow',
            ),
        ).toHaveLength(6)
    })

    test('has rows with 6 pictures when not isPortrait', () => {
        const concentrationBoard = shallow(
            <ConcentrationBoard
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(
            concentrationBoard.find(
                '.board-row-wrapper ConcentrationBoardRow',
            ).first().props().pictures,
        ).toHaveLength(6)
        expect(
            concentrationBoard.find(
                '.board-row-wrapper ConcentrationBoardRow',
            ).last().props().pictures,
        ).toHaveLength(6)
    })

    test('has rows with 4 pictures when isPortrait', () => {
        const concentrationBoard = shallow(
            <ConcentrationBoard
                isPortrait
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(
            concentrationBoard.find(
                '.board-row-wrapper ConcentrationBoardRow',
            ).first().props().pictures,
        ).toHaveLength(4)
        expect(
            concentrationBoard.find(
                '.board-row-wrapper ConcentrationBoardRow',
            ).last().props().pictures,
        ).toHaveLength(4)
    })
})

describe('ConcentrationBoard snapshot', () => {
    test('matches snapshot when not isPortrait', () => {
        const concentrationBoard = shallow(
            <ConcentrationBoard
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(concentrationBoard).toMatchSnapshot()
    })

    test('matches snapshot when isPortrait', () => {
        const concentrationBoard = shallow(
            <ConcentrationBoard
                isPortrait
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(concentrationBoard).toMatchSnapshot()
    })
})
