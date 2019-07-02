import React from 'react'

import Landscape from '@img/background-landscape.jpg'
import Portrait from '@img/background-portrait.jpg'

function Background() {
    return (
        <picture>
            <source srcSet={ Portrait } media="(orientation: portrait)" />
            <img
                src={ Landscape }
                className="background"
                alt="Conifer in Colorado landscape"
            />
        </picture>
    )
}

export default Background
