/* SupportPilot — demo SaaS app. No real auth, no backend, no API key.
   Demo data is labelled SAMPLE. Knowledge base + tickets + settings are
   stored in the browser's localStorage so the demo works offline. */
(function () {
  var STOP = ["a","an","the","is","are","was","were","i","me","my","we","you","your","he","she","it","its","to","of","in","on","for","with","and","or","do","does","did","can","could","how","what","when","where","why","please","tell","give","about"];
  function tokens(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(function (w) { return w && STOP.indexOf(w) === -1; });
  }
  function scoreAnswer(question, entry) {
    var qt = tokens(question), score = 0;
    var qwords = (entry.q || "").toLowerCase();
    qt.forEach(function (t) {
      if (qwords.indexOf(t) !== -1) score += 2;
      (entry.keywords || []).forEach(function (k) { if (k === t) score += 3; else if (k.indexOf(t) !== -1 || t.indexOf(k) !== -1) score += 1; });
    });
    return score;
  }
  function findAnswer(question, kb) {
    var best = null, bestScore = 0;
    (kb || []).forEach(function (e) {
      var s = scoreAnswer(question, e);
      if (s > bestScore) { bestScore = s; best = e; }
    });
    if (best && bestScore >= 3) return best;
    return null;
  }
  function makeTicketId(existingCount) {
    return "T-" + (1040 + (existingCount || 0));
  }
  function yearlyPrice(monthly) { return Math.round(monthly * 0.8); }

  // Export pure logic for Node smoke tests.
  if (typeof module === "object" && module.exports) {
    module.exports = { tokens: tokens, scoreAnswer: scoreAnswer, findAnswer: findAnswer, makeTicketId: makeTicketId, yearlyPrice: yearlyPrice };
    return;
  }

  var KB_KEY = "supportpilot_kb_v1";
  var SETTINGS_KEY = "supportpilot_settings_v1";
  var TICKETS_KEY = "supportpilot_tickets_v1";
  var kb = loadKB();
  var tickets = loadTickets();
  var settings = loadSettings();
  var lastEntry = null, lastTopic = "";

  function loadKB() {
    try {
      var raw = localStorage.getItem(KB_KEY);
      if (raw) { var parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length) return parsed; }
    } catch (e) {}
    return (window.SupportPilotData ? window.SupportPilotData.KB.slice() : []);
  }
  function saveKB() { try { localStorage.setItem(KB_KEY, JSON.stringify(kb)); } catch (e) {} }
  function loadTickets() { try { var r = JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]"); return Array.isArray(r) ? r : []; } catch (e) { return []; } }
  function saveTickets() { try { localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets)); } catch (e) {} }
  function loadSettings() {
    try { var r = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null"); if (r) return r; } catch (e) {}
    return { business: "Acme Store", greeting: "Hi! How can I help you today?", language: "en" };
  }
  function saveSettings() { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {} }
  function greetingText() {
    if (settings.language === "ur") return "Assalam-o-Alaikum! Main aapki kya madad kar sakta hun?";
    return settings.greeting || "Hi! How can I help you today?";
  }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

  function showView(view) {
    ["landing", "dashboard"].forEach(function (v) { var el = $("view-" + v); if (el) el.style.display = (v === view ? "" : "none"); });
    if (view === "dashboard") { renderDashboard(); showTab("overview"); }
    window.scrollTo(0, 0);
  }
  function showTab(tab) {
    document.querySelectorAll(".dash-tab").forEach(function (b) { b.classList.toggle("active", b.dataset.tab === tab); });
    document.querySelectorAll(".tab-panel").forEach(function (p) { p.style.display = (p.id === "tab-" + tab ? "" : "none"); });
    if (tab === "chat") { if (!$("chatLog").children.length) addBot(greetingText()); }
    if (tab === "kb") renderKB();
    if (tab === "widget") renderWidget();
    if (tab === "settings") renderSettings();
    if (tab === "overview") { renderConversations(); drawChart(); }
  }
  function renderDashboard() {
    $("bizNameLabel").textContent = settings.business;
    $("statChats").textContent = "377";
    $("statResolved").textContent = "290";
    $("statRate").textContent = "77%";
    $("statTickets").textContent = String(12 + tickets.length);
  }
  function renderConversations() {
    var data = window.SupportPilotData ? window.SupportPilotData.CONVERSATIONS : [];
    $("convList").innerHTML = data.map(function (c) {
      return "<div class='conv'><strong>" + esc(c.id) + "</strong> · " + esc(c.customer) + "<br><span>" + esc(c.topic) + " — " + esc(c.status) + " · " + esc(c.time) + " · " + esc(c.channel) + "</span></div>";
    }).join("");
  }
  function drawChart() {
    var cv = $("chartCanvas"); if (!cv) return;
    var ctx = cv.getContext("2d"), data = window.SupportPilotData ? window.SupportPilotData.ANALYTICS : [];
    var w = cv.width, h = cv.height; ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#e5e7eb"; ctx.fillRect(40, 10, 1, h - 40);
    data.forEach(function (d, i) {
      var x = 55 + i * 78, bh = Math.round(d.chats / 80 * (h - 60)), rh = Math.round(d.resolved / 80 * (h - 60));
      ctx.fillStyle = "#2563eb"; ctx.fillRect(x, h - 30 - bh, 26, bh);
      ctx.fillStyle = "#22c55e"; ctx.fillRect(x + 30, h - 30 - rh, 26, rh);
      ctx.fillStyle = "#111827"; ctx.font = "12px sans-serif"; ctx.fillText(d.day, x + 8, h - 10);
      ctx.fillText(String(d.chats), x + 5, h - 35 - bh);
    });
    ctx.fillStyle = "#374151"; ctx.font = "12px sans-serif";
    ctx.fillText("Blue = chats, Green = resolved (sample data)", 40, 18);
  }
  function addMsg(text, who) {
    var div = document.createElement("div");
    div.className = "msg " + who; div.textContent = text;
    $("chatLog").appendChild(div); $("chatLog").scrollTop = $("chatLog").scrollHeight;
  }
  function addBot(text) { addMsg(text, "bot"); }
  function addUser(text) { addMsg(text, "user"); }
  function botReply(question) {
    var typing = document.createElement("div"); typing.className = "msg bot typing"; typing.textContent = "Typing…";
    $("chatLog").appendChild(typing);
    setTimeout(function () {
      typing.remove();
      if (/tell me more|more detail|aur bata|aur detail/i.test(question) && lastEntry) { addBot(lastEntry.a + " (From: " + lastEntry.q + ")"); return; }
      var hit = findAnswer(question, kb);
      if (hit) { lastEntry = hit; lastTopic = hit.category; addBot(hit.a); }
      else { addBot("I could not find that in the knowledge base. Please use 'Create ticket' below and a human agent will reply within one business day. (Sample demo — no real ticket is sent.)"); }
    }, 500);
  }
  function ask(q) { if (!q) return; addUser(q); $("chatInput").value = ""; botReply(q); }
  function renderKB() {
    $("kbList").innerHTML = kb.map(function (e) {
      return "<div class='kb-row'><div><strong>" + esc(e.q) + "</strong> <span class='tag'>" + esc(e.category) + "</span><br><span>" + esc(e.a) + "</span></div><button class='btn small danger' data-del='" + e.id + "'>Delete</button></div>";
    }).join("");
    $("kbList").querySelectorAll("[data-del]").forEach(function (b) {
      b.onclick = function () { kb = kb.filter(function (e) { return String(e.id) !== b.dataset.del; }); saveKB(); renderKB(); };
    });
    $("kbCount").textContent = kb.length + " Q&As";
  }
  function renderWidget() {
    var name = settings.business;
    $("embedCode").value = '<script src="https://example.com/supportpilot.js" data-business="' + name + '"><\/script>\n<!-- Paste this before </body> on your website. Sample snippet — replace example.com with your domain. -->';
    $("widgetBiz").textContent = name;
    $("widgetGreet").textContent = greetingText();
  }
  function widgetReply(q) {
    $("widgetLog").innerHTML += "<div class='msg user'>" + esc(q) + "</div>";
    var hit = findAnswer(q, kb);
    $("widgetLog").innerHTML += "<div class='msg bot'>" + esc(hit ? hit.a : "I could not find that in the knowledge base. Please create a ticket.") + "</div>";
  }
  function renderSettings() {
    $("setBiz").value = settings.business; $("setGreet").value = settings.greeting;
    $("setLang").value = settings.language;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Landing: pricing toggle + FAQ
    document.querySelectorAll("[data-billing]").forEach(function (b) {
      b.onclick = function () {
        var yearly = b.dataset.billing === "yearly";
        document.querySelectorAll("[data-billing]").forEach(function (x) { x.classList.toggle("active", x === b); });
        document.querySelectorAll(".price").forEach(function (p) {
          var m = parseInt(p.dataset.monthly, 10), y = parseInt(p.dataset.yearly, 10);
          p.textContent = "$" + (yearly ? y : m) + "/mo";
        });
        $("billingNote").textContent = yearly ? "Billed yearly — about 20% saved." : "Billed monthly. Switch to yearly to save about 20%.";
      };
    });
    document.querySelectorAll(".faq-q").forEach(function (b) {
      b.onclick = function () { var a = b.nextElementSibling; a.style.display = (a.style.display === "block" ? "none" : "block"); };
    });
    // Demo login (no real auth)
    ["demoLogin", "demoLogin2", "ctaDemo"].forEach(function (id) {
      var el = $(id); if (el) el.onclick = function () { showView("dashboard"); };
    });
    var back = $("backLanding"); if (back) back.onclick = function () { showView("landing"); };
    document.querySelectorAll(".dash-tab").forEach(function (b) { b.onclick = function () { showTab(b.dataset.tab); }; });
    // Chat
    $("sendChat").onclick = function () { ask($("chatInput").value.trim()); };
    $("chatInput").addEventListener("keydown", function (e) { if (e.key === "Enter") ask($("chatInput").value.trim()); });
    document.querySelectorAll("[data-ask]").forEach(function (b) { b.onclick = function () { ask(b.dataset.ask); }; });
    $("ticketBtn").onclick = function () {
      var subj = $("ticketSubject").value.trim(), msg = $("ticketMsg").value.trim();
      if (!subj || !msg) { $("ticketStatus").textContent = "Please add a subject and a message first."; return; }
      var t = { id: makeTicketId(tickets.length), subject: subj, message: msg };
      tickets.push(t); saveTickets(); renderDashboard();
      $("ticketStatus").textContent = "Ticket created (sample demo): " + t.id + " — " + subj + ". A human agent would reply within one business day.";
      $("ticketSubject").value = ""; $("ticketMsg").value = "";
    };
    // KB manager
    $("kbAdd").onclick = function () {
      var q = $("kbQ").value.trim(), a = $("kbA").value.trim(), cat = $("kbCat").value.trim() || "General";
      if (!q || !a) { $("kbStatus").textContent = "Please add both a question and an answer."; return; }
      var id = kb.length ? Math.max.apply(null, kb.map(function (e) { return e.id; })) + 1 : 1;
      kb.push({ id: id, category: cat, q: q, keywords: tokens(q), a: a }); saveKB(); renderKB();
      $("kbStatus").textContent = "Added. The chatbot will use this answer immediately.";
      $("kbQ").value = ""; $("kbA").value = "";
    };
    // Widget
    $("copyEmbed").onclick = function () {
      var ta = $("embedCode"); ta.select();
      try { document.execCommand("copy"); $("copyStatus").textContent = "Embed code copied (if your browser allows it)."; }
      catch (e) { $("copyStatus").textContent = "Copy failed in this browser — please select the code manually."; }
    };
    $("widgetSend").onclick = function () { var v = $("widgetInput").value.trim(); if (v) { widgetReply(v); $("widgetInput").value = ""; } };
    // Settings
    $("saveSettings").onclick = function () {
      settings.business = $("setBiz").value.trim() || settings.business;
      settings.greeting = $("setGreet").value.trim() || settings.greeting;
      settings.language = $("setLang").value;
      saveSettings(); renderDashboard(); renderWidget();
      $("setStatus").textContent = "Settings saved. Greeting now: " + greetingText();
    };
    // Screenshot / demo views: ?view=dashboard|chat|kb|widget|pricing
    var params = new URLSearchParams(window.location.search);
    var view = params.get("view");
    if (view === "dashboard" || view === "chat" || view === "kb" || view === "widget") {
      showView("dashboard");
      showTab(view === "dashboard" ? "overview" : view);
      if (view === "chat") {
        addUser("How long does shipping take?");
        var hit = findAnswer("How long does shipping take?", kb); if (hit) addBot(hit.a);
      }
      if (view === "widget") { widgetReply("How do I cancel my order?"); }
    }
    if (view === "pricing") { document.getElementById("pricing").scrollIntoView(); }
  });

  /* ---- Premium motion: reveal, 3D tilt, counters, particles, parallax ----
     Pure CSS/JS only. All original handlers above are untouched. Respects
     prefers-reduced-motion and skips tilt on touch / narrow screens. */
  document.addEventListener("DOMContentLoaded", function () {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reveal on scroll
    document.querySelectorAll(".grid .card, .pricing .card, .stat").forEach(function (el) {
      el.classList.add("tilt"); el.classList.add("reveal");
    });
    document.querySelectorAll("#features, #pricing, #faq").forEach(function (el) { el.classList.add("reveal"); });
    if ("IntersectionObserver" in window && !reduced) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("revealed"); });
    }
    // 3D tilt on hover (mouse only)
    if (!reduced && window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll(".tilt").forEach(function (el) {
        el.addEventListener("mousemove", function (e) {
          var r = el.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = "perspective(900px) rotateX(" + (-y * 8).toFixed(2) + "deg) rotateY(" + (x * 10).toFixed(2) + "deg) translateY(-4px)";
        });
        el.addEventListener("mouseleave", function () { el.style.transform = ""; });
      });
      // Hero parallax: orbs drift with the mouse
      var hero = document.querySelector(".hero");
      if (hero) {
        hero.addEventListener("mousemove", function (e) {
          var r = hero.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          document.querySelectorAll(".orb").forEach(function (orb, i) {
            orb.style.translate = (x * (12 + i * 8)) + "px " + (y * (10 + i * 6)) + "px";
          });
        });
      }
    }
    // Animated dashboard counters, triggered when the dashboard opens
    function animateCounters() {
      if (reduced) return;
      [["statChats", 377, ""], ["statResolved", 290, ""], ["statRate", 77, "%"], ["statTickets", 12, ""]].forEach(function (item) {
        var el = document.getElementById(item[0]); if (!el) return;
        var target = parseInt(el.textContent, 10); if (isNaN(target)) target = item[1];
        var start = null;
        (function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 900, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + item[2];
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }
    ["demoLogin", "demoLogin2", "ctaDemo"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("click", function () { setTimeout(animateCounters, 60); });
    });
    // Pricing toggle pop animation
    document.querySelectorAll("[data-billing]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".price").forEach(function (p) {
          p.classList.remove("price-pop"); void p.offsetWidth; p.classList.add("price-pop");
        });
      });
    });
    // Subtle background particles on the hero canvas
    var cv = document.getElementById("bgCanvas");
    if (cv && !reduced) {
      var ctx = cv.getContext("2d"), W, H, parts = [];
      function resize() {
        W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
      }
      resize(); window.addEventListener("resize", resize);
      for (var i = 0; i < 42; i++) {
        parts.push({ x: Math.random(), y: Math.random(), r: 1 + Math.random() * 2.2, s: 0.0004 + Math.random() * 0.001, o: 0.25 + Math.random() * 0.5 });
      }
      (function draw() {
        ctx.clearRect(0, 0, W, H);
        parts.forEach(function (p) {
          p.y -= p.s; if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
          ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255," + p.o + ")"; ctx.fill();
        });
        requestAnimationFrame(draw);
      })();
    }
  });
})();
