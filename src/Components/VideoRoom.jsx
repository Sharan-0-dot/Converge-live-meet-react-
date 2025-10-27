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
      String(Math.floor(Math.random() * 10000));

    const userID = String(Math.floor(Math.random() * 10000));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userName = storedUser?.username || "user_" + userID;

    const appID = 100190354;
    const serverSecret = "fb2d0107a061fb878a99a214d6a44f8d";

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

      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Grid",
      showLayoutButton: true,
    });
  }, []);

  return <div ref={rootRef} className="w-[100vw] h-[100vh]" />;
}

export default VideoRoom;
