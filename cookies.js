document.cookie.split("; ").reduce((prev, current) => {
  const [name, ...value] = current.split("=");
  prev[name] = value.join("=");
  return prev;
}, {});
