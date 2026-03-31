window.CONFIG = {
  glowColor: 'rgba(255,138,56,.34)',
  frameOrange: 'rgba(200,90,28,.28)',
  mainRouteLine: 'rgba(255,180,120,.95)',
  baseX: 435,
  smallEdgeGap: 60,
  bigEdgeGap: 90,
  minCanvasWidth: 2400,
};

window.INTERACTIVE_UNLOCKED_NODE_IDS = new Set(['g1-1', 'g1-3', 'g1-4']);

window.characters = [
  {
    id: 'g1',
    name: '姜燕、瑪莉亞、戴莉',
    y: 330,
    smallGap: 100,
    bigGap: 160,
    nodes: [
      { id: 'g1-1', title: '南極', w: 170 },
      { id: 'g1-2', title: '國際機場', w: 170 },
      { id: 'g1-3', title: '賽騰城', w: 170 },
      { id: 'g1-4', title: '殉教者山丘', w: 400 },
      { id: 'g1-5', title: '獵者之夜', w: 280 },
      { id: 'g1-6', title: '仁川港', w: 288 },
      { id: 'g1-7', title: 'COMING SOON...', w: 288 },
    ],
  },
  {
    id: 'g2',
    name: '洛潔莉雅',
    y: 150,
    nodes: [
      { id: 'g2-1', title: '地下監管所', w: 170 },
      { id: 'g2-2', title: '世界和平之門', w: 170 },
      { id: 'g2-3', title: '獵者之夜', w: 204 },
    ],
  },
  {
    id: 'g3',
    name: '克萊兒',
    y: 510,
    nodes: [
      { id: 'g3-1', title: '首爾', w: 190 },
      { id: 'g3-1a', title: '九老車站', w: 190 },
      { id: 'g3-2', title: '國際機場', w: 190 },
      { id: 'g3-3', title: '世界和平之門', w: 400 },
      { id: 'g3-4', title: '殉教者山丘', w: 221 },
    ],
  },
];

window.ALIGN_RULES = [
  { targetGroup: 'g1', type: 'alignToNode', sourceGroup: 'g3', sourceNodeId: 'g3-3' },
  { targetGroup: 'g2', type: 'alignToNode', sourceGroup: 'g1', sourceNodeId: 'g1-4' },
];

window.GAP_RULES = [
  { groupId: 'g2', afterNodeId: 'g2-1', multiplier: 0.25 },
  { groupId: 'g2', afterNodeId: 'g2-2', multiplier: 1.2 },
  { groupId: 'g1', afterNodeId: 'g1-5', multiplier: 0.875 },
];

window.SHIFT_RULES = [
  { groupId: 'g1', afterNodeId: 'g1-4', shiftX: 25 },
];