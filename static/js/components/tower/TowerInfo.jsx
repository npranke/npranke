import React from 'react'

import { getSendEventHandler } from '@utils'

function TowerInfo() {
    return (
        <div className="tower-info">
            <p>
                Tower is an implementation of the Tower of Hanoi puzzle.
            </p>
            <p>
                Drag and drop disks to move the tower from origin to target.
                Larger disks can&#8217;t be placed on top of smaller disks.
                Try to move the tower in the fewest moves possible. The
                minimum number of moves is&ensp;
                <span className="math">
                    2<sup><i>n</i></sup> - 1
                </span>, where&ensp;
                <span className="math">
                    <i>n</i>
                </span>&ensp;is the number of disks in the tower.
            </p>
            <p>
                Tower is built with images of Jupiter from NASA&#8217;s Solar
                System Exploration Program. Each tower picture was taken with
                the JunoCam on the Juno spacecraft. Learn more about Jupiter,
                Juno, and other solar system missions by visiting&nbsp;
                <a
                    onClick={ getSendEventHandler(
                        'tower',
                        'navigate',
                        'NASA Solar System Exploration Program - Jupiter',
                    ) }
                    href={
                        'https://solarsystem.nasa.gov/planets/'
                        + 'jupiter/overview/'
                    }
                    target="_blank"
                    rel="noreferrer noopener external"
                >
                    NASA&#8217;s Solar System Exploration Program
                </a>.
            </p>
            <p>
                The images used in Tower are courtesy of
                NASA/JPL-Caltech. Discover more images by visiting
                the&nbsp;
                <a
                    onClick={ getSendEventHandler(
                        'tower',
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

export default TowerInfo
