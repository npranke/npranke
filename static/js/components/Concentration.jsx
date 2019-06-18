import React from 'react'

import { getLocationPageTitle } from '../utils'

function Concentration() {
    document.title = getLocationPageTitle('concentration')

    return (
        <main className="workbook workbook-concentration">
            <div className="concentration">
                concentration
            </div>
        </main>
    )
}

export default Concentration
