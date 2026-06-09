
import '../styles/ContactPage.css';

const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="container">
                <h1 className="page-title">Contact <span className="text-gold">Us</span></h1>
                <div className="contact-content">
                    <div className="contact-info glass-effect">
                        <h2>Get In Touch</h2>
                        <div className="info-item">
                            <span>📍</span>
                            <div>
                                <h4>Address</h4>
                                <p className="text-gray">123 Luxury Street, Paris, France</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span>📞</span>
                            <div>
                                <h4>Phone</h4>
                                <p className="text-gray">+33 1 23 45 67 89</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span>✉️</span>
                            <div>
                                <h4>Email</h4>
                                <p className="text-gray">info@luxehotel.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form glass-effect">
                        <h2>Send Message</h2>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
