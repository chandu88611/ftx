import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AiOutlineFullscreen } from "react-icons/ai";
const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HeaderFullScreenToggle = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEnhancedEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullScreen(document[getBrowserFullscreenElementProp()] != null);

    return () => {
      document.onfullscreenchange = undefined;
    };
  });

  function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== "undefined") {
      return "fullscreenElement";
    }
    if (typeof document.mozFullScreenElement !== "undefined") {
      return "mozFullScreenElement";
    }
    if (typeof document.msFullscreenElement !== "undefined") {
      return "msFullscreenElement";
    }
    if (typeof document.webkitFullscreenElement !== "undefined") {
      return "webkitFullscreenElement";
    }
    throw new Error("fullscreenElement is not supported by this browser");
  }

  function openFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  function toggleFullScreen() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement
    ) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  }

  return (
    <Tooltip title="Fullscreen toggle" placement="bottom">
      <IconButton
        onClick={toggleFullScreen}
        className={clsx("w-13 h-13", props.className)}
        size="larger"
      >
        <AiOutlineFullscreen size={"25px"} />
      </IconButton>
    </Tooltip>
  );
};

export default HeaderFullScreenToggle;
