import { render, screen } from '@testing-library/react'

import ConcentrationBoard from '@components/concentration/ConcentrationBoard'

const pictures = Array.from({ length: 12 }, (value, index) => {
    return `${index}`
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

const boardOrder = Array.from({ length: 12 }, (value, index) => {
    return `picture${index}-a`
}).concat(Array.from({ length: 12 }, (value, index) => {
    return `picture${index}-b`
}))

describe('ConcentrationBoard', () => {
    test('has 24 images when not isPortrait', () => {
        render(
            <ConcentrationBoard
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(
            screen.getAllByRole('img'),
        ).toHaveLength(24)
    })

    test('has 24 images when isPortrait', () => {
        render(
            <ConcentrationBoard
                isPortrait
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(
            screen.getAllByRole('img'),
        ).toHaveLength(24)
    })
})

describe('ConcentrationBoard snapshot', () => {
    test('matches snapshot when not isPortrait', () => {
        const { asFragment } = render(
            <ConcentrationBoard
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot when isPortrait', () => {
        const { asFragment } = render(
            <ConcentrationBoard
                isPortrait
                pictures={ pictures }
                boardOrder={ boardOrder }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
