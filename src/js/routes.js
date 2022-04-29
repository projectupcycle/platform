var routes = [
  { path: "/", url: "./index.html", name: "home" },
  { path: "/index.html", url: "./index.html" },
  { path: "/intro/", url: "./pages/intro.html", name: "intro" },
  { path: "/user-login/", url: "./pages/user-login.html", name: "user-login" },
  { path: "/dept-login/", url: "./pages/dept-login.html", name: "dept-login" },
  { path: "/user/", url: "./pages/user.html", name: "user" },
  { path: "/dept/", url: "./pages/dept.html", name: "department" },
  { path: "(.*)", url: "./pages/404.html" },
];
