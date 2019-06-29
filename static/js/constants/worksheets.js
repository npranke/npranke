import React from 'react'

import Concentration from '../components/Concentration'
import ConcentrationIcon from '../../img/icon-concentration.png'
import ConcentrationInfo from '../components/ConcentrationInfo'

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
