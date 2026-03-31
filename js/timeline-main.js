const {
  CONFIG,
  INTERACTIVE_UNLOCKED_NODE_IDS,
  ALIGN_RULES,
  GAP_RULES,
  SHIFT_RULES,
  characters
} = window;

const LOG_DATA =
  window.LOG_DATA ||
  window.timelineStoryData ||
  window.TIMELINE_STORY_DATA ||
  window.storyData ||
  window.timelineData ||
  {};

let switchAnimationTimer = null;

function getGroupById(groupId) {
  return characters.find((group) => group.id === groupId);
}

function getNodeBaseGap(group, node) {
  return node.w >= 280
    ? (group.bigGap ?? CONFIG.bigEdgeGap)
    : (group.smallGap ?? CONFIG.smallEdgeGap);
}

function getNodeStartXInGroup(group, nodeId) {
  let currentX = CONFIG.baseX;
  for (const node of group.nodes) {
    if (node.id === nodeId) return currentX;
    currentX += node.w + getNodeBaseGap(group, node);
  }
  return CONFIG.baseX;
}

function getNodeVisualCenterOffset(node) {
  if (!node) return 0;
  if (node.w >= 380) return -6;
  if (node.w >= 280) return -5;
  if (node.w >= 200) return -4;
  return -3;
}

function getNodeTopCenterX(node) {
  return node.x + node.w / 2 + getNodeVisualCenterOffset(node);
}

function getNodeBottomCenterX(node) {
  return node.x + node.w / 2 + getNodeVisualCenterOffset(node);
}

function getNodeRightMidX(node) {
  return node.x + node.w;
}

function getNodeRightMidY(node) {
  return node.y + 9;
}

function getGroupStartX(group) {
  const rule = ALIGN_RULES.find((item) => item.targetGroup === group.id);
  if (!rule || rule.type !== 'alignToNode') return CONFIG.baseX;

  const sourceGroup = getGroupById(rule.sourceGroup);
  if (!sourceGroup) return CONFIG.baseX;

  if (group.id === 'g1') {
    const sourceNode = sourceGroup.nodes.find((n) => n.id === rule.sourceNodeId);
    const targetNode = group.nodes.find((n) => n.id === 'g1-4');
    if (!sourceNode || !targetNode) return CONFIG.baseX;

    const sourceStartX = getNodeStartXInGroup(sourceGroup, rule.sourceNodeId);
    const sourceCenter = sourceStartX + sourceNode.w / 2 + getNodeVisualCenterOffset(sourceNode);
    const targetCenterFromBase =
      getNodeStartXInGroup(group, 'g1-4') +
      targetNode.w / 2 +
      getNodeVisualCenterOffset(targetNode);

    return CONFIG.baseX + (sourceCenter - targetCenterFromBase);
  }

  if (group.id === 'g2') {
    const sourceNode = sourceGroup.nodes.find((n) => n.id === rule.sourceNodeId);
    const firstNode = group.nodes[0];
    if (!sourceNode || !firstNode) return CONFIG.baseX;

    const sourceStartX = getNodeStartXInGroup(sourceGroup, rule.sourceNodeId);
    const sourceCenter = sourceStartX + sourceNode.w / 2 + getNodeVisualCenterOffset(sourceNode);
    const firstCenterFromBase =
      getNodeStartXInGroup(group, firstNode.id) +
      firstNode.w / 2 +
      getNodeVisualCenterOffset(firstNode);

    return CONFIG.baseX + (sourceCenter - firstCenterFromBase) - 175;
  }

  return CONFIG.baseX;
}

function applyGapRule(group, node, baseGap) {
  const rule = GAP_RULES.find(
    (item) => item.groupId === group.id && item.afterNodeId === node.id
  );
  return rule ? baseGap * rule.multiplier : baseGap;
}

function getShiftAfterNode(group, node) {
  return SHIFT_RULES
    .filter((item) => item.groupId === group.id && item.afterNodeId === node.id)
    .reduce((sum, item) => sum + item.shiftX, 0);
}

function buildNodes() {
  return characters.flatMap((group) => {
    let currentX = getGroupStartX(group);
    let accumulatedShiftX = 0;

    return group.nodes.map((node) => {
      const x = currentX + accumulatedShiftX;
      const baseGap = getNodeBaseGap(group, node);
      const edgeGap = applyGapRule(group, node, baseGap);

      currentX += node.w + edgeGap;
      accumulatedShiftX += getShiftAfterNode(group, node);

      return { ...node, x, y: group.y, h: 78 };
    });
  });
}

function pathEl(d, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  el.setAttribute('d', d);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function textEl(x, y, content, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  el.setAttribute('x', x);
  el.setAttribute('y', y);
  el.textContent = content;
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function createNodeShapePath(node) {
  return `M ${node.x} ${node.y - node.h / 2 + 10}
    L ${node.x + 16} ${node.y - node.h / 2}
    L ${node.x + node.w - 22} ${node.y - node.h / 2}
    L ${node.x + node.w} ${node.y - node.h / 2 + 18}
    L ${node.x + node.w} ${node.y + node.h / 2}
    L ${node.x + 18} ${node.y + node.h / 2}
    L ${node.x} ${node.y + node.h / 2 - 14}
    Z`;
}

function isLockedNode(node) {
  return node.title !== 'COMING SOON...' && !INTERACTIVE_UNLOCKED_NODE_IDS.has(node.id);
}

function isActiveNode(node) {
  return INTERACTIVE_UNLOCKED_NODE_IDS.has(node.id);
}

function openLog(nodeId) {
  const data = LOG_DATA[nodeId];
  if (!data) return;

  const modal = document.getElementById('logModal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  document.getElementById('logAreaTitle').textContent = data.area;
  document.getElementById('logAreaSubtitle').textContent = data.subtitle ?? '作戰記錄';

  renderEpisodeList(nodeId);
  renderEpisodeContent(nodeId, 0);

  document.querySelector('.log-content')?.scrollTo({
    top: 0,
    behavior: 'auto'
  });
}

function closeLog() {
  const modal = document.getElementById('logModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function playLogSwitchAnimation() {
  const contentEl = document.querySelector('.log-content');
  if (!contentEl) return;

  contentEl.classList.remove('is-switching');
  void contentEl.offsetWidth;
  contentEl.classList.add('is-switching');

  clearTimeout(switchAnimationTimer);
  switchAnimationTimer = window.setTimeout(() => {
    contentEl.classList.remove('is-switching');
  }, 340);
}

function renderEpisodeList(nodeId) {
  const data = LOG_DATA[nodeId];
  const listEl = document.getElementById('logEpisodeList');
  listEl.innerHTML = '';

  if (!data || !Array.isArray(data.episodes) || data.episodes.length === 0) {
    listEl.innerHTML = '<div class="log-empty">尚無日誌資料</div>';
    return;
  }

  data.episodes.forEach((episode, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `log-episode-btn${index === 0 ? ' active' : ''}`;
    button.innerHTML = `
      <span class="log-episode-no">${episode.no}</span>
      <span class="log-episode-label">${episode.label}</span>
    `;

    button.addEventListener('click', () => {
      renderEpisodeContent(nodeId, index);
      document.querySelector('.log-content')?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      playLogSwitchAnimation();

      [...listEl.querySelectorAll('.log-episode-btn')].forEach((el) => {
        el.classList.remove('active');
      });
      button.classList.add('active');
    });

    listEl.appendChild(button);
  });
}

function renderEpisodeContent(nodeId, episodeIndex) {
  const data = LOG_DATA[nodeId];
  const episode = data?.episodes?.[episodeIndex];

  if (!episode) {
    document.getElementById('logEntryKicker').textContent = '作戰紀錄';
    document.getElementById('logEntryTitle').textContent = '目前沒有內容';
    document.getElementById('logEntryText').textContent = '此區域尚未寫入作戰日誌。';
    return;
  }

  document.getElementById('logEntryKicker').textContent = '作戰紀錄';
  document.getElementById('logEntryTitle').textContent = `${episode.no}｜${episode.label}`;
  document.getElementById('logEntryText').textContent = episode.content;
}

function bindLogModalEvents() {
  document.getElementById('logCloseBtn')?.addEventListener('click', closeLog);
  document.getElementById('logBackdrop')?.addEventListener('click', closeLog);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLog();
  });
}

function render() {
  const allNodes = buildNodes();
  const contentWidth = Math.max(
    CONFIG.minCanvasWidth,
    Math.max(...allNodes.map((node) => node.x + node.w)) + 180
  );

  const svgWrap = document.getElementById('svgWrap');
  if (!svgWrap) return;
  svgWrap.style.minWidth = `${contentWidth}px`;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${contentWidth} 620`);
  svg.setAttribute('aria-label', '角色主線時間線');

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3.4" result="blur"></feGaussianBlur>
      <feMerge>
        <feMergeNode in="blur"></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>
    <linearGradient id="nodeFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7f2200"></stop>
      <stop offset="60%" stop-color="#a64012"></stop>
      <stop offset="100%" stop-color="#c85a1c"></stop>
    </linearGradient>
  `;
  svg.appendChild(defs);

  svg.appendChild(pathEl('M 22 40 L 132 40', {
    stroke: 'rgba(255,170,120,.34)',
    'stroke-width': '2'
  }));
  svg.appendChild(pathEl('M 42 20 L 42 92', {
    stroke: 'rgba(255,170,120,.34)',
    'stroke-width': '2'
  }));
  svg.appendChild(pathEl(`M ${contentWidth - 132} 580 L ${contentWidth - 22} 580`, {
    stroke: 'rgba(255,170,120,.34)',
    'stroke-width': '2'
  }));
  svg.appendChild(pathEl(`M ${contentWidth - 42} 508 L ${contentWidth - 42} 580`, {
    stroke: 'rgba(255,170,120,.34)',
    'stroke-width': '2'
  }));
  svg.appendChild(pathEl(`M 70 70 L ${contentWidth - 70} 70`, {
    stroke: 'rgba(200,90,28,.12)',
    'stroke-width': '1'
  }));
  svg.appendChild(pathEl(`M 70 560 L ${contentWidth - 70} 560`, {
    stroke: 'rgba(200,90,28,.12)',
    'stroke-width': '1'
  }));

  characters.forEach((group) => {
    const groupNodes = allNodes.filter((n) => n.y === group.y);
    const isMainRoute = group.id === 'g1';
    const labelX = 28;
    const labelW = 250;

    if (groupNodes.length > 0) {
      const first = groupNodes[0];
      svg.appendChild(pathEl(`M ${labelX + labelW} ${group.y} L ${first.x} ${first.y}`, {
        stroke: isMainRoute ? CONFIG.mainRouteLine : 'rgba(255,140,60,.35)',
        'stroke-width': isMainRoute ? '6' : '5',
        'stroke-linecap': 'round',
        fill: 'none'
      }));
    }

    for (let i = 0; i < groupNodes.length - 1; i += 1) {
      const a = groupNodes[i];
      const b = groupNodes[i + 1];
      svg.appendChild(pathEl(`M ${a.x + a.w} ${a.y} L ${b.x} ${b.y}`, {
        stroke: isMainRoute ? CONFIG.mainRouteLine : 'rgba(255,140,60,.35)',
        'stroke-width': isMainRoute ? '6' : '5',
        'stroke-linecap': 'round',
        fill: 'none'
      }));
    }
  });

  characters.forEach((group) => {
    const labelX = 28;
    const labelW = 250;
    const labelH = 78;
    const labelTop = group.y - labelH / 2;

    svg.appendChild(pathEl(
      `M ${labelX} ${labelTop + 10}
       L ${labelX + 16} ${labelTop}
       L ${labelX + labelW - 22} ${labelTop}
       L ${labelX + labelW} ${labelTop + 18}
       L ${labelX + labelW} ${labelTop + labelH}
       L ${labelX + 18} ${labelTop + labelH}
       L ${labelX} ${labelTop + labelH - 14}
       Z`,
      {
        fill: 'rgba(22,11,8,.96)',
        stroke: CONFIG.frameOrange,
        'stroke-width': '1.2'
      }
    ));

    svg.appendChild(pathEl(
      `M ${labelX + 12} ${labelTop + 12} L ${labelX + 34} ${labelTop + 12}`,
      {
        stroke: 'rgba(255,170,120,.34)',
        'stroke-width': '1.6'
      }
    ));

    svg.appendChild(pathEl(
      `M ${labelX + labelW - 40} ${labelTop + labelH - 12} L ${labelX + labelW - 14} ${labelTop + labelH - 12}`,
      {
        stroke: 'rgba(255,170,120,.28)',
        'stroke-width': '1.6'
      }
    ));

    svg.appendChild(textEl(labelX + labelW / 2, group.y + 5, group.name, {
      'text-anchor': 'middle',
      fill: '#fff1e7',
      'font-size': '20',
      'font-weight': '700',
      'letter-spacing': '1.2'
    }));
  });

  const g2Node = allNodes.find((n) => n.id === 'g2-3');
  const g1Node = allNodes.find((n) => n.id === 'g1-5');
  if (g2Node && g1Node) {
    const startX = g2Node.x + g2Node.w;
    const startY = g2Node.y;
    const endX = getNodeTopCenterX(g1Node);
    const endY = g1Node.y - g1Node.h / 2;
    const r = 20;
    const cornerX = endX;
    const cornerY = startY;

    svg.appendChild(pathEl(
      `M ${startX} ${startY}
       L ${cornerX - r} ${cornerY}
       Q ${cornerX} ${cornerY} ${cornerX} ${cornerY + r}
       L ${cornerX} ${endY}`,
      {
        stroke: 'rgba(255,180,120,.95)',
        'stroke-width': '6',
        'stroke-linecap': 'round',
        fill: 'none'
      }
    ));
  }

  const g1IncheonNode = allNodes.find((n) => n.id === 'g1-6');
  const g3HillNode = allNodes.find((n) => n.id === 'g3-4');
  if (g1IncheonNode && g3HillNode) {
    const startX = getNodeBottomCenterX(g1IncheonNode);
    const startY = g1IncheonNode.y + g1IncheonNode.h / 2;
    const endX = getNodeRightMidX(g3HillNode);
    const endY = getNodeRightMidY(g3HillNode);
    const r = 20;
    const cornerX = startX;
    const cornerY = endY;

    svg.appendChild(pathEl(
      `M ${startX} ${startY}
       L ${cornerX} ${cornerY - r}
       Q ${cornerX} ${cornerY} ${cornerX - r} ${cornerY}
       L ${endX} ${cornerY}`,
      {
        stroke: 'rgba(255,180,120,.95)',
        'stroke-width': '6',
        'stroke-linecap': 'round',
        fill: 'none'
      }
    ));
  }

  allNodes.forEach((node) => {
    const isComing = node.title === 'COMING SOON...';
    const lockedNode = isLockedNode(node);
    const activeNode = isActiveNode(node);
    const nodePath = createNodeShapePath(node);

    const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodeGroup.setAttribute(
      'class',
      `node-group${lockedNode ? ' locked-node' : ''}${activeNode ? ' active-node' : ''}`
    );

    const nodeBody = pathEl(
      nodePath,
      isComing
        ? {
            fill: 'none',
            stroke: 'rgba(255,180,120,.55)',
            'stroke-width': '1.6',
            'stroke-dasharray': '6 4',
            class: 'coming-soon'
          }
        : {
            fill: 'url(#nodeFill)',
            stroke: activeNode ? 'rgba(255,210,160,.6)' : 'rgba(255,190,140,.28)',
            'stroke-width': activeNode ? '1.4' : '1',
            filter: 'url(#orangeGlow)',
            class: 'node-body'
          }
    );
    nodeGroup.appendChild(nodeBody);

    if (!isComing) {
      nodeGroup.appendChild(pathEl(
        `M ${node.x + 12} ${node.y - node.h / 2 + 12} L ${node.x + 34} ${node.y - node.h / 2 + 12}`,
        {
          stroke: 'rgba(255,220,200,.24)',
          'stroke-width': '1.6',
          class: 'node-deco'
        }
      ));

      nodeGroup.appendChild(pathEl(
        `M ${node.x + node.w - 40} ${node.y + node.h / 2 - 12} L ${node.x + node.w - 14} ${node.y + node.h / 2 - 12}`,
        {
          stroke: 'rgba(255,220,200,.20)',
          'stroke-width': '1.6',
          class: 'node-deco'
        }
      ));
    }

    const titleText = textEl(node.x + node.w / 2, node.y + 5, node.title, {
      'text-anchor': 'middle',
      fill: activeNode ? '#fff8f2' : (isComing ? '#ffd8c2' : '#fff4ea'),
      'font-size': '12',
      'font-weight': activeNode ? '700' : '600',
      'letter-spacing': isComing ? '2.4' : '1.2',
      class: isComing ? 'coming-soon node-title' : 'node-title'
    });
    titleText.style.textShadow = activeNode
      ? '0 0 18px rgba(255,140,70,.55)'
      : `0 0 14px ${CONFIG.glowColor}`;
    nodeGroup.appendChild(titleText);

    if (activeNode) {
      const activeClipId = `active-clip-${node.id}`;
      const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
      clipPath.setAttribute('id', activeClipId);
      clipPath.appendChild(pathEl(nodePath));
      defs.appendChild(clipPath);

      const activeGlow = pathEl(nodePath, {
        fill: 'none',
        stroke: 'rgba(255,210,150,1)',
        'stroke-width': '5.4',
        class: 'node-active-glow'
      });
      activeGlow.style.filter = 'blur(16px)';
      activeGlow.style.opacity = '.95';
      activeGlow.style.animation = 'activePulse 1.2s ease-in-out infinite';
      nodeGroup.appendChild(activeGlow);

      const activeBand1 = pathEl(
        `M ${node.x + 22} ${node.y - 10} L ${node.x + node.w - 30} ${node.y - 10}`,
        {
          stroke: 'rgba(255,220,180,.42)',
          'stroke-width': '1.4',
          'stroke-linecap': 'round',
          class: 'node-active-band node-active-band-1',
          'clip-path': `url(#${activeClipId})`
        }
      );
      activeBand1.style.filter = 'drop-shadow(0 0 8px rgba(255,170,90,.25))';
      nodeGroup.appendChild(activeBand1);

      const activeBand2 = pathEl(
        `M ${node.x + 34} ${node.y + 12} L ${node.x + node.w - 42} ${node.y + 12}`,
        {
          stroke: 'rgba(255,210,165,.28)',
          'stroke-width': '1.1',
          'stroke-linecap': 'round',
          class: 'node-active-band node-active-band-2',
          'clip-path': `url(#${activeClipId})`
        }
      );
      activeBand2.style.filter = 'drop-shadow(0 0 6px rgba(255,150,80,.18))';
      nodeGroup.appendChild(activeBand2);

      const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      p1.setAttribute('cx', node.x + 36);
      p1.setAttribute('cy', node.y - 4);
      p1.setAttribute('r', '2');
      p1.setAttribute('fill', 'rgba(255,230,210,.58)');
      p1.setAttribute('class', 'node-active-particle node-active-particle-1');
      p1.setAttribute('clip-path', `url(#${activeClipId})`);
      p1.style.filter = 'drop-shadow(0 0 6px rgba(255,170,100,.22))';
      nodeGroup.appendChild(p1);

      const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      p2.setAttribute('cx', node.x + node.w - 52);
      p2.setAttribute('cy', node.y + 8);
      p2.setAttribute('r', '1.8');
      p2.setAttribute('fill', 'rgba(255,220,196,.42)');
      p2.setAttribute('class', 'node-active-particle node-active-particle-2');
      p2.setAttribute('clip-path', `url(#${activeClipId})`);
      p2.style.filter = 'drop-shadow(0 0 5px rgba(255,150,78,.18))';
      nodeGroup.appendChild(p2);

      const p3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      p3.setAttribute('cx', node.x + node.w / 2 + 16);
      p3.setAttribute('cy', node.y - 14);
      p3.setAttribute('r', '1.8');
      p3.setAttribute('fill', 'rgba(255,235,218,.5)');
      p3.setAttribute('class', 'node-active-particle node-active-particle-3');
      p3.setAttribute('clip-path', `url(#${activeClipId})`);
      p3.style.filter = 'drop-shadow(0 0 7px rgba(255,175,105,.24))';
      nodeGroup.appendChild(p3);

      nodeGroup.appendChild(pathEl(nodePath, {
        fill: 'rgba(255,200,140,.18)',
        stroke: 'rgba(255,220,185,.28)',
        'stroke-width': '1.1',
        class: 'node-active-overlay'
      }));

      nodeGroup.appendChild(pathEl(
        `M ${node.x + 16} ${node.y - node.h / 2 + 14} L ${node.x + 48} ${node.y - node.h / 2 + 14}`,
        {
          stroke: 'rgba(255,220,190,.48)',
          'stroke-width': '1.5',
          class: 'node-active-frame'
        }
      ));

      nodeGroup.appendChild(pathEl(
        `M ${node.x + node.w - 54} ${node.y + node.h / 2 - 14} L ${node.x + node.w - 18} ${node.y + node.h / 2 - 14}`,
        {
          stroke: 'rgba(255,220,190,.42)',
          'stroke-width': '1.5',
          class: 'node-active-frame'
        }
      ));

      const activeSubtext = textEl(
        node.x + node.w / 2,
        node.y + 21,
        node.id === 'g1-1' ? '起始章節' : '主線開放',
        {
          'text-anchor': 'middle',
          fill: 'rgba(255,222,200,.62)',
          'font-size': '9.5',
          'font-weight': '700',
          'letter-spacing': '2.4',
          class: 'node-active-subtext'
        }
      );
      activeSubtext.style.textShadow = '0 0 8px rgba(255,145,78,.18)';
      nodeGroup.appendChild(activeSubtext);

      nodeGroup.addEventListener('click', () => openLog(node.id));
    }

    if (lockedNode) {
      nodeGroup.appendChild(pathEl(nodePath, {
        fill: 'rgba(8,10,13,.78)',
        stroke: 'rgba(255,176,128,.18)',
        'stroke-width': '1.1',
        class: 'node-lock-overlay'
      }));

      nodeGroup.appendChild(pathEl(
        `M ${node.x + 20} ${node.y - node.h / 2 + 18} L ${node.x + node.w - 26} ${node.y - node.h / 2 + 18}`,
        {
          stroke: 'rgba(255,185,150,.18)',
          'stroke-width': '1.1',
          class: 'node-lock-frame'
        }
      ));

      nodeGroup.appendChild(pathEl(
        `M ${node.x + 24} ${node.y + node.h / 2 - 18} L ${node.x + node.w - 20} ${node.y + node.h / 2 - 18}`,
        {
          stroke: 'rgba(255,185,150,.14)',
          'stroke-width': '1.1',
          class: 'node-lock-frame'
        }
      ));

      const lockScan = pathEl(
        `M ${node.x + 22} ${node.y} L ${node.x + node.w - 22} ${node.y}`,
        {
          stroke: 'rgba(255,196,150,.9)',
          'stroke-width': '1.6',
          'stroke-linecap': 'round',
          class: 'node-lock-scan'
        }
      );
      lockScan.style.transformBox = 'fill-box';
      lockScan.style.transformOrigin = 'center';
      lockScan.style.filter = 'drop-shadow(0 0 10px rgba(255,140,60,.55))';
      nodeGroup.appendChild(lockScan);

      const lockScan2 = pathEl(
        `M ${node.x + 28} ${node.y} L ${node.x + node.w - 28} ${node.y}`,
        {
          stroke: 'rgba(255,170,110,.55)',
          'stroke-width': '1.2',
          'stroke-linecap': 'round',
          class: 'node-lock-scan-2'
        }
      );
      lockScan2.style.transformBox = 'fill-box';
      lockScan2.style.transformOrigin = 'center';
      nodeGroup.appendChild(lockScan2);

      const lockText = textEl(node.x + node.w / 2, node.y + 1, '訊號中斷', {
        'text-anchor': 'middle',
        fill: 'rgba(255,224,206,.84)',
        'font-size': '13',
        'font-weight': '700',
        'letter-spacing': '4',
        class: 'node-lock-text'
      });
      lockText.style.textShadow = '0 0 10px rgba(255,120,48,.18)';
      nodeGroup.appendChild(lockText);

      const lockSubtext = textEl(node.x + node.w / 2, node.y + 20, '劇情未連接', {
        'text-anchor': 'middle',
        fill: 'rgba(255,210,190,.4)',
        'font-size': '9.5',
        'font-weight': '600',
        'letter-spacing': '2.2',
        class: 'node-lock-subtext'
      });
      lockSubtext.style.textShadow = '0 0 8px rgba(255,120,48,.08)';
      nodeGroup.appendChild(lockSubtext);
    }

    svg.appendChild(nodeGroup);
  });

  svgWrap.innerHTML = '';
  svgWrap.appendChild(svg);
}

function enableWheelHorizontalScroll() {
  const scroller = document.getElementById('routeScroll');
  if (!scroller) return;

  scroller.addEventListener('wheel', (event) => {
    if (scroller.scrollWidth <= scroller.clientWidth) return;

    if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
      scroller.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }, { passive: false });
}

render();
enableWheelHorizontalScroll();
bindLogModalEvents();