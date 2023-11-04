import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="container mx-auto">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
