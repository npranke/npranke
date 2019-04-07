import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer role="contentinfo" className="footer">
            <div className="copyright">
                Copyright &copy; 2017-{currentYear} Nicole Pranke.
            </div>
        </footer>
    )
}

export default Footer
