if (!localStorage.getItem("loggedIn")) window.location.href = "index.html";

const windows = [...document.querySelectorAll(".window")];
const desktop = document.getElementById("desktop");
const startMenu = document.getElementById("startMenu");
const startButton = document.getElementById("startButton");
let topZ = 20;
let focusedId = null;
const DESKTOP_STATE_KEY = "subdola.desktop.v1";
let restoringDesktop = true;
let leavingSession = false;
let subjectScroll = null;

function hideStart() {
  startMenu.classList.remove("open");
  startButton.setAttribute("aria-expanded", "false");
}
function focusWindow(win) {
  // Keep windows below the desktop's topbar/taskbar stacking contexts.
  if (topZ > 900) {
    windows.sort((a,b) => Number(a.style.zIndex || 0) - Number(b.style.zIndex || 0))
      .forEach((item,i) => { item.style.zIndex = i + 1; });
    topZ = windows.length;
  }
  win.style.zIndex = ++topZ;
  focusedId = win.id;
  windows.forEach(item => item.classList.toggle("focused", item === win));
  document.querySelectorAll(".task").forEach(task => {
    task.classList.toggle("active", task.id === "task-" + win.id);
  });
  saveDesktopState();
}
function fitWindow(win) {
  if (window.matchMedia("(max-width:760px)").matches) return;
  const x = Math.max(12, Math.min(win.offsetLeft, desktop.clientWidth - win.offsetWidth - 12));
  const y = Math.max(0, Math.min(win.offsetTop, desktop.clientHeight - win.offsetHeight - 8));
  win.style.left = x + "px";
  win.style.top = y + "px";
}
function openWindow(id) {
  const win = document.getElementById(id);
  if (!win || !win.classList.contains("window")) return;
  const wasOpen = win.classList.contains("active");
  win.classList.add("active");
  document.getElementById("task-" + id)?.classList.add("visible");
  fitWindow(win);
  focusWindow(win);
  hideStart();
  if (id === "characters") initializeSubjectIndex();
  if (id === "restricted" && !wasOpen) {
    authInput.value = "";
    if (!restrictedBusy) showAuthState();
    authInput.focus();
  }
}
function focusRemaining() {
  const visible = windows.filter(win => win.classList.contains("active"))
    .sort((a,b) => Number(b.style.zIndex || 0) - Number(a.style.zIndex || 0));
  focusedId = null;
  windows.forEach(win => win.classList.remove("focused"));
  document.querySelectorAll(".task").forEach(task => task.classList.remove("active"));
  if (visible[0]) focusWindow(visible[0]);
}
function minimizeWindow(id) {
  document.getElementById(id).classList.remove("active", "focused");
  document.getElementById("task-" + id)?.classList.remove("active");
  if (focusedId === id) focusRemaining();
  saveDesktopState();
}
function closeWindow(id) {
  minimizeWindow(id);
  document.getElementById("task-" + id)?.classList.remove("visible", "active");
  saveDesktopState();
}
function taskToggle(id) {
  const win = document.getElementById(id);
  if (win.classList.contains("active") && focusedId === id) minimizeWindow(id);
  else openWindow(id);
}
function toggleStart() {
  const open = startMenu.classList.toggle("open");
  startButton.setAttribute("aria-expanded", String(open));
}

/* Reference window dragging, corrected for the desktop's own coordinate space. */
windows.forEach(win => {
  const bar = win.querySelector(".titlebar");
  let drag = null;
  bar.addEventListener("pointerdown", e => {
    if (e.button !== 0 || e.target.closest(".controls") || window.matchMedia("(max-width:760px)").matches) return;
    drag = { x:e.clientX, y:e.clientY, left:win.offsetLeft, top:win.offsetTop };
    bar.setPointerCapture(e.pointerId);
    focusWindow(win);
    e.preventDefault();
  });
  bar.addEventListener("pointermove", e => {
    if (!drag) return;
    const x = Math.max(12, Math.min(drag.left + e.clientX - drag.x, desktop.clientWidth - win.offsetWidth - 12));
    const y = Math.max(0, Math.min(drag.top + e.clientY - drag.y, desktop.clientHeight - win.offsetHeight - 8));
    win.style.left = x + "px";
    win.style.top = y + "px";
    saveDesktopState();
  });
  const endDrag = () => { drag = null; };
  bar.addEventListener("pointerup", endDrag);
  bar.addEventListener("pointercancel", endDrag);
  bar.addEventListener("lostpointercapture", endDrag);
  win.addEventListener("pointerdown", () => focusWindow(win));
});
window.addEventListener("resize", () => windows.filter(win => win.classList.contains("active")).forEach(fitWindow));
document.querySelectorAll(".desktop-icon").forEach(icon => {
  icon.addEventListener("click", e => {
    document.querySelectorAll(".desktop-icon").forEach(item => item.classList.toggle("selected", item === icon));
    // Native buttons synthesize detail=0 for keyboard and assistive activation.
    if (e.detail === 0 || e.pointerType === "touch" || e.pointerType === "pen" || window.matchMedia("(pointer:coarse)").matches) {
      openWindow(icon.dataset.window);
    }
  });
});
document.addEventListener("pointerdown", e => {
  if (!e.target.closest(".start-menu") && !e.target.closest(".start")) hideStart();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (startMenu.classList.contains("open")) {
      hideStart();
      startButton.focus();
    } else if (focusedId === "restricted") closeWindow("restricted");
  }
});

function updateClock() {
  const text = new Date().toLocaleTimeString("zh-TW", {hour:"2-digit",minute:"2-digit"});
  document.getElementById("clock").textContent = text;
  document.getElementById("clock2").textContent = text;
}
updateClock();
setInterval(updateClock, 10000);
let time = 3600;
function updateCountdown() {
  document.getElementById("countdown").textContent =
    [Math.floor(time / 3600), Math.floor((time % 3600) / 60), time % 60]
    .map(n => String(n).padStart(2,"0")).join(":");
  if (time > 0) time--;
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Preserve the original restricted-access key, storage flag and cooldown. */
const authInput = document.getElementById("authInput");
const authLog = document.getElementById("authLog");
const verifyButton = document.getElementById("verifyButton");
let restrictedFailCount = 0;
let restrictedLocked = false;
let restrictedBusy = false;
function setAuthLog(lines, error = false) {
  authLog.textContent = lines.join("\n");
  authLog.classList.toggle("error", error);
}
function showAuthState() {
  setAuthLog(restrictedLocked
    ? ["> WARNING / ACCESS TEMPORARILY LOCKED", "> COOLDOWN IN PROGRESS . . ."]
    : ["> WAITING FOR AUTHORIZATION . . ."], restrictedLocked);
}
function openRestricted() { openWindow("restricted"); }
function closeRestricted() { closeWindow("restricted"); }
function submitRestricted() {
  if (restrictedLocked || restrictedBusy) return;
  const pass = authInput.value;
  restrictedBusy = true;
  verifyButton.disabled = true;
  setAuthLog(["> READING INPUT . . .", "> VERIFYING ACCESS KEY . . ."]);
  setTimeout(() => {
    if (pass === "R18") {
      localStorage.setItem("restrictedAccess", "true");
      restrictedFailCount = 0;
      setAuthLog(["> ACCESS GRANTED", "> ENTERING RESTRICTED ARCHIVE . . ."]);
      setTimeout(() => { window.location.href = "restricted.html"; }, 900);
      return;
    }
    restrictedBusy = false;
    restrictedFailCount++;
    setAuthLog(["> ACCESS DENIED", "> FAILED ATTEMPTS / " + restrictedFailCount], true);
    if (restrictedFailCount >= 3) {
      restrictedLocked = true;
      setAuthLog(["> WARNING / ACCESS TEMPORARILY LOCKED", "> TRACE MASK ENABLED", "> RETRY AFTER COOLDOWN . . ."], true);
      setTimeout(() => {
        restrictedLocked = false;
        restrictedFailCount = 0;
        verifyButton.disabled = false;
        setAuthLog(["> LOCKDOWN RELEASED", "> WAITING FOR AUTHORIZATION . . ."]);
      }, 5000);
    } else {
      verifyButton.disabled = false;
    }
  }, 700);
}
authInput.addEventListener("keydown", e => {
  if (e.key === "Enter") { e.preventDefault(); submitRestricted(); }
});
function logout() {
  leavingSession = true;
  try { sessionStorage.removeItem(DESKTOP_STATE_KEY); } catch {}
  localStorage.clear();
  window.location.href = "index.html";
}
showAuthState();
// Move the former list initialization to the first visible program opening.
let subjectIndexInitialized = false;
function initializeSubjectIndex() {
  if (subjectIndexInitialized) return;
  requestAnimationFrame(() => {
    const index = document.getElementById("subjectIndex");
    if (!index || !index.clientWidth || subjectIndexInitialized) return;
    subjectIndexInitialized = true;
    const maxScroll = Math.max(0, index.scrollWidth - index.clientWidth);
    const restoringScroll = subjectScroll !== null;
    index.scrollTo({
      left: restoringScroll ? Math.min(subjectScroll, maxScroll) : maxScroll,
      behavior: restoringScroll || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
}

// Only desktop presentation state is saved; authentication inputs never enter storage.
function saveDesktopState() {
  if (restoringDesktop || leavingSession) return;
  const index = document.getElementById("subjectIndex");
  if (subjectIndexInitialized && index?.clientWidth) subjectScroll = index.scrollLeft;
  const state = {
    version: 1,
    windows: windows.map(win => ({
      id: win.id,
      state: win.classList.contains("active") ? "open"
        : document.getElementById("task-" + win.id)?.classList.contains("visible") ? "minimized" : "closed",
      x: parseFloat(win.style.left) || 0,
      y: parseFloat(win.style.top) || 0,
      z: Number(win.style.zIndex) || 0
    })),
    focused: focusedId,
    subjectScroll
  };
  try { sessionStorage.setItem(DESKTOP_STATE_KEY, JSON.stringify(state)); } catch {}
}
function restoreDesktopState() {
  let saved;
  try { saved = JSON.parse(sessionStorage.getItem(DESKTOP_STATE_KEY)); } catch { return false; }
  if (!saved || saved.version !== 1 || !Array.isArray(saved.windows)) return false;
  const entries = saved.windows.filter(item => item && typeof item === "object"
    && windows.some(win => win.id === item.id)
    && ["open", "minimized", "closed"].includes(item.state));
  if (!entries.length) return false;
  if (typeof saved.subjectScroll === "number" && Number.isFinite(saved.subjectScroll) && saved.subjectScroll >= 0) {
    subjectScroll = saved.subjectScroll;
  }
  for (const item of entries) {
    const win = document.getElementById(item.id);
    win.classList.toggle("active", item.state === "open");
    const task = document.getElementById("task-" + item.id);
    task?.classList.toggle("visible", item.state !== "closed");
    for (const [field, property] of [["x","left"],["y","top"]]) {
      if (typeof item[field] === "number" && Number.isFinite(item[field])) {
        win.style[property] = Math.max(0, Math.min(item[field], 100000)) + "px";
      }
    }
    win.style.zIndex = typeof item.z === "number" && Number.isFinite(item.z) ? Math.max(0, Math.min(item.z,900)) : 0;
    if (item.state === "open") fitWindow(win);
  }
  topZ = Math.max(20, ...windows.map(win => Number(win.style.zIndex) || 0));
  const focused = windows.find(win => win.id === saved.focused && win.classList.contains("active"));
  if (focused) focusWindow(focused);
  else focusRemaining();
  if (document.getElementById("characters").classList.contains("active")) initializeSubjectIndex();
  return true;
}
const subjectIndex = document.getElementById("subjectIndex");
subjectIndex?.addEventListener("scroll", saveDesktopState, { passive:true });
document.addEventListener("click", event => {
  if (event.target.closest('#subjectIndex a[href]')) saveDesktopState();
}, true);
window.addEventListener("pagehide", saveDesktopState);
window.addEventListener("resize", saveDesktopState);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveDesktopState();
});
if (!restoreDesktopState()) openWindow("control");
restoringDesktop = false;
saveDesktopState();