import { render, screen } from '@testing-library/react'

import ConcentrationBoardRow from
    '@components/concentration/ConcentrationBoardRow'

const pictures = Array.from({ length: 6 }, (value, index) => {
    return `${index}`
}).map((pictureid) => {
    return {
        [`picture${pictureid}-a`]: {
            id: `${pictureid}-a`,
            pictureid,
            back: <img src="" alt="" className="picture-back" />,
            front: <img src="" alt="" className="picture-front" />,
            matched: <img src="" alt="" className="picture-matched" />,
        },
    }
})

describe('ConcentrationBoardRow', () => {
    test('has images', () => {
        render(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        expect(
            screen.getAllByRole('img'),
        ).toHaveLength(6)
    })

    test('has all picture-back when no first, second, matches', () => {
        render(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        screen.getAllByRole('img').forEach((image) => {
            expect(image).toHaveClass('picture-back')
        })
    })

    test('has one picture-front when matching first', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '2-a', pictureid: '2' } }
            />,
        )

        let counter = 0

        screen.getAllByRole('img').forEach((image) => {
            try {
                expect(image).toHaveClass('picture-front')
                counter += 1
            } catch (e) {
                expect(image).not.toHaveClass('picture-front')
            }
        })

        expect(counter).toEqual(1)
    })

    test('has no picture-front when non-matching first', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '9-a', pictureid: '9' } }
            />,
        )

        screen.getAllByRole('img').forEach((image) => {
            expect(image).not.toHaveClass('picture-front')
        })
    })

    test('has one picture-front when matching second', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                second={ { id: '3-a', pictureid: '3' } }
            />,
        )

        let counter = 0

        screen.getAllByRole('img').forEach((image) => {
            try {
                expect(image).toHaveClass('picture-front')
                counter += 1
            } catch (e) {
                expect(image).not.toHaveClass('picture-front')
            }
        })

        expect(counter).toEqual(1)
    })

    test('has no picture-front when non-matching second', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                second={ { id: '8-b', pictureid: '8' } }
            />,
        )

        screen.getAllByRole('img').forEach((image) => {
            expect(image).not.toHaveClass('picture-front')
        })
    })

    test('has two picture-front when matching first and second', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '0-a', pictureid: '0' } }
                second={ { id: '3-a', pictureid: '3' } }
            />,
        )

        let counter = 0

        screen.getAllByRole('img').forEach((image) => {
            try {
                expect(image).toHaveClass('picture-front')
                counter += 1
            } catch (e) {
                expect(image).not.toHaveClass('picture-front')
            }
        })

        expect(counter).toEqual(2)
    })

    test('has no picture-front when non-matching first and second', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '10-b', pictureid: '10' } }
                second={ { id: '7-a', pictureid: '7' } }
            />,
        )

        screen.getAllByRole('img').forEach((image) => {
            expect(image).not.toHaveClass('picture-front')
        })
    })

    test('has no picture-matched with no matches', () => {
        render(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        screen.getAllByRole('img').forEach((image) => {
            expect(image).not.toHaveClass('picture-matched')
        })
    })

    test('has some picture-matched with some matches', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                matches={ ['0', '1', '5'] }
            />,
        )

        let counter = 0

        screen.getAllByRole('img').forEach((image) => {
            try {
                expect(image).toHaveClass('picture-matched')
                counter += 1
            } catch (e) {
                expect(image).not.toHaveClass('picture-matched')
            }
        })

        expect(counter).toEqual(3)
    })

    test('has all picture-matched with all matches', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 6 },
                        (value, index) => { return `${index}` },
                    )
                }
            />,
        )

        screen.getAllByRole('img').forEach((image) => {
            expect(image).toHaveClass('picture-matched')
        })
    })

    test('can have picture-back, picture-front, picture-matched mix', () => {
        render(
            <ConcentrationBoardRow
                pictures={ pictures }
                matches={ ['0', '5'] }
                first={ { id: '4-a', pictureid: '4' } }
                second={ { id: '2-a', pictureid: '2' } }
            />,
        )

        let counterBack = 0
        let counterFront = 0
        let counterMatched = 0

        screen.getAllByRole('img').forEach((image) => {
            try {
                expect(image).toHaveClass('picture-back')
                counterBack += 1
            } catch (e0) {
                try {
                    expect(image).toHaveClass('picture-front')
                    counterFront += 1
                } catch (e1) {
                    expect(image).toHaveClass('picture-matched')
                    counterMatched += 1
                }
            }
        })

        expect(counterBack).toEqual(2)
        expect(counterFront).toEqual(2)
        expect(counterMatched).toEqual(2)
    })
})

describe('ConcentrationBoardRow snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
