import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//@mui material
import {Avatar} from "@mui/material"

// @mui/icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import LogoutIcon from '@mui/icons-material/Logout'

// Backend
import {BACKEND_URL} from '../../constants/url'

// Actions
import {signOut} from '../../Actions/userActions'

// bootstrap
import {Navbar, Container, Nav, Dropdown} from 'react-bootstrap'

// Icons
import { AiFillCaretRight } from 'react-icons/ai'
import { BiMoney } from 'react-icons/bi'
import { FaFacebook } from 'react-icons/fa'
import { IoLogoTwitter, IoMdLock } from 'react-icons/io'
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { RiFacebookCircleLine, RiInstagramLine } from 'react-icons/ri'

// icons animasi transisi
import Hamburger from 'hamburger-react'

// foto
import poli from '../Image/poli.jpg'

// CSS
import "./Header.css"


export default function Header({ hide}) {
    const [modalShow, setModalShow] = React.useState (false) 
    const {
        authUser: authData,
        loginModal,
        posts,
    } = useSelector((state) => state);
    const [isOpen, setOpen] = useState([])
    const [showNext, setShowNext] = useState(false)
    const [category, setCategory] = useState ([]);
    const [catLen, setCatLen] = useState (8);
    const [headerNews, setHeaderNews] = useState (
        posts[Math.floor(Math.random() * posts.length) + 1]
    );

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatchEvent(signOut());
    }
    return (
        <> 
        <Navbar 
            collapseOnSelect
            expand="lg"
            fixed="top"
            style={{ background: "white" }}
        > 
            <Container className="mt-3 mb-3">
                <Navbar.Brand>
                    <Link to="/">
                        <img src={poli} height='26px' alt="poli"></img>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <Hamburger toggled={isOpen} toggle={setOpen}/>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {showNext && window.innerWidth > 992 ? (
                        <div
                        className="w-100 header-next"
                        onClick={() => {
                            navigate(`/post/${headerNews?._id}`);
                            window.location.reload();
                        }}
                        >
                            <img
                            src={``}
                            alt=""
                            heigth={"30px"}
                            />
                            <p className="">Selanjutnya</p>
                            <p className=""></p>
                            {headerNews?.newsHead.slice(0, 40)}...
                        </div>
                    ) : (
                        <>
                        {!hide ? (
                            <Nav className="">
                                {category !== null && 
                                category.map((val, i) => {
                                    if (i < catLen)
                                    return (
                                        <Nav.Link className="navlinks nav-cat-links">
                                            <Link to={`/category/${val.name}`}>
                                                {val.name}
                                            </Link>
                                        </Nav.Link>
                                    );
                                })}
                            </Nav>
                        ) : (
                            <Nav className="me-auto mt-1"></Nav>
                        )}
                        </>
                    )}
                    <Nav>
                        {authData.user === null ? (
                            <>
                            <div className="navbar-drop-seperator my-2 d-none" />
                            <div className="d-flex">
                                <Nav.Link 
                                href="/"
                                className="navlinks nav-social"
                                style={{ sontSize: "20px"}}
                                >
                                    <FaFacebook />
                                </Nav.Link>
                                <Nav.Link 
                                href="/"
                                className="navlinks nav-social"
                                style={{ fontSize: "20px" }}
                                >
                                    <RiInstagramLine />
                                </Nav.Link>
                                <Nav.Link 
                                href="/"
                                className="navlinks nav-social"
                                style={{ sontSize: "20px"}}
                                >
                                    <IoLogoTwitter />
                                </Nav.Link>
                                <Nav.Link 
                                eventKey={2}
                                className="navlinks mt-1"
                                onClick={() => {
                                    setModalShow(true);
                                }}
                                >
                                    <div className="d-flex">
                                        <IoMdLock className="login-lock d-none"/>
                                        Login
                                        </div>
                                </Nav.Link>
                            </div>
                            </>
                        ) : (
                            <>
                            <div className="navbar-drop-seperator my-2 d-none" />

                            <Nav.Link 
                            evenKey={2}
                            className="navlinks d-flex"
                            onClick={() => {
                                navigate("/profile")
                            }}
                            >
                                {/* <Avatar style={{width:"30px",height:"30px"}}>{authData.user?.name[0]}</Avatar> */}
                                <Avatar 
                                style={{ width: "30px", height: "30px"}}
                                alt={authData.user?.name}
                                src={
                                    authData.user?.image
                                    ? `${BACKEND_URL}/uploads/${authData.user?.image}`
                                    : null
                                }
                                />
                                <span className="profileText">{authData.user?.name}</span>
                            </Nav.Link>

                            <div className="nav-profile-holder mt-3 d-none">
                                <p>
                                    <Link to="/creator" className="nav-profile-links">
                                        <DashboardIcon className="me-2"/>
                                        Go to Console
                                    </Link>
                                    <br />
                                </p>
                                <p>
                                    <Link to="/sponsor" className="nav-profile-links">
                                        <MonetizationOnIcon className="me-2" />
                                        Become sponsor
                                    </Link>
                                </p>
                                <Link to="/" className="nav-profile-links" onClick={handleLogout}>
                                        <LogoutIcon className="me-2" />
                                        Become sponsor
                                    </Link>
                            </div>

                            <Dropdown className="nav-profile-drop d-line mx-2">
                                <Dropdown.Toggle
                                id="dropdown-autoclose-true"
                                className="dropBtn"
                                ></Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">
                                        <Link to="/sponsor/"
                                        className="console-link nav-sponsor-link">
                                            <BiMoney className="me-2 mb-1" />
                                            Be sponsor
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <Link to="/creator/"
                                        className="console-link">
                                            <div className="console-btn">Go To Console</div>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <Link to="/profile/"
                                        className="console-link nav-sponsor-link">
                                            <IoSettingsOutline className="me-2" />
                                            Settings
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={handleLogout}>
                                        <IoLogOutOutline className="me-2"/>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        {/* <Login show={modalShow} onHide={() => setModalShow}></Login> */}
</>

    )
}
