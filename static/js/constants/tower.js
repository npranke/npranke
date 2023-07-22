import HTML5Backend from 'react-dnd-html5-backend'
import { MouseTransition, TouchTransition } from 'react-dnd-multi-backend'
import TouchBackend from 'react-dnd-touch-backend'

import EmptyDiscPreview from '@img/tower-empty-disc-preview.gif'

import Landscape1of2 from '@img/tower-landscape-22931-two-1-of-2.jpg'
import Landscape2of2 from '@img/tower-landscape-22931-two-2-of-2.jpg'
import Portrait1of2 from '@img/tower-portrait-22931-two-1-of-2.jpg'
import Portrait2of2 from '@img/tower-portrait-22931-two-2-of-2.jpg'

import Landscape1of3 from '@img/tower-landscape-22938-three-1-of-3.jpg'
import Landscape2of3 from '@img/tower-landscape-22938-three-2-of-3.jpg'
import Landscape3of3 from '@img/tower-landscape-22938-three-3-of-3.jpg'
import Portrait1of3 from '@img/tower-portrait-22938-three-1-of-3.jpg'
import Portrait2of3 from '@img/tower-portrait-22938-three-2-of-3.jpg'
import Portrait3of3 from '@img/tower-portrait-22938-three-3-of-3.jpg'

import Landscape1of4 from '@img/tower-landscape-22944-four-1-of-4.jpg'
import Landscape2of4 from '@img/tower-landscape-22944-four-2-of-4.jpg'
import Landscape3of4 from '@img/tower-landscape-22944-four-3-of-4.jpg'
import Landscape4of4 from '@img/tower-landscape-22944-four-4-of-4.jpg'
import Portrait1of4 from '@img/tower-portrait-22944-four-1-of-4.jpg'
import Portrait2of4 from '@img/tower-portrait-22944-four-2-of-4.jpg'
import Portrait3of4 from '@img/tower-portrait-22944-four-3-of-4.jpg'
import Portrait4of4 from '@img/tower-portrait-22944-four-4-of-4.jpg'

import Landscape1of5 from '@img/tower-landscape-22423-five-1-of-5.jpg'
import Landscape2of5 from '@img/tower-landscape-22423-five-2-of-5.jpg'
import Landscape3of5 from '@img/tower-landscape-22423-five-3-of-5.jpg'
import Landscape4of5 from '@img/tower-landscape-22423-five-4-of-5.jpg'
import Landscape5of5 from '@img/tower-landscape-22423-five-5-of-5.jpg'
import Portrait1of5 from '@img/tower-portrait-22423-five-1-of-5.jpg'
import Portrait2of5 from '@img/tower-portrait-22423-five-2-of-5.jpg'
import Portrait3of5 from '@img/tower-portrait-22423-five-3-of-5.jpg'
import Portrait4of5 from '@img/tower-portrait-22423-five-4-of-5.jpg'
import Portrait5of5 from '@img/tower-portrait-22423-five-5-of-5.jpg'

export const DRAG_AND_DROP_BACKEND_PIPELINE = {
    backends: [
        {
            backend: HTML5Backend,
        },
        {
            backend: TouchBackend,
            preview: false,
            transition: TouchTransition,
        },
        {
            backend: HTML5Backend,
            preview: false,
            transition: MouseTransition,
        },
    ],
}

export const EMPTY_PREVIEW_SOURCE = EmptyDiscPreview

export const LAYOUTS = ['landscape', 'portrait']

export const LOCATIONS = ['origin', 'buffer', 'target']

export const TOWER_SOURCES = {
    2: {
        disks: {
            landscape: [
                Landscape1of2,
                Landscape2of2,
            ],
            portrait: [
                Portrait1of2,
                Portrait2of2,
            ],
        },
        sourceid: 22931,
    },
    3: {
        disks: {
            landscape: [
                Landscape1of3,
                Landscape2of3,
                Landscape3of3,
            ],
            portrait: [
                Portrait1of3,
                Portrait2of3,
                Portrait3of3,
            ],
        },
        sourceid: 22938,
    },
    4: {
        disks: {
            landscape: [
                Landscape1of4,
                Landscape2of4,
                Landscape3of4,
                Landscape4of4,
            ],
            portrait: [
                Portrait1of4,
                Portrait2of4,
                Portrait3of4,
                Portrait4of4,
            ],
        },
        sourceid: 22944,
    },
    5: {
        disks: {
            landscape: [
                Landscape1of5,
                Landscape2of5,
                Landscape3of5,
                Landscape4of5,
                Landscape5of5,
            ],
            portrait: [
                Portrait1of5,
                Portrait2of5,
                Portrait3of5,
                Portrait4of5,
                Portrait5of5,
            ],
        },
        sourceid: 22423,
    },
}
