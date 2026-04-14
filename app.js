(function () {
  const config = window.SITE_CONFIG;
  const root = document.getElementById("app");

  if (!config || !root) {
    return;
  }

  applyMeta(config.meta);
  root.innerHTML = renderPage(config);
  bindTabs();
  bindHeaderState();
  bindPointerBackdrop();
  bindReveal();
})();

function applyMeta(meta) {
  if (!meta) {
    return;
  }

  if (meta.title) {
    document.title = meta.title;
  }

  if (meta.description) {
    let tag = document.querySelector('meta[name="description"]');

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", meta.description);
  }
}

function renderPage(config) {
  return `
    <div class="site-shell">
      ${renderBackdrop()}
      ${renderHeader(config)}
      <main>
        ${renderHero(config.hero)}
        ${renderTechnologyBlocks(config.technologyBlocks)}
        ${renderSimulation(config.simulation)}
        ${renderBenchmarkSection(
          config.realWorldBenchmark,
          "real-world-agibot-benchmark",
          "benchmark-section is-after-simulation"
        )}
        ${renderBenchmarkSection(
          config.egoliveAblation,
          "egolive-data-validity-ablation-analysis",
          "benchmark-section"
        )}
        ${renderVideosSection(config.videos)}
        ${renderCitation(config.citation)}
      </main>
    </div>
  `;
}

function renderBackdrop() {
  return `
    <div class="site-backdrop" aria-hidden="true">
      <div class="site-backdrop-base"></div>
      <div class="site-backdrop-grid"></div>
      <div class="site-backdrop-grid site-backdrop-grid-highlight"></div>
      <div class="site-backdrop-glow"></div>
      <div class="site-backdrop-cross site-backdrop-cross-x"></div>
      <div class="site-backdrop-cross site-backdrop-cross-y"></div>
      <div class="site-backdrop-vignette"></div>
    </div>
  `;
}

function renderTechnologyBlocks(section) {
  return `
    <section class="section technology-blocks-section" id="technology">
      <div class="section-shell">
        <div class="technology-block-stack">
          ${section.blocks
            .map(
              (block) => `
                <article class="technology-block-item reveal" id="${block.id}">
                  <h2 class="technology-block-title">${block.title}</h2>
                  ${
                    block.description
                      ? `<p class="technology-block-description">${block.description}</p>`
                      : ""
                  }
                  <div class="technology-block-media">
                    <img src="${block.image}" alt="${block.alt || block.title}" class="technology-block-image" />
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHeader(config) {
  const navigation = Array.isArray(config.navigation)
    ? config.navigation.filter((item) => item?.label)
    : [];
  const localeLabel = config.header?.localeLabel || "";
  const navGap = config.header?.navGap || "";
  const brandLogo = config.brand?.logo || "";
  const compactClass = !navigation.length && !localeLabel ? " is-brand-only" : "";
  const navStyle = navGap ? ` style="--nav-gap:${navGap};"` : "";

  return `
    <header class="site-header${compactClass}" id="top">
      <div class="header-shell${compactClass}">
        <a class="brand" href="#hero" aria-label="${config.brand.name}">
          ${
            brandLogo
              ? `<img class="brand-logo" src="${brandLogo}" alt="${config.brand.name}" />`
              : `<span class="brand-name">${config.brand.name}</span>`
          }
        </a>
        ${
          navigation.length
            ? `
              <nav class="nav" aria-label="Site navigation"${navStyle}>
                ${navigation
                  .map(
                    (item) => `
                      <a class="nav-link ${item.active ? "is-active" : ""}" href="${item.href ?? ""}">
                        ${item.label}
                      </a>
                    `
                  )
                  .join("")}
              </nav>
            `
            : ""
        }
        ${localeLabel ? `<div class="header-meta">${localeLabel}</div>` : ""}
      </div>
    </header>
  `;
}

function renderHero(hero) {
  return `
    <section class="hero" id="hero">
      <div class="section-shell">
        <div class="hero-stack reveal">
          ${hero.eyebrow ? `<span class="hero-kicker">${hero.eyebrow}</span>` : ""}
          <h1 class="hero-title">${renderHeroTitle(hero.title)}</h1>
          ${hero.subtitle ? `<p class="hero-subtitle">${hero.subtitle}</p>` : ""}
          ${
            hero.actions?.length
              ? `
                <div class="hero-actions">
                  ${hero.actions
                    .map(
                      (action) => `
                        <a
                          class="btn btn-pill"
                          href="${action.href}"
                          target="_blank"
                          rel="noreferrer"
                        >
                          ${action.label}
                        </a>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="hero-media">
            <div class="hero-video-shell">
              ${renderVideo(hero.video, {
                autoplay: true,
                controls: true,
                className: "hero-video"
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHeroTitle(title) {
  const versionMatch = title.match(/^(.*?)(\s+\d+(?:\.\d+)+(?:.*)?)$/);

  if (versionMatch) {
    return `
      <span class="hero-title-accent">${versionMatch[1]}</span><span class="hero-title-rest">${versionMatch[2]}</span>
    `;
  }

  return `<span class="hero-title-accent">${title}</span>`;
}

function renderBenchmarkSection(section, id, extraClassName = "") {
  return `
    <section class="section ${extraClassName}" id="${id}">
      <div class="section-shell">
        ${renderSectionHeader(section.title, section.description, { centered: true })}
        <div class="benchmark-chart-stack">
          <figure class="benchmark-figure reveal">
            <div class="benchmark-figure-frame">
              ${renderBenchmarkSvg(section.chart)}
            </div>
            ${
              section.chart.caption
                ? `
                  <figcaption class="benchmark-caption">
                    <span class="benchmark-caption-index">${section.chart.captionIndex}</span>
                    <span>${section.chart.caption}</span>
                  </figcaption>
                `
                : ""
            }
          </figure>
        </div>
      </div>
    </section>
  `;
}

function renderCitation(section) {
  if (!section) {
    return "";
  }

  return `
    <section class="section citation-section" id="citation">
      <div class="section-shell">
        <div class="citation-wrap reveal">
          ${renderSectionHeader(section.title, section.description)}
          <div class="citation-card">
            <a
              class="citation-link"
              href="${section.href}"
              target="_blank"
              rel="noreferrer"
            >
              ${section.linkLabel || section.href}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderShowcase(showcase) {
  const firstItem = showcase.groups[0].items[0];

  return `
    <section class="section" id="showcase">
      <div class="section-shell">
        ${renderSectionHeader(showcase.title, showcase.description)}
        <div class="showcase-layout">
          <article class="card showcase-main reveal">
            <div class="media-frame">
              ${renderVideo(firstItem, {
                autoplay: true,
                controls: true,
                className: "",
                id: "showcase-player"
              })}
            </div>
            <div class="showcase-meta">
              <span class="showcase-kicker" id="showcase-group-label">${showcase.groups[0].title}</span>
              <h3 class="showcase-title" id="showcase-title">${firstItem.title}</h3>
              <p class="showcase-caption" id="showcase-caption">${firstItem.caption}</p>
            </div>
          </article>
          <div class="showcase-sidebar reveal">
            ${showcase.groups
              .map(
                (group, groupIndex) => `
                  <article class="card video-group">
                    <h3 class="video-group-title">${group.title}</h3>
                    <div class="video-grid">
                      ${group.items
                        .map(
                          (item, itemIndex) => `
                            <button
                              class="video-thumb ${
                                groupIndex === 0 && itemIndex === 0 ? "is-active" : ""
                              }"
                              type="button"
                              data-showcase-button
                              data-group="${group.title}"
                              data-src="${item.src}"
                              data-poster="${item.poster || ""}"
                              data-title="${item.title}"
                              data-caption="${item.caption}"
                            >
                              <span class="video-thumb-poster">
                                ${
                                  item.poster
                                    ? `<img src="${item.poster}" alt="${item.title}" />`
                                    : ""
                                }
                              </span>
                              <span class="video-thumb-copy">
                                <h4>${item.title}</h4>
                                <p>${item.caption}</p>
                              </span>
                            </button>
                          `
                        )
                        .join("")}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="chart-grid two-col" style="margin-top: 20px;">
          ${showcase.charts.map((chart) => renderChartCard(chart, true)).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSimulation(simulation) {
  return `
    <section class="section simulation-section" id="simulation">
      <div class="section-shell">
        ${renderSectionHeader(simulation.title, simulation.description, { centered: true })}
        <div class="tabs tabs-centered reveal">
          ${simulation.tabs
            .map(
              (tab, index) => `
                <button
                  class="tab-trigger ${index === 0 ? "is-active" : ""}"
                  type="button"
                  data-tab-trigger
                  data-tab-group="simulation"
                  data-tab-target="${tab.key}"
                >
                  ${tab.label}
                </button>
              `
            )
            .join("")}
        </div>
        ${simulation.tabs
          .map(
            (tab, index) => `
              <section
                class="tab-panel"
                data-tab-panel="simulation"
                data-tab-key="${tab.key}"
                ${index === 0 ? "" : "hidden"}
              >
                <article class="card simulation-panel reveal">
                  <div class="chart-card-head simulation-panel-head">
                    <h3>${tab.label}</h3>
                    <p>${tab.intro}</p>
                  </div>
                  <div class="simulation-figures ${tab.figures.length > 1 ? "two-col" : ""}">
                    ${tab.figures
                      .map(
                        (figure) => `
                          <div class="simulation-benchmark-figure">
                            <div class="benchmark-figure-frame">
                              ${renderBenchmarkSvg(figure)}
                            </div>
                          </div>
                        `
                      )
                      .join("")}
                  </div>
                </article>
              </section>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderVideosSection(section) {
  if (!section) {
    return "";
  }

  return `
    <section class="section videos-section" id="videos">
      <div class="section-shell">
        ${renderSectionHeader(section.title, section.description, { centered: true })}
        <div class="tabs tabs-centered reveal">
          ${section.items
            .map(
              (item, index) => `
                <button
                  class="tab-trigger ${index === 0 ? "is-active" : ""}"
                  type="button"
                  data-tab-trigger
                  data-tab-group="videos"
                  data-tab-target="${item.key}"
                >
                  ${item.label}
                </button>
              `
            )
            .join("")}
        </div>
        ${section.items
          .map(
            (item, index) => `
              <section
                class="tab-panel"
                data-tab-panel="videos"
                data-tab-key="${item.key}"
                ${index === 0 ? "" : "hidden"}
              >
                <article class="card videos-panel reveal">
                  <div class="chart-card-head simulation-panel-head">
                    <h3>${item.label}</h3>
                    ${item.intro ? `<p>${item.intro}</p>` : ""}
                  </div>
                  <div class="video-pair-shell">
                    ${item.views
                      .map(
                        (view) => `
                          <figure class="video-pair-view">
                            <figcaption class="video-pair-label">${view.label}</figcaption>
                            <div class="video-pair-frame">
                              ${renderVideo(view.video, {
                                autoplay: true,
                                controls: true,
                                className: "video-pair-player"
                              })}
                            </div>
                          </figure>
                        `
                      )
                      .join("")}
                  </div>
                </article>
              </section>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderHowItWorks(section) {
  return `
    <section class="section" id="how-it-works">
      <div class="section-shell">
        ${renderSectionHeader(section.title, section.description)}
        <div class="how-grid">
          ${section.cards
            .map(
              (card) => `
                <article class="card how-card reveal">
                  ${renderVideo(card.video, {
                    autoplay: true,
                    controls: true,
                    className: ""
                  })}
                  <div class="how-card-copy">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
        <article class="card compare-block reveal">
          <div class="compare-copy">
            <h3>${section.compare.title}</h3>
            <p>${section.compare.description}</p>
            <p>${section.compare.note}</p>
          </div>
          <div class="compare-rows">
            <div class="compare-row">
              <div class="compare-label is-soft">Prediction</div>
              <div class="compare-grid">
                ${section.compare.prediction
                  .map(
                    (src) => `
                      ${renderVideo({ src: src, poster: "", title: "Prediction frame" }, {
                        autoplay: true,
                        controls: false,
                        className: ""
                      })}
                    `
                  )
                  .join("")}
              </div>
            </div>
            <div class="compare-row">
              <div class="compare-label is-accent">Reality</div>
              <div class="compare-grid">
                ${section.compare.reality
                  .map(
                    (src) => `
                      ${renderVideo({ src: src, poster: "", title: "Reality frame" }, {
                        autoplay: true,
                        controls: false,
                        className: ""
                      })}
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderModelAdvantage(section) {
  return `
    <section class="section" id="about">
      <div class="section-shell">
        ${renderSectionHeader(section.title, section.description)}
        <div class="tabs reveal">
          ${section.tabs
            .map(
              (tab, index) => `
                <button
                  class="tab-trigger ${index === 0 ? "is-active" : ""}"
                  type="button"
                  data-tab-trigger
                  data-tab-group="model"
                  data-tab-target="${tab.key}"
                >
                  ${tab.label}
                </button>
              `
            )
            .join("")}
        </div>
        ${section.tabs
          .map(
            (tab, index) => `
              <section
                class="tab-panel"
                data-tab-panel="model"
                data-tab-key="${tab.key}"
                ${index === 0 ? "" : "hidden"}
              >
                ${tab.key === "memory" ? renderMemoryPanel(tab) : renderFewShotPanel(tab)}
              </section>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderMemoryPanel(tab) {
  return `
    <div class="memory-layout">
      <article class="card memory-block reveal">
        ${tab.paragraphs.map((text) => `<p>${text}</p>`).join("")}
        <div class="state-sequence">
          ${tab.sequence
            .map(
              (item, index) => `
                ${index > 0 ? '<span class="state-arrow">→</span>' : ""}
                <span class="state-chip" style="background:${item.color};">${item.value}</span>
              `
            )
            .join("")}
        </div>
        <h3 class="section-subtitle">${tab.calloutTitle}</h3>
        <p>${tab.calloutBody}</p>
        <div class="comparison-grid two-col">
          ${tab.comparisons
            .map((item) => renderComparisonCard(item, "Cyclic State Comparison"))
            .join("")}
        </div>
      </article>
      <article class="card memory-block reveal">
        <h3 class="section-subtitle">${tab.secondTitle}</h3>
        <p>${tab.secondBody}</p>
        <div class="comparison-grid two-col">
          ${tab.secondComparisons
            .map((item) => renderComparisonCard(item, "Counting Task Comparison"))
            .join("")}
        </div>
      </article>
    </div>
  `;
}

function renderFewShotPanel(tab) {
  return `
    <div class="memory-layout">
      <article class="card memory-block reveal">
        ${tab.paragraphs.map((text) => `<p>${text}</p>`).join("")}
      </article>
      <div class="chart-grid two-col">
        ${tab.charts.map((chart) => renderChartCard(chart, true)).join("")}
      </div>
    </div>
  `;
}

function renderCustomization(section) {
  return `
    <section class="section" id="customize">
      <div class="section-shell">
        ${renderSectionHeader(section.title, "These entry points are enough to quickly turn the template into your own project website.")}
        <div class="custom-grid">
          ${section.items
            .map(
              (item) => `
                <article class="card custom-card reveal">
                  <h3>${item.title}</h3>
                  <p>${highlightCode(item.body)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderFooter(config) {
  return `
    <footer class="footer" id="jd">
      <div class="footer-shell">
        <article class="card footer-card">
          <div class="footer-copy">
            <h3>This local template is ready for further customization</h3>
            <p>${config.meta.footerNote}</p>
          </div>
          <div class="footer-actions">
            <a class="btn btn-primary" href="#hero">Back to Top</a>
            <a class="btn btn-secondary" href="./README.md">View Editing Notes</a>
          </div>
        </article>
      </div>
    </footer>
  `;
}

function renderSectionHeader(title, description, options = {}) {
  const className = `section-header reveal ${options.centered ? "is-centered" : ""}`.trim();

  return `
    <div class="${className}">
      <h2 class="section-title">${title}</h2>
      ${description ? `<p class="section-description">${description}</p>` : ""}
    </div>
  `;
}

function renderBenchmarkSvg(chart) {
  const width = chart.viewportWidth || 1280;
  const height = chart.viewportHeight || (chart.groups?.length ? 760 : 640);
  const categoryPalettes = chart.series.map((series) =>
    resolveBenchmarkCategoryPalette(chart, series)
  );
  const yMin = Number.isFinite(Number(chart.yMin)) ? Number(chart.yMin) : 0;
  const yMax = Number.isFinite(Number(chart.yMax)) ? Number(chart.yMax) : 100;
  const yRange = Math.max(1, yMax - yMin);
  const margin = {
    top: chart.groups?.length ? 90 : 44,
    right: 36,
    bottom: chart.labelAngle ? 170 : 114,
    left: 118
  };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const groupWidth = plotWidth / chart.categories.length;
  const barGroupWidth = Math.min(
    groupWidth * (chart.barGroupScale || 0.56),
    chart.maxBarGroupWidth || 106
  );
  const barGapRatio = chart.barGapRatio || 0.18;
  const seriesCount = chart.series.length;
  const barGap = seriesCount > 1 ? (barGroupWidth * barGapRatio) / (seriesCount - 1) : 0;
  const barWidth = (barGroupWidth - barGap * (seriesCount - 1)) / seriesCount;
  const plotBottom = margin.top + plotHeight;
  const plotRight = margin.left + plotWidth;
  const yScale = (value) => plotBottom - ((value - yMin) / yRange) * plotHeight;
  const labelY = plotBottom + (chart.labelAngle ? 40 : 28);
  const legendY = height - 34;
  const legendGap = chart.series.length === 3 ? 260 : 230;
  const patternDefs = chart.series
    .map((series, seriesIndex) => {
      if (series.type !== "pattern") {
        return "";
      }

      return `
        <pattern
          id="benchmark-pattern-${chart.key}-${seriesIndex}"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="10" height="10" fill="#ffffff"></rect>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="${series.borderColor || "#7a7a7a"}"
            stroke-width="3"
          ></line>
        </pattern>
      `;
    })
    .join("");

  const grids = chart.yTicks
    .map((tick) => {
      const y = yScale(tick);

      return `
        <line
          x1="${margin.left}"
          y1="${y}"
          x2="${plotRight}"
          y2="${y}"
          class="benchmark-grid-line"
        ></line>
        <text
          x="${margin.left - 18}"
          y="${y + 6}"
          class="benchmark-axis-value"
          text-anchor="end"
        >${formatBenchmarkAxisLabel(tick, chart)}</text>
      `;
    })
    .join("");

  const bars = chart.categories
    .map((category, categoryIndex) => {
      const centerX = margin.left + groupWidth * (categoryIndex + 0.5);
      const groupStartX = centerX - barGroupWidth / 2;
      const categoryLabel = chart.labelAngle
        ? `
          <text
            x="${centerX}"
            y="${labelY}"
            class="benchmark-category-label is-angled"
            text-anchor="end"
            transform="rotate(${chart.labelAngle} ${centerX} ${labelY})"
          >${escapeText(category)}</text>
        `
        : `
          <text
            x="${centerX}"
            y="${labelY}"
            class="benchmark-category-label"
            text-anchor="middle"
          >${escapeText(category)}</text>
        `;

      const groupBars = chart.series
        .map((series, seriesIndex) => {
          const value = series.values[categoryIndex];
          const x = groupStartX + seriesIndex * (barWidth + barGap);
          const safeValue = Math.max(yMin, Number(value));
          const y = yScale(safeValue);
          const barHeight = plotBottom - y;
          const resolvedColor =
            categoryPalettes[seriesIndex]?.[categoryIndex] || series.color;
          const fill =
            series.type === "pattern"
              ? `url(#benchmark-pattern-${chart.key}-${seriesIndex})`
              : resolvedColor;
          const stroke = series.borderColor || (series.type === "pattern" ? "#7a7a7a" : "none");
          const fillOpacity = series.opacity ?? 1;

          return `
            <rect
              x="${x}"
              y="${y}"
              width="${barWidth}"
              height="${barHeight}"
              rx="2"
              fill="${fill}"
              stroke="${stroke}"
              stroke-width="${series.type === "pattern" ? 1.5 : 0}"
              fill-opacity="${fillOpacity}"
            ></rect>
            <text
              x="${x + barWidth / 2}"
              y="${y - 10}"
              class="benchmark-bar-value"
              text-anchor="middle"
            >${formatBenchmarkValue(value, chart.valueFormat)}</text>
          `;
        })
        .join("");

      return `
        <g>
          ${groupBars}
          ${categoryLabel}
        </g>
      `;
    })
    .join("");

  const separator = Number.isInteger(chart.separatorBeforeIndex)
    ? `
      <line
        x1="${margin.left + groupWidth * chart.separatorBeforeIndex}"
        y1="${margin.top - 10}"
        x2="${margin.left + groupWidth * chart.separatorBeforeIndex}"
        y2="${plotBottom + 18}"
        class="benchmark-separator-line"
      ></line>
    `
    : "";

  const groups = (chart.groups || [])
    .map((group) => {
      const startX = margin.left + groupWidth * group.start + groupWidth * 0.08;
      const endX = margin.left + groupWidth * (group.end + 1) - groupWidth * 0.08;
      const y = margin.top - 28;
      const labelX = (startX + endX) / 2;

      return `
        <g>
          <line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" class="benchmark-group-line"></line>
          <line x1="${startX}" y1="${y}" x2="${startX}" y2="${y + 8}" class="benchmark-group-line"></line>
          <line x1="${endX}" y1="${y}" x2="${endX}" y2="${y + 8}" class="benchmark-group-line"></line>
          <text x="${labelX}" y="${y - 12}" class="benchmark-group-label" text-anchor="middle">
            ${escapeText(group.label)}
          </text>
        </g>
      `;
    })
    .join("");

  const legend = chart.series
    .map((series, seriesIndex) => {
      const x = width / 2 - ((chart.series.length - 1) * legendGap) / 2 + seriesIndex * legendGap;
      const legendFill =
        series.legendColor || series.rankBaseColor || chart.categoryRankBaseColor || series.color;
      const fill =
        series.type === "pattern"
          ? `url(#benchmark-pattern-${chart.key}-${seriesIndex})`
          : legendFill;
      const stroke = series.borderColor || (series.type === "pattern" ? "#7a7a7a" : "none");
      const fillOpacity = series.legendOpacity ?? series.opacity ?? 1;

      return `
        <g transform="translate(${x}, ${legendY})">
          <rect
            x="0"
            y="-12"
            width="32"
            height="16"
            rx="2"
            fill="${fill}"
            stroke="${stroke}"
            stroke-width="${series.type === "pattern" ? 1.5 : 0}"
            fill-opacity="${fillOpacity}"
          ></rect>
          <text x="48" y="0" class="benchmark-legend-label">${escapeText(series.name)}</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg
      class="benchmark-svg"
      viewBox="0 0 ${width} ${height}"
      role="img"
      aria-label="${escapeText(chart.caption || chart.yLabel)}"
    >
      <defs>${patternDefs}</defs>
      ${grids}
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${plotBottom}" class="benchmark-axis-line"></line>
      <line x1="${margin.left}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" class="benchmark-axis-line"></line>
      ${separator}
      ${groups}
      ${bars}
      <text
        x="34"
        y="${margin.top + plotHeight / 2}"
        class="benchmark-y-label"
        text-anchor="middle"
        transform="rotate(-90 34 ${margin.top + plotHeight / 2})"
      >${escapeText(chart.yLabel)}</text>
      ${legend}
    </svg>
  `;
}

function formatBenchmarkAxisLabel(value, chart) {
  if (chart.valueFormat === "decimal") {
    return Number(value).toFixed(1);
  }

  return `${value}`;
}

function formatBenchmarkValue(value, format) {
  if (format === "decimal" || format === "decimal2") {
    return Number(value).toFixed(2);
  }

  if (format === "decimal1") {
    return Number(value).toFixed(1);
  }

  return `${Math.round(Number(value))}`;
}

function resolveBenchmarkCategoryPalette(chart, series) {
  if (Array.isArray(chart.categoryColors) && chart.categoryColors.length) {
    return chart.categoryColors;
  }

  if (!chart.rankCategoriesByValue) {
    return [];
  }

  const baseColor = series?.rankBaseColor || chart.categoryRankBaseColor || series?.color || "#c0392b";
  const minStrength = chart.categoryRankMinStrength ?? 0.35;
  const maxStrength = chart.categoryRankMaxStrength ?? 1;
  const scores = chart.categories.map((_, categoryIndex) => {
    const values = chart.rankColorsByAllSeries
      ? chart.series
          .map((item) => Number(item.values[categoryIndex]))
          .filter((value) => Number.isFinite(value))
      : [Number(series?.values?.[categoryIndex])].filter((value) => Number.isFinite(value));

    if (!values.length) {
      return Number.NEGATIVE_INFINITY;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  });

  const rankedIndexes = scores
    .map((score, index) => ({ score, index }))
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.index);
  const palette = new Array(chart.categories.length).fill(baseColor);

  rankedIndexes.forEach((categoryIndex, rankIndex) => {
    const progress =
      rankedIndexes.length === 1 ? 1 : 1 - rankIndex / (rankedIndexes.length - 1);
    const strength = minStrength + (maxStrength - minStrength) * progress;
    palette[categoryIndex] = mixHexWithWhite(baseColor, strength);
  });

  return palette;
}

function mixHexWithWhite(hexColor, strength) {
  const color = normalizeHexColor(hexColor);

  if (!color) {
    return hexColor;
  }

  const clampedStrength = Math.max(0, Math.min(1, strength));
  const mixChannel = (channel) =>
    Math.round(255 - (255 - channel) * clampedStrength)
      .toString(16)
      .padStart(2, "0");

  return `#${mixChannel(color.r)}${mixChannel(color.g)}${mixChannel(color.b)}`;
}

function normalizeHexColor(hexColor) {
  const value = String(hexColor || "").trim().replace("#", "");

  if (value.length === 3) {
    const [r, g, b] = value.split("");
    return {
      r: parseInt(r + r, 16),
      g: parseInt(g + g, 16),
      b: parseInt(b + b, 16)
    };
  }

  if (value.length === 6) {
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16)
    };
  }

  return null;
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderComparisonCard(item, title) {
  return `
    <article class="card comparison-card ${item.accent ? "is-accent" : "is-muted"}">
      <div class="comparison-label ${item.accent ? "is-accent" : "is-soft"}">${item.label}</div>
      <h3>${title}</h3>
      <div class="media-frame">
        ${renderVideo(item.video, {
          autoplay: true,
          controls: true,
          className: ""
        })}
      </div>
    </article>
  `;
}

function renderChartCard(chart, options = {}) {
  const resolved =
    typeof options === "boolean"
      ? { reveal: options, bare: false }
      : { reveal: true, bare: false, ...options };
  const className = [
    "card",
    "chart-card",
    resolved.reveal ? "reveal" : "",
    resolved.bare ? "chart-card-bare" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <article class="${className}">
      <div class="chart-card-head">
        <h3>${chart.title}</h3>
        ${chart.caption ? `<p>${chart.caption}</p>` : ""}
      </div>
      <div class="legend">
        ${chart.series
          .map(
            (series) => `
              <span class="legend-item" style="--legend-color:${series.color};">
                ${series.name}
              </span>
            `
          )
          .join("")}
      </div>
      <div class="chart-groups">
        ${chart.categories
          .map(
            (category, index) => `
              <div class="chart-group">
                <div class="chart-group-title">${category}</div>
                <div class="chart-bar-stack">
                  ${chart.series
                    .map((series) => {
                      const value = series.values[index];
                      const width = Math.max(6, (value / chart.max) * 100);

                      return `
                        <div class="chart-bar-row">
                          <span class="chart-series-name">${series.name}</span>
                          <span class="chart-track">
                            <span class="chart-fill" style="--fill:${series.color};width:${width}%"></span>
                          </span>
                          <span class="chart-value">${value}%</span>
                        </div>
                      `;
                    })
                    .join("")}
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderVideo(video, options) {
  const autoplay = options.autoplay ? "autoplay" : "";
  const controls = options.controls ? "controls" : "";
  const id = options.id ? `id="${options.id}"` : "";
  const poster = video.poster ? `poster="${video.poster}"` : "";
  const title = video.title || "";

  return `
    <video
      ${id}
      ${poster}
      ${autoplay}
      ${controls}
      muted
      loop
      playsinline
      preload="metadata"
      aria-label="${title}"
      class="${options.className || ""}"
    >
      <source src="${video.src}" />
    </video>
  `;
}

function bindShowcase() {
  const buttons = Array.from(document.querySelectorAll("[data-showcase-button]"));
  const player = document.getElementById("showcase-player");
  const title = document.getElementById("showcase-title");
  const caption = document.getElementById("showcase-caption");
  const group = document.getElementById("showcase-group-label");

  if (!buttons.length || !player) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      const src = button.getAttribute("data-src");
      const poster = button.getAttribute("data-poster");

      if (src) {
        player.src = src;
      }

      if (poster) {
        player.poster = poster;
      }

      if (title) {
        title.textContent = button.getAttribute("data-title") || "";
      }

      if (caption) {
        caption.textContent = button.getAttribute("data-caption") || "";
      }

      if (group) {
        group.textContent = button.getAttribute("data-group") || "";
      }

      player.load();
      player.play().catch(function () {
        return null;
      });
    });
  });
}

function bindTabs() {
  const triggers = Array.from(document.querySelectorAll("[data-tab-trigger]"));

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const group = trigger.getAttribute("data-tab-group");
      const target = trigger.getAttribute("data-tab-target");

      document
        .querySelectorAll(`[data-tab-trigger][data-tab-group="${group}"]`)
        .forEach((item) => item.classList.remove("is-active"));

      document
        .querySelectorAll(`[data-tab-panel="${group}"]`)
        .forEach((panel) => {
          panel.hidden = panel.getAttribute("data-tab-key") !== target;
        });

      trigger.classList.add("is-active");
    });
  });
}

function bindHeaderState() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const update = function () {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function bindPointerBackdrop() {
  const backdrop = document.querySelector(".site-backdrop");

  if (!backdrop) {
    return;
  }

  const style = document.documentElement.style;
  const prefersReducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;
  const supportsFinePointer = window.matchMedia
    ? window.matchMedia("(pointer: fine)")
    : null;
  const state = {
    x: window.innerWidth * 0.36,
    y: Math.min(window.innerHeight * 0.26, 260),
    targetX: window.innerWidth * 0.36,
    targetY: Math.min(window.innerHeight * 0.26, 260),
    frameId: 0
  };

  const clamp = (value, max) => Math.max(0, Math.min(max, value));

  const paint = (x, y) => {
    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);
    const safeX = clamp(x, width);
    const safeY = clamp(y, height);

    style.setProperty("--pointer-x-px", `${safeX}px`);
    style.setProperty("--pointer-y-px", `${safeY}px`);
    style.setProperty("--pointer-x", `${(safeX / width) * 100}%`);
    style.setProperty("--pointer-y", `${(safeY / height) * 100}%`);
  };

  const tick = () => {
    const ease = prefersReducedMotion?.matches ? 1 : 0.14;

    state.x += (state.targetX - state.x) * ease;
    state.y += (state.targetY - state.y) * ease;
    paint(state.x, state.y);

    if (Math.abs(state.targetX - state.x) > 0.5 || Math.abs(state.targetY - state.y) > 0.5) {
      state.frameId = window.requestAnimationFrame(tick);
      return;
    }

    state.x = state.targetX;
    state.y = state.targetY;
    paint(state.x, state.y);
    state.frameId = 0;
  };

  const requestTick = () => {
    if (!state.frameId) {
      state.frameId = window.requestAnimationFrame(tick);
    }
  };

  const setTarget = (x, y) => {
    state.targetX = x;
    state.targetY = y;
    requestTick();
  };

  const resetTarget = () => {
    setTarget(window.innerWidth * 0.36, Math.min(window.innerHeight * 0.26, 260));
  };

  paint(state.x, state.y);
  resetTarget();

  if (!supportsFinePointer || supportsFinePointer.matches) {
    window.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType === "touch") {
          return;
        }

        setTarget(event.clientX, event.clientY);
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", resetTarget);
  }

  window.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches?.[0];

      if (!touch) {
        return;
      }

      setTarget(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      state.x = clamp(state.x, window.innerWidth);
      state.y = clamp(state.y, window.innerHeight);
      state.targetX = clamp(state.targetX, window.innerWidth);
      state.targetY = clamp(state.targetY, window.innerHeight);
      paint(state.x, state.y);
    },
    { passive: true }
  );
}

function bindReveal() {
  const elements = Array.from(document.querySelectorAll(".reveal"));

  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function highlightCode(text) {
  return text.replace(/`([^`]+)`/g, "<code>$1</code>");
}
