function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer" role="contentinfo">
            <div className="copyright">
                &copy; 2017-{currentYear} Nicole Pranke
            </div>
        </footer>
    )
}

export default Footer
