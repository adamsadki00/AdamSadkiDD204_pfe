
import '../styles/AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="container">
                <h1 className="page-title">About <span className="text-gold">Us</span></h1>
                <div className="about-content glass-effect">
                    <p>
                        Welcome to Luxe Hotel, where luxury meets comfort. Established with a vision to redefine hospitality,
                        we have been serving guests from around the world with unparalleled service and elegance.
                    </p>
                    <p>
                        Our mission is to create unforgettable experiences for every guest, offering world-class amenities,
                        exquisite dining, and personalized service that exceeds expectations.
                    </p>
                    <div className="about-stats">
                        <div className="stat">
                            <h3>15+</h3>
                            <p className="text-gray">Years of Excellence</p>
                        </div>
                        <div className="stat">
                            <h3>100+</h3>
                            <p className="text-gray">Luxury Rooms</p>
                        </div>
                        <div className="stat">
                            <h3>10K+</h3>
                            <p className="text-gray">Happy Guests</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
