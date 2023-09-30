import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TowerSettings from '@components/tower/TowerSettings'

describe('TowerSettings', () => {
    let mockUpdateDisks

    beforeAll(() => {
        mockUpdateDisks = jest.fn()
    })

    afterEach(() => {
        mockUpdateDisks.mockReset()
    })

    test('has disks section', () => {
        render(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^disks:$/),
        ).toHaveClass('disks-portion', { exact: true })
    })

    test('has moves section', () => {
        render(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^moves:$/),
        ).toHaveClass('moves-portion', { exact: true })
    })

    test('shows moves number when less than 10', () => {
        render(
            <TowerSettings moves={ 1 } updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^01$/),
        ).toHaveClass('moves-portion number', { exact: true })
    })

    test('shows moves number when 10', () => {
        render(
            <TowerSettings moves={ 10 } updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^10$/),
        ).toHaveClass('moves-portion number', { exact: true })
    })

    test('shows moves number when more than 10', () => {
        render(
            <TowerSettings moves={ 15 } updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^15$/),
        ).toHaveClass('moves-portion number', { exact: true })
    })

    test('has time section', () => {
        render(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^time:$/),
        ).toHaveClass('time-portion', { exact: true })
    })

    test('has : time separator', () => {
        render(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^:$/),
        ).toHaveClass('time-portion', { exact: true })
    })

    test('has . time separator', () => {
        render(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getByText(/^\.$/),
        ).toHaveClass('time-portion', { exact: true })
    })

    test('has timers', () => {
        render(
            <TowerSettings updateDisks={ mockUpdateDisks } />,
        )

        expect(
            screen.getAllByRole('timer'),
        ).toHaveLength(3)
    })

    describe('disks selection radiogroup', () => {
        test('has one radiogroup', () => {
            render(
                <TowerSettings updateDisks={ mockUpdateDisks } />,
            )

            expect(
                screen.getAllByRole('radiogroup'),
            ).toHaveLength(1)
        })

        test('has four radio elements', () => {
            render(
                <TowerSettings updateDisks={ mockUpdateDisks } />,
            )

            expect(
                screen.getAllByRole('radio'),
            ).toHaveLength(4)

            expect(
                screen.getByRole('radio', { name: '2' }),
            ).toBeInTheDocument()
            expect(
                screen.getByRole('radio', { name: '3' }),
            ).toBeInTheDocument()
            expect(
                screen.getByRole('radio', { name: '4' }),
            ).toBeInTheDocument()
            expect(
                screen.getByRole('radio', { name: '5' }),
            ).toBeInTheDocument()
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

        describe('radio checked attribute', () => {
            test('selected disks radio has checked', () => {
                render(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                expect(
                    screen.getByRole('radio', { name: '2' }),
                ).toBeChecked()
            })

            test('unselected disks radios do not have checked', () => {
                render(
                    <TowerSettings
                        disks={ 2 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                expect(
                    screen.getByRole('radio', { name: '3' }),
                ).not.toBeChecked()
                expect(
                    screen.getByRole('radio', { name: '4' }),
                ).not.toBeChecked()
                expect(
                    screen.getByRole('radio', { name: '5' }),
                ).not.toBeChecked()
            })
        })

        describe('label tabindex', () => {
            test('selected disks label has tabindex 0', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                expect(
                    screen.getByTestId('three-disks-label-elem'),
                ).toHaveAttribute('tabindex', '0')
            })

            test('unselected disks labels have tabindex -1', () => {
                render(
                    <TowerSettings
                        disks={ 3 }
                        updateDisks={ mockUpdateDisks }
                    />,
                )

                expect(
                    screen.getByTestId('two-disks-label-elem'),
                ).toHaveAttribute('tabindex', '-1')
                expect(
                    screen.getByTestId('four-disks-label-elem'),
                ).toHaveAttribute('tabindex', '-1')
                expect(
                    screen.getByTestId('five-disks-label-elem'),
                ).toHaveAttribute('tabindex', '-1')
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
