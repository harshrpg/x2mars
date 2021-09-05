import * as React from "react";
import Navbar from "../components/Navbar/navbar";
import Footer from '../components/footer';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Whitepaper = () => {
    return (
        <>
      <Navbar />
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <p>TEST</p>
        <Footer />
      </div>
    </>
    )
}

export default Whitepaper;