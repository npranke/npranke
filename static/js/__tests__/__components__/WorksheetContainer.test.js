import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'

import ComponentMock from '@__mocks__/ComponentMock'
import ImageMock from '@__mocks__/ImageMock'

import WorksheetContainer from '@components/WorksheetContainer'

Enzyme.configure({ adapter: new Adapter() })

const worksheet = {
    component: <ComponentMock />,
    icon: ImageMock,
    infoComponent: <ComponentMock />,
    pathTitle: 'component',
    properTitle: 'Component',
    title: 'component',
}

describe('WorksheetContainer', () => {
    test('has three tabs', () => {
        const worksheetContainer = shallow(
            <WorksheetContainer
                location={ { hash: '' } }
                worksheet={ worksheet }
            />,
            { wrappingComponent: MemoryRouter },
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
            <WorksheetContainer
                location={ { hash: '' } }
                worksheet={ worksheet }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.find('.worksheet-section'),
        ).toHaveLength(1)

        expect(
            worksheetContainer.find('.worksheet-section').props().role,
        ).toEqual('tabpanel')
    })

    describe('headerClickHandler', () => {
        test('updates visible state', () => {
            const worksheetContainer = mount(
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
            )

            worksheetContainer.find('#info-tab NavLink').simulate('click')

            expect(
                worksheetContainer.state().visible,
            ).toEqual('info')
        })
    })

    describe('headerKeyUpHandler', () => {
        test('enter key up event on info section button', () => {
            const worksheetContainer = mount(
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
            const worksheetContainer = mount(
                <WorksheetContainer
                    location={ { hash: '#info' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
            const worksheetContainer = mount(
                <WorksheetContainer
                    location={ { hash: '#info' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
                <WorksheetContainer
                    location={ { hash: '' } }
                    worksheet={ worksheet }
                />,
                { wrappingComponent: MemoryRouter },
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
    test('matches snapshot when location hash is empty', () => {
        const worksheetContainer = shallow(
            <WorksheetContainer
                location={ { hash: '' } }
                worksheet={ worksheet }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(worksheetContainer).toMatchSnapshot()
    })

    test('matches snapshot when location hash is #info', () => {
        const worksheetContainer = shallow(
            <WorksheetContainer
                location={ { hash: '#info' } }
                worksheet={ worksheet }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(worksheetContainer).toMatchSnapshot()
    })

    test('matches snapshot when location hash is #gist', () => {
        const worksheetContainer = shallow(
            <WorksheetContainer
                location={ { hash: '#gist' } }
                worksheet={ worksheet }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(worksheetContainer).toMatchSnapshot()
    })
})
