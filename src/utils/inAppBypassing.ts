function inAppBypassing() {
  const useragt = navigator.userAgent.toLowerCase();
  const target_url = window.location.href;

  if (useragt.match(/kakaotalk/i)) {
    window.location.href =
      "kakaotalk://web/openExternal?url=" + encodeURIComponent(target_url);
  }
}

export default inAppBypassing;
