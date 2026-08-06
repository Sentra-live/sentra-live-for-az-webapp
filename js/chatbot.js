const chatBody = document.querySelector("#chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = fileUploadWrapper.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

// User info form elements
const userInfoForm = document.querySelector("#user-info-form");
const infoForm = document.querySelector("#info-form");
const userNameInput = document.querySelector("#user-name");
const userEmailInput = document.querySelector("#user-email");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const chatFooter = document.querySelector("#chat-footer");
const welcomeMessage = document.querySelector("#welcome-message");

// Conversation threads / presence / notification elements
const threadsToggler = document.querySelector("#threads-toggler");
const threadsPanel = document.querySelector("#threads-panel");
const threadsList = document.querySelector("#threads-list");
const newConversationBtn = document.querySelector("#new-conversation-btn");
const togglerPresenceDot = document.querySelector("#togglerPresenceDot");
const togglerUnreadBadge = document.querySelector("#togglerUnreadBadge");
const agentStatusLine = document.querySelector("#agentStatusLine");
const agentStatusText = document.querySelector("#agentStatusText");

// Keep references to the two static chat-body children (welcome message +
// predefined questions) so we can always restore them, even after the DOM
// has been emptied out to show a past conversation's real history.
const staticWelcomeNode = chatBody.children[0];
const staticPredefinedNode = document.querySelector("#predefined-questions");

// -----------------------------------------------------------------
// API Configuration
// -----------------------------------------------------------------
// All API calls are now routed through the backend server for security
// No direct calls to external APIs from the frontend
// Determine the API endpoint based on current environment
const getAPIEndpoint = () => {
  // Check if running on localhost with Live Server (port 5539)
  if (window.location.port === '5539') {
    // Return production worker for testing on localhost
    return 'https://veronica-sentra-prod.subharam-v.workers.dev/api/chat';
  }

  // Check if running on localhost:3000 (Node server)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/api/chat';
  }

  // Production deployment - use Cloudflare Worker (production environment)
  const PRODUCTION_BACKEND_URL = 'https://veronica-sentra-prod.subharam-v.workers.dev/api/chat';

  return PRODUCTION_BACKEND_URL;
};

const API_ENDPOINT = getAPIEndpoint();

// Request throttling to prevent rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second minimum between requests

const shouldThrottleRequest = () => {
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    return true;
  }
  lastRequestTime = now;
  return false;
};

// Initialize user message and file data
const userData = {
  message: null,
  file: {
    data: null,
    mimeType: null, // <-- FIX: Changed from mime_type
  },
};

// User profile data
let userProfile = {
  name: null,
  email: null,
  isFormSubmitted: false
};

// Function to save user profile to localStorage
function saveUserProfile() {
  localStorage.setItem('sentraChatbotUserProfile', JSON.stringify(userProfile));
}

// Function to load user profile from localStorage
function loadUserProfile() {
  const savedProfile = localStorage.getItem('sentraChatbotUserProfile');
  if (savedProfile) {
    userProfile = JSON.parse(savedProfile);
    return true;
  }
  return false;
}

// Store chat history - Now starts empty.
const chatHistory = [];
const MAX_CHAT_HISTORY = 20; // keep last 20 exchanges to avoid payload bloat

// Chat session ID for tracking in admin dashboard
let chatSessionId = localStorage.getItem('sentraChatSessionId');
if (!chatSessionId) {
  chatSessionId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('sentraChatSessionId', chatSessionId);
}

// Function to save chat message to backend for admin dashboard
async function saveChatMessage(message, sender) {
  try {
    const apiBaseUrl = getAPIEndpoint().replace('/api/chat', '');
    await fetch(apiBaseUrl + '/api/chat-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: chatSessionId,
        message: message,
        leadName: userProfile.name || '',
        leadEmail: userProfile.email || '',
        sender: sender
      })
    });
  } catch (e) {
    console.error('Failed to save chat message:', e);
  }
  upsertThread(chatSessionId, message);
}

function escapeForHtml(str) {
  const d = document.createElement('div');
  d.textContent = str == null ? '' : str;
  return d.innerHTML;
}

const BOT_AVATAR_SVG = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
  <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.9-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" />
</svg>`;

// -----------------------------------------------------------------
// Lead Qualification Questionnaire
// -----------------------------------------------------------------
// An agent can push this from the admin dashboard ("Send Questionnaire").
// It arrives as a normal agent chat message whose text is this sentinel;
// instead of showing that literal text, the widget renders an interactive
// button flow. The final answer is saved as a regular chat message (via
// saveChatMessage), so it flows through the exact same admin notification
// pipeline (badge + sound) as any other message - no separate plumbing needed.
const QUALIFY_SENTINEL = '__QUALIFY_START__';
const IMG_MSG_PREFIX = '__IMG__';

const QUALIFY_PRODUCT_CATEGORIES = ['Edge Devices', 'Core Communications', 'Wired Sensors', 'Not sure yet'];
const QUALIFY_SOLUTION_CATEGORIES = [
  'Structural Health Monitoring', 'Advanced NDT', 'Bridge Inspection',
  'Asset Monitoring', 'Geotechnical Monitoring', 'Fatigue Assessment',
  'Digital Engineering', 'Not sure yet'
];

function renderQualifyOptions(options, onSelect) {
  const wrap = document.createElement('div');
  wrap.className = 'qualify-options';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qualify-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      wrap.remove();
      onSelect(opt);
    });
    wrap.appendChild(btn);
  });
  chatBody.appendChild(wrap);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
  return wrap;
}

function appendQualifyBotNote(text) {
  const div = createMessageElement(
    `${BOT_AVATAR_SVG}<div class="message-text">${escapeForHtml(text)}</div>`,
    'bot-message'
  );
  chatBody.appendChild(div);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
}

function appendQualifyUserChoice(text) {
  const div = createMessageElement(`<div class="message-text">${escapeForHtml(text)}</div>`, 'user-message');
  chatBody.appendChild(div);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
  saveChatMessage(text, 'user');
}

function finalizeQualification(category, subcategory) {
  const summary = subcategory && subcategory !== 'Not sure yet'
    ? `📋 Lead Interest: ${category} → ${subcategory}`
    : `📋 Lead Interest: ${category}`;
  appendQualifyUserChoice(summary);
  appendQualifyBotNote("Thanks! I've passed this along to our team — they'll follow up with more details shortly.");
}

function startQualificationFlow() {
  appendQualifyBotNote("Is there anything specific you're looking for?");
  renderQualifyOptions(['Products', 'Solutions', 'Just browsing'], (choice) => {
    appendQualifyUserChoice(choice);
    if (choice === 'Products') {
      appendQualifyBotNote('Which product category interests you?');
      renderQualifyOptions(QUALIFY_PRODUCT_CATEGORIES, (sub) => finalizeQualification(choice, sub));
    } else if (choice === 'Solutions') {
      appendQualifyBotNote('Which solution area interests you?');
      renderQualifyOptions(QUALIFY_SOLUTION_CATEGORIES, (sub) => finalizeQualification(choice, sub));
    } else {
      finalizeQualification(choice, '');
    }
  });
}

// -----------------------------------------------------------------
// Conversation Threads (per-device history, switch / delete / new)
// -----------------------------------------------------------------
// "Delete" here only removes the thread from this browser's local list -
// the admin dashboard / Google Sheet always keeps the full record.
const THREADS_KEY = 'sentraChatThreads';

function getThreads() {
  try { return JSON.parse(localStorage.getItem(THREADS_KEY) || '[]'); } catch { return []; }
}

function saveThreads(threads) {
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}

function upsertThread(sessionId, lastMessage) {
  const threads = getThreads();
  const idx = threads.findIndex(t => t.sessionId === sessionId);
  const existing = idx >= 0 ? threads[idx] : null;
  const entry = {
    sessionId,
    lastMessage: lastMessage || (existing ? existing.lastMessage : ''),
    updatedAt: Date.now(),
    createdAt: existing ? existing.createdAt : Date.now()
  };
  if (idx >= 0) threads[idx] = entry; else threads.unshift(entry);
  saveThreads(threads);
}

function removeThreadLocal(sessionId) {
  saveThreads(getThreads().filter(t => t.sessionId !== sessionId));
}

function renderThreadsPanel() {
  const threads = getThreads().sort((a, b) => b.updatedAt - a.updatedAt);
  if (!threads.length) {
    threadsList.innerHTML = '<div class="threads-empty">No past conversations yet.</div>';
    return;
  }
  threadsList.innerHTML = threads.map(t => `
    <div class="thread-item ${t.sessionId === chatSessionId ? 'active' : ''}" data-session-id="${t.sessionId}">
      <div class="thread-item-main" data-action="switch">
        <div class="thread-item-date">${new Date(t.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
        <div class="thread-item-preview">${escapeForHtml(t.lastMessage || 'New conversation')}</div>
      </div>
      <button type="button" class="thread-item-delete" data-action="delete" title="Delete from this device">🗑</button>
    </div>
  `).join('');
}

function openThreadsPanel() {
  renderThreadsPanel();
  threadsPanel.style.display = 'flex';
}

function closeThreadsPanel() {
  threadsPanel.style.display = 'none';
}

if (threadsToggler) {
  threadsToggler.addEventListener('click', () => {
    if (threadsPanel.style.display === 'flex') closeThreadsPanel();
    else openThreadsPanel();
  });
}

if (threadsList) {
  threadsList.addEventListener('click', (e) => {
    const item = e.target.closest('.thread-item');
    if (!item) return;
    const sid = item.dataset.sessionId;
    if (e.target.closest('[data-action="delete"]')) {
      removeThreadLocal(sid);
      renderThreadsPanel();
      return;
    }
    if (sid !== chatSessionId) switchToThread(sid);
    else closeThreadsPanel();
  });
}

if (newConversationBtn) {
  newConversationBtn.addEventListener('click', startNewConversation);
}

function stopChatPolling() {
  if (agentPollTimer) { clearInterval(agentPollTimer); agentPollTimer = null; }
}

// Empties chat-body completely so a past conversation's real transcript can
// be shown in its place.
function clearChatBodyForHistory() {
  while (chatBody.firstChild) chatBody.removeChild(chatBody.firstChild);
}

// Restores the original welcome message + predefined-question cards for a
// brand new conversation.
function resetToFreshConversationView() {
  clearChatBodyForHistory();
  chatBody.appendChild(staticWelcomeNode);
  if (staticPredefinedNode) {
    chatBody.appendChild(staticPredefinedNode);
    staticPredefinedNode.style.display = '';
  }
  const greeting = getTimeBasedGreeting();
  welcomeMessage.textContent = `${greeting}, ${userProfile.name}! How can I help you today?`;
}

function renderHistoryMessage(m) {
  if (m.sender === 'user') {
    const div = createMessageElement(`<div class="message-text">${escapeForHtml(m.message)}</div>`, 'user-message');
    chatBody.appendChild(div);
  } else if (m.sender === 'agent') {
    if (m.message === QUALIFY_SENTINEL) {
      // Don't replay the interactive button flow when just viewing history -
      // just note that it happened.
      appendSystemNotice('📋 A qualification questionnaire was sent in this conversation.');
    } else {
      appendAgentMessage(m.message, m.agentName, true);
    }
  } else {
    const div = createMessageElement(`${BOT_AVATAR_SVG}<div class="message-text">${parseMarkdown(m.message)}</div>`, 'bot-message');
    chatBody.appendChild(div);
  }
}

async function loadThreadHistoryIntoView(sessionId) {
  try {
    const apiBaseUrl = getAPIEndpoint().replace('/api/chat', '');
    const res = await fetch(apiBaseUrl + '/api/chat-history?sessionId=' + encodeURIComponent(sessionId));
    if (!res.ok) return;
    const data = await res.json();
    const messages = data.messages || [];
    messages.forEach(renderHistoryMessage);
    lastSeenChatCount = messages.length;

    const last = messages[messages.length - 1];
    if (last && last.sender === 'agent' && last.status !== 'closed') {
      liveAgentConnected = true;
      updateAgentStatusUI(true, last.agentName);
    } else {
      updateAgentStatusUI(false);
    }
  } catch (e) {
    console.error('Failed to load thread history:', e);
  }
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'auto' });
}

async function switchToThread(sessionId) {
  stopChatPolling();
  chatSessionId = sessionId;
  localStorage.setItem('sentraChatSessionId', chatSessionId);
  liveAgentConnected = false;
  lastSeenChatCount = 0;
  clearChatBodyForHistory();
  await loadThreadHistoryIntoView(sessionId);
  startChatPolling();
  closeThreadsPanel();
}

function startNewConversation() {
  stopChatPolling();
  const newId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  chatSessionId = newId;
  localStorage.setItem('sentraChatSessionId', chatSessionId);
  liveAgentConnected = false;
  lastSeenChatCount = 0;
  updateAgentStatusUI(false);
  resetToFreshConversationView();
  upsertThread(newId, '');
  startChatPolling();
  closeThreadsPanel();
}

// -----------------------------------------------------------------
// Live Agent Handover
// -----------------------------------------------------------------
// While a human support agent is actively replying from the admin
// dashboard, the AI (Veronica) stays quiet so the two don't talk over
// each other. We detect this by polling /api/chat-history for this
// session and watching for messages with sender === 'agent'. When the
// admin clicks "End Chat" the last row's status flips to 'closed',
// which is our signal to resume the AI.
let liveAgentConnected = false;
let lastSeenChatCount = 0;
let agentPollTimer = null;
let widgetUnreadCount = 0;

function isWidgetOpen() {
  return document.body.classList.contains('show-chatbot');
}

function updateTogglerBadge() {
  if (widgetUnreadCount > 0) {
    togglerUnreadBadge.textContent = widgetUnreadCount > 9 ? '9+' : String(widgetUnreadCount);
    togglerUnreadBadge.style.display = 'flex';
  } else {
    togglerUnreadBadge.style.display = 'none';
  }
}

function updateAgentStatusUI(connected, agentName) {
  if (connected) {
    agentStatusLine.style.display = 'flex';
    agentStatusText.textContent = (agentName || 'Support agent') + ' is here';
    togglerPresenceDot.style.display = 'block';
    togglerPresenceDot.classList.remove('dot-red');
    togglerPresenceDot.classList.add('dot-green');
  } else {
    agentStatusLine.style.display = 'none';
    togglerPresenceDot.classList.remove('dot-green');
    togglerPresenceDot.style.display = 'none';
  }
}

function flashAgentLeftDot() {
  togglerPresenceDot.classList.remove('dot-green');
  togglerPresenceDot.classList.add('dot-red');
  togglerPresenceDot.style.display = 'block';
  setTimeout(() => {
    togglerPresenceDot.classList.remove('dot-red');
    togglerPresenceDot.style.display = 'none';
  }, 6000);
}

function appendSystemNotice(text) {
  const noticeDiv = createMessageElement(
    `<div class="message-text" style="text-align:center;font-size:12px;color:var(--text-muted,#787c82);width:100%;">${text}</div>`,
    "bot-message",
    "system-notice"
  );
  chatBody.appendChild(noticeDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

function appendAgentMessage(text, agentName, skipUnread) {
  const isImage = typeof text === 'string' && text.startsWith(IMG_MSG_PREFIX);
  const bodyHtml = isImage
    ? `<img src="${text.slice(IMG_MSG_PREFIX.length)}" class="agent-image-attachment" alt="Attachment">`
    : escapeForHtml(text);
  const agentDiv = createMessageElement(
    `<div class="message-text"><strong style="color:#f48120;">${escapeForHtml(agentName || 'Support Agent')}</strong><br>${bodyHtml}</div>`,
    "bot-message",
    "agent-message"
  );
  chatBody.appendChild(agentDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  upsertThread(chatSessionId, isImage ? '📎 Image' : text);

  if (!skipUnread && !isWidgetOpen()) {
    widgetUnreadCount++;
    updateTogglerBadge();
    playNotifySound();
  }
}

// A beep needs one prior user gesture on the page before browsers allow
// audio - grab the first click anywhere to unlock it.
let widgetAudioCtx = null;
document.addEventListener('click', () => {
  if (!widgetAudioCtx) {
    try { widgetAudioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
}, { once: true });

function playNotifySound() {
  if (!widgetAudioCtx) return;
  try {
    const o = widgetAudioCtx.createOscillator();
    const g = widgetAudioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = 740;
    g.gain.value = 0.15;
    o.connect(g);
    g.connect(widgetAudioCtx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, widgetAudioCtx.currentTime + 0.4);
    o.stop(widgetAudioCtx.currentTime + 0.4);
  } catch (e) {}
}

async function pollChatUpdates() {
  try {
    const apiBaseUrl = getAPIEndpoint().replace('/api/chat', '');
    const res = await fetch(apiBaseUrl + '/api/chat-history?sessionId=' + encodeURIComponent(chatSessionId));
    if (!res.ok) return;
    const data = await res.json();
    const messages = data.messages || [];

    if (messages.length > lastSeenChatCount) {
      const newMessages = messages.slice(lastSeenChatCount);
      newMessages.forEach((m) => {
        if (m.sender === 'agent') {
          if (!liveAgentConnected) {
            liveAgentConnected = true;
            appendSystemNotice('🟢 A support agent has joined the conversation. Veronica will pause while they assist you.');
            updateAgentStatusUI(true, m.agentName);
          }
          if (m.message === QUALIFY_SENTINEL) {
            startQualificationFlow();
          } else {
            appendAgentMessage(m.message, m.agentName);
          }
        }
      });
      lastSeenChatCount = messages.length;
    }

    const lastStatus = messages.length ? messages[messages.length - 1].status : '';
    if (liveAgentConnected && lastStatus === 'closed') {
      liveAgentConnected = false;
      appendSystemNotice('🔴 The support agent has left the chat. Veronica is back to help you.');
      updateAgentStatusUI(false);
      flashAgentLeftDot();
    }
  } catch (err) {
    console.error('Chat poll failed:', err);
  }
}

// Establish a baseline message count first so we don't replay an old,
// already-closed conversation's agent messages as if they were new.
async function startChatPolling() {
  if (agentPollTimer) return;
  try {
    const apiBaseUrl = getAPIEndpoint().replace('/api/chat', '');
    const res = await fetch(apiBaseUrl + '/api/chat-history?sessionId=' + encodeURIComponent(chatSessionId));
    if (res.ok) {
      const data = await res.json();
      lastSeenChatCount = (data.messages || []).length;
    }
  } catch (e) {
    console.error('Chat poll baseline failed:', e);
  }
  agentPollTimer = setInterval(pollChatUpdates, 7000);
}

// -----------------------------------------------------------------
// Presence heartbeat (lets the admin see if the user's chat box is open)
// -----------------------------------------------------------------
let presenceInterval = null;

async function sendPresence(status) {
  try {
    const apiBaseUrl = getAPIEndpoint().replace('/api/chat', '');
    await fetch(apiBaseUrl + '/api/chat-presence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: chatSessionId, status })
    });
  } catch (e) {}
}

function sendPresenceBeacon(status) {
  try {
    const apiBaseUrl = getAPIEndpoint().replace('/api/chat', '');
    const blob = new Blob([JSON.stringify({ sessionId: chatSessionId, status })], { type: 'application/json' });
    navigator.sendBeacon(apiBaseUrl + '/api/chat-presence', blob);
  } catch (e) {}
}

function startPresenceHeartbeat() {
  sendPresence('open');
  if (presenceInterval) clearInterval(presenceInterval);
  presenceInterval = setInterval(() => sendPresence('open'), 30000);
}

function stopPresenceHeartbeat() {
  if (presenceInterval) { clearInterval(presenceInterval); presenceInterval = null; }
  sendPresence('closed');
}

window.addEventListener('beforeunload', () => sendPresenceBeacon('closed'));
document.addEventListener('visibilitychange', () => {
  if (!userProfile.isFormSubmitted) return;
  if (document.visibilityState === 'hidden') {
    if (isWidgetOpen()) sendPresenceBeacon('closed');
  } else if (isWidgetOpen()) {
    startPresenceHeartbeat();
  }
});

// ----- Site content fetching (sentratech.in) -----
let cachedSiteContent = null;
const SITE_PAGES = [
  '/',
  '/products.html',
  '/solutions.html',
  '/about.html'
];

async function fetchSiteContent() {
  if (cachedSiteContent) return cachedSiteContent;
  const parts = [];
  
  for (const path of SITE_PAGES) {
    try {
      // Use relative path directly to ensure it uses the current origin automatically
      const resp = await fetch(path, { method: 'GET' });
      if (!resp.ok) continue;
      const html = await resp.text();
      // extract visible text using DOMParser to avoid raw HTML
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // remove script and style
        doc.querySelectorAll('script,style,noscript').forEach(n => n.remove());
        const text = doc.body.innerText.replace(/\s+/g, ' ').trim();
        if (text) parts.push(`--- ${path} ---\n${text}`);
      } catch (e) {
        // fallback: strip tags
        const stripped = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (stripped) parts.push(`--- ${path} ---\n${stripped}`);
      }
    } catch (err) {
      // skip page on error
    }
    // stop if we collected a lot
    if (parts.join('\n').length > 15000) break;
  }
  cachedSiteContent = parts.join('\n\n').slice(0, 15000);
  return cachedSiteContent;
}

// ----- Interaction & CTA management -----
const INTERACTION_KEY = 'sentratech_chat_interactions_v1';
const CTA_SUPPRESS_KEY = 'sentratech_cta_suppressed_v1';
const CTA_SHOWN_KEY = 'sentratech_cta_shown_v1';

function getInteractionCount() {
  return parseInt(localStorage.getItem(INTERACTION_KEY) || '0', 10);
}

function incrementInteractionCount() {
  const next = getInteractionCount() + 1;
  localStorage.setItem(INTERACTION_KEY, String(next));
  return next;
}

function isCtaSuppressed() {
  return localStorage.getItem(CTA_SUPPRESS_KEY) === '1';
}

function markCtaSuppressed() {
  localStorage.setItem(CTA_SUPPRESS_KEY, '1');
}

function isCtaShown() {
  return localStorage.getItem(CTA_SHOWN_KEY) === '1';
}

function markCtaShown() {
  localStorage.setItem(CTA_SHOWN_KEY, '1');
}

// strip emojis and other pictographs
function stripEmojis(text) {
  if (!text) return text;
  // wide regex to remove most emoji ranges
  return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF])/g, '')
    .replace(/\uFE0F/g, '')
    .replace(/\s+\u200D\s+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// =============================================================
// Predefined Questions & Answers (Smart Matching)
// =============================================================
const predefinedQuestions = [
  {
    id: 'shm',
    question: 'What is Structural Health Monitoring?',
    keywords: ['structural health monitoring', 'shm', 'bridge monitoring', 'real-time monitoring', 'structure monitoring', 'health monitoring'],
    category: 'Solutions',
    answer: `**Structural Health Monitoring (SHM)**

Sentra's Structural Health Monitoring delivers continuous, real-time data collection using wireless sensors and edge devices to detect stress, strain, displacement, and vibration in infrastructure assets.

**Key Capabilities:**
- Real-time monitoring for bridges, buildings, tunnels, and railways
- Early warning detection for structural anomalies
- AI-powered predictive analytics for proactive maintenance
- Integration with BIM/GIS for digital twin visualization
- Cloud-based dashboards with customizable alerts

**Benefits:**
- Extends asset lifespan through data-driven maintenance
- Reduces inspection costs with automated monitoring
- Enhances public safety with real-time alerts

[Learn more about SHM](./solutions/structural-health-monitoring.html)`
  },
  {
    id: 'edge-devices',
    question: 'Tell me about Edge Devices',
    keywords: ['edge device', 'edge', 'sensor', 'wireless sensor', 'data logger', 'iot device', 'vibrating wire', 'tiltmeter', 'data acquisition'],
    category: 'Products',
    answer: `**Edge Devices Overview**

Sentra Edge Devices are designed for continuous structural health monitoring across diverse environments. They capture acceleration data across a wide frequency spectrum (0.1 Hz - 10 kHz) and transmit it to cloud platforms for real-time visualization.

**Product Lineup:**
- **Vibrating Wire** - Precise strain and pressure measurements for geotechnical monitoring
- **Vibrating Wire RCR** - Enhanced model with real-time compensation
- **Digital Data Logger** - Captures and transmits sensor data via LoRaWAN or LTE
- **Analog Data Logger** - Supports analog sensor inputs
- **Piconode Data Logger** - Compact, low-power logger for distributed networks
- **Tiltmeter** - Monitors structural inclination in real time
- **Tiltmeter Event Detection** - Detects sudden tilting events automatically
- **Vibration Meter** - Records vibration patterns for structural integrity
- **Laser Tiltmeter** - High-precision optical micro-level tilt detection
- **GNSS Meter** - Geospatial displacement tracking using satellite positioning

**Key Features:** 3-axis MEMS, IP67 rated, 5-10 year battery, LoRaWAN & 4G LTE

[Explore Edge Devices](./products/edge-devices.html)`
  },
  {
    id: 'wired-sensors',
    question: 'What Wired Sensors do you offer?',
    keywords: ['wired sensor', 'accelerometer', 'strain gauge', 'wired', 'cable sensor', '4100 series'],
    category: 'Products',
    answer: `**Wired Sensors**

Sentra Wired Sensors deliver precise, real-time data for continuous structural health monitoring. They provide direct, stable, and interference-free measurements ideal for long-term monitoring.

**Product Lineup:**
- **Accelerometer** - High-precision vibration sensor for acceleration, velocity, and displacement. Ideal for bridge vibration, seismic, and dynamic load monitoring.
- **Spot Weldable Strain Gauge** - Compact sensor for measuring localized strain on steel structures. Rugged design for harsh conditions.
- **4100 Series Strain Gauge** - High-accuracy strain measurement for long-term structural monitoring of bridges, tunnels, and geotechnical applications.

[Explore Wired Sensors](./products/wired-sensors.html)`
  },
  {
    id: 'core-communications',
    question: 'What is Core Communications?',
    keywords: ['core communications', 'gateway', 'repeater', 'thread', 'communication', 'narrowband', 'broadband', 'lorawan'],
    category: 'Products',
    answer: `**Core Communications**

Sentra Core Communications forms the backbone of the monitoring ecosystem, enabling seamless data transmission between edge devices and cloud platforms.

**Narrowband Communications:**
- **4G Rugged Gateway** - Outdoor LoRa gateway with 4G and Ethernet backhaul. Core communication hub for edge devices.
- **K20 Edge Repeater** - Extends network range by relaying data between remote sensors and gateways in underground or tunnel environments.

**Broadband Communications:**
- **Thread X3** - High-speed broadband module for data-intensive monitoring. Features 4G/LTE modem, wireless mesh networking, and battery pack.

[Explore Core Communications](./products/core-communications.html)`
  },
  {
    id: 'ndt',
    question: 'What is Advanced NDT?',
    keywords: ['ndt', 'non-destructive testing', 'non destructive', 'ultrasonic', 'ground penetrating radar', 'inspection', 'testing method'],
    category: 'Solutions',
    answer: `**Advanced Non-Destructive Testing (NDT)**

Sentra provides precision inspection techniques to evaluate material properties and detect hidden defects without causing damage to the structure.

**Techniques Include:**
- Ultrasonic Testing - Detects internal flaws using high-frequency sound waves
- Ground Penetrating Radar (GPR) - Maps subsurface structures and utilities
- Phased Array Ultrasonics - Advanced imaging for complex geometries
- Acoustic Emission Monitoring - Detects active cracks and material failure
- Thermography - Identifies moisture, insulation issues, and delamination

**Applications:** Bridges, tunnels, pipelines, industrial structures, heritage buildings

[Learn about NDT](./solutions/advanced-non-destructive-testing-ndt.html)`
  },
  {
    id: 'digital-twin',
    question: 'What is Digital Twin?',
    keywords: ['digital twin', 'digital', 'twin', 'bim', '3d model', 'simulation', 'virtual'],
    category: 'Solutions',
    answer: `**Digital Twin & Simulation**

Sentra creates integrated digital twins combining BIM, IoT, and GIS data to enable continuous performance monitoring and simulation of real-world infrastructure systems.

**Key Features:**
- Real-time synchronization with physical assets
- Predictive simulation for maintenance planning
- 3D visualization with sensor data overlay
- Historical data analysis for trend identification
- Integration with existing BIM/GIS workflows

**Benefits:**
- Improved decision-making with real-time insights
- Reduced downtime through predictive analytics
- Enhanced collaboration across engineering teams

[Learn about Digital Twin](./solutions/digital-twin.html)`
  },
  {
    id: 'fatigue-assessment',
    question: 'What is Fatigue Assessment?',
    keywords: ['fatigue', 'residual life', 'life assessment', 'structural lifespan', 'rul', 'remaining useful life', 'fatigue assessment'],
    category: 'Solutions',
    answer: `**Fatigue and Residual Life Assessment**

Sentra provides structural lifespan evaluation and Remaining Useful Life (RUL) estimation using advanced analytics and monitoring data.

**Our Approach:**
- Continuous stress and strain monitoring
- Load history analysis and fatigue damage calculation
- Crack propagation modeling
- Remaining useful life prediction
- Prioritized maintenance recommendations

**Applications:**
- Bridges and highway structures
- Industrial machinery and equipment
- Offshore and marine structures
- Railway infrastructure

[Learn about Fatigue Assessment](./solutions/fatigue-and-residual-life-assessment.html)`
  },
  {
    id: 'parent-company',
    question: 'Who is Sentra parent company?',
    keywords: ['parent company', 'clove', 'clove technologies', 'parent', 'ownership', 'company', 'who owns'],
    category: 'Company',
    answer: `**Parent Organization**

Sentra is a flagship product line developed and managed by **Clove Technologies Private Limited**.

**About Clove Technologies:**
With over two decades of industry expertise, Clove Technologies integrates advanced geospatial intelligence, engineering analytics, and AI-driven automation.

**Specialities:**
1. Geospatial Technologies - GIS, LiDAR, remote sensing, spatial analytics
2. BIM and Digital Engineering - 3D modeling, 4D scheduling, 5D cost estimation
3. Smart Infrastructure Solutions - IoT monitoring (Sentra), predictive maintenance
4. Custom Software Development - Enterprise applications and mobile tools
5. AI, ML & Data Analytics - Predictive modeling and anomaly detection
6. Digital Twin & Simulation - Integrated BIM + IoT + GIS
7. Surveying & Data Acquisition - UAV, GNSS, laser scanning

**Website:** [www.clovetech.com](https://www.clovetech.com)`
  },
  {
    id: 'contact',
    question: 'How can I contact Sentra?',
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'address', 'location', 'office', 'get in touch'],
    category: 'Company',
    answer: `**Contact Sentra**

We would be happy to discuss your infrastructure monitoring needs.

**Phone:** +91 7893023322
**Email:** sentra@clovetech.com
**Office Address:** IT SEZ, Plot No. 9, Pedda Rushikonda, Rushikonda, Visakhapatnam, Andhra Pradesh 530045

To schedule a call and discuss your project requirements, please use the options below.

[Schedule a Call](https://calendly.com/sentra-clovetech/30min?primary_color=f47b0a)`
  },
  {
    id: 'tiltmeter',
    question: 'Tell me about the Tiltmeter',
    keywords: ['tiltmeter', 'tilt', 'inclination', 'inclinometer', 'ls-g6-til90', 'til90', 'ground movement'],
    category: 'Products',
    answer: `**Tiltmeter (LS-G6-TIL90)**

Worldsensing Tiltmeter provides high-precision measurements of relative inclination changes in structures, ground movements, and differential settlements.

**Models:**
- **LS-G6-TIL90-X** - External antenna for high-precision applications
- **LS-G6-TIL90-I** - Internal antenna for rail track monitoring

**Technical Specifications:**
- 3-axis MEMS accelerometer with integrated thermometer
- Range: ±90°
- Accuracy: ±0.005° (X), ±0.006° (I)
- Resolution: ±0.0001°
- Battery Life: Up to >25 years (1h reporting)
- IP68 weather protection
- LoRa radio communication (up to 15 km range)

**Applications:** Track geometry monitoring, slope stability, structural settlement

[Explore Tiltmeter](./products/tiltmeter.html)`
  },
  {
    id: 'vibrating-wire',
    question: 'What is the Vibrating Wire?',
    keywords: ['vibrating wire', 'vw', 'strain', 'piezometer', 'load cell', 'pressure cell', 'ls-g6-vw'],
    category: 'Products',
    answer: `**Vibrating Wire Data Logger (LS-G6-VW)**

The Vibrating Wire Data Logger automates data collection by connecting vibrating wire instruments wirelessly to monitoring systems.

**Models:**
- **LS-G6-VW** - 5 Channel (external antenna)
- **LS-G6-VW-1** - 1 Channel (external antenna)
- **LS-G6-VW-RCR** - Ultra-robust for embedding in precast concrete

**Technical Specifications:**
- Measurement Range: 300 to 7000 Hz
- Accuracy: 0.008% to 0.013%
- Resolution: <0.01 Hz
- Up to 25 years of unattended operation
- Up to 15 km communication range using LoRa
- IP68 weather protection

**Applications:** Tunnel linings, dams, bridges, geotechnical structures

[Explore Vibrating Wire](./products/vibrating-wire.html)`
  },
  {
    id: 'geotechnical-monitoring',
    question: 'What is Geotechnical Monitoring?',
    keywords: ['geotechnical', 'foundation', 'soil', 'slope', 'settlement', 'ground movement', 'excavation'],
    category: 'Solutions',
    answer: `**Geotechnical and Foundation Monitoring**

Sentra provides comprehensive monitoring solutions for soil stability, foundation settlement, and slope movements.

**Monitoring Parameters:**
- Soil deformation and settlement
- Pore water pressure
- Groundwater levels
- Slope inclination and movement
- Foundation tilt and displacement
- Vibrations during construction

**Applications:**
- Deep excavations and retaining walls
- Tunnel construction
- Embankments and dam foundations
- Landslide-prone areas
- Building and bridge foundations

[Learn about Geotechnical Monitoring](./solutions/geotechnical-and-foundation-monitoring.html)`
  },
  {
    id: 'bridge-inspection',
    question: 'What does Bridge Inspection involve?',
    keywords: ['bridge inspection', 'bridge', 'condition assessment', 'bridge assessment', 'bridge monitoring', 'inspection'],
    category: 'Solutions',
    answer: `**Bridge Inspection and Condition Assessment**

Sentra provides comprehensive bridge condition assessment and lifecycle management services.

**Our Approach:**
- Visual inspection and documentation
- Non-destructive testing (ultrasonic, GPR)
- Load rating and capacity analysis
- Continuous monitoring with IoT sensors
- AI-powered anomaly detection
- Digital twin integration for lifecycle management

**Benefits:**
- Extended bridge service life
- Reduced maintenance costs
- Enhanced public safety
- Data-driven repair prioritization

[Learn about Bridge Inspection](./solutions/bridge-inspection-and-condition-assessment.html)`
  },
  {
    id: 'vibration-meter',
    question: 'Tell me about the Vibration Meter',
    keywords: ['vibration meter', 'vibration', 'ppv', 'law', 'acceleration', 'lsg7acl', 'dynamic load'],
    category: 'Products',
    answer: `**Vibration Meter (LSG7ACL-BILH-VIB)**

The Vibration Meter is a wireless sensor that automates data collection for long-term, continuous vibration monitoring.

**Key Features:**
- High-precision 3-axis MEMS accelerometer
- Up to 1000 Hz derived from a 4k Hz signal
- Exception-based edge algorithm for threshold breach detection using LAW/PPV and frequency
- Configurable operational modes for different regulatory standards

**Battery Life:** Up to 1.5 years (30 min reporting period)
**Communication:** LoRa, up to 10 km with repeaters
**Applications:** Construction vibration monitoring, structural dynamics, blast monitoring

[Explore Vibration Meter](./products/vibration-meter.html)`
  },
  {
    id: 'gnss-meter',
    question: 'Tell me about the GNSS Meter',
    keywords: ['gnss', 'gnss meter', 'gps', 'displacement', 'rtk', 'satellite', 'positioning'],
    category: 'Products',
    answer: `**GNSS Meter (LSG7GNS-SXLH)**

Worldsensing's GNSS Meter enables precise automated measurement of surface point movements with millimetric precision.

**Key Features:**
- Sub-centimeter 3D positioning with RTK technology (2mm for 24h aggregated)
- Operates as both base and rover
- Integrated tiltmeter and environmental sensors
- Multi-band: GPS, GLONASS, Galileo, BeiDou

**Battery Life:** Up to 2.6 years (1h reporting)
**Communication:** LoRa radio (ISM sub-GHz)
**Applications:** Landslide monitoring, structural settlement, deformation monitoring

[Explore GNSS Meter](./products/gnss-meter.html)`
  },
  {
    id: 'asset-monitoring',
    question: 'What is Asset Monitoring?',
    keywords: ['asset monitoring', 'asset management', 'lifecycle management', 'predictive maintenance', 'asset health'],
    category: 'Solutions',
    answer: `**Asset Monitoring and Management Solutions**

Sentra provides end-to-end asset management with real-time dashboards and predictive analytics.

**Key Capabilities:**
- Real-time asset health tracking
- Predictive maintenance scheduling
- Lifecycle cost optimization
- Multi-site portfolio management
- Integration with existing asset management systems

**Benefits:**
- Reduce maintenance costs by up to 40%
- Extend asset service life through data-driven decisions
- Improve operational efficiency with automated alerts

[Learn about Asset Monitoring](./solutions/asset-monitoring-and-management-solutions.html)`
  },
  {
    id: 'consulting',
    question: 'What Consulting Services do you offer?',
    keywords: ['consulting', 'advisory', 'expert', 'advice', 'feasibility', 'strategy', 'assessment'],
    category: 'Solutions',
    answer: `**Consulting and Advisory Services**

Sentra provides expert engineering advice and deployment strategies for infrastructure monitoring.

**Services Include:**
- Feasibility studies and technical assessments
- Monitoring strategy development
- Sensor selection and deployment planning
- Data interpretation and reporting
- Risk assessment and mitigation planning

Our consultants bring deep domain expertise across structural engineering, IoT systems, and geotechnical analysis.

[Learn about Consulting](./solutions/consulting-and-advisory-services.html)`
  },
  {
    id: 'digital-engineering',
    question: 'What is Digital Engineering?',
    keywords: ['digital engineering', 'bim', '3d modeling', 'documentation', 'digital workflow', 'cad'],
    category: 'Solutions',
    answer: `**Digital Engineering and Documentation**

Sentra provides BIM, 3D modeling, digital twins, and comprehensive documentation services.

**Capabilities:**
- Building Information Modeling (BIM) for infrastructure
- 3D laser scanning and point cloud processing
- As-built documentation and BIM-to-field workflows
- Digital twin creation from IoT sensor data
- CAD drafting and engineering drawings

**Benefits:**
- Improved collaboration across project teams
- Reduced design and construction errors
- Enhanced facility management with accurate digital records

[Learn about Digital Engineering](./solutions/digital-engineering-and-documentation.html)`
  },
  {
    id: 'industries',
    question: 'What industries does Sentra serve?',
    keywords: ['industry', 'industries', 'verticals', 'sectors', 'railway', 'bridge', 'building', 'mining', 'port', 'dam', 'construction', 'tunnel'],
    category: 'Company',
    answer: `**Industries We Serve**

Sentra provides structural health monitoring solutions across a wide range of infrastructure sectors:

**Railway Networks** — Bridges, viaducts, embankments, and track geometry monitoring
**Road Bridges** — Highway flyovers, cable-stayed bridges, and major crossings
**High-Rise Buildings** — Tall structures, deep basements, and adjacent construction impacts
**Dams & Reservoirs** — Embankment, gravity, and arch dams with seepage monitoring
**Ports & Marine** — Wharves, jetties, and marine structures
**Mining & Geotechnical** — Slope stability, tailings dams, and excavation monitoring
**Construction & Tunnelling** — Settlement, vibration, and structural integrity during construction
**Industrial Facilities** — Machinery, pipelines, and plant infrastructure

[Explore Industries](./industries.html)`
  },
  {
    id: 'installation',
    question: 'How does the installation process work?',
    keywords: ['installation', 'setup', 'deploy', 'deployment', 'install', 'commissioning', 'on-site'],
    category: 'Company',
    answer: `**Installation Process**

Sentra's installation process is designed to be efficient and minimally disruptive to your operations.

**Typical Process:**
1. **Site Survey** — Our engineers visit to assess conditions and identify sensor locations
2. **Design** — A bespoke sensor layout is designed for your structure
3. **Installation** — Certified engineers install sensors, gateways, and communication equipment
4. **Configuration** — Edge devices are configured and connected to cloud platforms
5. **Testing** — Full system testing with calibration and baseline data collection
6. **Handover** — Training and documentation provided to your team

**Timeline:** Small projects can be installed in days; complex multi-site deployments typically take 2-6 weeks.

[Contact us for a custom deployment plan](./contact.html)`
  },
  {
    id: 'case-studies',
    question: 'Do you have case studies?',
    keywords: ['case study', 'case studies', 'reference', 'success story', 'project example', 'portfolio', 'past projects'],
    category: 'Company',
    answer: `**Success Stories**

Sentra has successfully deployed monitoring solutions on hundreds of structures worldwide.

**Featured Case Studies:**

**BridgePulse — AI and Drone Technology for Bridge Health Monitoring**
Combined AI-powered analytics with drone-based inspections for comprehensive bridge assessment.
[Read Case Study](./case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html)

**IoT Bridge Monitoring on Railway Bridges**
Deployed wireless sensor networks on operational railway bridges for continuous structural monitoring.
[Read Case Study](./case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html)

Over 200+ structures monitored across bridges, buildings, railways, and industrial facilities.

[View All Case Studies](./resources.html#case-studies)`
  },
  {
    id: 'pricing',
    question: 'How much does it cost?',
    keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'expensive', 'investment', 'roi', 'how much'],
    category: 'Company',
    answer: `**Pricing and Investment**

Sentra provides tailored solutions, so pricing is based on your specific requirements.

**Factors that influence pricing:**
- Number and type of sensors required
- Communication infrastructure needs (gateways, repeaters)
- Deployment complexity and site access
- Analytics and reporting requirements
- Ongoing support and maintenance

**Getting a Quote:**
We recommend starting with a free consultation to understand your needs and provide an accurate quote. Most projects start with a pilot deployment to validate the approach before full-scale rollout.

**Contact our team for a custom quote:**
- Phone: +91 7893023322
- Email: sentra@clovetech.com

[Request a Quote](./contact.html)`
  },
  {
    id: 'demos',
    question: 'Can I get a demo?',
    keywords: ['demo', 'demonstration', 'trial', 'pilot', 'see it working', 'showcase', 'preview', 'sample'],
    category: 'Company',
    answer: `**Demos and Pilot Deployments**

We offer several ways to experience Sentra's monitoring solutions before committing.

**Demo Options:**
1. **Live Product Demo** — A guided walkthrough of our sensors, edge devices, and analytics platform (30-45 min)
2. **Pilot Deployment** — A small-scale trial on your structure (typically 4-8 weeks)
3. **Virtual Dashboard Tour** — See our real-time monitoring dashboards in action
4. **Sample Reports** — Review example monitoring reports and analytics

To schedule a demo or discuss a pilot:
- Call: +91 7893023322
- Email: sentra@clovetech.com

[Schedule a Demo](https://calendly.com/sentra-clovetech/30min?primary_color=f47b0a)`
  }
];

// Define follow-up questions for each predefined question
const questionFollowUps = {
  'shm': [
    'What sensors are used for SHM?',
    'How does SHM compare to traditional inspection?',
    'Can I get a demo of SHM?'
  ],
  'edge-devices': [
    'What is the battery life of edge devices?',
    'How do I install edge devices?',
    'Tell me about the Vibration Meter'
  ],
  'wired-sensors': [
    'How do wired sensors compare to wireless?',
    'What is an Accelerometer?',
    'What is a Strain Gauge?'
  ],
  'core-communications': [
    'What is the difference between Gateway and Repeater?',
    'How far can the Gateway reach?',
    'Tell me about the Thread device'
  ],
  'ndt': [
    'Which NDT technique is best for bridges?',
    'How does NDT compare to visual inspection?',
    'Can I request an NDT assessment?'
  ],
  'digital-twin': [
    'How does Digital Twin integrate with BIM?',
    'What data is needed for a Digital Twin?',
    'Tell me about your Digital Engineering services'
  ],
  'fatigue-assessment': [
    'How do you calculate remaining useful life?',
    'What structures need fatigue assessment?',
    'Tell me about your Consulting services'
  ],
  'parent-company': [
    'What services does Clove Technologies offer?',
    'What industries does Sentra serve?',
    'Tell me about Sentra solutions'
  ],
  'contact': [
    'Schedule a demo',
    'Tell me about pricing',
    'What is your office address?'
  ],
  'tiltmeter': [
    'What is the accuracy of the Tiltmeter?',
    'What is Tiltmeter Event Detection?',
    'Tell me about the Laser Tiltmeter'
  ],
  'vibrating-wire': [
    'What is Vibrating Wire RCR?',
    'What is the difference between VW and Digital Logger?',
    'What is the battery life of VW?'
  ],
  'geotechnical-monitoring': [
    'What sensors are used for geotechnical monitoring?',
    'How do you monitor slope stability?',
    'Tell me about Foundation Monitoring'
  ],
  'bridge-inspection': [
    'How often should bridges be inspected?',
    'What is the advantage of continuous monitoring?',
    'How does AI help in bridge inspection?'
  ],
  'vibration-meter': [
    'What is the frequency range of the Vibration Meter?',
    'How does it detect threshold breaches?',
    'Tell me about the Vibrating Wire'
  ],
  'gnss-meter': [
    'What is the precision of GNSS Meter?',
    'How does RTK correction work?',
    'Tell me about the Tiltmeter'
  ],
  'asset-monitoring': [
    'How does asset monitoring reduce costs?',
    'What assets can be monitored?',
    'Tell me about Asset Management dashboards'
  ],
  'consulting': [
    'What does a consulting engagement look like?',
    'Do you offer feasibility studies?',
    'Tell me about your Digital Engineering services'
  ],
  'digital-engineering': [
    'How does BIM integrate with IoT?',
    'What is a Digital Twin?',
    'Tell me about your documentation services'
  ],
  'industries': [
    'Tell me about Railway Monitoring',
    'Tell me about Bridge Monitoring',
    'Tell me about Building Monitoring'
  ],
  'installation': [
    'How long does installation take?',
    'Do you provide training?',
    'What support do you offer after installation?'
  ],
  'case-studies': [
    'Tell me about your team',
    'What is the ROI of monitoring?',
    'Can I speak to a reference customer?'
  ],
  'pricing': [
    'How much does a typical project cost?',
    'Do you offer pilot deployments?',
    'Contact an expert'
  ],
  'demos': [
    'What does a demo include?',
    'How long is the demo?',
    'Schedule a demo'
  ]
};

// Render follow-up quick-reply buttons after a predefined answer
function renderFollowUpQuestions(questionId, afterElement) {
  const followUps = questionFollowUps[questionId];
  if (!followUps || followUps.length === 0) return;

  // Remove any existing quick-replies to keep the chat clean
  document.querySelectorAll('.quick-replies').forEach(function(el) { el.remove(); });

  const quickRepliesDiv = document.createElement('div');
  quickRepliesDiv.className = 'quick-replies';
  quickRepliesDiv.style.marginTop = '12px';
  quickRepliesDiv.style.justifyContent = 'flex-start';
  quickRepliesDiv.style.paddingLeft = '46px';

  for (const text of followUps) {
    const btn = document.createElement('button');
    btn.className = 'quick-reply';
    btn.textContent = text;
    quickRepliesDiv.appendChild(btn);
  }

  // Insert after the bot message
  if (afterElement && afterElement.parentNode) {
    afterElement.parentNode.insertBefore(quickRepliesDiv, afterElement.nextSibling);
  }
}

// Find best matching predefined question for user input
function findPredefinedMatch(userMessage) {
  if (!userMessage || typeof userMessage !== 'string') return null;

  const input = userMessage.toLowerCase().trim();
  if (!input) return null;

  // 1. Check exact match first (user clicked a question card or typed exact question)
  for (const q of predefinedQuestions) {
    if (input === q.question.toLowerCase()) {
      return q;
    }
  }

  // 2. Check if user's message contains the full question or vice versa
  for (const q of predefinedQuestions) {
    const qLower = q.question.toLowerCase();
    if (input.includes(qLower) || qLower.includes(input)) {
      return q;
    }
  }

  // 3. Keyword-based scoring
  const inputTokens = input.split(/\s+/).filter(t => t.length > 2);
  if (inputTokens.length === 0) return null;

  let bestMatch = null;
  let bestScore = 0;
  const THRESHOLD = 0.3;

  for (const q of predefinedQuestions) {
    // Build keyword set from question text + explicit keywords
    const questionTokens = q.question.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const allKeywords = [...new Set([...questionTokens, ...q.keywords.map(k => k.toLowerCase())])];

    if (allKeywords.length === 0) continue;

    let matchCount = 0;
    for (const token of inputTokens) {
      for (const kw of allKeywords) {
        // Check if token contains keyword or keyword contains token (substring match)
        if (token.includes(kw) || kw.includes(token)) {
          matchCount++;
          break;
        }
      }
    }

    // Also check for multi-word keyword matches (e.g., "structural health monitoring")
    let phraseMatchCount = 0;
    for (const kw of allKeywords) {
      if (kw.split(/\s+/).length > 1 && input.includes(kw)) {
        phraseMatchCount++;
      }
    }

    // Score = token match proportion + bonus for phrase matches
    const tokenScore = matchCount / Math.max(inputTokens.length, 1);
    const phraseBonus = phraseMatchCount * 0.15;
    const score = tokenScore + phraseBonus;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = q;
    }
  }

  return bestScore >= THRESHOLD ? bestMatch : null;
}

// Render predefined question cards in the UI (accordion style)
function renderPredefinedQuestions() {
  const grid = document.getElementById('pq-grid');
  if (!grid) return;

  grid.innerHTML = '';

  // Group questions by category
  const categories = {};
  for (const q of predefinedQuestions) {
    if (!categories[q.category]) {
      categories[q.category] = [];
    }
    categories[q.category].push(q);
  }

  const categoryOrder = ['Solutions', 'Products', 'Company'];
  const categoryIcons = {
    'Solutions': '\u2191',
    'Products': '\u2699',
    'Company': '\u2139'
  };

  for (const cat of categoryOrder) {
    if (!categories[cat]) continue;

    // Category block button
    const catBtn = document.createElement('button');
    catBtn.className = 'pq-cat-btn';
    catBtn.setAttribute('data-category', cat);
    catBtn.innerHTML = `<span class="pq-cat-icon">${categoryIcons[cat] || '?'}</span><span class="pq-cat-label">${cat}</span><span class="pq-cat-arrow">\u25BC</span>`;
    grid.appendChild(catBtn);

    // Questions container (hidden by default)
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'pq-questions';
    questionsContainer.id = `pq-questions-${cat.toLowerCase()}`;
    questionsContainer.style.display = 'none';

    for (const q of categories[cat]) {
      const card = document.createElement('button');
      card.className = 'pq-card';
      card.setAttribute('data-question', q.question);
      card.textContent = q.question;
      questionsContainer.appendChild(card);
    }

    grid.appendChild(questionsContainer);
  }
}

// ----- Main contact information (authoritative) -----
const MAIN_PHONE = '+91 7893023322';
const MAIN_EMAIL = 'sentra@clovetech.com';
const MAIN_ADDRESS = 'IT SEZ, Plot No. 9, Pedda Rushikonda, Rushikonda, Visakhapatnam, Andhra Pradesh 530045';

function formatContactBlock() {
  return `Phone: ${MAIN_PHONE}\nEmail: ${MAIN_EMAIL}\nOffice Address: ${MAIN_ADDRESS}\n\nNote: This is the main office address and phone number.`;
}

const initialInputHeight = messageInput.scrollHeight;

// Simple markdown parser for basic formatting
const parseMarkdown = (text) => {
  if (!text) return '';

  // Normalize and clean text
  let content = text.replace(/\r\n/g, '\n').trim();
  content = stripEmojis(content);

  // === Pre-processing: normalize AI responses that lack proper newlines ===

  // Break before **Heading that appears after sentence-ending punctuation
  content = content.replace(/([.!?])\s+(\*\*[A-Z])/g, '$1\n\n$2');

  // Break "**Header:** - item" -> header on its own line
  content = content.replace(/(\*\*[^*\n]{1,60}\*\*\s*:?)\s*(?=[-*•]\s+[A-Za-z])/g, '$1\n\n');

  // Break inline list items "word - Capitalized" into paragraph + list marker
  content = content.replace(/([a-zA-Z,.!?])\s+-\s+([A-Z][a-z])/g, '$1\n\n- $2');

  // Numbered/bullet points at sentence boundaries
  content = content.replace(/([.!?])\s+(\d+\.\s+)/g, '$1\n\n$2');
  content = content.replace(/([.!?])\s+([-*•]\s+)/g, '$1\n\n$2');

  // Single newlines before list markers become double newlines
  content = content.replace(/\n([-*•]\s+)/g, '\n\n$1');
  content = content.replace(/\n(\d+\.\s+)/g, '\n\n$1');

  // Split into paragraphs
  const paragraphs = content.split(/\n\n+/);

  const htmlParagraphs = paragraphs.map(p => {
    let trimmed = p.trim();
    if (!trimmed) return '';

    // Handle lists (numbered or bullets)
    const listMatch = trimmed.match(/^(\d+\.|[-*•])\s+([\s\S]*)/);
    if (listMatch) {
      const marker = listMatch[1];
      let listContent = listMatch[2];

      // Highlight bold title in list item: "1. **Title** desc" or "1. Title: desc"
      const boldTitleMatch = listContent.match(/^(\*\*.*?\*\*|[^:.]{1,60}[:.])([ \s\S]*)/);
      if (boldTitleMatch) {
        const title = boldTitleMatch[1].replace(/\*\*/g, '');
        const desc = boldTitleMatch[2].replace(/\n/g, '<br>').trim();
        return '<div class="chat-paragraph" style="margin-bottom:10px;line-height:1.55;padding-left:2px;">'
          + '<span style="color:#f48120;font-weight:700;">' + marker + ' ' + title + '</span>'
          + (desc ? '<br><span style="display:block;margin-top:3px;">' + applyInline(desc) + '</span>' : '')
          + '</div>';
      }

      return '<div class="chat-paragraph" style="margin-bottom:8px;line-height:1.55;padding-left:2px;">'
        + '<span style="color:#f48120;font-weight:700;">' + marker + '</span> ' + applyInline(listContent.replace(/\n/g, '<br>'))
        + '</div>';
    }

    // Handle standalone bold headers: "**Title**" or "**Title:**"
    const headerMatch = trimmed.match(/^\*\*(.+?)\*\*[:.\u2013\-!]?\s*$/);
    if (headerMatch) {
      const title = headerMatch[1];
      const hasPunct = /[:.\u2013\-!]/.test(trimmed.replace(/\*\*/g, '').slice(-1));
      const align = hasPunct ? 'left' : 'center';
      return '<div style="margin-top:14px;margin-bottom:6px;color:#f48120;font-weight:700;font-size:1.05em;'
        + 'text-align:' + align + ';border-bottom:1px solid rgba(244,129,32,0.15);padding-bottom:3px;">' + title + '</div>';
    }

    // Generic paragraph: apply inline formatting, single \n becomes <br>
    const formatted = applyInline(trimmed.replace(/\n/g, '<br>'));
    return '<div class="chat-paragraph" style="margin-bottom:8px;line-height:1.55;">' + formatted + '</div>';
  });

  return htmlParagraphs.join('');
};

// Apply inline markdown (bold, code, links) without altering structure
const applyInline = (str) => str
  .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f48120;">$1</strong>')
  .replace(/`(.*?)`/g, '<code>$1</code>')
  .replace(/\[(.*?)\]\((.*?)\)/g, '<a class="link-btn" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');


// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Generate bot response using backend API endpoint
const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  // Check if request should be throttled
  if (shouldThrottleRequest()) {
    messageElement.textContent = "Please wait a moment before sending another message...";
    messageElement.classList.add("error");
    return;
  }

  // Add user message to chat history
  chatHistory.push({
    role: "user",
    parts: [{ text: userData.message }],
  });
  if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.splice(0, chatHistory.length - MAX_CHAT_HISTORY);

  try {
    // Fetch site content once and include it in the prompt to improve product/site-aware answers
    let siteContent = '';
    try {
      siteContent = await fetchSiteContent();
    } catch (e) {
      siteContent = '';
    }

    // Add assistant instruction to ensure professional sales tone and no emojis
    const assistantInstructions = `Respond in a professional sales representative tone. Do not use emojis or informal punctuation. Be concise and helpful. After three or more meaningful exchanges, politely suggest scheduling a call to discuss solutions and provide a clear way to schedule. If the user chooses 'Don't show again' when offered a call, do not prompt again.`;

    const augmentedMessage = `${userData.message}\n\n[SiteContext]: ${siteContent}\n\n[AssistantInstructions]: ${assistantInstructions}`;

    // Send message to backend API endpoint
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: augmentedMessage,
        history: chatHistory,
        needsWebAccess: true,
        file: userData.file.data ? {
          data: userData.file.data,
          mimeType: userData.file.mimeType
        } : null
      }),
    });

    if (!response.ok) {
      let errText = '';
      try { const errData = await response.json(); errText = errData.error || ''; } catch (_) {}
      if (response.status === 429) {
        throw new Error('AI service rate limit reached. Please wait a moment and try again.');
      }
      throw new Error(errText || `Service error (${response.status}). Please try again.`);
    }

    const data = await response.json();
    let apiResponseText = data.response || data.message || '';

    // Post-process response: strip emojis and normalize whitespace (preserve newlines)
    apiResponseText = stripEmojis(apiResponseText).replace(/ {2,}/g, ' ').trim();

    // Normalize company name: prefer 'Sentra' or 'Sentra - By Clove Technologies'
    try {
      apiResponseText = apiResponseText.replace(/Sentra Technologies/gi, 'Sentra - By Clove Technologies');
      apiResponseText = apiResponseText.replace(/\bSentra Technologies\b/gi, 'Sentra - By Clove Technologies');
    } catch (e) {
      // ignore
    }

    // If the user asked for contact information (or the response mentions contact), override with authoritative main contact
    try {
      const userText = (userData.message || '');
      // Stronger contact intent detection: explicit contact phrases or clear phone/email patterns
      const contactIntent = /\b(contact(?:\s+us)?|call(?:\s+(?:me|us))?|how to reach|get in touch|phone|mobile|email|office address|visit us|contact details)\b/i;
      const isProductInquiry = /\b(product|products|solution|solutions|explore|sensor|edge|device|gateway|repeater|logger|monitor|test|consulting|tiltmeter|vibration|strain|accelerometer|gnss|ndt|shm|geotechnical|fatigue|inspection|digital\s*twin|ai|artificial\s*intelligence|bridge|monitoring|infrastructure|tunnel|dam|railway|structural|monitoring|health|civil|engineering|asset|management|predictive|maintenance|analysis|data|intelligence|smart|iot|deployment|sensing|assessment|fatigue|residual|life|geotechnical|foundation|ndt|non-destructive|testing|digital|engineering|bim|gis|simulation|optimization|real-time|insights|analytics|edge|computing|hard|difficult|question|complex|issue|how|why|what|explain|describe|details|more|information)\b/i.test(userText);
      // Only treat the response as containing contact info when it includes an email, phone-like number, or explicit 'contact us' phrase
      const responseContainsContact = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|(?:\+?\d[\d\-\s\(\)]{6,}\d)|\bcontact\s+us\b/i;

      // Refined override: Only trigger if the user explicitly asked for contact info OR if the AI response is short and primarily contact-focused
      const isShortResponse = apiResponseText.length < 300;
      const explicitContactRequest = contactIntent.test(userText) && !isProductInquiry;

      if ((explicitContactRequest || (responseContainsContact.test(apiResponseText) && isShortResponse)) && !isProductInquiry) {
        // Determine header based on user intent
        const userTextLower = userText.toLowerCase();
        let header = 'Explore our solutions';
        if (/product/.test(userTextLower)) {
          header = 'Explore our products';
        } else if (/solution/.test(userTextLower)) {
          header = 'Explore our solutions';
        }

        // Compose a professional contact block with context-aware header
        const contactBlock = `${header}\nThank you for reaching out. Please use the following primary contact details for Sentra:\n\n${formatContactBlock()}\n\nWe can schedule a call or follow up by email as needed.`;
        apiResponseText = contactBlock;
      }
    } catch (e) {
      // ignore
    }

    // Display the final response
    messageElement.innerHTML = parseMarkdown(apiResponseText);

    // Add bot response to chat history
    chatHistory.push({
      role: "model",
      parts: [{ text: apiResponseText }],
    });
    if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.splice(0, chatHistory.length - MAX_CHAT_HISTORY);

    // Save bot response to chat history for admin dashboard
    saveChatMessage(apiResponseText, 'bot');

    // Interaction count and CTA: after a few interactions, prompt to schedule a call
    try {
      const interactions = incrementInteractionCount();
      const CTA_THRESHOLD = 3;
      if (interactions >= CTA_THRESHOLD && !isCtaSuppressed() && !isCtaShown()) {
        // append a professional CTA message with action buttons
        const ctaHtml = `
          <div class="cta-message">
            <div class="cta-text">If you'd like, we can arrange a short call to discuss Sentra's solutions and how they fit your needs. Would you like to schedule a call?</div>
            <div class="cta-actions">
              <button id="cta-schedule" class="cta-btn">Schedule a Call</button>
              <button id="cta-remind" class="cta-btn">Remind Me Later</button>
              <button id="cta-never" class="cta-btn">Don't Show Again</button>
            </div>
          </div>`;

        const ctaDiv = document.createElement('div');
        ctaDiv.className = 'bot-message cta-wrapper';
        ctaDiv.innerHTML = `<div class="message-text">${ctaHtml}</div>`;
        chatBody.appendChild(ctaDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
        markCtaShown();

        // attach handlers
        setTimeout(() => {
          const scheduleBtn = document.getElementById('cta-schedule');
          const remindBtn = document.getElementById('cta-remind');
          const neverBtn = document.getElementById('cta-never');
          if (scheduleBtn) scheduleBtn.addEventListener('click', () => { window.open('https://sentratech.in/contact.html', '_blank'); });
          if (remindBtn) remindBtn.addEventListener('click', () => { /* simply close CTA */ ctaDiv.remove(); });
          if (neverBtn) neverBtn.addEventListener('click', () => { markCtaSuppressed(); ctaDiv.remove(); });
        }, 200);
      }
    } catch (e) {
      // ignore CTA errors
    }
  } catch (error) {
    console.error('Chat error:', error);
    const msg = error.message || 'Unknown error';
    if (msg.includes('rate limit') || msg.includes('429')) {
      messageElement.textContent = 'Too many requests. Please wait a moment and try again.';
    } else if (msg.includes('unavailable') || msg.includes('503') || msg.includes('502')) {
      messageElement.textContent = 'Service is temporarily unavailable. Please try again shortly.';
    } else {
      messageElement.textContent = 'Sorry, something went wrong. Please try again.';
    }
    messageElement.classList.add("error");
  } finally {
    // Reset user's file data, removing thinking indicator and scroll chat to bottom
    userData.file = { data: null, mimeType: null };
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
};

// Handle outgoing user messages
const handleOutgoingMessage = (e, predefinedText) => {
  e.preventDefault();

  // Support both typed messages and predefined question clicks
  const userMsg = predefinedText || messageInput.value.trim();
  userData.message = userMsg;

  // Do nothing if message and file are empty
  if (!userData.message && !userData.file.data) {
    messageInput.value = "";
    return;
  }

  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));
  fileUploadWrapper.classList.remove("file-uploaded");

  // Hide predefined questions after first message
  const pqContainer = document.getElementById("predefined-questions");
  if (pqContainer) {
    pqContainer.style.display = "none";
  }

  // Create and display user message
  const messageContent = `<div class="message-text"></div>
                          ${userData.file.data
      ? `<img src="data:${userData.file.mimeType};base64,${userData.file.data}" class="attachment" />`
      : ""
    }`;
  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Save user message to chat history for admin dashboard
  saveChatMessage(userData.message, 'user');

  // While a live agent has taken over, let them reply directly instead
  // of Veronica auto-responding - the agent's reply will show up via
  // pollChatUpdates().
  if (liveAgentConnected) {
    return;
  }

  // Check if user's message matches a predefined question
  const matchedQuestion = findPredefinedMatch(userData.message);

  if (matchedQuestion && !userData.file.data) {
    // Found a match! Display predefined answer directly - no API call needed
    setTimeout(() => {
      const botMsgContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
          <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.9-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" />
        </svg>
        <div class="message-text">${parseMarkdown(matchedQuestion.answer)}</div>`;
      const botMsgDiv = createMessageElement(botMsgContent, 'bot-message');
      chatBody.appendChild(botMsgDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

      // Show follow-up quick-reply buttons
      renderFollowUpQuestions(matchedQuestion.id, botMsgDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

      // Track in chat history
      chatHistory.push({
        role: 'user',
        parts: [{ text: userData.message }]
      });
      chatHistory.push({
        role: 'model',
        parts: [{ text: matchedQuestion.answer }]
      });
      if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.splice(0, chatHistory.length - MAX_CHAT_HISTORY);

      // Save predefined answer to chat history for admin dashboard
      saveChatMessage(matchedQuestion.answer, 'bot');

      // Increment interaction count
      try { incrementInteractionCount(); } catch (e) {}
    }, 600);
  } else {
    // No predefined match found - use AI/API as fallback
    setTimeout(() => {
      const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
              <path
                d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.9-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
              />
            </svg>
            <div class="message-text">
              <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
            </div>`;
      const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
      chatBody.appendChild(incomingMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      generateBotResponse(incomingMessageDiv);
    }, 600);
  }
};

// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  const fileUploaded = userData.file.data;

  if (e.key === "Enter" && !e.shiftKey && (userMessage || fileUploaded)) {
    e.preventDefault(); // Prevent default newline
    handleOutgoingMessage(e);
  }
  // Shift+Enter allows new lines (default behavior)
});

// Handle file input change and preview the selected file
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  // Simple validation for image types (optional but recommended)
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file (e.g., JPEG, PNG, WEBP).");
    fileInput.value = ""; // Clear the input
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    fileInput.value = "";
    fileUploadWrapper.querySelector("img").src = e.target.result;
    fileUploadWrapper.classList.add("file-uploaded");
    const base64String = e.target.result.split(",")[1];

    // Store file data in userData
    userData.file = {
      data: base64String,
      mimeType: file.type, // <-- FIX: Use mimeType
    };
  };
  reader.readAsDataURL(file);
});

// Cancel file upload
fileCancelButton.addEventListener("click", () => {
  userData.file = { data: null, mimeType: null };
  fileUploadWrapper.classList.remove("file-uploaded");
});

// Assume EmojiMart is loaded correctly in your HTML
// Initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  previewPosition: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  },
});
document.querySelector(".chat-form").appendChild(picker);

// Function to get time-based greeting
function getTimeBasedGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    return "Good evening";
  } else {
    return "Hello";
  }
}

// Function to validate business email
// Function to handle user info form submission
function handleInfoFormSubmission(e) {
  e.preventDefault();

  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();

  let isValid = true;

  // Clear previous errors
  nameError.textContent = '';
  emailError.textContent = '';

  // Validate name
  if (!name) {
    nameError.textContent = 'Please enter your name';
    isValid = false;
  }

  // Validate email
  if (!email) {
    emailError.textContent = 'Please enter your email';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
    isValid = false;
  }

  if (isValid) {
    // Store user profile
    userProfile.name = name;
    userProfile.email = email;
    userProfile.isFormSubmitted = true;

    // Save to localStorage
    saveUserProfile();

    // Submit lead to Google Sheets via API
    submitChatbotLead(name, email);

    // Hide form and show chat interface
    userInfoForm.style.display = 'none';
    chatBody.style.display = 'block';
    chatFooter.style.display = 'block';

    // Update welcome message with personalized greeting
    const greeting = getTimeBasedGreeting();
    welcomeMessage.textContent = `${greeting}, ${name}! How can I help you today?`;

    // Register this as a fresh conversation thread and start watching for
    // a live agent joining this session
    upsertThread(chatSessionId, '');
    startChatPolling();
    startPresenceHeartbeat();
  }
}

// Function to submit chatbot lead to backend API
function submitChatbotLead(name, email) {
  // Derive the base API URL from the chat endpoint (replace /api/chat with /api/user-profile)
  const chatEndpoint = getAPIEndpoint();
  const apiBaseUrl = chatEndpoint.replace('/api/chat', '');
  const userProfileUrl = apiBaseUrl + '/api/user-profile';

  fetch(userProfileUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Chatbot lead saved successfully');
    } else if (data.duplicate) {
      console.log('Returning lead:', data.message);
    } else {
      console.warn('Lead save response:', data);
    }
  })
  .catch(err => {
    console.error('Failed to save chatbot lead:', err);
  });
}

// Function to initialize chatbot on page load
function initializeChatbot() {
  // Pre-render predefined question cards
  renderPredefinedQuestions();

  // Try to load saved user profile
  if (loadUserProfile() && userProfile.isFormSubmitted) {
    // User data exists, skip form and show chat interface
    userInfoForm.style.display = 'none';
    chatBody.style.display = 'block';
    chatFooter.style.display = 'block';

    // Update welcome message with personalized greeting
    const greeting = getTimeBasedGreeting();
    welcomeMessage.textContent = `${greeting}, ${userProfile.name}! How can I help you today?`;

    // Make sure this session shows up in the conversation threads list
    upsertThread(chatSessionId, '');

    // Resume watching for a live agent picking up this returning session
    startChatPolling();
  }
  // If no saved data, form remains visible (default behavior)
}

// --- Event Listeners ---
infoForm.addEventListener("submit", handleInfoFormSubmission);

sendMessage.addEventListener("click", (e) => {
  if (!userProfile.isFormSubmitted) return;

  const userMessage = messageInput.value.trim();
  const fileUploaded = userData.file.data;
  if (userMessage || fileUploaded) {
    handleOutgoingMessage(e);
  }
});
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
closeChatbot.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
  closeThreadsPanel();
  if (userProfile.isFormSubmitted) stopPresenceHeartbeat();
});
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
  if (!userProfile.isFormSubmitted) return;
  if (isWidgetOpen()) {
    widgetUnreadCount = 0;
    updateTogglerBadge();
    startPresenceHeartbeat();
  } else {
    stopPresenceHeartbeat();
  }
});

// Event listener using event delegation for chat interactions
chatBody.addEventListener("click", (e) => {
  // Handle category button clicks (accordion expand/collapse)
  if (e.target.classList.contains("pq-cat-btn") || e.target.closest(".pq-cat-btn")) {
    const btn = e.target.classList.contains("pq-cat-btn") ? e.target : e.target.closest(".pq-cat-btn");
    const category = btn.getAttribute('data-category');
    if (!category) return;

    const containerId = `pq-questions-${category.toLowerCase()}`;
    const container = document.getElementById(containerId);
    if (!container) return;

    const isOpen = container.style.display !== 'none';

    // Close all other open containers
    document.querySelectorAll('.pq-questions').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.pq-cat-btn').forEach(b => {
      b.classList.remove('active');
    });

    // Toggle this one
    if (!isOpen) {
      container.style.display = 'flex';
      btn.classList.add('active');
    }

    return;
  }

  // Handle predefined question card clicks
  if (e.target.classList.contains("pq-card") || e.target.closest(".pq-card")) {
    const card = e.target.classList.contains("pq-card") ? e.target : e.target.closest(".pq-card");
    const question = card.getAttribute('data-question') || card.textContent.trim();

    if (!userProfile.isFormSubmitted) {
      return;
    }

    // Hide predefined questions
    const pqContainer = document.getElementById("predefined-questions");
    if (pqContainer) {
      pqContainer.style.display = "none";
    }

    // Create artificial event and pass question text through handleOutgoingMessage
    const syntheticEvent = { preventDefault: () => {} };
    handleOutgoingMessage(syntheticEvent, question);
    return;
  }

  if (e.target.classList.contains("quick-reply")) {
    console.log('Quick reply clicked:', e.target.textContent.trim());
    if (!userProfile.isFormSubmitted) {
      console.log('User profile not submitted');
      return;
    }

    const message = e.target.textContent.trim();

    // Special handling for Schedule a call button
    if (message === "Schedule a call") {
      console.log('Schedule a call detected');
      // Hide quick replies
      const quickReplies = document.querySelector(".quick-replies");
      if (quickReplies) {
        quickReplies.style.display = "none";
      }

      // Create user message
      const userMessageContent = `<div class="message-text">${message}</div>`;
      const userMessageDiv = createMessageElement(userMessageContent, "user-message");
      chatBody.appendChild(userMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

      // Show bot response with scheduling options
      setTimeout(() => {
        const botMessageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.9-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z" />
          </svg>
          <div class="message-text" id="scheduling-options">
            To schedule a call and discuss your project requirements for real-time infrastructure intelligence, please use one of the following options:<br><br>
            1. Call Our Experts Directly:<br>
            • Phone: +91 7893023322<br><br>
            2. Send a Detailed Inquiry:<br>
            • Email: <a href="mailto:sentra@clovetech.com">sentra@clovetech.com</a><br><br>
            <button class="calendly-link" style="background: #f48120; color: white; border: none; padding: 8px 16px; border-radius: 50px; cursor: pointer; font-weight: bold;">Schedule a Call</button>
          </div>`;
        const botMessageDiv = createMessageElement(botMessageContent, "bot-message");
        chatBody.appendChild(botMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

        // Add click handler for Calendly link
        const calendlyLink = botMessageDiv.querySelector('.calendly-link');
        if (calendlyLink) {
          calendlyLink.addEventListener('click', () => {
            if (typeof Calendly !== 'undefined') {
              Calendly.initPopupWidget({ url: 'https://calendly.com/sentra-clovetech/30min?primary_color=f47b0a' });
            } else {
              window.open('https://calendly.com/sentra-clovetech/30min?primary_color=f47b0a', '_blank');
            }
          });
        }
      }, 600);
      return;
    }

    messageInput.value = message;

    // Trigger the send message functionality
    handleOutgoingMessage(e);
  }
});

// Initialize chatbot on page load
initializeChatbot();
