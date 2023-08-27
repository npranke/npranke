import Concentration from '@components/concentration/Concentration'
import ConcentrationInfo from '@components/concentration/ConcentrationInfo'
import Tower from '@components/tower/Tower'
import TowerInfo from '@components/tower/TowerInfo'

import ConcentrationIcon from '@img/icon-concentration.png'
import TowerIcon from '@img/icon-tower.png'

const worksheets = {
    CONCENTRATION: {
        component: <Concentration />,
        icon: ConcentrationIcon,
        infoComponent: <ConcentrationInfo />,
        pathTitle: 'concentration',
        properTitle: 'Concentration',
        title: 'concentration',
    },
    TOWER: {
        component: <Tower />,
        icon: TowerIcon,
        infoComponent: <TowerInfo />,
        pathTitle: 'tower',
        properTitle: 'Tower',
        title: 'tower',
    },
}

export default worksheets
