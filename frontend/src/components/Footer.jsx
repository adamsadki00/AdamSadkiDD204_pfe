
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-secondary">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="text-gold">LUXE HOTEL</h3>
                        <p className="text-gray">Experience luxury like never before.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/rooms">Rooms</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p className="text-gray">123 Luxury Street, Paris</p>
                        <p className="text-gray">+33 1 23 45 67 89</p>
                        <p className="text-gray">info@luxehotel.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="text-gray">© 2026 Luxe Hotel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
