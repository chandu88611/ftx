import { useState } from "react";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { MdOutlineTextFields } from "react-icons/md";

const marks = [
  { value: 0.8, label: "80%" },
  { value: 0.9, label: "90%" },
  { value: 1, label: "100%" },
  { value: 1.1, label: "110%" },
];

function AdjustFontSize() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fontSize, setFontSize] = useState(1);

  function changeHtmlFontSize() {
    const html = document.getElementsByTagName("html")[0];
    html.style.fontSize = `${fontSize * 100}%`;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="font-size-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
      >
        <MdOutlineTextFields>material-outline:format_size</MdOutlineTextFields>
      </IconButton>
      <Menu
        classes={{ paper: "w-420" }}
        id="font-size-menu"
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
        <div className="py-12 px-22 w-56 p-10">
          <Typography className="flex items-center  text-16 font-semibold mb-8">
            Font Size
          </Typography>
          <Slider
            className="w-full p"
            // classes={{ markLabel: 'text-12 font-semibold' }}
            value={fontSize}
            track={false}
            aria-labelledby="discrete-slider-small-steps"
            step={0.1}
            marks={marks}
            min={0.8}
            max={1.1}
            valueLabelDisplay="off"
            onChange={(ev, value) => setFontSize(value)}
            onChangeCommitted={changeHtmlFontSize}
          />
        </div>
      </Menu>
    </div>
  );
}

export default AdjustFontSize;
