import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

const pages = ["Add Food", "Food", "Add Student", "Student"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/addFood">Add Food</Link>
          </li>
          <li>
            <Link to="/food">Food</Link>
          </li>
          <li>
            <Link to="/addStudent">Add Student</Link>
          </li>
          <li>
            <Link to="/student">Student</Link>
          </li>
        </ul>
      </nav> */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              YOODA HOSTEL
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  flexDirection: "column",
                }}
              >
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    marginLeft: "10px",
                  }}
                  to="/addFood"
                >
                  Add Food
                </Link>
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    marginLeft: "10px",
                  }}
                  to="/food"
                >
                  Food
                </Link>
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    marginLeft: "10px",
                  }}
                  to="/addStudent"
                >
                  Add Student
                </Link>
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    marginLeft: "10px",
                  }}
                  to="/student"
                >
                  Student
                </Link>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              YOODA Hostel
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-evenly",
              }}
            >
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/addFood"
              >
                Add Food
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/food"
              >
                Food
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/addStudent"
              >
                Add Student
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/student"
              >
                Student
              </Link>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/distribution"
              >
                Distribution
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
