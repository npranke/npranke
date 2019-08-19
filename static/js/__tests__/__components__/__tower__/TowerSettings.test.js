import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import React from 'react'

import TowerSettings from '@components/tower/TowerSettings'

Enzyme.configure({ adapter: new Adapter() })

describe('TowerSettings', () => {
    test('has discs-portion sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.discs-portion'),
        ).toHaveLength(6)
    })

    test('has discs-portion number sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.discs-portion.number'),
        ).toHaveLength(4)
    })

    test('shows moves number when less than 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 1 } updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('01')
    })

    test('shows moves number when 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 10 } updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('10')
    })

    test('shows moves number when more than 10', () => {
        const towerSettings = shallow(
            <TowerSettings moves={ 15 } updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.moves-portion.number').text(),
        ).toEqual('15')
    })

    test('has time-portion sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.time-portion'),
        ).toHaveLength(6)
    })

    test('has time-portion number sections', () => {
        const towerSettings = shallow(
            <TowerSettings updateDiscs={ jest.fn() } />,
        )

        expect(
            towerSettings.find('.time-portion.number'),
        ).toHaveLength(3)
    })

    describe('discs selection radiogroup', () => {
        test('has one radiogroup', () => {
            const towerSettings = shallow(
                <TowerSettings updateDiscs={ jest.fn() } />,
            )

            expect(
                towerSettings.find('#discs-radiogroup').props().role,
            ).toEqual('radiogroup')
        })

        test('has four radio inputs', () => {
            const towerSettings = shallow(
                <TowerSettings updateDiscs={ jest.fn() } />,
            )

            expect(
                towerSettings.find('#discs-radiogroup input'),
            ).toHaveLength(4)

            towerSettings.find('#discs-radiogroup input').forEach(
                (input) => {
                    expect(input.props().type).toEqual('radio')
                },
            )
        })

        test('has four input labels', () => {
            const towerSettings = shallow(
                <TowerSettings updateDiscs={ jest.fn() } />,
            )

            expect(
                towerSettings.find('#discs-radiogroup label'),
            ).toHaveLength(4)

            towerSettings.find('#discs-radiogroup label').forEach(
                (label) => {
                    expect(label.props().htmlFor).toBeTruthy()
                },
            )
        })

        test('discsInputChangeHandler() calls updateDiscs prop', () => {
            const towerSettings = mount(
                <TowerSettings updateDiscs={ jest.fn() } />,
            )

            towerSettings.find('#four-discs').simulate('change')

            expect(
                towerSettings.props().updateDiscs,
            ).toHaveBeenCalledWith('4')
        })

        describe('discsLabelKeyUpHandler()', () => {
            test('calls updateDiscs prop on enter', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#five-discs-label').simulate(
                    'keyup',
                    { key: 'Enter' },
                )

                expect(
                    towerSettings.props().updateDiscs,
                ).toHaveBeenCalledWith('5')
            })

            test('calls updateDiscs prop on spacebar', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#three-discs-label').simulate(
                    'keyup',
                    { key: ' ' },
                )

                expect(
                    towerSettings.props().updateDiscs,
                ).toHaveBeenCalledWith('3')
            })

            test('updates active element for arrow right on two', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#two-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('three-discs-label')
            })

            test('updates active element for arrow right on three', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#three-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('four-discs-label')
            })

            test('updates active element for arrow right on four', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#four-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('five-discs-label')
            })

            test('updates active element for arrow right on five', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#five-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowRight' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('two-discs-label')
            })

            test('updates active element for arrow left on two', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#two-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('five-discs-label')
            })

            test('updates active element for arrow left on three', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#three-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('two-discs-label')
            })

            test('updates active element for arrow left on four', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#four-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('three-discs-label')
            })

            test('updates active element for arrow left on five', () => {
                const towerSettings = mount(
                    <TowerSettings updateDiscs={ jest.fn() } />,
                )

                towerSettings.find('#five-discs-label').simulate(
                    'keyup',
                    { key: 'ArrowLeft' },
                )

                expect(
                    document.activeElement.id,
                ).toEqual('four-discs-label')
            })
        })

        describe('input checked', () => {
            test('selected discs input has checked true', () => {
                const towerSettings = shallow(
                    <TowerSettings discs={ 2 } updateDiscs={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#two-discs').props().checked,
                ).toEqual(true)
            })

            test('unselected discs inputs have checked false', () => {
                const towerSettings = shallow(
                    <TowerSettings discs={ 2 } updateDiscs={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#three-discs').props().checked,
                ).toEqual(false)
                expect(
                    towerSettings.find('#four-discs').props().checked,
                ).toEqual(false)
                expect(
                    towerSettings.find('#five-discs').props().checked,
                ).toEqual(false)
            })
        })

        describe('label tabindex', () => {
            test('selected discs label has tabindex 0', () => {
                const towerSettings = shallow(
                    <TowerSettings discs={ 3 } updateDiscs={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#three-discs-label').props().tabIndex,
                ).toEqual('0')
            })

            test('unselected discs labels have tabindex -1', () => {
                const towerSettings = shallow(
                    <TowerSettings discs={ 3 } updateDiscs={ jest.fn() } />,
                )

                expect(
                    towerSettings.find('#two-discs-label').props().tabIndex,
                ).toEqual('-1')
                expect(
                    towerSettings.find('#four-discs-label').props().tabIndex,
                ).toEqual('-1')
                expect(
                    towerSettings.find('#five-discs-label').props().tabIndex,
                ).toEqual('-1')
            })
        })
    })
})

describe('TowerSettings snapshot', () => {
    test('matches snapshot', () => {
        const towerSettings = shallow(
            <TowerSettings updateDiscs={ jest.fn() } />,
        )

        expect(towerSettings).toMatchSnapshot()
    })
})
