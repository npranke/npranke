import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TowerSettings from '@components/tower/TowerSettings'

Enzyme.configure({ adapter: new Adapter() })

describe('TowerSettings', () => {
    let mockUpdateDisks

    beforeAll(() => {
        mockUpdateDisks = jest.fn()
    })

    afterEach(() => {
        mockUpdateDisks.mockReset()
    })

    test('has disks-portion sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.disks-portion'),
        ).toHaveLength(6)
    })

    test('has disks-portion number sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.disks-portion.number'),
        ).toHaveLength(4)
    })

    test('shows moves number when less than 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 1 } updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('01')
    })

    test('shows moves number when 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 10 } updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('10')
    })

    test('shows moves number when more than 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 15 } updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('15')
    })

    test('has time-portion sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.time-portion'),
        ).toHaveLength(6)
    })

    test('has time-portion number sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.time-portion.number'),
        ).toHaveLength(3)
    })

    describe('disks selection radiogroup', () => {
        test('has one radiogroup', () => {
            const towerSettings = shallow(
                <TowerSettings updateDisks={ jest.fn() } />,
            )

            expect(
                towerSettings.find('#disks-radiogroup').props().role,
            ).toEqual('radiogroup')
        })

        test('has four radio inputs', () => {
            const towerSettings = shallow(
                <TowerSettings updateDisks={ jest.fn() } />,
            )

            expect(
                towerSettings.find('#disks-radiogroup input'),
            ).toHaveLength(4)

            towerSettings.find('#disks-radiogroup input').forEach(
                (input) => {
                    expect(input.props().type).toEqual('radio')
                },
            )
        })

        test('has four input labels', () => {
            const towerSettings = shallow(
                <TowerSettings updateDisks={ jest.fn() } />,
            )

            expect(
                towerSettings.find('#disks-radiogroup label'),
            ).toHaveLength(4)

            towerSettings.find('#disks-radiogroup label').forEach(
                (label) => {
                    expect(label.props().htmlFor).toBeTruthy()
                },
            )
        })

        test('disksInputChangeHandler() calls updateDisks', async () => {
            const user = userEvent.setup()

            const { rerender } = render(
                <TowerSettings
                    disks={ 3 }
                    updateDisks={ mockUpdateDisks }
                />,
            )
            await user.click(screen.getByRole('radio', { name: '2' }))

            expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
            expect(mockUpdateDisks).toHaveBeenLastCalledWith('2')

            rerender(
                <TowerSettings disks={ 2 } updateDisks={ mockUpdateDisks } />,
            )
            await user.click(screen.getByRole('radio', { name: '3' }))

            expect(mockUpdateDisks).toHaveBeenCalledTimes(2)
            expect(mockUpdateDisks).toHaveBeenLastCalledWith('3')

            rerender(
                <TowerSettings disks={ 3 } updateDisks={ mockUpdateDisks } />,
            )
            await user.click(screen.getByRole('radio', { name: '4' }))

            expect(mockUpdateDisks).toHaveBeenCalledTimes(3)
            expect(mockUpdateDisks).toHaveBeenLastCalledWith('4')

            rerender(
                <TowerSettings disks={ 4 } updateDisks={ mockUpdateDisks } />,
            )
            await user.click(screen.getByRole('radio', { name: '5' }))

            expect(mockUpdateDisks).toHaveBeenCalledTimes(4)
            expect(mockUpdateDisks).toHaveBeenLastCalledWith('5')
        })

        describe('disksLabelKeyUpHandler()', () => {
            beforeEach(() => {
                document.body.innerHTML = '<div id="fastener"></div>'
            })

            test('calls updateDisks prop on enter', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                )

                towerSettings.find('#five-disks-label').simulate(
                    'keyup',
                    { key: 'Enter' },
                )

                expect(
                    towerSettings.props().updateDisks,
                ).toHaveBeenCalledWith('5')
            })

            test('calls updateDisks prop on spacebar', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                )

                towerSettings.find('#three-disks-label').simulate(
                    'keyup',
                    { key: ' ' },
                )

                expect(
                    towerSettings.props().updateDisks,
                ).toHaveBeenCalledWith('3')
            })

            test('updates active element for arrow right on two', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#two-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('three-disks-label')
            })

            test('updates active element for arrow right on three', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#three-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('four-disks-label')
            })

            test('updates active element for arrow right on four', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#four-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('five-disks-label')
            })

            test('updates active element for arrow right on five', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#five-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('two-disks-label')
            })

            test('updates active element for arrow left on two', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#two-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('five-disks-label')
            })

            test('updates active element for arrow left on three', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#three-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('two-disks-label')
            })

            test('updates active element for arrow left on four', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#four-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('three-disks-label')
            })

            test('updates active element for arrow left on five', () => {
                const towerSettings = mount(
                    <TowerSettings updateDisks={ jest.fn() } />,
                    { attachTo: fastener },
                )

                towerSettings.find('#five-disks-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('four-disks-label')
            })
        })

        describe('input checked', () => {
            test('selected disks input has checked true', () => {
                const towerSettings = shallow(
                    <TowerSettings disks={ 2 } updateDisks={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#two-disks').props().checked,
                ).toEqual(true)
            })

            test('unselected disks inputs have checked false', () => {
                const towerSettings = shallow(
                    <TowerSettings disks={ 2 } updateDisks={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#three-disks').props().checked,
                ).toEqual(false)
                expect(
                    towerSettings.find('#four-disks').props().checked,
                ).toEqual(false)
                expect(
                    towerSettings.find('#five-disks').props().checked,
                ).toEqual(false)
            })
        })

        describe('label tabindex', () => {
            test('selected disks label has tabindex 0', () => {
                const towerSettings = shallow(
                    <TowerSettings disks={ 3 } updateDisks={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#three-disks-label').props().tabIndex,
                ).toEqual('0')
            })

            test('unselected disks labels have tabindex -1', () => {
                const towerSettings = shallow(
                    <TowerSettings disks={ 3 } updateDisks={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#two-disks-label').props().tabIndex,
                ).toEqual('-1')
                expect(
                    towerSettings.find('#four-disks-label').props().tabIndex,
                ).toEqual('-1')
                expect(
                    towerSettings.find('#five-disks-label').props().tabIndex,
                ).toEqual('-1')
            })
        })
    })
})

describe('TowerSettings snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <TowerSettings updateDisks={ jest.fn() } />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
