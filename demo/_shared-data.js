(function(global) {
  const CASES = [
    { id: 'OP-2026-0045', code: 'OP-2026-0045', name: 'Fotovoltaika pro RD Lipová',
      client: 'Novákovi', clientKind: 'family', owner: 'Pavel O.',
      stage: 'won', value: 220000, type: 'fve',
      firstContactAt: '05. 09. 2026', wonAt: '20. 10. 2026',
      productionOrderId: 'ZAK-2026-0155',
      deadline: '15. 12. 2026',
      lastContact: '2 dny' },
    { id: 'OP-2026-0043', code: 'OP-2026-0043', name: 'AI reporting pilot',
      client: 'Moravia Steel a.s.', clientKind: 'b2b', owner: 'Alena D.',
      stage: 'vyhodnoceni-klient', value: 180000, type: 'ai-pilot',
      firstContactAt: '10. 10. 2026',
      productionOrderId: 'ZAK-2026-0142',
      deadline: '25. 11. 2026',
      lastContact: '1 den' },
    { id: 'OP-2026-0041', code: 'OP-2026-0041', name: 'ERP→CRM integrace',
      client: 'Agro Slovácko s.r.o.', clientKind: 'b2b', owner: 'Pavel O.',
      stage: 'won', value: 312000, type: 'integration',
      firstContactAt: '15. 03. 2026', wonAt: '22. 04. 2026',
      productionOrderId: 'ZAK-2026-0131',
      deadline: '10. 11. 2026',
      lastContact: '7 dní' },
    { id: 'OP-2026-0039', code: 'OP-2026-0039', name: 'Automatizace výkazů',
      client: 'Hradecká strojírna s.r.o.', clientKind: 'b2b', owner: 'Alena D.',
      stage: 'won', value: 96500, type: 'automation',
      firstContactAt: '01. 09. 2026', wonAt: '03. 05. 2026',
      productionOrderId: 'ZAK-2026-0139',
      deadline: '15. 12. 2026',
      lastContact: '3 dny' },
    { id: 'OP-2026-0037', code: 'OP-2026-0037', name: 'Rekonstrukce koupelny',
      client: 'Dvořákovi', clientKind: 'family', owner: 'Pavel O.',
      stage: 'nabidka', value: 180000, type: 'construction',
      firstContactAt: '25. 10. 2026',
      productionOrderId: 'ZAK-2026-0156',
      deadline: '20. 11. 2026',
      lastContact: '4 dny' },
  ];

  const ORDERS = [
    // Existing 10 orders (copied from demo/zakazky.html)
    { id: 1, code: "ZAK-2026-0142", name: "Reporting obchodu — pilot", client: "Moravia Steel a.s.", type: "AI", status: "quoted", stateLabel: "Nabídka", stateTone: "primary", created: "12. 05. 2026", deadline: "28. 11. 2026", priceOffer: 184000, priceReal: null, margin: 32, marginPos: true, progress: 68, raynet: "RN-4821", missingDocs: false, pipeline: true, plannedHours: 60, realHours: 41, caseId: 'OP-2026-0043', overdue: false,
      operations: [
        { code: "OP-01", name: "Analýza požadavků", planned: 16, done: 10 },
        { code: "OP-02", name: "Implementace", planned: 24, done: 12 },
        { code: "OP-03", name: "Testy a QA", planned: 12, done: 6 },
        { code: "OP-04", name: "Dokumentace", planned: 8, done: 2 },
      ]},
    { id: 2, code: "ZAK-2026-0139", name: "Automatizace výkazů práce", client: "Hradecká strojírna", type: "Vývoj", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "03. 05. 2026", deadline: "15. 12. 2026", priceOffer: 96500, priceReal: 42000, margin: 24, marginPos: true, progress: 42, raynet: "RN-4810", missingDocs: false, plannedHours: 55, realHours: 48, caseId: 'OP-2026-0039', overdue: false,
      operations: [
        { code: "OP-01", name: "Analýza", planned: 8, done: 8 },
        { code: "OP-02", name: "Implementace", planned: 24, done: 10 },
        { code: "OP-03", name: "Testování", planned: 12, done: 4 },
        { code: "OP-04", name: "Dokumentace", planned: 8, done: 2 },
      ]},
    { id: 3, code: "ZAK-2026-0131", name: "Napojení ERP → CRM", client: "Agro Slovácko", type: "Integrace", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "22. 04. 2026", deadline: "10. 11. 2026", priceOffer: 312000, priceReal: 288000, margin: -4, marginPos: false, progress: 92, raynet: "RN-4795", missingDocs: false, plannedHours: 80, realHours: 92, caseId: 'OP-2026-0041', overdue: true,
      operations: [
        { code: "OP-01", name: "Workshop s klientem", planned: 4, done: 4 },
        { code: "OP-02", name: "Analýza požadavků", planned: 16, done: 16 },
        { code: "OP-03", name: "Mapování dat z CRM", planned: 12, done: 8 },
        { code: "OP-04", name: "Setup pipeline", planned: 6, done: 4 },
        { code: "OP-05", name: "Testy integrace", planned: 8, done: 0 },
        { code: "OP-06", name: "Dokumentace", planned: 4, done: 2 },
      ]},
    { id: 4, code: "ZAK-2026-0127", name: "AI asistent pro zápisy", client: "Obec Staré Město", type: "AI", status: "done", stateLabel: "Hotovo", stateTone: "success", created: "15. 04. 2026", deadline: "15. 11. 2026", priceOffer: 48000, priceReal: 48000, margin: 41, marginPos: true, progress: 100, raynet: "RN-4782", missingDocs: true, plannedHours: 35, realHours: 36, overdue: false },
    { id: 5, code: "ZAK-2026-0126", name: "Audit CRM dat", client: "Moravia Steel a.s.", type: "Konzultace", status: "done", stateLabel: "Hotovo", stateTone: "success", created: "10. 04. 2026", deadline: "—", priceOffer: 27500, priceReal: 27500, margin: 28, marginPos: true, progress: 100, raynet: "RN-4778", missingDocs: false, plannedHours: 25, realHours: 25, overdue: false },
    { id: 6, code: "ZAK-2026-0122", name: "Školení týmu v Notion", client: "Hradecká strojírna", type: "Školení", status: "done", stateLabel: "Hotovo", stateTone: "success", created: "02. 04. 2026", deadline: "—", priceOffer: 16000, priceReal: 16000, margin: 52, marginPos: true, progress: 100, raynet: null, missingDocs: false, plannedHours: 16, realHours: 16, overdue: false },
    { id: 7, code: "ZAK-2026-0118", name: "Import historie z Raynet", client: "Agro Slovácko", type: "Integrace", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "28. 03. 2026", deadline: "25. 11. 2026", priceOffer: 36000, priceReal: 24000, margin: 12, marginPos: true, progress: 80, raynet: "RN-4761", missingDocs: false, plannedHours: 30, realHours: 28, overdue: false,
      operations: [
        { code: "OP-01", name: "Export dat z Raynet", planned: 12, done: 10 },
        { code: "OP-02", name: "Transformace a import", planned: 10, done: 6 },
      ]},
    { id: 8, code: "ZAK-2026-0115", name: "Portál pro klienty — poptávka", client: "Procházkovi s.r.o.", type: "Vývoj", status: "new", stateLabel: "Nová", stateTone: "neutral", created: "20. 03. 2026", deadline: "—", priceOffer: null, priceReal: null, margin: null, marginPos: true, progress: 0, raynet: null, missingDocs: true, pipeline: true, plannedHours: 70, realHours: 0, overdue: false,
      operations: [
        { code: "OP-01", name: "Discovery workshop", planned: 8, done: 0 },
        { code: "OP-02", name: "Návrh architektury", planned: 16, done: 0 },
      ]},
    { id: 9, code: "ZAK-2026-0109", name: "Dashboard pro management", client: "Moravia Steel a.s.", type: "Vývoj", status: "delivered", stateLabel: "Fakturováno", stateTone: "success", created: "10. 03. 2026", deadline: "—", priceOffer: 63000, priceReal: 63000, margin: 36, marginPos: true, progress: 100, raynet: "RN-4720", missingDocs: false, plannedHours: 45, realHours: 44, overdue: false },
    { id: 10, code: "ZAK-2026-0098", name: "Konzultace migrace", client: "Procházkovi s.r.o.", type: "Konzultace", status: "cancelled", stateLabel: "Zrušeno", stateTone: "danger", created: "25. 02. 2026", deadline: "—", priceOffer: 13000, priceReal: 0, margin: null, marginPos: true, progress: 40, raynet: null, missingDocs: false, plannedHours: 15, realHours: 8, overdue: false },
    // New 2 orders
    { id: 11, code: "ZAK-2026-0155", name: "Fotovoltaika 8 kWp", client: "Novákovi", type: "Energie", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "20. 10. 2026", deadline: "15. 12. 2026", priceOffer: 220000, priceReal: null, margin: 18, marginPos: true, progress: 27, raynet: null, missingDocs: false, plannedHours: 40, realHours: 12, caseId: 'OP-2026-0045', overdue: false,
      operations: [
        { code: "OP-01", name: "Návrh a projekt", planned: 8, done: 6 },
        { code: "OP-02", name: "Objednávka a doprava", planned: 4, done: 2 },
        { code: "OP-03", name: "Instalace panelů", planned: 16, done: 4 },
        { code: "OP-04", name: "Zápis a předání", planned: 4, done: 0 },
      ]},
    { id: 12, code: "ZAK-2026-0156", name: "Rekonstrukce koupelny — RD Zlín", client: "Dvořákovi", type: "Stavba", status: "quoted", stateLabel: "Nabídka", stateTone: "primary", created: "25. 10. 2026", deadline: "20. 11. 2026", priceOffer: 180000, priceReal: null, margin: 22, marginPos: true, progress: 0, raynet: null, missingDocs: false, plannedHours: 80, realHours: 0, caseId: 'OP-2026-0037', overdue: false,
      operations: [
        { code: "OP-01", name: "Odsouhlasení návrhu", planned: 4, done: 0 },
        { code: "OP-02", name: "Objednávka materiálu", planned: 2, done: 0 },
      ]},
  ];

  function getActiveOrders() {
    return ORDERS.filter(o => !['delivered', 'cancelled', 'done'].includes(o.status));
  }

  function getOpenCases() {
    return CASES.filter(c => !['won', 'lost'].includes(c.stage));
  }

  function getRiskScore(o) {
    let s = 0;
    if (o.overdue) s += 4;
    if (o.realHours > o.plannedHours * 1.1) s += 3;
    if (o.margin != null && o.margin < 15) s += 2;
    if (o.missingDocs) s += 1;
    return s;
  }

  function getCaseByProductionOrder(zakId) {
    return CASES.find(c => c.productionOrderId === zakId);
  }

  function getOrderByCase(caseId) {
    const c = CASES.find(x => x.id === caseId);
    return c ? ORDERS.find(o => o.code === c.productionOrderId) : null;
  }

  const WORKERS = [
    { id: 1, code: "ZAM-001", name: "Lubomír Hulín", position: "CEO / Vedoucí", dept: "Management", start: "01. 01. 2024", contract: "HPP", salary: "—", state: "in-progress" },
    { id: 2, code: "ZAM-002", name: "Pavel Obdržálek", position: "Senior Konzultant", dept: "Konzultace", start: "01. 03. 2024", contract: "HPP", salary: "68 000 Kč", state: "in-progress" },
    { id: 3, code: "ZAM-003", name: "Alena Dvořáková", position: "Konzultant", dept: "Konzultace", start: "15. 05. 2024", contract: "HPP", salary: "58 000 Kč", state: "in-progress" },
    { id: 4, code: "ZAM-004", name: "Tomáš Novák", position: "Junior Konzultant", dept: "Konzultace", start: "01. 09. 2024", contract: "HPP", salary: "42 000 Kč", state: "in-progress" },
    { id: 5, code: "ZAM-005", name: "Jana Svobodová", position: "Office manager", dept: "Backoffice", start: "17. 11. 2026", contract: "HPP", salary: "38 000 Kč", state: "draft" },
    { id: 6, code: "ZAM-006", name: "Marek Krejčí", position: "IT Specialist", dept: "IT", start: "15. 08. 2024", contract: "DPČ", salary: "350 Kč/h", state: "in-progress" },
    { id: 7, code: "ZAM-007", name: "Eva Horáková", position: "Účetní", dept: "Backoffice", start: "01. 06. 2025", contract: "Externě", salary: "22 000 Kč/měs", state: "in-progress" },
  ];

  function getActiveWorkers() {
    return WORKERS.filter(w => w.state === "in-progress");
  }

  // ── Sprint 2 / T5: WEEKLY_PLAN + CAPACITY data model ──────────────────────

  const WEEKLY_PLAN = {
    weekLabel: "Pondělí 9. 11. 2026 — Neděle 15. 11. 2026",
    target: 600000,
    closedThisWeek: 420000,
    plannedThisWeek: 180000,
    projectedClose: 540000,  // closedThisWeek + 2/3 × plannedThisWeek jako mock projekce
  };

  const WORKING_DAYS = ["2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13"];

  // 22 entries — různá vytíženost pro heatmapu:
  //   Pavel O. (2):  po 6h, út 5h+2h, st 10h (přetížení!), čt 5h, pá 0h (volno)
  //   Alena D. (3):  po 4h, út 4h, st 4h, čt 4h, pá 4h
  //   Tomáš N. (4):  po 2h, út 3h, st 0h (volno), čt 2h, pá 0h (volno)
  //   Marek K. (6):  po 5h, út 4h, st 12h (přetížení!), čt 4h, pá 5h
  //   Lubomír H. (1): út 2h (sporadicky)
  //   Jana S. (5):   žádné (nastupuje 17. 11.)
  //   Eva H. (7):    čt 2h (sporadicky)
  const CAPACITY = [
    // Pavel O. — ZAK-2026-0131 OP-03 Mapování dat z CRM + ZAK-2026-0155 OP-02 Objednávka
    { workerId: 2, date: "2026-11-09", operationCode: "OP-03", orderId: 3,  hours: 6 },
    { workerId: 2, date: "2026-11-10", operationCode: "OP-03", orderId: 3,  hours: 5 },
    { workerId: 2, date: "2026-11-10", operationCode: "OP-02", orderId: 11, hours: 2 },
    { workerId: 2, date: "2026-11-11", operationCode: "OP-03", orderId: 3,  hours: 6 },  // přetížení: 10h
    { workerId: 2, date: "2026-11-11", operationCode: "OP-04", orderId: 3,  hours: 4 },
    { workerId: 2, date: "2026-11-12", operationCode: "OP-03", orderId: 3,  hours: 5 },
    // pá prázdné — volno Pavel

    // Alena D. — ZAK-2026-0139 OP-02 Implementace
    { workerId: 3, date: "2026-11-09", operationCode: "OP-02", orderId: 2,  hours: 4 },
    { workerId: 3, date: "2026-11-10", operationCode: "OP-02", orderId: 2,  hours: 4 },
    { workerId: 3, date: "2026-11-11", operationCode: "OP-02", orderId: 2,  hours: 4 },
    { workerId: 3, date: "2026-11-12", operationCode: "OP-02", orderId: 2,  hours: 4 },
    { workerId: 3, date: "2026-11-13", operationCode: "OP-02", orderId: 2,  hours: 4 },

    // Tomáš N. — ZAK-2026-0131 OP-05 Testy integrace
    { workerId: 4, date: "2026-11-09", operationCode: "OP-05", orderId: 3,  hours: 2 },
    { workerId: 4, date: "2026-11-10", operationCode: "OP-05", orderId: 3,  hours: 3 },
    // st prázdné — volno Tomáš
    { workerId: 4, date: "2026-11-12", operationCode: "OP-05", orderId: 3,  hours: 2 },
    // pá prázdné — volno Tomáš

    // Marek K. — ZAK-2026-0131 OP-04 Setup pipeline
    { workerId: 6, date: "2026-11-09", operationCode: "OP-04", orderId: 3,  hours: 5 },
    { workerId: 6, date: "2026-11-10", operationCode: "OP-04", orderId: 3,  hours: 4 },
    { workerId: 6, date: "2026-11-11", operationCode: "OP-04", orderId: 3,  hours: 7 },  // přetížení: 12h
    { workerId: 6, date: "2026-11-11", operationCode: "OP-05", orderId: 3,  hours: 5 },
    { workerId: 6, date: "2026-11-12", operationCode: "OP-04", orderId: 3,  hours: 4 },
    { workerId: 6, date: "2026-11-13", operationCode: "OP-04", orderId: 3,  hours: 5 },

    // Lubomír H. (1) — sporadicky ZAK-2026-0142 OP-01
    { workerId: 1, date: "2026-11-10", operationCode: "OP-01", orderId: 1,  hours: 2 },

    // Eva H. (7) — sporadicky ZAK-2026-0142 OP-04
    { workerId: 7, date: "2026-11-12", operationCode: "OP-04", orderId: 1,  hours: 2 },
  ];

  function getCapacityForWeek(workerId, dateIso) {
    return CAPACITY.filter(c => c.workerId === workerId && c.date === dateIso);
  }

  function getUtilization(workerId, dateIso) {
    const hours = getCapacityForWeek(workerId, dateIso).reduce((s, c) => s + c.hours, 0);
    return Math.round(hours / 8 * 100);
  }

  function getUnassignedOperations() {
    const active = getActiveOrders();
    const result = [];
    active.forEach(o => {
      (o.operations || []).forEach(op => {
        const assigned = CAPACITY
          .filter(c => c.orderId === o.id && c.operationCode === op.code)
          .reduce((s, c) => s + c.hours, 0);
        const remaining = (op.planned || 0) - assigned;
        if (remaining > 0) result.push({ orderId: o.id, orderCode: o.code, operationCode: op.code, operationName: op.name, remainingHours: remaining });
      });
    });
    return result;
  }

  global.S21Data = {
    CASES,
    ORDERS,
    WORKERS,
    WEEKLY_PLAN,
    WORKING_DAYS,
    CAPACITY,
    getActiveOrders,
    getOpenCases,
    getRiskScore,
    getCaseByProductionOrder,
    getOrderByCase,
    getActiveWorkers,
    getCapacityForWeek,
    getUtilization,
    getUnassignedOperations,
  };
})(window);
