import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import { fireEvent, render, screen } from '@testing-library/react'
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
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.disks-portion'),
        ).toHaveLength(6)
    })

    test('has disks-portion number sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.disks-portion.number'),
        ).toHaveLength(4)
    })

    test('shows moves number when less than 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 1 } updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('01')
    })

    test('shows moves number when 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 10 } updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('10')
    })

    test('shows moves number when more than 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 15 } updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('15')
    })

    test('has time-portion sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.time-portion'),
        ).toHaveLength(6)
    })

    test('has time-portion number sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            towerSettings.find('.time-portion.number'),
        ).toHaveLength(3)
    })

    describe('disks selection radiogroup', () => {
        test('has one radiogroup', () => {
            const towerSettings = shallow(
                <TowerSettings updateDisks={ mockUpdateDisks } />,
            )

            expect(
                towerSettings.find('#disks-radiogroup').props().role,
            ).toEqual('radiogroup')
        })

        test('has four radio inputs', () => {
            const towerSettings = shallow(
                <TowerSettings updateDisks={ mockUpdateDisks } />,
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
                <TowerSettings updateDisks={ mockUpdateDisks } />,
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

        describe('disksLabelKeyDownHandler()', () => {
            test('updates on spacebar and new value', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('four-disks-label-elem'),
                    { key: ' ' },
                )

                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('4')
            })

            test('does not update on spacebar and same value', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('three-disks-label-elem'),
                    { key: ' ' },
                )

                expect(mockUpdateDisks).not.toHaveBeenCalled()
            })

            test('updates for right arrow from two', () => {
                render(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('two-disks-label-elem'),
                    { key: 'ArrowRight' },
                )

                expect(
                    screen.getByTestId('three-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('3')
            })

            test('updates for right arrow from three', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('three-disks-label-elem'),
                    { key: 'ArrowRight' },
                )

                expect(
                    screen.getByTestId('four-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('4')
            })

            test('updates for right arrow from four', () => {
                render(
                    <TowerSettings
                        disks={ 4 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('four-disks-label-elem'),
                    { key: 'ArrowRight' },
                )

                expect(
                    screen.getByTestId('five-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('5')
            })

            test('updates for right arrow from five', () => {
                render(
                    <TowerSettings
                        disks={ 5 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('five-disks-label-elem'),
                    { key: 'ArrowRight' },
                )

                expect(
                    screen.getByTestId('two-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('2')
            })

            test('updates for down arrow from two', () => {
                render(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('two-disks-label-elem'),
                    { key: 'ArrowDown' },
                )

                expect(
                    screen.getByTestId('three-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('3')
            })

            test('updates for down arrow from three', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('three-disks-label-elem'),
                    { key: 'ArrowDown' },
                )

                expect(
                    screen.getByTestId('four-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('4')
            })

            test('updates for down arrow from four', () => {
                render(
                    <TowerSettings
                        disks={ 4 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('four-disks-label-elem'),
                    { key: 'ArrowDown' },
                )

                expect(
                    screen.getByTestId('five-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('5')
            })

            test('updates for down arrow from five', () => {
                render(
                    <TowerSettings
                        disks={ 5 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('five-disks-label-elem'),
                    { key: 'ArrowDown' },
                )

                expect(
                    screen.getByTestId('two-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('2')
            })

            test('updates for left arrow from two', () => {
                render(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('two-disks-label-elem'),
                    { key: 'ArrowLeft' },
                )

                expect(
                    screen.getByTestId('five-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('5')
            })

            test('updates for left arrow from three', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('three-disks-label-elem'),
                    { key: 'ArrowLeft' },
                )

                expect(
                    screen.getByTestId('two-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('2')
            })

            test('updates for left arrow from four', () => {
                render(
                    <TowerSettings
                        disks={ 4 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('four-disks-label-elem'),
                    { key: 'ArrowLeft' },
                )

                expect(
                    screen.getByTestId('three-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('3')
            })

            test('updates for left arrow from five', () => {
                render(
                    <TowerSettings
                        disks={ 5 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('five-disks-label-elem'),
                    { key: 'ArrowLeft' },
                )

                expect(
                    screen.getByTestId('four-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('4')
            })

            test('updates for up arrow from two', () => {
                render(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('two-disks-label-elem'),
                    { key: 'ArrowUp' },
                )

                expect(
                    screen.getByTestId('five-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('5')
            })

            test('updates for up arrow from three', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('three-disks-label-elem'),
                    { key: 'ArrowUp' },
                )

                expect(
                    screen.getByTestId('two-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('2')
            })

            test('updates for up arrow from four', () => {
                render(
                    <TowerSettings
                        disks={ 4 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('four-disks-label-elem'),
                    { key: 'ArrowUp' },
                )

                expect(
                    screen.getByTestId('three-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('3')
            })

            test('updates for up arrow from five', () => {
                render(
                    <TowerSettings
                        disks={ 5 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                fireEvent.keyDown(
                    screen.getByTestId('five-disks-label-elem'),
                    { key: 'ArrowUp' },
                )

                expect(
                    screen.getByTestId('four-disks-label-elem'),
                ).toHaveFocus()
                expect(mockUpdateDisks).toHaveBeenCalledTimes(1)
                expect(mockUpdateDisks).toHaveBeenLastCalledWith('4')
            })
        })

        describe('input checked', () => {
            test('selected disks input has checked true', () => {
                const towerSettings = shallow(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                expect(
                    towerSettings.find('#two-disks').props().checked,
                ).toEqual(true)
            })

            test('unselected disks inputs have checked false', () => {
                const towerSettings = shallow(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
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
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                expect(
                    towerSettings.find('#three-disks-label').props().tabIndex,
                ).toEqual('0')
            })

            test('unselected disks labels have tabindex -1', () => {
                const towerSettings = shallow(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
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
