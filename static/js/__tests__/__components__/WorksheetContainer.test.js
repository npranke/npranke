import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ComponentMock from '@__mocks__/ComponentMock'
import ImageMock from '@__mocks__/ImageMock'

import WorksheetContainer from '@components/WorksheetContainer'

import * as utils from '@utils'

const mockLocation = { hash: '' }

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
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
        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ worksheet } />
            </MemoryRouter>,
        )

        expect(document.title).toContain('component')
    })

    test('has three tabs', () => {
        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ worksheet } />
            </MemoryRouter>,
        )

        expect(
            screen.getAllByRole('tab'),
        ).toHaveLength(3)
    })

    test('has one tabpanel', () => {
        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ worksheet } />
            </MemoryRouter>,
        )

        expect(
            screen.getAllByRole('tabpanel'),
        ).toHaveLength(1)
    })

    describe('sends pageview', () => {
        beforeAll(() => {
            utils.sendPageview = jest.fn()
        })

        afterEach(() => {
            utils.sendPageview.mockReset()
        })

        test('sends pageview when component mounts', () => {
            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            expect(utils.sendPageview).toHaveBeenCalledTimes(1)
        })

        test('sends pageview when location hash changes', () => {
            const { rerender } = render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            expect(utils.sendPageview).toHaveBeenCalledTimes(1)

            mockLocation.hash = '#gist'
            rerender(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            expect(utils.sendPageview).toHaveBeenCalledTimes(2)
        })
    })

    describe('headerClickHandler', () => {
        test('updates aria-selected on with click on info', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.click(screen.getByRole('link', { name: 'Info' }))

            expect(
                screen.getByRole('tab', { name: 'Info' }),
            ).toHaveAttribute('aria-selected', 'true')
            expect(
                screen.getByRole('tab', { name: 'Worksheet' }),
            ).toHaveAttribute('aria-selected', 'false')
            expect(
                screen.getByRole('tab', { name: 'Gist' }),
            ).toHaveAttribute('aria-selected', 'false')
        })

        test('updates aria-selected on with click on gist', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.click(screen.getByRole('link', { name: 'Gist' }))

            expect(
                screen.getByRole('tab', { name: 'Info' }),
            ).toHaveAttribute('aria-selected', 'false')
            expect(
                screen.getByRole('tab', { name: 'Worksheet' }),
            ).toHaveAttribute('aria-selected', 'false')
            expect(
                screen.getByRole('tab', { name: 'Gist' }),
            ).toHaveAttribute('aria-selected', 'true')
        })
    })

    describe('keyboard navigation on header tabs', () => {
        test('enter on info section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Info' }),
            ).toHaveFocus()

            await user.keyboard('{Enter}')

            expect(document.activeElement.id).toEqual('info-tabpanel')
        })

        test('enter on worksheet section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Worksheet' }),
            ).toHaveFocus()

            await user.keyboard('{Enter}')

            expect(document.activeElement.id).toEqual('worksheet-tabpanel')
        })

        test('enter on gist section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Gist' }),
            ).toHaveFocus()

            await user.keyboard('{Enter}')

            expect(document.activeElement.id).toEqual('gist-tabpanel')
        })

        test('spacebar on info section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Info' }),
            ).toHaveFocus()

            await user.keyboard(' ')

            expect(document.activeElement.id).toEqual('info-tabpanel')
        })

        test('spacebar on worksheet section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Worksheet' }),
            ).toHaveFocus()

            await user.keyboard(' ')

            expect(document.activeElement.id).toEqual('worksheet-tabpanel')
        })

        test('spacebar on gist section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Gist' }),
            ).toHaveFocus()

            await user.keyboard(' ')

            expect(document.activeElement.id).toEqual('gist-tabpanel')
        })

        test('right arrow on info section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Info' }),
            ).toHaveFocus()

            await user.keyboard('{ArrowRight}')

            expect(document.activeElement.id).toEqual('worksheet-tab-navlink')
        })

        test('right arrow on worksheet section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Worksheet' }),
            ).toHaveFocus()

            await user.keyboard('{ArrowRight}')

            expect(document.activeElement.id).toEqual('gist-tab-navlink')
        })

        test('right arrow on gist section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Gist' }),
            ).toHaveFocus()

            await user.keyboard('{ArrowRight}')

            expect(document.activeElement.id).toEqual('info-tab-navlink')
        })

        test('left arrow on info section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Info' }),
            ).toHaveFocus()

            await user.keyboard('{ArrowLeft}')

            expect(document.activeElement.id).toEqual('gist-tab-navlink')
        })

        test('left arrow on worksheet section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Worksheet' }),
            ).toHaveFocus()

            await user.keyboard('{ArrowLeft}')

            expect(document.activeElement.id).toEqual('info-tab-navlink')
        })

        test('left arrow on gist section header tab', async () => {
            const user = userEvent.setup()

            render(
                <MemoryRouter>
                    <WorksheetContainer worksheet={ worksheet } />
                </MemoryRouter>,
            )

            await user.tab()
            await user.tab()
            await user.tab()

            expect(
                screen.getByRole('link', { name: 'Gist' }),
            ).toHaveFocus()

            await user.keyboard('{ArrowLeft}')

            expect(document.activeElement.id).toEqual('worksheet-tab-navlink')
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
