import React from 'react';
import './footer.module.css'

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div>©{currentYear} Masaya Nishimura</div>
        </footer>
    );
}

export default Footer;