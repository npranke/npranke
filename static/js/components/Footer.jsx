function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="copyright">
                &copy; 2017-{currentYear} Nicole Pranke
            </div>
        </footer>
    )
}

export default Footer
