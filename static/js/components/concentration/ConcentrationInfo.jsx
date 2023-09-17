import { getSendEventHandler } from '@utils'

function ConcentrationInfo() {
    return (
        <div className="concetration-info">
            <p>
                Concentration is a picture matching memory game.
            </p>
            <p>
                Click on the tiles to reveal matching pictures. Find all 12
                matches as quickly as you can.
            </p>
            <p>
                Concentration is built with images from NASA&#8217;s Mars
                Exploration Program. The picture on the back of each tile
                was taken with the hazard avoidance camera on the Mars Rover
                Opportunity. The matching pictures on the tiles were taken
                with various instruments on the Mars Reconnaissance Orbiter.
                Learn more about Opportunity, the MRO, and other Mars missions
                by visiting&nbsp;
                <a
                    onClick={ getSendEventHandler(
                        'concentration',
                        'navigate',
                        'NASA Mars Exploration Program',
                    ) }
                    href="https://mars.nasa.gov"
                    target="_blank"
                    rel="noreferrer noopener external"
                >
                    NASA&#8217;s Mars Exploration Program
                </a>.
            </p>
            <p>
                The images used in Concentration are courtesy of
                NASA/JPL-Caltech. Discover more images by visiting
                the&nbsp;
                <a
                    onClick={ getSendEventHandler(
                        'concentration',
                        'navigate',
                        'JPL Image Gallery',
                    ) }
                    href="https://www.jpl.nasa.gov/images"
                    target="_blank"
                    rel="noreferrer noopener external"
                >
                    JPL Image Gallery
                </a>.
            </p>
        </div>
    )
}

export default ConcentrationInfo
