import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const coversDir = path.join(root, "public/engineering/covers");
const sourceDir = path.join(coversDir, "source");
const brandDir = path.join(coversDir, "brands");

const W = 1200;
const H = 630;

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const txt = (x, y, value, size = 16, weight = 600, fill = "#171717", attrs = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${attrs}>${esc(value)}</text>`;

const mono = (x, y, value, size = 13, weight = 600, fill = "#171717", attrs = "") =>
  `<text class="mono" x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${attrs}>${esc(value)}</text>`;

const rect = (x, y, width, height, fill, stroke = "none", radius = 0, sw = 1) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

const line = (x1, y1, x2, y2, stroke = "#171717", sw = 1, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;

const arrow = (x1, y1, x2, y2, stroke = "#171717", sw = 2, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""} marker-end="url(#arrow)"/>`;

const dot = (cx, cy, radius, fill, stroke = "none", sw = 1) =>
  `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

const pill = (x, y, width, label, fill, color = "#171717", stroke = "none") =>
  `${rect(x, y, width, 28, fill, stroke, 14)}${mono(x + width / 2, y + 18, label, 11, 700, color, 'text-anchor="middle" letter-spacing="1.1"')}`;

const rootStart = (background, ink = "#171717") => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      text { font-family: Arial, Helvetica, sans-serif; }
      .mono { font-family: "Courier New", Courier, monospace; }
    </style>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,5 L0,10 Z" fill="context-stroke"/>
    </marker>
    <pattern id="paper" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.45" fill="${ink}" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${background}"/>
  <rect width="${W}" height="${H}" fill="url(#paper)" opacity="0.42"/>
`;

const rootEnd = `</svg>\n`;

const masthead = (section, color = "#171717", issue = "FIELD GUIDE / 2026") =>
  `${mono(54, 42, "RENOWA LABS / ENGINEERING", 12, 700, color, 'letter-spacing="1.3"')}${mono(1146, 42, issue, 12, 700, color, 'text-anchor="end" letter-spacing="1.3"')}${line(54, 57, 1146, 57, color, 1)}${mono(54, 80, section, 11, 700, color, 'letter-spacing="1.2"')}`;

const footer = (index, color = "#171717", note = "BUILT FROM THE ARTICLE'S OPERATING MODEL") =>
  `${line(54, 574, 1146, 574, color, 1)}${mono(54, 598, note, 10, 700, color, 'letter-spacing="0.9"')}`;

const svgImage = (buffer, x, y, width, height) => {
  const data = buffer.toString("base64");
  return `<image x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${data}"/>`;
};

function internationalFounderCover() {
  const ink = "#171717";
  const orange = "#E86832";
  const paper = "#F3F0E8";
  const green = "#517A64";
  let s = rootStart(paper, ink);
  s += masthead("STARTUP OPERATIONS", ink);
  s += txt(54, 126, "FORMED", 58, 800, ink, 'letter-spacing="-2"');
  s += txt(275, 126, "≠", 58, 400, orange);
  s += txt(340, 126, "OPERATING", 58, 800, ink, 'letter-spacing="-2"');
  s += mono(1146, 118, "ONE ENTITY / MANY OPERATING RECORDS", 12, 700, ink, 'text-anchor="end" letter-spacing="0.8"');

  s += rect(54, 158, 350, 384, "#FFFDF8", ink, 0, 1.5);
  s += mono(76, 186, "FORMATION RECEIPT", 12, 700, ink, 'letter-spacing="1.2"');
  s += pill(284, 172, 96, "COMPLETE", "#DDE8DF", green);
  s += line(76, 205, 382, 205, "#BEB9AF");
  s += txt(76, 250, "01", 42, 800, orange);
  s += txt(145, 238, "ENTITY", 18, 800, ink);
  s += mono(145, 260, "CERTIFICATE / GOVERNING DOCS", 11, 600, "#69655F");
  s += line(76, 284, 382, 284, "#D2CDC3");
  s += txt(76, 329, "02", 42, 800, orange);
  s += txt(145, 317, "EIN", 18, 800, ink);
  s += mono(145, 339, "SS-4 / ASSIGNMENT NOTICE", 11, 600, "#69655F");
  s += line(76, 363, 382, 363, "#D2CDC3");
  s += txt(76, 408, "04", 42, 800, orange);
  s += txt(145, 396, "ADDRESS ROLES", 18, 800, ink);
  s += mono(145, 418, "REGISTERED / PRINCIPAL", 11, 600, "#69655F");
  s += mono(145, 436, "MAILING / RESIDENTIAL", 11, 600, "#69655F");
  s += line(76, 460, 382, 460, "#D2CDC3");
  s += mono(76, 491, "FORMATION IS THE STARTING RECORD.", 11, 700, ink);
  s += mono(76, 511, "THE OPERATING STACK KEEPS IT USABLE.", 11, 700, ink);

  s += rect(436, 158, 710, 384, "#191919", "#191919");
  s += mono(460, 186, "MINIMUM OPERATING REGISTER", 12, 700, "#F7F2E8", 'letter-spacing="1.2"');
  s += mono(1120, 186, "OWNER + BACKUP + EVIDENCE", 11, 700, "#A9A59D", 'text-anchor="end"');
  s += line(460, 205, 1122, 205, "#55514B");
  const rows = [
    ["PHONE", "COMPANY-OWNED / PORTABLE", "TESTED"],
    ["BANK", "DILIGENCE PACK / RECONCILED", "OWNED"],
    ["PAYMENTS", "CUSTOMER → PAYOUT → LEDGER", "MAPPED"],
    ["FILINGS", "STATE / FEDERAL / HOME COUNTRY", "DATED"],
    ["ACCESS", "ADMIN A / ADMIN B / RECOVERY", "READY"],
  ];
  rows.forEach(([name, detail, state], i) => {
    const y = 223 + i * 58;
    s += mono(460, y + 24, `0${i + 1}`, 12, 700, orange);
    s += txt(500, y + 24, name, 16, 800, "#F7F2E8");
    s += mono(640, y + 24, detail, 11, 600, "#BDB8AF");
    s += pill(1012, y + 8, 92, state, "#2B332E", "#B9D2C1", "#55715E");
    s += line(460, y + 45, 1122, y + 45, "#3B3935");
  });
  s += mono(460, 526, "IDENTITY · MONEY · RECORDS · DEADLINES · RECOVERY", 11, 700, orange, 'letter-spacing="0.7"');
  s += footer("01 / 10", ink, "EDITORIAL MAP / NOT LEGAL OR TAX ADVICE");
  s += rootEnd;
  return s;
}

function merchantOfRecordCover(brands) {
  const ink = "#171717";
  const background = "#EEEDE8";
  const purple = "#635BFF";
  const lime = "#C6FE1E";
  const orange = "#F0A54A";
  let s = rootStart(background, ink);
  s += masthead("PAYMENTS & BILLING", ink, "DECISION MAP / 2026");
  s += txt(54, 122, "WHO IS THE LEGAL SELLER?", 46, 800, ink, 'letter-spacing="-1.4"');
  s += mono(1146, 116, "CHOOSE THE OPERATING MODEL FIRST", 12, 700, ink, 'text-anchor="end" letter-spacing="0.7"');

  s += rect(54, 151, 526, 393, "#FAF9F5", ink, 0, 1.5);
  s += pill(76, 169, 156, "DIRECT PROCESSING", "#E5E2DA", ink);
  s += mono(558, 188, "A", 18, 800, ink, 'text-anchor="end"');
  s += rect(92, 221, 180, 48, "#FFFFFF", ink, 24, 1.5);
  s += txt(182, 252, "CUSTOMER", 14, 800, ink, 'text-anchor="middle" letter-spacing="0.8"');
  s += arrow(272, 245, 344, 245, ink, 2);
  s += rect(350, 211, 190, 69, "#171717", "#171717", 4);
  s += mono(445, 234, "LEGAL SELLER", 10, 700, "#C8C2B8", 'text-anchor="middle" letter-spacing="1.2"');
  s += txt(445, 260, "YOUR COMPANY", 18, 800, "#FFFFFF", 'text-anchor="middle"');
  s += line(76, 306, 558, 306, "#C7C2B9");
  s += mono(76, 330, "PAYMENT RAIL", 10, 700, "#706C66", 'letter-spacing="1.1"');
  s += svgImage(brands.stripe, 76, 343, 108, 46);
  s += mono(210, 369, "MOVES PAYMENT DATA + FUNDS", 11, 600, "#58554F");
  const directTasks = ["TAX REGISTRATION", "CUSTOMER INVOICE", "REFUNDS / DISPUTES", "TERMS / COMPLIANCE"];
  directTasks.forEach((task, i) => {
    const x = 76 + (i % 2) * 239;
    const y = 410 + Math.floor(i / 2) * 48;
    s += rect(x, y, 220, 34, "#F0EEE8", "#C7C2B9", 2);
    s += mono(x + 12, y + 22, task, 10, 700, ink);
    s += mono(x + 204, y + 22, "YOU", 10, 800, purple, 'text-anchor="end"');
  });
  s += mono(76, 521, "YOUR COMPANY SELLS DIRECTLY TO THE CUSTOMER", 11, 700, ink);

  s += rect(620, 151, 526, 393, "#20211F", "#20211F", 0, 1.5);
  s += pill(642, 169, 190, "MERCHANT OF RECORD", "#343530", "#FFFFFF", "#565750");
  s += mono(1124, 188, "B", 18, 800, "#FFFFFF", 'text-anchor="end"');
  s += rect(650, 221, 170, 48, "#FFFFFF", "#FFFFFF", 24);
  s += txt(735, 252, "CUSTOMER", 14, 800, ink, 'text-anchor="middle" letter-spacing="0.8"');
  s += arrow(820, 245, 880, 245, "#FFFFFF", 2);
  s += rect(886, 211, 224, 69, lime, lime, 4);
  s += mono(998, 234, "LEGAL SELLER", 10, 700, "#1C241E", 'text-anchor="middle" letter-spacing="1.2"');
  s += txt(998, 260, "MoR PROVIDER", 18, 800, "#0B1D13", 'text-anchor="middle"');
  s += line(642, 306, 1124, 306, "#4B4B47");
  s += mono(642, 329, "EXAMPLE MoR PROVIDERS", 10, 700, "#AAA8A1", 'letter-spacing="1.1"');
  s += rect(642, 344, 142, 48, "#FAF9F5", "#FAF9F5", 3);
  s += svgImage(brands.paddle, 657, 353, 112, 30);
  s += rect(794, 344, 142, 48, "#FAF9F5", "#FAF9F5", 3);
  s += svgImage(brands.lemon, 807, 354, 19, 26);
  s += txt(835, 373, "Lemon Squeezy", 11, 700, ink);
  s += rect(946, 344, 178, 48, "#FAF9F5", "#FAF9F5", 3);
  s += svgImage(brands.dodo, 961, 356, 148, 24);
  const morTasks = ["TAX + REMITTANCE", "FORMAL INVOICE", "FIRST-LINE DISPUTES"];
  morTasks.forEach((task, i) => {
    const y = 414 + i * 36;
    s += dot(651, y - 4, 4, lime);
    s += mono(664, y, task, 10, 700, "#E9E6DE");
    s += mono(1112, y, "MoR", 10, 800, orange, 'text-anchor="end"');
  });
  s += arrow(943, 508, 840, 508, "#B8B5AE", 1.5);
  s += mono(985, 512, "NET PAYOUT", 10, 700, "#B8B5AE");
  s += txt(642, 525, "YOUR COMPANY", 14, 800, "#FFFFFF");
  s += footer("02 / 10", ink, "EDITORIAL COMPARISON · TRADEMARKS IDENTIFY PROVIDERS · NO AFFILIATION");
  s += rootEnd;
  return s;
}

/* eslint-disable @typescript-eslint/no-unused-vars -- preserved detailed-cover alternatives. */
function cloudCostsCover() {
  const ink = "#171717";
  const background = "#D8D2C7";
  const orange = "#E86832";
  let s = rootStart(background, ink);
  s += masthead("CLOUD INFRASTRUCTURE", ink, "COST REVIEW / 2026");
  s += txt(54, 122, "PRICE THE PATH, NOT THE SERVER.", 45, 800, ink, 'letter-spacing="-1.3"');
  s += mono(1146, 116, "ARCHITECTURE × BEHAVIOR = BILL", 12, 700, ink, 'text-anchor="end"');
  s += rect(54, 151, 1092, 392, "#F7F3EB", ink, 0, 1.5);
  s += mono(78, 180, "MONTHLY INFRASTRUCTURE STATEMENT", 12, 700, ink, 'letter-spacing="1.1"');
  s += mono(1122, 180, "QUIET MONTH / NO TRAFFIC SPIKE", 11, 700, "#67635D", 'text-anchor="end"');
  s += line(78, 196, 1122, 196, ink, 1.5);
  s += mono(78, 222, "METER", 10, 700, "#77726A", 'letter-spacing="1.1"');
  s += mono(760, 222, "HOW IT MULTIPLIES", 10, 700, "#77726A", 'letter-spacing="1.1"');
  s += mono(1122, 222, "LINE ITEM", 10, 700, "#77726A", 'text-anchor="end" letter-spacing="1.1"');
  const rows = [
    ["COMPUTE", "ONE SMALL INSTANCE", "$5"],
    ["NAT GATEWAY", "HOURS + BYTES PROCESSED", "ALWAYS ON"],
    ["LOGS", "INGEST + RETENTION", "EVERY REQUEST"],
    ["PUBLIC IPv4", "ADDRESS-HOURS", "PER ADDRESS"],
    ["DATA TRANSFER", "ROUTE + ZONE + REGION", "PER GB"],
    ["AUTOSCALING", "TRAFFIC × RETRIES × LIMIT", "UNBOUNDED"],
  ];
  rows.forEach(([meter, multiplier, item], i) => {
    const y = 240 + i * 43;
    const isCompute = i === 0;
    if (isCompute) s += rect(72, y - 12, 1056, 36, "#E7E1D7", "none", 2);
    s += mono(78, y + 10, meter, 12, isCompute ? 800 : 700, isCompute ? ink : orange);
    s += mono(760, y + 10, multiplier, 11, 600, "#56524D");
    s += mono(1122, y + 10, item, isCompute ? 18 : 11, 800, isCompute ? ink : "#56524D", 'text-anchor="end"');
    s += line(78, y + 25, 1122, y + 25, "#D1CBC0");
  });
  s += rect(78, 506, 1044, 19, ink);
  s += mono(90, 520, "$5 COMPUTE CAN STILL SIT INSIDE A THREE-DIGIT BILL", 11, 700, "#FFFFFF", 'letter-spacing="0.7"');
  s += mono(1110, 520, "NAT · LOGS · IPv4 · TRANSFER", 11, 700, "#FFFFFF", 'text-anchor="end"');
  s += footer("03 / 10", ink, "INVOICE-LED ARCHITECTURE REVIEW");
  s += rootEnd;
  return s;
}

function authenticationCover() {
  const ink = "#F5F0E7";
  const background = "#191A18";
  const orange = "#E86832";
  const green = "#8EB09A";
  const red = "#E17769";
  let s = rootStart(background, "#FFFFFF");
  s += masthead("CYBERSECURITY", ink, "ACCOUNT STATE MAP / 2026");
  s += txt(54, 122, "AUTHENTICATION STARTS AFTER LOGIN.", 43, 800, ink, 'letter-spacing="-1.2"');

  s += rect(54, 158, 164, 72, "#F4EFE6", "#F4EFE6", 3);
  s += mono(136, 181, "ENTRY", 10, 700, "#66615A", 'text-anchor="middle" letter-spacing="1.2"');
  s += txt(136, 210, "LOGIN", 22, 800, "#171717", 'text-anchor="middle"');
  s += arrow(218, 194, 294, 194, ink, 2);
  s += rect(302, 158, 188, 72, "#F4EFE6", "#F4EFE6", 3);
  s += mono(396, 181, "AUTHORITY", 10, 700, "#66615A", 'text-anchor="middle" letter-spacing="1.2"');
  s += txt(396, 210, "SESSION", 22, 800, "#171717", 'text-anchor="middle"');
  s += arrow(490, 194, 566, 194, ink, 2);
  s += rect(574, 158, 206, 72, green, green, 3);
  s += mono(677, 181, "SENSITIVE ACTION", 10, 700, "#203126", 'text-anchor="middle" letter-spacing="1"');
  s += txt(677, 210, "RECENT REAUTH", 19, 800, "#142219", 'text-anchor="middle"');
  s += arrow(780, 194, 856, 194, ink, 2);
  s += rect(864, 158, 282, 72, "#F4EFE6", "#F4EFE6", 3);
  s += mono(1005, 181, "RESOURCE BOUNDARY", 10, 700, "#66615A", 'text-anchor="middle" letter-spacing="1"');
  s += txt(1005, 210, "TENANT + ROLE + ACTION", 18, 800, "#171717", 'text-anchor="middle"');

  s += mono(54, 276, "ALTERNATE ACCESS PATHS", 11, 700, "#AAA8A1", 'letter-spacing="1.1"');
  const alternate = [
    ["PASSWORD RESET", "SINGLE-USE TOKEN", "REVOKE SESSIONS"],
    ["MFA REPLACEMENT", "ORIGINAL FACTOR / CODE", "NOTIFY OLD CHANNEL"],
    ["EMAIL CHANGE", "RECENT REAUTH", "AUDIT + ALERT"],
    ["SUPPORT ACCESS", "LIMITED SESSION", "BLOCK HIGH-RISK ACTIONS"],
  ];
  alternate.forEach(([name, proof, result], i) => {
    const x = 54 + i * 274;
    s += rect(x, 296, 254, 132, "#242522", "#555650", 2, 1);
    s += mono(x + 16, 322, `0${i + 1}`, 12, 800, orange);
    s += txt(x + 16, 348, name, 15, 800, ink);
    s += line(x + 16, 362, x + 238, 362, "#4A4B46");
    s += mono(x + 16, 385, `PROOF / ${proof}`, 10, 600, "#C5C1B8");
    s += mono(x + 16, 405, `AFTER / ${result}`, 10, 600, "#C5C1B8");
  });
  s += arrow(181, 452, 181, 503, red, 2, "5 5");
  s += arrow(455, 452, 455, 503, red, 2, "5 5");
  s += arrow(729, 452, 729, 503, red, 2, "5 5");
  s += arrow(1003, 452, 1003, 503, red, 2, "5 5");
  s += rect(54, 508, 1092, 37, "#2E211E", red, 2, 1);
  s += mono(74, 532, "ATTACKERS CHOOSE THE CHEAPEST PATH — TEST TRANSITIONS, NOT JUST THE LOGIN FORM", 11, 700, "#F0B3A8", 'letter-spacing="0.6"');
  s += footer("04 / 10", ink, "IDENTITY · RECOVERY · SESSIONS · AUTHORIZATION · ADMIN ACCESS");
  s += rootEnd;
  return s;
}

function transactionalEmailCover() {
  const ink = "#172029";
  const background = "#E8EFF0";
  const orange = "#E86832";
  const blue = "#3E6A79";
  const green = "#4F8064";
  let s = rootStart(background, ink);
  s += masthead("SAAS INFRASTRUCTURE", ink, "DELIVERABILITY MAP / 2026");
  s += txt(54, 122, "TWO MAIL STREAMS. ONE DOMAIN REPUTATION.", 41, 800, ink, 'letter-spacing="-1.1"');

  s += rect(54, 151, 525, 232, "#FBFAF5", ink, 2, 1.5);
  s += pill(76, 170, 152, "TRANSACTIONAL", "#D8E9DE", green);
  s += mono(557, 188, "CRITICAL", 11, 800, green, 'text-anchor="end" letter-spacing="1"');
  s += txt(76, 231, "notify.example.com", 25, 800, ink);
  s += mono(76, 255, "RESET / LOGIN CODE / INVOICE / ALERT", 11, 700, "#626B6E");
  s += line(76, 274, 557, 274, "#CCD1D0");
  s += mono(76, 301, "SEPARATE PROVIDER + DKIM KEY + MONITORING", 10, 700, blue);
  ["ACCEPTED", "DELIVERED?", "BOUNCED", "SUPPRESSED"].forEach((label, i) => {
    const x = 76 + i * 116;
    s += rect(x, 322, 104, 34, i === 3 ? "#F1DCD7" : "#E8E5DD", "none", 2);
    s += mono(x + 52, 344, label, 9, 700, i === 3 ? "#A94E40" : ink, 'text-anchor="middle"');
    if (i < 3) s += arrow(x + 104, 339, x + 114, 339, ink, 1);
  });

  s += rect(621, 151, 525, 232, "#252829", "#252829", 2, 1.5);
  s += pill(643, 170, 132, "MARKETING", "#414546", "#FFFFFF", "#5E6263");
  s += mono(1124, 188, "OPT-IN", 11, 800, "#B8B8B4", 'text-anchor="end" letter-spacing="1"');
  s += txt(643, 231, "updates.example.com", 25, 800, "#FFFFFF");
  s += mono(643, 255, "ANNOUNCEMENT / NEWSLETTER / CAMPAIGN", 11, 700, "#B6B7B3");
  s += line(643, 274, 1124, 274, "#4E5151");
  s += mono(643, 301, "OWN SENDING RATE + PREFERENCES + UNSUBSCRIBE", 10, 700, "#9FC0CB");
  s += rect(643, 322, 481, 34, "#343738", "#5E6263", 2);
  s += mono(659, 344, "DO NOT BORROW TRUST FROM PASSWORD RESETS", 10, 700, "#F0A38F");

  s += rect(54, 408, 1092, 137, "#FBFAF5", ink, 2, 1.5);
  s += mono(76, 436, "AUTHENTICATE THE EXACT SENDING ARRANGEMENT", 11, 700, ink, 'letter-spacing="1"');
  const dns = [
    ["SPF", "AUTHORIZED ENVELOPE SENDER"],
    ["DKIM", "SIGNED DOMAIN + SELECTOR"],
    ["DMARC", "VISIBLE FROM ALIGNMENT"],
  ];
  dns.forEach(([name, detail], i) => {
    const x = 76 + i * 235;
    s += rect(x, 457, 215, 62, i === 2 ? "#172029" : "#E9E6DE", "#BCC2C1", 2);
    s += txt(x + 15, 481, name, 17, 800, i === 2 ? "#FFFFFF" : ink);
    s += mono(x + 15, 501, detail, 9, 700, i === 2 ? "#C9CFD0" : "#596164");
  });
  s += arrow(774, 488, 839, 488, orange, 2);
  s += rect(852, 457, 272, 62, "#F2D9D2", "#CA7B67", 2);
  s += txt(868, 482, "HARD BOUNCE / COMPLAINT", 13, 800, "#8D3F33");
  s += mono(868, 502, "GLOBAL SUPPRESSION · NO RETRY LOOP", 9, 700, "#8D3F33");
  s += footer("05 / 10", ink, "IDENTITY · EVENTS · SUPPRESSION · USER OUTCOME");
  s += rootEnd;
  return s;
}

function aiEvalsCover() {
  const ink = "#161616";
  const background = "#E8DB72";
  const orange = "#E86832";
  const green = "#4D795F";
  let s = rootStart(background, ink);
  s += masthead("AI PRODUCT ENGINEERING", ink, "EVALUATION LOOP / 2026");
  s += txt(54, 122, "OBSERVE → TEST → CHANGE → VERIFY", 46, 800, ink, 'letter-spacing="-1.4"');

  const stages = [
    [54, 164, 196, "01", "REAL FAILURES", "20–50 TASKS"],
    [274, 164, 196, "02", "TAXONOMY", "PLAIN LABELS"],
    [494, 164, 196, "03", "CHECKS", "CODE FIRST"],
    [714, 164, 196, "04", "GRADER", "CALIBRATED"],
    [934, 164, 212, "05", "REGRESSION", "SHIP / HOLD"],
  ];
  stages.forEach(([x, y, w, n, title, sub], i) => {
    s += rect(x, y, w, 108, i === 4 ? "#171717" : "#F7F0BA", ink, 2, 1.5);
    s += mono(x + 14, y + 23, n, 11, 800, i === 4 ? background : orange);
    s += txt(x + 14, y + 57, title, 16, 800, i === 4 ? "#FFFFFF" : ink);
    s += mono(x + 14, y + 82, sub, 10, 700, i === 4 ? "#C7C3AF" : "#5D5A41");
    if (i < 4) s += arrow(x + w, y + 54, x + w + 18, y + 54, ink, 1.5);
  });

  s += rect(54, 304, 680, 241, "#171717", "#171717", 2);
  s += mono(76, 331, "RUN / candidate-v12 / dataset-025", 11, 700, "#BDB8A2");
  s += line(76, 345, 712, 345, "#44443E");
  const cases = [
    ["CASE 07", "wrong tool", "FAIL", orange],
    ["CASE 11", "valid schema", "PASS", "#7CC194"],
    ["CASE 18", "unsupported promise", "FAIL", orange],
    ["CASE 23", "correct outcome", "PASS", "#7CC194"],
  ];
  cases.forEach(([id, label, status, color], i) => {
    const y = 372 + i * 39;
    s += mono(76, y, id, 11, 700, "#E6E2D4");
    s += mono(176, y, label, 11, 600, "#BDB8A2");
    s += pill(623, y - 19, 76, status, "#292B27", color, "#4E514A");
    s += line(76, y + 13, 712, y + 13, "#383934");
  });
  s += mono(76, 529, "DETERMINISTIC: JSON · FIELDS · TOOL LIMIT · RESULTING STATE", 10, 700, "#E7D96D");

  s += rect(760, 304, 386, 241, "#F7F0BA", ink, 2, 1.5);
  s += mono(782, 332, "COMPARE PRODUCT TRADE-OFFS", 11, 700, ink, 'letter-spacing="1"');
  const metrics = [
    ["QUALITY", 82, green],
    ["LATENCY", 57, orange],
    ["COST", 41, "#6D6A59"],
  ];
  metrics.forEach(([label, value, color], i) => {
    const y = 370 + i * 48;
    s += mono(782, y, label, 10, 700, ink);
    s += rect(866, y - 13, 238, 16, "#D6CD8A");
    s += rect(866, y - 13, (238 * value) / 100, 16, color);
    s += mono(1110, y, String(value).padStart(2, "0"), 11, 800, ink, 'text-anchor="end"');
  });
  s += line(782, 492, 1124, 492, "#C4BA77");
  s += arrow(1098, 502, 790, 502, ink, 1.5);
  s += mono(1110, 522, "PRODUCTION FAILURE → NEXT TEST", 10, 700, ink, 'text-anchor="end"');
  s += footer("06 / 10", ink, "MAKE PRODUCT CHANGES FALSIFIABLE");
  s += rootEnd;
  return s;
}

function backupRestoreCover() {
  const ink = "#13233A";
  const background = "#C9D6DE";
  const orange = "#E86832";
  const green = "#4D7B61";
  let s = rootStart(background, ink);
  s += masthead("RELIABILITY", ink, "RECOVERY DRILL / 2026");
  s += txt(54, 122, "A BACKUP IS NOT REAL UNTIL RESTORE HAS A CLOCK.", 36, 800, ink, 'letter-spacing="-1"');
  s += rect(54, 151, 1092, 392, "#F7F5EF", ink, 0, 1.5);
  s += mono(78, 180, "RESTORE TEST REPORT / ISOLATED ENVIRONMENT", 11, 700, ink, 'letter-spacing="1"');
  s += pill(1000, 164, 122, "TIMED DRILL", "#DCE9E0", green);
  s += line(78, 197, 1122, 197, ink, 1.5);

  s += rect(78, 218, 296, 111, "#13233A", "#13233A", 2);
  s += mono(98, 245, "RESTORE CLOCK", 11, 700, "#AEBECC", 'letter-spacing="1"');
  s += mono(98, 301, "00 : 00 : 00", 34, 700, "#FFFFFF", 'letter-spacing="1"');
  s += rect(394, 218, 352, 111, "#EAE6DC", "#CBC5B9", 2);
  s += mono(414, 245, "RPO / DATA LOSS WINDOW", 11, 700, "#67625C");
  s += txt(414, 282, "HOW FAR BACK?", 22, 800, ink);
  s += mono(414, 307, "MATCH TARGET TO BACKUP METHOD", 10, 700, orange);
  s += rect(766, 218, 356, 111, "#EAE6DC", "#CBC5B9", 2);
  s += mono(786, 245, "RTO / RECOVERY TIME", 11, 700, "#67625C");
  s += txt(786, 282, "HOW LONG TO USE?", 22, 800, ink);
  s += mono(786, 307, "MEASURED, NOT ASSUMED", 10, 700, orange);

  s += mono(78, 367, "BACKUP", 10, 800, ink, 'letter-spacing="1"');
  s += mono(374, 367, "RESTORE", 10, 800, ink, 'text-anchor="middle" letter-spacing="1"');
  s += mono(674, 367, "VALIDATE", 10, 800, ink, 'text-anchor="middle" letter-spacing="1"');
  s += mono(1122, 367, "EVIDENCE", 10, 800, ink, 'text-anchor="end" letter-spacing="1"');
  s += line(91, 390, 1108, 390, "#9A9690", 4);
  [91, 374, 674, 1108].forEach((x, i) => {
    s += dot(x, 390, 12, i === 3 ? "#F7F5EF" : green, i === 3 ? orange : green, 3);
  });
  s += mono(78, 432, "SELECT TIMESTAMP", 10, 700, "#5D5954");
  s += mono(310, 432, "DB + OBJECTS + KEYS", 10, 700, "#5D5954");
  s += mono(602, 432, "INVARIANTS + APP", 10, 700, "#5D5954");
  s += mono(1122, 432, "REPORT + OWNER", 10, 700, "#5D5954", 'text-anchor="end"');

  const checks = ["DATABASE OPENS", "OBJECT REFERENCES RESOLVE", "ENCRYPTED FIELDS DECRYPT", "READ-ONLY WORKFLOW PASSES"];
  checks.forEach((check, i) => {
    const x = 78 + (i % 2) * 522;
    const y = 460 + Math.floor(i / 2) * 39;
    s += rect(x, y, 502, 30, "#EEEAE1", "#D0CBC0", 2);
    s += dot(x + 16, y + 15, 5, green);
    s += mono(x + 29, y + 19, check, 10, 700, ink);
  });
  s += footer("07 / 10", ink, "RECOVER A KNOWN POINT · MEASURE TIME · PROVE DATA MAKES SENSE");
  s += rootEnd;
  return s;
}

function founderAccessCover() {
  const ink = "#171717";
  const background = "#F1EEE7";
  const red = "#C95D4F";
  const green = "#4E7F62";
  let s = rootStart(background, ink);
  s += masthead("STARTUP OPERATIONS", ink, "ACCESS OWNERSHIP / 2026");
  s += txt(54, 122, "STOP ONE INBOX FROM OWNING THE COMPANY.", 40, 800, ink, 'letter-spacing="-1.2"');

  s += rect(54, 151, 404, 392, "#F8E8E4", red, 0, 1.5);
  s += pill(76, 170, 104, "BEFORE", "#F1CBC3", "#8E3E33");
  s += mono(436, 188, "SPOF", 13, 800, red, 'text-anchor="end" letter-spacing="1.2"');
  s += rect(138, 223, 236, 62, "#FFFFFF", red, 31, 1.5);
  s += mono(256, 250, "founder@personal", 13, 700, ink, 'text-anchor="middle"');
  s += mono(256, 269, "ONE PHONE · ONE RECOVERY", 9, 700, red, 'text-anchor="middle"');
  const leftServices = ["DOMAIN", "EMAIL", "CLOUD", "CODE", "BANK", "PAYMENTS"];
  leftServices.forEach((service, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 78 + col * 190;
    const y = 337 + row * 52;
    s += line(256, 285, x + 76, y, "#CA8F86", 1.2);
    s += rect(x, y, 152, 32, "#FFF9F6", "#D6A198", 2);
    s += mono(x + 76, y + 21, service, 10, 700, ink, 'text-anchor="middle"');
  });
  s += mono(76, 520, "LOSE THE INBOX → LOSE THE RECOVERY ROOT", 10, 700, red);

  s += rect(486, 151, 660, 392, "#E5EEE7", green, 0, 1.5);
  s += pill(508, 170, 92, "AFTER", "#C8DDCE", "#315D44");
  s += mono(1124, 188, "COMPANY-CONTROLLED", 11, 800, green, 'text-anchor="end" letter-spacing="1"');
  s += rect(526, 218, 274, 64, "#FFFFFF", green, 3, 1.5);
  s += mono(548, 242, "ROLE OWNERSHIP", 10, 700, "#57705F", 'letter-spacing="1"');
  s += txt(548, 267, "domains@ · billing@", 16, 800, ink);
  s += rect(822, 218, 136, 64, "#1D2B21", "#1D2B21", 3);
  s += mono(890, 243, "ADMIN A", 11, 800, "#FFFFFF", 'text-anchor="middle"');
  s += mono(890, 263, "INDIVIDUAL", 9, 600, "#AFC4B4", 'text-anchor="middle"');
  s += rect(980, 218, 136, 64, "#1D2B21", "#1D2B21", 3);
  s += mono(1048, 243, "ADMIN B", 11, 800, "#FFFFFF", 'text-anchor="middle"');
  s += mono(1048, 263, "INDEPENDENT", 9, 600, "#AFC4B4", 'text-anchor="middle"');
  s += line(663, 282, 663, 317, green, 1.5);
  s += line(890, 282, 890, 317, green, 1.5);
  s += line(1048, 282, 1048, 317, green, 1.5);
  s += line(548, 317, 1094, 317, green, 1.5);
  const rightServices = ["DOMAIN + DNS", "EMAIL + IDENTITY", "CLOUD + DEPLOY", "CODE + SECRETS", "BANK + BILLING", "LEGAL + FILINGS"];
  rightServices.forEach((service, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 516 + col * 200;
    const y = 346 + row * 52;
    s += line(x + 89, 317, x + 89, y, "#8EAF97", 1);
    s += rect(x, y, 178, 34, "#F9FBF7", "#94B39C", 2);
    s += mono(x + 89, y + 22, service, 9, 700, ink, 'text-anchor="middle"');
  });
  s += rect(516, 460, 578, 48, "#D3E2D6", "#7FA38A", 2);
  s += mono(534, 480, "BREAK GLASS", 10, 800, green);
  s += mono(534, 497, "OFFLINE RECOVERY · MULTIPLE FACTORS · QUARTERLY DRILL", 9, 700, ink);
  s += mono(1124, 526, "INDIVIDUAL ACCOUNTS · NO SHARED PASSWORDS", 10, 700, green, 'text-anchor="end"');
  s += footer("08 / 10", ink, "LEGAL OWNER · DAILY IDENTITY · BACKUP ADMIN · RECOVERY PATH");
  s += rootEnd;
  return s;
}

function webhookLedgerCover() {
  const ink = "#EAE7DE";
  const background = "#202423";
  const orange = "#E86832";
  const green = "#7EB594";
  const yellow = "#D7C56C";
  let s = rootStart(background, "#FFFFFF");
  s += masthead("PAYMENTS ENGINEERING", ink, "EVENT LEDGER / 2026");
  s += txt(54, 122, "PERSIST FIRST. PROCESS SECOND.", 47, 800, ink, 'letter-spacing="-1.4"');
  s += mono(1146, 116, "AT-LEAST-ONCE DELIVERY / SAFE EFFECTS", 11, 700, "#B3B0A8", 'text-anchor="end"');

  s += rect(54, 151, 311, 392, "#2A2F2D", "#555B57", 2);
  s += mono(76, 180, "UNTRUSTED DELIVERY", 11, 700, "#B9BBB5", 'letter-spacing="1"');
  const events = [
    ["evt_104", "invoice.paid", "12:04:11"],
    ["evt_104", "invoice.paid", "12:04:13"],
    ["evt_103", "subscription.updated", "12:04:16"],
  ];
  events.forEach(([id, type, time], i) => {
    const y = 208 + i * 82;
    s += rect(76, y, 267, 64, i === 1 ? "#332724" : "#222725", i === 1 ? orange : "#4C534F", 2);
    s += mono(91, y + 22, id, 12, 800, i === 1 ? "#F1A18D" : ink);
    s += mono(328, y + 22, time, 9, 600, "#929792", 'text-anchor="end"');
    s += mono(91, y + 44, type, 10, 600, "#AFB2AC");
  });
  s += rect(76, 468, 267, 49, "#3A2925", orange, 2);
  s += mono(91, 489, "RAW BODY + SIGNATURE", 10, 800, "#F3B5A6");
  s += mono(91, 507, "VERIFY BEFORE PARSE", 9, 700, ink);

  s += arrow(365, 347, 425, 347, ink, 2);
  s += rect(433, 151, 386, 392, "#F1EEE7", "#F1EEE7", 2);
  s += mono(455, 180, "DURABLE INBOX", 11, 800, "#171717", 'letter-spacing="1"');
  s += pill(680, 164, 116, "WRITE → 2xx", "#D9E5DC", "#3E6950");
  s += rect(455, 207, 342, 80, "#FFFFFF", "#C9C5BB", 2);
  s += mono(473, 231, "UNIQUE(provider, event_id)", 12, 700, "#171717");
  s += line(473, 244, 779, 244, "#DFDBD1");
  s += mono(473, 268, "evt_104 / STORED ONCE", 11, 700, green);
  s += rect(455, 307, 342, 84, "#E6E2D9", "#C9C5BB", 2);
  s += mono(473, 332, "IDEMPOTENT WORKER", 11, 800, "#171717");
  s += mono(473, 354, "STATE TRANSITION + OUTBOX", 10, 700, "#66615B");
  s += mono(473, 375, "STABLE SEMANTIC KEY", 10, 700, "#66615B");
  s += arrow(626, 391, 626, 432, "#171717", 1.5);
  s += rect(455, 440, 342, 77, "#171717", "#171717", 2);
  s += mono(473, 466, "ENTITLEMENT", 10, 700, "#AEB1AB");
  s += txt(473, 493, "START / END / REASON", 16, 800, "#FFFFFF");

  s += arrow(819, 347, 879, 347, ink, 2);
  s += rect(887, 151, 259, 392, "#2A2F2D", "#555B57", 2);
  s += mono(909, 180, "RECONCILIATION", 11, 700, "#B9BBB5", 'letter-spacing="1"');
  s += rect(909, 212, 215, 62, "#1F2422", "#525954", 2);
  s += mono(1016, 237, "PROVIDER STATE", 10, 700, ink, 'text-anchor="middle"');
  s += mono(1016, 258, "INVOICE / REFUND / PAYOUT", 9, 600, "#A5A9A3", 'text-anchor="middle"');
  s += arrow(1016, 274, 1016, 325, yellow, 1.5);
  s += rect(909, 333, 215, 62, "#1F2422", "#525954", 2);
  s += mono(1016, 358, "LOCAL LEDGER", 10, 700, ink, 'text-anchor="middle"');
  s += mono(1016, 379, "COMPARE + REPAIR", 9, 600, "#A5A9A3", 'text-anchor="middle"');
  s += arrow(1124, 364, 1124, 244, yellow, 1.5, "5 5");
  s += mono(1108, 436, "OUT OF ORDER?", 10, 800, orange, 'text-anchor="end"');
  s += mono(1108, 456, "FETCH CURRENT OBJECT", 9, 700, ink, 'text-anchor="end"');
  s += mono(1108, 486, "MISSING EVENT?", 10, 800, orange, 'text-anchor="end"');
  s += mono(1108, 506, "RECONCILE THE WINDOW", 9, 700, ink, 'text-anchor="end"');
  s += footer("09 / 10", ink, "SIGNATURE · DURABILITY · IDEMPOTENCY · ORDER · RECONCILIATION");
  s += rootEnd;
  return s;
}

function degradedModeCover() {
  const ink = "#1A1930";
  const background = "#DFDCEE";
  const orange = "#E86832";
  const green = "#4E7F62";
  const blue = "#5668A6";
  let s = rootStart(background, ink);
  s += masthead("RELIABILITY", ink, "DEGRADED MODE / 2026");
  s += txt(54, 122, "THE PROVIDER IS DOWN. WHAT STILL WORKS?", 41, 800, ink, 'letter-spacing="-1.2"');

  s += rect(54, 151, 1092, 392, "#F6F4FA", ink, 0, 1.5);
  s += rect(78, 178, 230, 338, "#24213D", "#24213D", 3);
  s += mono(100, 205, "PRODUCT REQUEST", 11, 700, "#BBB7D0", 'letter-spacing="1"');
  s += txt(100, 247, "CORE", 34, 800, "#FFFFFF");
  s += txt(100, 282, "WORKFLOW", 34, 800, "#FFFFFF");
  s += line(100, 306, 286, 306, "#56516F");
  s += mono(100, 335, "PRESERVE USER INTENT", 10, 700, "#D1CCDF");
  s += mono(100, 356, "MAKE UNCERTAINTY VISIBLE", 10, 700, "#D1CCDF");
  s += mono(100, 377, "CONTINUE INDEPENDENT WORK", 10, 700, "#D1CCDF");
  s += rect(100, 423, 186, 64, "#323052", "#676283", 2);
  s += mono(193, 449, "KILL SWITCH", 11, 800, "#FFFFFF", 'text-anchor="middle"');
  s += mono(193, 470, "AUDITED + TESTED", 9, 700, "#BCB8D1", 'text-anchor="middle"');
  s += `<path d="M308 347 H330 V166 H1001" fill="none" stroke="#77718D" stroke-width="1.5"/>`;

  const classes = [
    [354, "HARD", "PAYMENT AUTH", "BLOCK HONESTLY", orange, "NO SAFE COMPLETION"],
    [618, "DELAYABLE", "TRANSACTIONAL EMAIL", "QUEUE DURABLY", blue, "COMPLETE LATER"],
    [882, "ENHANCING", "AI ENRICHMENT", "SKIP / FALL BACK", green, "CORE STILL WORKS"],
  ];
  classes.forEach(([x, type, service, behavior, color, result], i) => {
    s += arrow(x + 119, 166, x + 119, 176, color, 1.6);
    s += rect(x, 178, 238, 338, "#FFFFFF", color, 3, 1.5);
    s += pill(x + 18, 196, type === "DELAYABLE" ? 112 : 96, type, `${color}22`, color, color);
    s += mono(x + 220, 214, `0${i + 1}`, 12, 800, color, 'text-anchor="end"');
    s += txt(x + 18, 257, service, 16, 800, ink);
    s += mono(x + 18, 281, "UPSTREAM / 500 · 429 · TIMEOUT", 9, 700, "#777287");
    s += line(x + 18, 301, x + 220, 301, "#D9D5E2");
    s += mono(x + 18, 328, "DEADLINE", 9, 700, "#777287");
    s += mono(x + 220, 328, "EXPLICIT", 9, 800, ink, 'text-anchor="end"');
    s += mono(x + 18, 351, "RETRIES", 9, 700, "#777287");
    s += mono(x + 220, 351, "BOUNDED + JITTER", 9, 800, ink, 'text-anchor="end"');
    s += mono(x + 18, 374, "BREAKER", 9, 700, "#777287");
    s += mono(x + 220, 374, "OPEN", 9, 800, color, 'text-anchor="end"');
    s += rect(x + 18, 404, 202, 48, `${color}18`, color, 2);
    s += mono(x + 119, 424, behavior, 10, 800, color, 'text-anchor="middle"');
    s += mono(x + 119, 441, result, 9, 700, ink, 'text-anchor="middle"');
    s += mono(x + 18, 484, i === 0 ? "STATUS LOOKUP BEFORE RETRY" : i === 1 ? "QUEUE AGE + DEAD LETTERS" : "BASIC LOCAL EXPERIENCE", 9, 700, "#615C70");
  });
  s += footer("10 / 10", ink, "HARD · DELAYABLE · ENHANCING / TIMEOUT · QUEUE · FALLBACK · KILL SWITCH");
  s += rootEnd;
  return s;
}

function applicationFlowsCover(brands) {
  const ink = "#17172B";
  const background = "#EEEFFA";
  const indigo = "#4F46EF";
  const orange = "#E86832";
  const green = "#4D7B61";
  let s = rootStart(background, ink);
  s += masthead("HIRINQ / CANDIDATE EXPERIENCE", ink, "APPLICATION HANDOFFS / 2026");
  s += txt(54, 122, "THREE APPLICATION PATHS. ONE CLEAR HANDOFF.", 38, 800, ink, 'letter-spacing="-1.1"');
  s += svgImage(brands.hirinq, 1105, 86, 38, 38);

  const lanes = [
    ["DIRECT", "IN-PRODUCT FORM", "VALIDATE + SUBMIT", "RECEIPT RECORDED", green],
    ["EMAIL", "DRAFT + ATTACHMENTS", "OPEN MAIL APP", "OPENED ≠ SENT", orange],
    ["EXTERNAL", "CONTEXT HANDOFF", "EMPLOYER FORM", "RECEIPT UNKNOWN", indigo],
  ];
  lanes.forEach(([route, start, boundary, outcome, color], i) => {
    const y = 162 + i * 118;
    s += rect(54, y, 1092, 96, "#FAF9F5", color, 2, 1.5);
    s += pill(72, y + 16, 106, route, `${color}20`, color, color);
    s += mono(72, y + 67, i === 0 ? "OWNED END TO END" : "HANDOFF BOUNDARY", 9, 700, "#6C697B");
    s += rect(221, y + 17, 236, 60, "#F0EFEA", "#CBC8D1", 2);
    s += mono(239, y + 40, "BEFORE START", 9, 700, "#777381");
    s += txt(239, y + 63, start, 14, 800, ink);
    s += arrow(457, y + 47, 518, y + 47, color, 1.7);
    s += rect(526, y + 17, 236, 60, "#24223A", "#24223A", 2);
    s += mono(544, y + 40, "CANDIDATE ACTION", 9, 700, "#B8B5C7");
    s += txt(544, y + 63, boundary, 14, 800, "#FFFFFF");
    s += arrow(762, y + 47, 823, y + 47, color, 1.7);
    s += rect(831, y + 17, 291, 60, `${color}18`, color, 2);
    s += mono(849, y + 40, "TRACKING CLAIM", 9, 700, color);
    s += txt(849, y + 63, outcome, 14, 800, ink);
  });
  s += rect(54, 530, 1092, 24, ink);
  s += mono(72, 547, "LABEL THE ROUTE BEFORE THE CANDIDATE STARTS · PRESERVE STATE WHEN THEY LEAVE", 10, 700, "#FFFFFF", 'letter-spacing="0.6"');
  s += footer("", ink, "DIRECT · EMAIL · EXTERNAL / HONEST ACTIVITY STATES");
  s += rootEnd;
  return s;
}

function aiFirstProductsCover() {
  const ink = "#181816";
  const background = "#E8E1D4";
  const orange = "#E86832";
  const purple = "#6860A8";
  const green = "#4E7F62";
  let s = rootStart(background, ink);
  s += masthead("AI PRODUCT ENGINEERING", ink, "COMPLETE SYSTEM / 2026");
  s += txt(54, 122, "AI IS ONE LAYER OF THE PRODUCT.", 47, 800, ink, 'letter-spacing="-1.4"');

  s += rect(54, 156, 260, 252, "#1D1D1B", "#1D1D1B", 2);
  s += mono(76, 184, "START WITH THE DECISION", 10, 700, "#AAA79F", 'letter-spacing="1"');
  s += txt(76, 229, "WHAT REPEATED", 21, 800, "#FFFFFF");
  s += txt(76, 257, "CHOICE IS SLOW,", 21, 800, "#FFFFFF");
  s += txt(76, 285, "FRAGMENTED OR", 21, 800, "#FFFFFF");
  s += txt(76, 313, "HARD TO MAKE?", 21, 800, "#FFFFFF");
  s += line(76, 337, 292, 337, "#4D4C47");
  s += mono(76, 362, "MEASURE THE USER OUTCOME", 10, 700, "#D9D5CC");
  s += mono(76, 385, "NOT MODEL NOVELTY", 10, 700, orange);

  s += arrow(314, 282, 365, 282, ink, 2);
  s += rect(373, 156, 512, 252, "#F8F5EE", ink, 2, 1.5);
  s += mono(395, 184, "PRODUCT SYSTEM", 10, 700, ink, 'letter-spacing="1"');
  const layers = [
    ["01", "PROVENANCE", "WHERE FACTS CAME FROM", "#DCE6DE"],
    ["02", "RETRIEVAL + RULES", "EXACT BEFORE GENERATIVE", "#E8E2D6"],
    ["03", "MODEL", "INTERPRET / RANK / GENERATE", "#DED9F0"],
    ["04", "INTERACTION", "UNDERSTAND / CORRECT / ACT", "#F2DDD7"],
  ];
  layers.forEach(([n, name, detail, fill], i) => {
    const y = 201 + i * 47;
    s += rect(395, y, 468, 38, fill, "#C9C4BA", 2);
    s += mono(411, y + 24, n, 10, 800, orange);
    s += txt(452, y + 24, name, 13, 800, ink);
    s += mono(845, y + 24, detail, 9, 700, "#625E58", 'text-anchor="end"');
  });
  s += mono(395, 398, "AI CAN FAIL WITHOUT ERASING THE UNDERLYING WORK", 9, 700, purple);

  s += arrow(885, 282, 936, 282, ink, 2);
  s += rect(944, 156, 202, 252, "#DCE6DE", green, 2, 1.5);
  s += mono(966, 184, "USER CONTROL", 10, 700, green, 'letter-spacing="1"');
  s += txt(966, 226, "USEFUL", 25, 800, ink);
  s += txt(966, 256, "ACTION", 25, 800, ink);
  s += line(966, 278, 1124, 278, "#A9BDAE");
  s += mono(966, 305, "EDIT", 10, 800, ink);
  s += mono(966, 329, "CORRECT", 10, 800, ink);
  s += mono(966, 353, "SAVE", 10, 800, ink);
  s += mono(966, 377, "FALL BACK", 10, 800, ink);

  s += rect(54, 434, 1092, 112, "#F8F5EE", ink, 2, 1.5);
  s += mono(76, 460, "PRODUCT QUALITY HAS FIVE LAYERS", 10, 700, ink, 'letter-spacing="1"');
  const quality = ["DATA", "SYSTEM", "MODEL", "INTERACTION", "OPERATIONS"];
  quality.forEach((name, i) => {
    const x = 76 + i * 207;
    s += rect(x, 479, 187, 43, i === 2 ? "#DED9F0" : "#ECE8DF", "#C9C4BA", 2);
    s += mono(x + 94, 505, name, 10, 800, i === 2 ? purple : ink, 'text-anchor="middle" letter-spacing="0.8"');
  });
  s += footer("", ink, "REAL WORKFLOW · RELIABLE DATA · APPROPRIATE MODEL · MEASURABLE OUTCOME · FALLBACK");
  s += rootEnd;
  return s;
}

function duplicateJobsCover(brands) {
  const ink = "#16202A";
  const background = "#DCE8EC";
  const indigo = "#4F46EF";
  const orange = "#E86832";
  const green = "#4E7F62";
  let s = rootStart(background, ink);
  s += masthead("HIRINQ / DATA QUALITY", ink, "DUPLICATE DECISION / 2026");
  s += txt(54, 122, "GROUP THE OPPORTUNITY. KEEP THE SOURCES.", 40, 800, ink, 'letter-spacing="-1.2"');
  s += svgImage(brands.hirinq, 1105, 86, 38, 38);

  s += mono(54, 158, "SOURCE RECORDS", 10, 700, ink, 'letter-spacing="1"');
  const sources = [
    ["EMPLOYER PAGE", "Senior Product Designer", "Baku · Hybrid"],
    ["REGIONAL PORTAL", "Sr. Product Designer", "Bakı / hybrid"],
    ["SOCIAL LISTING", "Product Designer (Senior)", "Hybrid · Baku"],
  ];
  sources.forEach(([source, title, location], i) => {
    const y = 176 + i * 102;
    s += rect(54, y, 320, 82, "#F9F8F4", "#AEBEC4", 2);
    s += mono(72, y + 21, source, 9, 700, indigo);
    s += txt(72, y + 47, title, 15, 800, ink);
    s += mono(72, y + 67, location, 10, 600, "#647079");
    s += arrow(374, y + 41, 430, 278, "#83969F", 1.2);
  });

  s += rect(438, 176, 294, 286, "#1D252A", "#1D252A", 2);
  s += mono(460, 204, "INDEPENDENT SIGNALS", 10, 700, "#B5C0C5", 'letter-spacing="1"');
  const signals = [
    ["EMPLOYER", "VERIFIED DOMAIN", green],
    ["TITLE", "ROLE + SENIORITY", green],
    ["LOCATION", "COMPATIBLE", green],
    ["DESCRIPTION", "DISTINCTIVE OVERLAP", green],
    ["APPLY URL", "SAME DESTINATION", indigo],
    ["TIME", "PLAUSIBLE WINDOW", orange],
  ];
  signals.forEach(([name, value, color], i) => {
    const y = 228 + i * 35;
    s += dot(462, y - 4, 4, color);
    s += mono(476, y, name, 9, 700, "#FFFFFF");
    s += mono(710, y, value, 9, 700, "#AEB9BE", 'text-anchor="end"');
    s += line(460, y + 12, 710, y + 12, "#3D464A");
  });
  s += rect(460, 427, 250, 20, "#3A2925", orange, 2);
  s += mono(585, 441, "CAUTIOUS THRESHOLD", 9, 800, "#F0B2A3", 'text-anchor="middle"');

  s += arrow(732, 319, 790, 319, ink, 2);
  s += rect(798, 176, 348, 286, "#F9F8F4", indigo, 2, 1.5);
  s += pill(820, 194, 158, "CANONICAL GROUP", "#E2E0FB", indigo, indigo);
  s += txt(820, 253, "Senior Product Designer", 22, 800, ink);
  s += mono(820, 277, "EXAMPLE COMPANY · BAKU · HYBRID", 10, 700, "#66727A");
  s += line(820, 298, 1124, 298, "#D3D5D1");
  s += mono(820, 325, "BEST CURRENT FIELDS", 9, 700, indigo);
  s += mono(820, 348, "PREFERRED APPLICATION ROUTE", 9, 700, indigo);
  s += mono(820, 371, "FRESHNESS + CLOSING STATE", 9, 700, indigo);
  s += rect(820, 395, 304, 43, "#E6F0E9", "#9CB7A5", 2);
  s += mono(836, 412, "PROVENANCE RETAINED", 9, 800, green);
  s += mono(836, 430, "3 RECORDS · REVERSIBLE GROUP", 9, 700, ink);

  s += rect(54, 486, 1092, 60, "#F7E4DF", orange, 2, 1);
  s += mono(74, 510, "NEGATIVE EVIDENCE PREVENTS A FALSE MERGE", 10, 800, orange);
  s += mono(74, 532, "DIFFERENT CITY · INCOMPATIBLE SENIORITY · DIFFERENT DEPARTMENT · DIFFERENT DESTINATION", 10, 700, ink);
  s += footer("", ink, "SHOWING A DUPLICATE IS NOISY · HIDING A DISTINCT JOB COSTS AN OPPORTUNITY");
  s += rootEnd;
  return s;
}

function mobileDiscoveryCover(brands) {
  const ink = "#191826";
  const background = "#E7E1D8";
  const indigo = "#4F46EF";
  const orange = "#E86832";
  const green = "#4E7F62";
  let s = rootStart(background, ink);
  s += masthead("HIRINQ / MOBILE PRODUCT", ink, "DECISION INTERFACE / 2026");
  s += txt(54, 122, "DESIGN FOR THE NEXT DECISION, NOT MORE SCROLL.", 37, 800, ink, 'letter-spacing="-1.1"');
  s += svgImage(brands.hirinq, 1105, 86, 38, 38);

  s += rect(54, 150, 378, 394, "#242238", "#242238", 22);
  s += rect(74, 170, 338, 354, "#F8F7F3", "#F8F7F3", 12);
  s += rect(192, 181, 100, 7, "#D6D3CD", "none", 4);
  s += pill(92, 204, 118, "RECOMMENDED", "#E2E0FB", indigo);
  s += mono(394, 221, "1 / 12", 10, 700, "#78747F", 'text-anchor="end"');
  s += txt(92, 263, "Product Designer", 24, 800, ink);
  s += txt(92, 289, "Example Company", 15, 700, "#5F5C69");
  s += line(92, 307, 394, 307, "#D7D3CA");
  s += mono(92, 333, "BAKU · HYBRID", 11, 800, ink);
  s += mono(92, 355, "MATCH / PRODUCT + MOBILE", 10, 700, indigo);
  s += rect(92, 379, 302, 54, "#EEECE6", "#D2CEC4", 3);
  s += mono(108, 400, "WHY THIS MAY FIT", 9, 700, "#77727D");
  s += mono(108, 420, "ROLE AREA · LOCATION · EXPERIENCE", 10, 800, ink);
  s += rect(92, 451, 139, 45, "#FFFFFF", indigo, 4, 1.5);
  s += txt(162, 479, "SAVE", 13, 800, indigo, 'text-anchor="middle"');
  s += rect(255, 451, 139, 45, indigo, indigo, 4, 1.5);
  s += txt(325, 479, "VIEW", 13, 800, "#FFFFFF", 'text-anchor="middle"');

  s += rect(468, 150, 678, 190, "#F8F7F3", ink, 2, 1.5);
  s += mono(490, 178, "THE CARD ANSWERS FIVE QUESTIONS IN ORDER", 10, 700, ink, 'letter-spacing="1"');
  const questions = [
    ["01", "ROLE"], ["02", "EMPLOYER"], ["03", "LOCATION + MODE"], ["04", "WHY IT FITS"], ["05", "NEXT ACTION"],
  ];
  questions.forEach(([n, label], i) => {
    const x = 490 + i * 126;
    s += rect(x, 207, 112, 103, i === 4 ? "#242238" : "#ECE9E2", "#CFCAC0", 2);
    s += mono(x + 12, 230, n, 10, 800, i === 4 ? orange : indigo);
    s += txt(x + 12, 266, label, label.length > 11 ? 11 : 14, 800, i === 4 ? "#FFFFFF" : ink);
    if (i < 4) s += arrow(x + 112, 258, x + 124, 258, ink, 1);
  });

  s += rect(468, 364, 678, 180, "#F8F7F3", ink, 2, 1.5);
  s += mono(490, 392, "THE CANDIDATE LOOP", 10, 700, ink, 'letter-spacing="1"');
  const loop = [
    ["DISCOVER", indigo], ["SAVE", green], ["RESUME", orange], ["APPLY", ink],
  ];
  loop.forEach(([label, color], i) => {
    const x = 490 + i * 155;
    s += rect(x, 420, 132, 48, `${color}18`, color, 24, 1.5);
    s += mono(x + 66, 449, label, 10, 800, color, 'text-anchor="middle"');
    if (i < 3) s += arrow(x + 132, 444, x + 151, 444, color, 1.4);
  });
  s += mono(490, 501, "SWIPE + BUTTON EQUIVALENT · UNDO · SAVED STATE · VARIABLE NETWORKS", 10, 700, "#625E68");
  s += mono(490, 522, "MOTION SUPPORTS THE DECISION; IT IS NOT THE PRODUCT", 10, 700, indigo);
  s += footer("", ink, "ROLE → EMPLOYER → LOCATION → REASON → ACTION / SAVE IS PART OF DISCOVERY");
  s += rootEnd;
  return s;
}

function vacancyAggregationCover(brands) {
  const ink = "#EEF0F7";
  const background = "#1F2330";
  const indigo = "#7770FF";
  const orange = "#E86832";
  const green = "#79AD8A";
  let s = rootStart(background, "#FFFFFF");
  s += masthead("HIRINQ / DATA PLATFORM", ink, "SOURCE PIPELINE / 2026");
  s += txt(54, 122, "MANY SOURCES. ONE CANDIDATE MODEL.", 44, 800, ink, 'letter-spacing="-1.3"');
  s += svgImage(brands.hirinq, 1105, 86, 38, 38);

  s += mono(54, 158, "SOURCE-SPECIFIC", 10, 700, "#AAAEBB", 'letter-spacing="1"');
  const sources = ["EMPLOYER API", "REGIONAL FEED", "PARTNER EXPORT", "CAREERS PAGE"];
  sources.forEach((name, i) => {
    const y = 177 + i * 67;
    s += rect(54, y, 210, 48, "#2D3240", "#525866", 2);
    s += mono(72, y + 29, name, 10, 700, ink);
    s += arrow(264, y + 24, 318, y + 24, i === 3 ? orange : indigo, 1.4);
  });

  s += rect(326, 177, 226, 249, "#F1EFE9", "#F1EFE9", 2);
  s += mono(348, 205, "COLLECTION CONTRACT", 10, 800, "#1E2230", 'letter-spacing="1"');
  const contracts = ["REQUEST POLICY", "SCHEMA VERSION", "CHANGE DETECTION", "RETRY + BACKOFF", "SOURCE ATTRIBUTION", "FRESHNESS CLOCK"];
  contracts.forEach((name, i) => {
    const y = 232 + i * 31;
    s += mono(348, y, `0${i + 1}`, 9, 800, orange);
    s += mono(380, y, name, 9, 700, "#454957");
    s += line(348, y + 9, 530, y + 9, "#D2CFC7");
  });
  s += arrow(552, 301, 609, 301, ink, 2);

  s += rect(617, 177, 264, 249, "#F1EFE9", indigo, 2, 1.5);
  s += pill(639, 195, 144, "CANONICAL RECORD", "#E0DEFF", "#4F46BF", "#7770FF");
  s += txt(639, 249, "VACANCY", 26, 800, "#1E2230");
  const fields = ["employer", "role + seniority", "location + mode", "application path", "observed_at", "source_ids[]"];
  fields.forEach((name, i) => {
    const y = 280 + i * 22;
    s += mono(639, y, name, 10, 700, i === 5 ? indigo : "#4A4E5A");
    s += mono(859, y, i === 5 ? "PROVENANCE" : "NORMALIZED", 8, 700, i === 5 ? indigo : "#8A8B90", 'text-anchor="end"');
  });
  s += arrow(881, 301, 938, 301, ink, 2);

  s += rect(946, 177, 200, 249, "#2D3240", "#626877", 2);
  s += mono(968, 205, "CANDIDATE PRODUCT", 10, 700, "#BFC3CF", 'letter-spacing="0.8"');
  s += txt(968, 249, "ONE", 28, 800, "#FFFFFF");
  s += txt(968, 280, "COHERENT", 28, 800, "#FFFFFF");
  s += txt(968, 311, "FEED", 28, 800, "#FFFFFF");
  s += line(968, 335, 1124, 335, "#575D6A");
  s += mono(968, 361, "SEARCH", 9, 700, "#CACDD6");
  s += mono(968, 382, "SAVE", 9, 700, "#CACDD6");
  s += mono(968, 403, "APPLY", 9, 700, "#CACDD6");

  s += rect(54, 454, 1092, 91, "#292E3B", "#555B69", 2);
  s += mono(76, 480, "OPERATE THE BOUNDARIES", 10, 700, ink, 'letter-spacing="1"');
  const ops = [
    ["FRESHNESS", "LAST SUCCESS + EXPECTED PROGRESS", green],
    ["FAILURE", "BOUNDED RETRY + DEAD LETTER", orange],
    ["CHANGE", "DIFF + SOURCE VERSION", indigo],
    ["TRUST", "RAW RECORD + PROVENANCE", green],
  ];
  ops.forEach(([name, detail, color], i) => {
    const x = 76 + i * 258;
    s += dot(x + 4, 510, 4, color);
    s += mono(x + 16, 506, name, 9, 800, color);
    s += mono(x + 16, 525, detail, 8, 700, "#BABEC8");
  });
  s += footer("", ink, "COLLECT · NORMALIZE · ATTRIBUTE · REFRESH · RECOVER / ONE PRODUCT EXPERIENCE");
  s += rootEnd;
  return s;
}

/* eslint-enable @typescript-eslint/no-unused-vars */

// Minimal editorial alternatives: one dominant idea per cover, designed to read at card size.
function quietCostsEditorialCover() {
  const ink = "#161616";
  const orange = "#EB6C3B";
  let s = rootStart("#D9D1C4", ink);
  s += rect(184, 64, 576, 502, "#FFFDF8", "#D3CABD", 3, 1.5);
  s += rect(207, 88, 530, 455, "#F7F2E9", "none", 0);
  s += mono(238, 136, "COMPUTE", 15, 700, "#68625B", 'letter-spacing="2"');
  s += txt(230, 335, "$5", 190, 800, ink, 'letter-spacing="-10"');
  s += mono(242, 382, "THE SERVER", 17, 700, ink, 'letter-spacing="2"');
  s += rect(671, 185, 308, 286, ink, ink, 2);
  s += mono(704, 225, "THE REST", 13, 700, "#C5BEB3", 'letter-spacing="2"');
  s += txt(704, 342, "$100+", 68, 800, "#FFFFFF", 'letter-spacing="-3"');
  s += rect(704, 380, 236, 8, orange);
  s += mono(704, 423, "QUIET COSTS", 15, 700, "#FFFFFF", 'letter-spacing="1.4"');
  s += `<path d="M760 185 L786 202 L760 219 L786 236 L760 253 L786 270 L760 287 L786 304 L760 321 L786 338 L760 355 L786 372 L760 389 L786 406 L760 423 L786 440 L760 457 L786 471" fill="none" stroke="${orange}" stroke-width="4"/>`;
  s += rootEnd;
  return s;
}

function authenticationEditorialCover() {
  const green = "#A6C7AF";
  const red = "#E67562";
  let s = rootStart("#1C1D1B", "#FFFFFF");
  s += rect(196, 86, 808, 458, "#F7F4ED", "#F7F4ED", 20);
  s += rect(226, 116, 748, 398, "#FFFFFF", "#D6D1C8", 12, 1.5);
  s += mono(268, 160, "WELCOME BACK", 14, 700, "#67625C", 'letter-spacing="2"');
  s += txt(268, 244, "SIGNED IN", 76, 800, "#171717", 'letter-spacing="-3"');
  s += rect(268, 280, 664, 76, "#E7F0E9", "#B6D0BD", 10);
  s += dot(310, 318, 14, green);
  s += mono(342, 325, "SESSION ACTIVE", 17, 800, "#23452E", 'letter-spacing="1"');
  s += rect(268, 385, 664, 2, "#E0DBD1");
  s += txt(268, 460, "AFTER", 70, 800, red, 'letter-spacing="-3"');
  s += txt(505, 460, "LOGIN", 70, 800, "#171717", 'letter-spacing="-3"');
  s += rect(834, 420, 96, 44, "#171717", "#171717", 22);
  s += mono(882, 448, "?", 25, 800, "#FFFFFF", 'text-anchor="middle"');
  s += rootEnd;
  return s;
}

function transactionalEmailEditorialCover() {
  const ink = "#162229";
  const green = "#4F8064";
  const orange = "#E86832";
  let s = rootStart("#E7EFF0", ink);
  s += rect(90, 104, 487, 396, "#F9FAF6", ink, 10, 2);
  s += `<path d="M92 124 L334 313 L575 124" fill="none" stroke="${ink}" stroke-width="4"/>`;
  s += mono(132, 163, "CRITICAL MAIL", 13, 700, green, 'letter-spacing="1.8"');
  s += txt(132, 248, "notify.", 62, 800, ink, 'letter-spacing="-2"');
  s += mono(132, 286, "RESET · INVOICE · ALERT", 14, 700, "#5C696D", 'letter-spacing="1"');
  s += rect(622, 104, 487, 396, "#202827", "#202827", 10);
  s += `<path d="M624 124 L866 313 L1107 124" fill="none" stroke="#F4F1EA" stroke-width="4"/>`;
  s += mono(664, 163, "PROMOTIONAL MAIL", 13, 700, "#AAB8B6", 'letter-spacing="1.8"');
  s += txt(664, 248, "updates.", 62, 800, "#FFFFFF", 'letter-spacing="-2"');
  s += mono(664, 286, "NEWSLETTER · CAMPAIGN", 14, 700, "#B7C2C0", 'letter-spacing="1"');
  s += rect(564, 268, 72, 72, orange, orange, 36);
  s += txt(600, 316, "≠", 46, 500, "#FFFFFF", 'text-anchor="middle"');
  s += rootEnd;
  return s;
}

function aiEvalsEditorialCover() {
  const ink = "#171715";
  const red = "#E86A55";
  let s = rootStart("#E8DB70", ink);
  s += rect(220, 83, 760, 465, "#FAF6D7", ink, 3, 2);
  s += mono(264, 136, "MODEL OUTPUT", 14, 700, "#6D684B", 'letter-spacing="2"');
  s += line(264, 167, 936, 167, "#C9BC5A", 2);
  s += line(264, 225, 792, 225, "#D5CA7B", 8);
  s += line(264, 255, 870, 255, "#D5CA7B", 8);
  s += line(264, 285, 728, 285, "#D5CA7B", 8);
  s += line(264, 315, 831, 315, "#D5CA7B", 8);
  s += line(264, 345, 762, 345, "#D5CA7B", 8);
  s += `<g transform="rotate(-11 606 363)">${rect(405, 278, 402, 146, "#F9E1DB", red, 4, 6)}${txt(606, 366, "TEST IT", 62, 800, red, 'text-anchor="middle" letter-spacing="-2"')}${mono(606, 398, "BEFORE YOU TUNE IT", 13, 800, red, 'text-anchor="middle" letter-spacing="2"')}</g>`;
  s += rootEnd;
  return s;
}

function backupRestoreEditorialCover() {
  const ink = "#162A3D";
  const orange = "#E86832";
  let s = rootStart("#CAD9E0", ink);
  s += dot(600, 315, 213, "#F8F5EE", ink, 12);
  s += dot(600, 315, 168, "none", "#B8C3C6", 3);
  s += line(600, 315, 600, 205, ink, 10);
  s += line(600, 315, 690, 367, ink, 10);
  s += dot(600, 315, 18, orange);
  s += rect(525, 62, 150, 66, ink, ink, 34);
  s += rect(561, 42, 78, 30, orange, orange, 15);
  s += txt(600, 312, "RESTORE", 32, 800, ink, 'text-anchor="middle" letter-spacing="-1"');
  s += mono(600, 349, "WITH A CLOCK", 14, 800, orange, 'text-anchor="middle" letter-spacing="2"');
  s += rootEnd;
  return s;
}

function founderAccessEditorialCover() {
  const ink = "#181818";
  const red = "#CB5E50";
  let s = rootStart("#F0ECE4", ink);
  s += rect(168, 112, 864, 406, "#FFFFFF", ink, 18, 2);
  s += rect(168, 112, 864, 93, "#24231F", "#24231F", 18);
  s += rect(168, 178, 864, 27, "#24231F", "#24231F");
  s += mono(214, 165, "ACCOUNT OWNER", 13, 700, "#C7C2B8", 'letter-spacing="2"');
  s += txt(214, 312, "founder@personal", 57, 800, ink, 'letter-spacing="-2"');
  s += line(214, 345, 986, 345, "#E1DDD4", 2);
  s += mono(214, 384, "DOMAIN · CLOUD · CODE · BANK · PAYMENTS", 15, 700, "#6B665E", 'letter-spacing="1"');
  s += `<g transform="rotate(-8 841 410)">${rect(712, 364, 256, 94, "#F8E2DE", red, 4, 5)}${txt(840, 415, "SINGLE POINT", 25, 800, red, 'text-anchor="middle"')}${mono(840, 438, "OF FAILURE", 12, 800, red, 'text-anchor="middle" letter-spacing="1.5"')}</g>`;
  s += rootEnd;
  return s;
}

function webhooksEditorialCover() {
  const orange = "#EA6E52";
  let s = rootStart("#202423", "#FFFFFF");
  s += rect(244, 101, 620, 392, "#F5F1E9", "#F5F1E9", 4);
  s += rect(292, 69, 620, 392, "#E2DED4", "#E2DED4", 4);
  s += mono(286, 153, "PAYMENT EVENT", 14, 700, "#5A5751", 'letter-spacing="2"');
  s += txt(286, 260, "evt_104", 78, 800, "#171717", 'letter-spacing="-3"');
  s += line(286, 295, 815, 295, "#CEC9BE", 3);
  s += mono(286, 336, "invoice.paid", 18, 700, "#5A5751");
  s += mono(286, 371, "delivered again", 14, 700, "#8A857C");
  s += `<g transform="rotate(-13 774 365)">${rect(627, 286, 224, 112, "#F9E4DF", orange, 4, 5)}${txt(739, 355, "×2", 67, 800, orange, 'text-anchor="middle"')}</g>`;
  s += rect(769, 421, 174, 50, "#1B1D1B", "#1B1D1B", 25);
  s += mono(856, 452, "ONCE.", 16, 800, "#FFFFFF", 'text-anchor="middle" letter-spacing="1"');
  s += rootEnd;
  return s;
}

function degradedModeEditorialCover() {
  const ink = "#19182C";
  const green = "#5F9A72";
  const orange = "#E86B4F";
  let s = rootStart("#E2DEF1", ink);
  s += rect(124, 172, 272, 286, "#C9C6D5", "#A9A3BB", 16, 2);
  s += mono(160, 219, "PROVIDER", 13, 700, "#726C82", 'letter-spacing="2"');
  s += txt(160, 324, "OFF", 80, 800, "#6C657A", 'letter-spacing="-3"');
  s += line(160, 350, 352, 350, "#AAA4B6", 3);
  s += mono(160, 383, "TIMEOUT", 13, 800, orange, 'letter-spacing="1"');
  s += rect(478, 96, 598, 438, "#22213E", "#22213E", 26);
  s += rect(512, 130, 530, 370, "#F7F5EE", "#F7F5EE", 18);
  s += mono(556, 190, "THE PRODUCT", 14, 800, "#5F596B", 'letter-spacing="2"');
  s += txt(556, 330, "STILL", 94, 800, ink, 'letter-spacing="-4"');
  s += txt(556, 412, "WORKS", 94, 800, green, 'letter-spacing="-4"');
  s += rect(560, 444, 252, 20, "#DDECE1", "none", 10);
  s += rootEnd;
  return s;
}

function applicationFlowsEditorialCover(brands) {
  const ink = "#1A1830";
  const indigo = "#4F46EF";
  const orange = "#E86A4F";
  let s = rootStart("#EEEDFA", ink);
  s += svgImage(brands.hirinq, 1012, 70, 100, 100);
  s += rect(156, 185, 888, 266, indigo, indigo, 32);
  s += txt(600, 328, "APPLY", 112, 800, "#FFFFFF", 'text-anchor="middle" letter-spacing="-6"');
  s += rect(264, 389, 162, 126, "#FFFFFF", ink, 14, 2);
  s += rect(519, 389, 162, 126, "#FFFFFF", orange, 14, 2);
  s += rect(774, 389, 162, 126, "#FFFFFF", indigo, 14, 2);
  s += `<path d="M278 416 L345 469 L412 416" fill="none" stroke="${ink}" stroke-width="4"/>`;
  s += `<path d="M533 416 L600 469 L667 416" fill="none" stroke="${orange}" stroke-width="4"/>`;
  s += rect(800, 416, 110, 72, "none", indigo, 4, 2);
  s += line(800, 438, 910, 438, indigo, 2);
  s += dot(814, 427, 4, indigo); s += dot(830, 427, 4, indigo); s += dot(846, 427, 4, indigo);
  s += mono(345, 544, "DIRECT", 12, 800, ink, 'text-anchor="middle" letter-spacing="1.5"');
  s += mono(600, 544, "EMAIL", 12, 800, orange, 'text-anchor="middle" letter-spacing="1.5"');
  s += mono(855, 544, "EXTERNAL", 12, 800, indigo, 'text-anchor="middle" letter-spacing="1.5"');
  s += rootEnd;
  return s;
}

function aiFirstProductsEditorialCover() {
  const ink = "#171715";
  const indigo = "#625BBA";
  let s = rootStart("#E8E1D4", ink);
  s += rect(209, 83, 782, 464, "#F8F5EE", ink, 28, 2);
  s += rect(257, 131, 686, 368, indigo, indigo, 20);
  s += txt(600, 328, "AI", 210, 800, "#FFFFFF", 'text-anchor="middle" letter-spacing="-12"');
  s += rect(682, 364, 207, 72, "#F8F5EE", "#F8F5EE", 36);
  s += mono(785, 408, "IS A LAYER", 16, 800, ink, 'text-anchor="middle" letter-spacing="1.3"');
  s += rect(257, 467, 210, 32, "#F1E6DE", "none", 16);
  s += mono(362, 488, "NOT THE WHOLE PRODUCT", 10, 800, "#8A5449", 'text-anchor="middle" letter-spacing="0.8"');
  s += rootEnd;
  return s;
}

function duplicateJobsEditorialCover(brands) {
  const ink = "#16212B";
  const indigo = "#4F46EF";
  const green = "#5C9670";
  let s = rootStart("#DDE9EC", ink);
  s += svgImage(brands.hirinq, 1023, 70, 88, 88);
  s += rect(255, 161, 545, 302, "#E2DED8", "#C5C0B8", 16, 2);
  s += rect(215, 127, 545, 302, "#F9F8F4", "#C5C0B8", 16, 2);
  s += rect(175, 93, 545, 302, "#FFFFFF", ink, 16, 2);
  s += mono(222, 147, "VACANCY", 13, 700, "#6B7376", 'letter-spacing="2"');
  s += txt(222, 232, "Product Designer", 46, 800, ink, 'letter-spacing="-2"');
  s += mono(222, 270, "EXAMPLE COMPANY · BAKU · HYBRID", 14, 700, "#6B7376", 'letter-spacing=".8"');
  s += `<path d="M792 195 C910 195 911 403 790 403 C670 403 670 195 792 195" fill="none" stroke="${indigo}" stroke-width="28" stroke-linecap="round"/>`;
  s += rect(779, 255, 257, 88, "#E5F0E8", green, 8, 2);
  s += mono(907, 291, "ONE JOB?", 18, 800, green, 'text-anchor="middle" letter-spacing="1"');
  s += mono(907, 318, "OR THREE COPIES?", 12, 700, ink, 'text-anchor="middle" letter-spacing="1"');
  s += rootEnd;
  return s;
}

function mobileDiscoveryEditorialCover(brands) {
  const ink = "#1A1930";
  const indigo = "#4F46EF";
  let s = rootStart("#E8E1D8", ink);
  s += svgImage(brands.hirinq, 946, 72, 90, 90);
  s += rect(392, 38, 416, 554, "#22213A", "#22213A", 46);
  s += rect(412, 62, 376, 506, "#F9F8F4", "#F9F8F4", 32);
  s += rect(535, 78, 130, 8, "#D6D2CA", "none", 4);
  s += pill(448, 123, 142, "FOR YOU", "#E1DFFC", indigo);
  s += txt(448, 212, "Product", 46, 800, ink, 'letter-spacing="-2"');
  s += txt(448, 258, "Designer", 46, 800, ink, 'letter-spacing="-2"');
  s += mono(448, 294, "BAKU · HYBRID", 13, 800, "#6A6670", 'letter-spacing="1"');
  s += rect(448, 333, 304, 2, "#DDD8CF");
  s += mono(448, 371, "ONE GOOD NEXT STEP", 12, 800, indigo, 'letter-spacing="1"');
  s += rect(448, 412, 304, 76, indigo, indigo, 18);
  s += txt(600, 461, "SAVE", 24, 800, "#FFFFFF", 'text-anchor="middle" letter-spacing="1"');
  s += rootEnd;
  return s;
}

function vacancyAggregationEditorialCover(brands) {
  const indigo = "#7770FF";
  const orange = "#E86B50";
  let s = rootStart("#202431", "#FFFFFF");
  s += svgImage(brands.hirinq, 1025, 72, 88, 88);
  s += rect(154, 182, 332, 258, "#353B4B", "#596173", 14, 2);
  s += rect(203, 143, 332, 258, "#2C3140", "#596173", 14, 2);
  s += rect(252, 104, 332, 258, "#252A37", "#596173", 14, 2);
  s += mono(292, 151, "SOURCE", 12, 700, "#B6BBC8", 'letter-spacing="2"');
  s += txt(292, 236, "jobs", 64, 800, "#FFFFFF", 'letter-spacing="-3"');
  s += mono(292, 277, "EVERYWHERE", 14, 800, indigo, 'letter-spacing="2"');
  s += rect(622, 137, 424, 326, "#F6F4EE", "#F6F4EE", 18);
  s += mono(668, 190, "ONE CANDIDATE", 13, 700, "#64616B", 'letter-spacing="2"');
  s += txt(668, 283, "FEED", 92, 800, "#17181C", 'letter-spacing="-4"');
  s += rect(668, 328, 252, 18, orange, "none", 9);
  s += mono(668, 383, "CLEARER THAN THE SOURCES", 12, 800, "#17181C", 'letter-spacing="1"');
  s += rootEnd;
  return s;
}

async function main() {
  await mkdir(sourceDir, { recursive: true });
  const brands = {
    stripe: await readFile(path.join(brandDir, "stripe-wordmark-slate.svg")),
    lemon: await readFile(path.join(brandDir, "lemon-squeezy-mark.svg")),
    paddle: await readFile(path.join(brandDir, "paddle-wordmark.svg")),
    dodo: await readFile(path.join(brandDir, "dodo-payments-wordmark.svg")),
    hirinq: await readFile(path.join(root, "public/products/hirinq/hirinq-mark.svg")),
  };

  const covers = [
    ["international-founder-us-company", internationalFounderCover()],
    ["merchant-of-record", merchantOfRecordCover(brands)],
    ["quiet-cloud-costs", quietCostsEditorialCover()],
    ["authentication-after-login", authenticationEditorialCover()],
    ["transactional-email", transactionalEmailEditorialCover()],
    ["ai-evals", aiEvalsEditorialCover()],
    ["backup-restore", backupRestoreEditorialCover()],
    ["founder-access-map", founderAccessEditorialCover()],
    ["webhook-ledger", webhooksEditorialCover()],
    ["third-party-degraded-mode", degradedModeEditorialCover()],
    ["application-flows", applicationFlowsEditorialCover(brands)],
    ["building-ai-first-products", aiFirstProductsEditorialCover()],
    ["duplicate-jobs", duplicateJobsEditorialCover(brands)],
    ["mobile-job-discovery", mobileDiscoveryEditorialCover(brands)],
    ["vacancy-aggregation", vacancyAggregationEditorialCover(brands)],
  ];

  for (const [name, svg] of covers) {
    const sourcePath = path.join(sourceDir, `${name}.svg`);
    const outputPath = path.join(coversDir, `${name}.webp`);
    await writeFile(sourcePath, svg, "utf8");
    await sharp(Buffer.from(svg))
      .resize(W, H, { fit: "fill" })
      .webp({ quality: 92, effort: 6, smartSubsample: true })
      .toFile(outputPath);
    console.log(`${name}: ${W}x${H}`);
  }
}

await main();
