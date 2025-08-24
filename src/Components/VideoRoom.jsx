import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate } from "react-router-dom";

function VideoRoom() {
  const rootRef = useRef(null);


  useEffect(() => {

    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "true");
      window.location.reload();
    }

    const getUrlParams = (url) => {
      let urlStr = url.split("?")[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    };

    const roomID =
      getUrlParams(window.location.href)["roomID"] ||
      (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userName = storedUser.username ? storedUser.username : "userName" + userID;

    const appID = Number(import.meta.env.VITE_APP_ID); // your appID
    const serverSecret = import.meta.env.VITE_SERVER_SECRET; // ❌ for testing only!

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: rootRef.current,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 10,
      layout: "Auto",
      showLayoutButton: false,
    });

    return () => {
      localStorage.removeItem("reloaded");
    };
  }, []);

   return (
    // <div className="flex justify-center items-center h-screen">
    <div
      ref={rootRef}
      className="w-[100vw] h-[100vh]"
    />
    // </div>
  );
}

export default VideoRoom;
