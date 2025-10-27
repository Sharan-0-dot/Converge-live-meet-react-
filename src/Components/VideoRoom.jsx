import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoRoom() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const getUrlParams = (url) => {
      if (!url.includes("?")) return {};
      const urlStr = url.split("?")[1];
      return Object.fromEntries(new URLSearchParams(urlStr).entries());
    };

    const roomID =
      getUrlParams(window.location.href)["roomID"] ||
      (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userName = storedUser?.username || "userName" + userID;

    const appID = Number("702529415");
    const serverSecret = "24d711519b94775e350a9ccf84ae49a2";

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
  }, [rootRef.current]);

  return <div ref={rootRef} className="w-[100vw] h-[100vh]" />;
}


export default VideoRoom;