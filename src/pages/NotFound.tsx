import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Phone, Home } from "lucide-react";
import SEO from "../components/SEO";

const NotFound = () => {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh", paddingTop: "80px" }}>
            <SEO title="Page Not Found | Pixel Towing" description="Error 404 - Page not found." />
            
            <h1 className="display-1 fw-bold text-warning">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead text-muted mb-5">
                The page you are looking for doesn't exist. <br />
                If you are stranded, please call us immediately.
            </p>

            <Button href="tel:+16476739755" variant="warning" size="lg" className="fw-bold px-5 rounded-pill mb-3">
                <Phone className="me-2" /> Call 647-673-9755
            </Button>
            
            <Link to="/" className="text-decoration-none mt-3">
                <Button variant="outline-dark" className="px-4">
                    <Home className="me-2" size={18} /> Back Home
                </Button>
            </Link>
        </Container>
    );
};

export default NotFound;