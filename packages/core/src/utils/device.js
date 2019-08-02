/**
 * Inspired from:
 * https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
 */
export default () => {
  const nAgt = navigator.userAgent;
  const clientStrings = [
    { s: "Windows", r: /Win16/ },
    { s: "Windows", r: /(Windows 95|Win95|Windows_95)/ },
    { s: "Windows", r: /(Win 9x 4.90|Windows ME)/ },
    { s: "Windows", r: /(Windows 98|Win98)/ },
    { s: "Windows", r: /Windows CE/ },
    { s: "Windows", r: /(Windows NT 5.0|Windows 2000)/ },
    { s: "Windows", r: /(Windows NT 5.1|Windows XP)/ },
    { s: "Windows", r: /Windows NT 5.2/ },
    { s: "Windows", r: /Windows NT 6.0/ },
    { s: "Windows", r: /(Windows 7|Windows NT 6.1)/ },
    { s: "Windows", r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: "Windows", r: /(Windows 8|Windows NT 6.2)/ },
    { s: "Windows", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: "Linux", r: /(Linux|X11)/ },
    { s: "iOS", r: /(iPhone|iPad|iPod)/ },
    { s: "Mac OS X", r: /Mac OS X/ },
    { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: "QNX", r: /QNX/ },
    { s: "UNIX", r: /UNIX/ },
    { s: "BeOS", r: /BeOS/ }
  ];

  const keys = Object.keys(clientStrings);
  for (let i = 0; i < keys.length; i += 1) {
    const clientObj = clientStrings[keys[i]];
    if (clientObj.r.test(nAgt)) {
      return clientObj.s;
    }
  }

  return "";
};
