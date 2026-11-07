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
    { id: 1, code: "ZAK-2026-0142", name: "Reporting obchodu — pilot", client: "Moravia Steel a.s.", type: "AI", status: "quoted", stateLabel: "Nabídka", stateTone: "primary", created: "12. 05. 2026", deadline: "28. 11. 2026", priceOffer: 184000, priceReal: null, margin: 32, marginPos: true, progress: 68, raynet: "RN-4821", missingDocs: false, pipeline: true, plannedHours: 60, realHours: 41, caseId: 'OP-2026-0043', overdue: false },
    { id: 2, code: "ZAK-2026-0139", name: "Automatizace výkazů práce", client: "Hradecká strojírna", type: "Vývoj", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "03. 05. 2026", deadline: "15. 12. 2026", priceOffer: 96500, priceReal: 42000, margin: 24, marginPos: true, progress: 42, raynet: "RN-4810", missingDocs: false, plannedHours: 55, realHours: 48, caseId: 'OP-2026-0039', overdue: false },
    { id: 3, code: "ZAK-2026-0131", name: "Napojení ERP → CRM", client: "Agro Slovácko", type: "Integrace", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "22. 04. 2026", deadline: "10. 11. 2026", priceOffer: 312000, priceReal: 288000, margin: -4, marginPos: false, progress: 92, raynet: "RN-4795", missingDocs: false, plannedHours: 80, realHours: 92, caseId: 'OP-2026-0041', overdue: true },
    { id: 4, code: "ZAK-2026-0127", name: "AI asistent pro zápisy", client: "Obec Staré Město", type: "AI", status: "done", stateLabel: "Hotovo", stateTone: "success", created: "15. 04. 2026", deadline: "15. 11. 2026", priceOffer: 48000, priceReal: 48000, margin: 41, marginPos: true, progress: 100, raynet: "RN-4782", missingDocs: true, plannedHours: 35, realHours: 36, overdue: false },
    { id: 5, code: "ZAK-2026-0126", name: "Audit CRM dat", client: "Moravia Steel a.s.", type: "Konzultace", status: "done", stateLabel: "Hotovo", stateTone: "success", created: "10. 04. 2026", deadline: "—", priceOffer: 27500, priceReal: 27500, margin: 28, marginPos: true, progress: 100, raynet: "RN-4778", missingDocs: false, plannedHours: 25, realHours: 25, overdue: false },
    { id: 6, code: "ZAK-2026-0122", name: "Školení týmu v Notion", client: "Hradecká strojírna", type: "Školení", status: "done", stateLabel: "Hotovo", stateTone: "success", created: "02. 04. 2026", deadline: "—", priceOffer: 16000, priceReal: 16000, margin: 52, marginPos: true, progress: 100, raynet: null, missingDocs: false, plannedHours: 16, realHours: 16, overdue: false },
    { id: 7, code: "ZAK-2026-0118", name: "Import historie z Raynet", client: "Agro Slovácko", type: "Integrace", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "28. 03. 2026", deadline: "25. 11. 2026", priceOffer: 36000, priceReal: 24000, margin: 12, marginPos: true, progress: 80, raynet: "RN-4761", missingDocs: false, plannedHours: 30, realHours: 28, overdue: false },
    { id: 8, code: "ZAK-2026-0115", name: "Portál pro klienty — poptávka", client: "Procházkovi s.r.o.", type: "Vývoj", status: "new", stateLabel: "Nová", stateTone: "neutral", created: "20. 03. 2026", deadline: "—", priceOffer: null, priceReal: null, margin: null, marginPos: true, progress: 0, raynet: null, missingDocs: true, pipeline: true, plannedHours: 70, realHours: 0, overdue: false },
    { id: 9, code: "ZAK-2026-0109", name: "Dashboard pro management", client: "Moravia Steel a.s.", type: "Vývoj", status: "delivered", stateLabel: "Fakturováno", stateTone: "success", created: "10. 03. 2026", deadline: "—", priceOffer: 63000, priceReal: 63000, margin: 36, marginPos: true, progress: 100, raynet: "RN-4720", missingDocs: false, plannedHours: 45, realHours: 44, overdue: false },
    { id: 10, code: "ZAK-2026-0098", name: "Konzultace migrace", client: "Procházkovi s.r.o.", type: "Konzultace", status: "cancelled", stateLabel: "Zrušeno", stateTone: "danger", created: "25. 02. 2026", deadline: "—", priceOffer: 13000, priceReal: 0, margin: null, marginPos: true, progress: 40, raynet: null, missingDocs: false, plannedHours: 15, realHours: 8, overdue: false },
    // New 2 orders
    { id: 11, code: "ZAK-2026-0155", name: "Fotovoltaika 8 kWp", client: "Novákovi", type: "Energie", status: "in_progress", stateLabel: "Realizace", stateTone: "primary", created: "20. 10. 2026", deadline: "15. 12. 2026", priceOffer: 220000, priceReal: null, margin: 18, marginPos: true, progress: 27, raynet: null, missingDocs: false, plannedHours: 40, realHours: 12, caseId: 'OP-2026-0045', overdue: false },
    { id: 12, code: "ZAK-2026-0156", name: "Rekonstrukce koupelny — RD Zlín", client: "Dvořákovi", type: "Stavba", status: "quoted", stateLabel: "Nabídka", stateTone: "primary", created: "25. 10. 2026", deadline: "20. 11. 2026", priceOffer: 180000, priceReal: null, margin: 22, marginPos: true, progress: 0, raynet: null, missingDocs: false, plannedHours: 80, realHours: 0, caseId: 'OP-2026-0037', overdue: false },
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

  global.S21Data = {
    CASES,
    ORDERS,
    WORKERS,
    getActiveOrders,
    getOpenCases,
    getRiskScore,
    getCaseByProductionOrder,
    getOrderByCase,
    getActiveWorkers
  };
})(window);
