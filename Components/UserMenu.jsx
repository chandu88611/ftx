import { useState } from "react";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { RiUserLine, RiLogoutBoxLine, RiInboxLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
useSelector;
function UserMenu() {
  const router = useRouter();
  const user = useSelector((state) => state.users.user);

  const path = router.asPath;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    localStorage.removeItem("tmToken");
    router.push("/login");
  };
  return (
    <div>
      <IconButton
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
      >
       {user?.profile.profile_image && <img
          src={user?.profile.profile_image}
          alt="logo-light.png"
          className="w-14 h-14 rounded-full"
        />}

        {/* <RiUserLine size="1.7rem" /> */}
      </IconButton>
      <Menu
        classes={{ paper: "w-30" }}
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="py-2 px-4">
          <Link href="/dashboard/my-profile">
            
            <div
              className={`flex items-center mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer ${
                path.includes( "my-profile")
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
            >
              <RiUserLine size="1.5rem" className="mr-2" />
              <Typography variant="body1">Profile</Typography>
            </div>
          </Link>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <RiInboxLine size="1.5rem" className="mr-2 text-gray-600" />
            <Typography variant="body1" className="text-gray-600">
              Inbox
            </Typography>
          </div>
          <div
            className="flex items-center mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            onClick={logOut}
          >
            <RiLogoutBoxLine size="1.5rem" className="mr-2 text-gray-600" />
            <Typography variant="body1" className="text-gray-600">
              Logout
            </Typography>
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default UserMenu;
