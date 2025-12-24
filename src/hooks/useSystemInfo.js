import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useSystemInfo = () => {
  const [ip, setIp] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [systemInfo, setSystemInfo] = useState({
    browser: "Unknown",
    os: "Unknown",
    userAgent: "",
  });

  useEffect(() => {
    // Generate Device ID (Check if already stored)

    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceId(result.visitorId); // Unique Device ID
    };

    getFingerprint();
    // Detect Browser Name
    const userAgent = navigator.userAgent;
    const browser = (() => {
      if (userAgent.includes("Mozilla" || "Firefox")) return "Mozilla Firefox";
      if (userAgent.includes("Chrome")) return "Google Chrome";
      if (userAgent.includes("Safari")) return "Apple Safari";
      if (userAgent.includes("Edge")) return "Microsoft Edge";
      return "Unknown Browser";
    })();

    // Detect Operating System
    const os = (() => {
      if (userAgent.includes("Win")) return "Windows";
      if (userAgent.includes("Mac")) return "MacOS";
      if (userAgent.includes("Linux")) return "Linux";
      return "Unknown OS";
    })();

    // Set System Info
    setSystemInfo({ browser, os, userAgent });

    // Fetch Public IP Address
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("Error fetching IP:", err));
  }, []);

  return { ip, deviceId, ...systemInfo };
};

export default useSystemInfo;
