import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { render } from '@testing-library/react'

import ComponentMock from '@__mocks__/ComponentMock'
import ImageMock from '@__mocks__/ImageMock'

import WorksheetContainer from '@components/WorksheetContainer'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

const mockLocation = { hash: '' }

jest.mock('react-router-dom-v5-compat', () => {
    return {
        ...jest.requireActual('react-router-dom-v5-compat'),
        useLocation: jest.fn(() => { return mockLocation }),
    }
})

const worksheet = {
    component: <ComponentMock />,
    icon: ImageMock,
    infoComponent: <ComponentMock />,
    pathTitle: 'component',
    properTitle: 'Component',
    title: 'component',
}

describe('WorksheetContainer', () => {
    beforeEach(() => {
        mockLocation.hash = ''
    })

    test('sets document title', () => {
        mount(
            <WorksheetContainer worksheet={ worksheet } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(document.title).toContain('component')
    })

    test('has three tabs', () => {
        const worksheetContainer = shallow(
            <WorksheetContainer worksheet={ worksheet } />,
        )

        expect(
            worksheetContainer.find('.section-button'),
        ).toHaveLength(3)

        worksheetContainer.find('.section-button').forEach(
            (sectionButton) => {
                expect(sectionButton.props().role).toEqual('tab')
            },
        )
    })

    test('has one tabpanel', () => {
        const worksheetContainer = shallow(
            <WorksheetContainer worksheet={ worksheet } />,
        )

        expect(
            worksheetContainer.find('.worksheet-section'),
        ).toHaveLength(1)

        expect(
            worksheetContainer.find('.worksheet-section').props().role,
        ).toEqual('tabpanel')
    })

    describe('sends pageview', () => {
        beforeAll(() => {
            utils.sendPageview = jest.fn()
        })

        afterEach(() => {
            utils.sendPageview.mockReset()
        })

        test('sends pageview when component mounts', () => {
            mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { wrappingComponent: MemoryRouter },
            )

            expect(utils.sendPageview).toHaveBeenCalledTimes(1)
        })

        test('sends pageview when location hash changes', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { wrappingComponent: MemoryRouter },
            )

            expect(utils.sendPageview).toHaveBeenCalledTimes(1)

            mockLocation.hash = '#gist'
            worksheetContainer.setProps({})

            expect(utils.sendPageview).toHaveBeenCalledTimes(2)
        })
    })

    describe('headerClickHandler', () => {
        test('updates aria-selected on with click on info', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#info-tab NavLink').simulate('click')

            expect(
                worksheetContainer.find('#info-tab').props()['aria-selected'],
            ).toBe(true)
            expect(
                worksheetContainer.find(
                    '#worksheet-tab',
                ).props()['aria-selected'],
            ).toBe(false)
            expect(
                worksheetContainer.find('#gist-tab').props()['aria-selected'],
            ).toBe(false)
        })

        test('updates aria-selected on with click on gist', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#gist-tab NavLink').simulate('click')

            expect(
                worksheetContainer.find('#info-tab').props()['aria-selected'],
            ).toBe(false)
            expect(
                worksheetContainer.find(
                    '#worksheet-tab',
                ).props()['aria-selected'],
            ).toBe(false)
            expect(
                worksheetContainer.find('#gist-tab').props()['aria-selected'],
            ).toBe(true)
        })
    })

    describe('headerKeyUpHandler', () => {
        beforeEach(() => {
            document.body.innerHTML = '<div id="fastener"></div>'
        })

        test('enter key up event on info section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#info-tab NavLink').simulate(
                'keyup',
                { key: 'Enter' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('info-tabpanel')
        })

        test('enter key up event on worksheet section button', () => {
            mockLocation.hash = '#info'

            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#worksheet-tab NavLink').simulate(
                'keyup',
                { key: 'Enter' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('worksheet-tabpanel')
        })

        test('enter key up event on gist section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#gist-tab NavLink').simulate(
                'keyup',
                { key: 'Enter' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('gist-tabpanel')
        })

        test('spacebar key up event on info section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#info-tab NavLink').simulate(
                'keyup',
                { key: ' ' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('info-tabpanel')
        })

        test('spacebar key up event on worksheet section button', () => {
            mockLocation.hash = '#info'

            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#worksheet-tab NavLink').simulate(
                'keyup',
                { key: ' ' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('worksheet-tabpanel')
        })

        test('spacebar key up event on gist section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#gist-tab NavLink').simulate(
                'keyup',
                { key: ' ' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('gist-tabpanel')
        })

        test('arrow right key up event on info section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#info-tab NavLink').simulate(
                'keyup',
                { key: 'ArrowRight' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('worksheet-tab-navlink')
        })

        test('arrow right key up event on worksheet section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#worksheet-tab NavLink').simulate(
                'keyup',
                { key: 'ArrowRight' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('gist-tab-navlink')
        })

        test('arrow left key up event on worksheet section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#worksheet-tab NavLink').simulate(
                'keyup',
                { key: 'ArrowLeft' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('info-tab-navlink')
        })

        test('arrow left key up event on gist section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer worksheet={ worksheet } />,
                { attachTo: fastener, wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#gist-tab NavLink').simulate(
                'keyup',
                { key: 'ArrowLeft' },
            )

            expect(
                document.activeElement.id,
            ).toEqual('worksheet-tab-navlink')
        })
    })
})

describe('WorksheetContainer snapshot', () => {
    beforeEach(() => {
        mockLocation.hash = ''
    })

    test('matches snapshot when location hash is empty', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ worksheet } />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot when location hash is #info', () => {
        mockLocation.hash = '#info'

        const { asFragment } = render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ worksheet } />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot when location hash is #gist', () => {
        mockLocation.hash = '#gist'

        const { asFragment } = render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ worksheet } />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
