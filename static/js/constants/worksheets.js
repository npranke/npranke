import React from 'react'

import Concentration from '@components/concentration/Concentration'
import ConcentrationInfo from '@components/concentration/ConcentrationInfo'

import ConcentrationIcon from '@img/icon-concentration.png'

const worksheets = {
    concentration: {
        component: <Concentration />,
        icon: ConcentrationIcon,
        infoComponent: <ConcentrationInfo />,
        pathTitle: 'concentration',
        properTitle: 'Concentration',
        title: 'concentration',
    },
}

export default worksheets
