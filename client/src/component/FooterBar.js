import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "../css/Footbar.css"

const FooterBar = () => {
    return (
        <MDBFooter className="font-small pt-4 mt-3" bg="dark" variant="dark" >
            <div>
                <div className="footer-copyright text-center py-3 bg-dark myFooter">
                    <MDBContainer fluid className="text-white">
                        &copy; {new Date().getFullYear()} Company: <a className="text-white-50"> JS </a>
                        <ul className="social-icons">
                            <li><a className="social-icon-instagram" href="https://www.instagram.com/og.goner/" title="our instagram" target="_blank" rel="noopener"></a></li>
                            <li><a className="social-icon-fb" href="https://www.facebook.com/profile.php?id=100012957372757" title="our facebook" target="_blank" rel="noopener"></a></li>
                            <li><a className="social-icon-telegram" href="#" title="our telegram" target="_blank" rel="noopener"></a></li>
                        </ul>
                    </MDBContainer>
                </div>
            </div>
        </MDBFooter>
    );
};

export default FooterBar;