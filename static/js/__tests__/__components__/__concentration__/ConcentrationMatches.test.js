import { render, screen } from '@testing-library/react'

import ConcentrationMatches from
    '@components/concentration/ConcentrationMatches'

const pictures = Array.from({ length: 12 }, (value, index) => {
    return `${index}`
}).reduce((pictureAccumulator, pictureid) => {
    pictureAccumulator[`picture${pictureid}`] = {
        image: <a href="image-link"><img src="" alt="alt-text" /></a>,
    }

    return pictureAccumulator
}, {})

describe('ConcentrationMatches', () => {
    test('has matches section', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.getByText(/^matches:$/),
        ).toHaveClass('matches-portion', { exact: true })
    })

    test('shows matches number when less than 10', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={ ['0', '4', '10'] }
            />,
        )

        expect(
            screen.getByText(/^03$/),
        ).toHaveClass('matches-portion number', { exact: true })
    })

    test('shows matches number when 10', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 10 },
                        (value, index) => { return `${index}` },
                    )
                }
            />,
        )

        expect(
            screen.getByText(/^10$/),
        ).toHaveClass('matches-portion number', { exact: true })
    })

    test('shows matches number when more than 10', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 12 },
                        (value, index) => { return `${index}` },
                    )
                }
            />,
        )

        expect(
            screen.getByText(/^12$/),
        ).toHaveClass('matches-portion number', { exact: true })
    })

    test('has turns section', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.getByText(/^turns:$/),
        ).toHaveClass('turns-portion', { exact: true })
    })

    test('shows turns number when less than 10', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                turns={ 6 }
            />,
        )

        expect(
            screen.getByText(/^06$/),
        ).toHaveClass('turns-portion number', { exact: true })
    })

    test('shows turns number when 10', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                turns={ 10 }
            />,
        )

        expect(
            screen.getByText(/^10$/),
        ).toHaveClass('turns-portion number', { exact: true })
    })

    test('shows turns number when more than 10', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                turns={ 23 }
            />,
        )

        expect(
            screen.getByText(/^23$/),
        ).toHaveClass('turns-portion number', { exact: true })
    })

    test('has time section', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.getByText(/^time:$/),
        ).toHaveClass('time-portion', { exact: true })
    })

    test('has : time separator', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.getByText(/^:$/),
        ).toHaveClass('time-portion', { exact: true })
    })

    test('has . time separator', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.getByText(/^\.$/),
        ).toHaveClass('time-portion', { exact: true })
    })

    test('has timers', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.getAllByRole('timer'),
        ).toHaveLength(3)
    })

    test('has no images with no matches', () => {
        render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            screen.queryAllByRole('img'),
        ).toHaveLength(0)
    })

    test('has some images with some matches', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={ ['0', '4', '7', '10', '11'] }
            />,
        )

        expect(
            screen.queryAllByRole('img'),
        ).toHaveLength(5)
    })

    test('has all images with all matches', () => {
        render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 12 },
                        (value, index) => { return `${index}` },
                    )
                }
            />,
        )

        expect(
            screen.queryAllByRole('img'),
        ).toHaveLength(12)
    })
})

describe('ConcentrationMatches snapshot', () => {
    test('matches snapshot without matches', () => {
        const { asFragment } = render(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot with some matches', () => {
        const { asFragment } = render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={ ['0', '4', '7', '10'] }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot with all matches', () => {
        const { asFragment } = render(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 12 },
                        (value, index) => { return `${index}` },
                    )
                }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
