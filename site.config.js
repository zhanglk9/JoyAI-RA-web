window.SITE_CONFIG = {
  meta: {
    title: "JoyAI-RA",
    description:
      "A locally editable project showcase template rebuilt from the reference site structure, ready to be adapted into your own project website.",
    footerNote:
      "This template currently references public asset URLs from the reference site. Before publishing, replace them with your own copy, videos, posters, charts, and external links."
  },
  brand: {
    name: "JoyAI-RA",
    logo: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/logo.f0f088d3.png",
    tagline: "Local Rebuild Template"
  },
  header: {
    navGap: "66px"
  },
  navigation: [
    { label: "Homepage", href: "https://jdai.jd.com/portal" },
    { label: "Technology", href: "", active: true },
    { label: "Join JoyAI", href: "https://zhaopin.jd.com/home" }
  ],
  hero: {
    eyebrow: "",
    title: "JoyAI-RA 0.1",
    titleImage: {
      src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/logo2.png",
      alt: "JoyAI-RA 0.1"
    },
    subtitle: "A VLA Foundation Model for Robotic Autonomy",
    videoDescription:
      "We propose JoyAI-RA, a vision-language-action (VLA) embodied foundation model tailored for generalizable robotic manipulation. JoyAI-RA presents a multi-source multi-level pretraining framework that integrates web data, large-scale egocentric human videos, simulation-generated trajectories, and real-robot data. Through training on heterogeneous multi-source data with explicit action-space unification, JoyAI-RA effectively bridges embodiment gaps, particularly between human manipulation and robotic control, thereby enhancing cross-embodiment behavior learning. JoyAI-RA outperforms state-of-the-art methods in both simulation and real-world benchmarks, especially on diverse tasks with generalization demands.",
    points: [
    ],
    highlights: [
    ],
    actions: [
      {
        label: "Tech Report",
        href: "",
        kind: "primary"
      },
      {
        label: "Code",
        href: "",
        kind: "secondary"
      },
      {
        label: "Hugging Face",
        href: "",
        kind: "secondary"
      },
      {
        label: "ModelScope",
        href: "",
        kind: "secondary"
      }
    ],
    video: {
      src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/image.png",
      type: "image",
      poster: "",
      title: "JoyAI-RA Hero",
      description:
        "We propose JoyAI-RA, a vision-language-action (VLA) embodied foundation model tailored for generalizable robotic manipulation."
    }
  },
  technologyBlocks: {
    blocks: [
      {
        id: "dataset",
        title: "Dataset",
        description:
          "We organize our training datasets of JoyAI-RA from four data sources, and the distribution analysis of pretraining data is : (a) Composition of pretraining data, including cross-embodiment, simulation, human, and web sources. (b) Robot dataset statistics, showing distributions of subtasks and manipulation skills. (c) Human dataset task distribution across diverse domains, totaling over 10k tasks. (d) Human dataset statistics of action types and object categories.",
        image: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/image2.png",
        alt: "Dataset placeholder"
      },
      {
        id: "model-architecture",
        title: "Model Architecture",
        description:
          "JoyAI-RA adopts a modular design that decouples visual-language understanding from action generation via a Vision-Language Model (VLM) and a perception-action expert. Given multi-view observations and language inputs, the VLM produces spatially grounded multimodal representations that encode both semantic and geometric context. These representations are provided as contextual inputs to the perception-action expert, which predicts temporally consistent continuous actions.",
        image: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/image3.png",
        alt: "Model Architecture placeholder"
      }
    ]
  },
  realWorldBenchmark: {
    title: "Real-World AgiBot Benchmark",
    description:
      "The main results on the real-world AgiBot benchmark are shown below. Compared with the <em>&pi;<sub>0.5</sub></em>, JoyAI-RA achieves stronger overall real-robot performance, improving the average score from 0.62 to <strong>0.74</strong>.",
    chart: { 
      key: "real-world",
      yLabel: "Average Success Rate of Subtasks",
      yMax: 1.1,
      yTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      valueFormat: "decimal",
      labelAngle: 0,
      separatorBeforeIndex: 6,
      categories: [
        "Headphones",
        "Mouse",
        "Cup",
        "Croissant",
        "Food Scraps",
        "Remedy",
        "Average"
      ],
      series: [
        {
          name: "π0.5",
          type: "pattern",
          color: "#ffffff",
          borderColor: "#7a7a7a",
          values: [0.4, 0.55, 0.75, 0.82, 0.45, 0.78, 0.62]
        },
        {
          name: "JoyAI-RA 0.1 w/o Egolive",
          color: "#73acd1",
          values: [0.6, 0.8, 0.55, 0.48, 0.2, 0.73, 0.56]
        },
        {
          name: "JoyAI-RA 0.1",
          color: "#c0392b",
          values: [0.95, 0.8, 0.65, 0.64, 0.48, 0.93, 0.74]
        }
      ],
      captionIndex: "",
      caption: "Main Evaluation Results on Real-World AgiBot Benchmark."
    }
  },
  egoliveAblation: {
    title: "Effectiveness Analysis of EgoLive Data",
    description:
      "We evaluate the effect of our human egocentric video dataset, EgoLive, on both simulation and real-world benchmarks. As shown below, pretraining with the full EgoLive and JDAgibot datasets achieves the strongest overall result on RoboTwin 2.0, reaching an average success rate of 87.4%, outperforming both training from scratch and robot-only pretraining. We further evaluate the effectiveness of EgoLive on the AgiBot G1 platform, where incorporating human egocentric data consistently improves the real-robot performance of JoyAI-RA, increasing the average score from 0.56 to <strong>0.74</strong>. Please refer to our technical report for more experimental analysis.",
    tabs: [
      {
        key: "robotwin",
        label: "RoboTwin 2.0",
        intro:
          "Performance comparison of representative tasks between JDAgibot Only and EgoLive(Full)+JDAgibot on the RoboTwin 2.0 benchmark.",
        figures: [
          {
            key: "egolive-ablation-robotwin",
            yLabel: "Success Rate (%)",
            yMax: 120,
            yTicks: [0, 20, 40, 60, 80, 100, 120],
            valueFormat: "integer",
            labelAngle: -28,
            separatorBeforeIndex: 10,
            categories: [
              "Stack Blocks 3",
              "Stack Bowls 3",
              "Blocks Ranking",
              "Stack Blocks 2",
              "Stack Bowls 2",
              "Open Microwave",
              "Put Obj. Cabinet",
              "Place Mouse Pad",
              "Place Cans",
              "Place Fan",
              "Average"
            ],
            groups: [
              { label: "Spatial & Stacking", start: 0, end: 4 },
              { label: "Complex Interaction", start: 5, end: 6 },
              { label: "Fine-grained Placement", start: 7, end: 9 }
            ],
            series: [
              {
                name: "JDAgibot Only",
                color: "#73acd1",
                values: [28, 29, 68, 81, 70, 44, 83, 65, 82, 87, 64]
              },
              {
                name: "EgoLive(Full)+JDAgibot",
                color: "#c0392b",
                values: [89, 89, 99, 99, 94, 100, 93, 87, 99, 94, 94]
              }
            ],
            caption:
              "Performance comparison of representative tasks between JDAgibot Only and EgoLive(Full)+JDAgibot on the RoboTwin 2.0 benchmark."
          }
        ]
      },
      {
        key: "real-world",
        label: "Real-World",
        intro:
          "Ablation result on the AgiBot benchmark with and without in-domain EgoLive.",
        figures: [
          {
            key: "egolive-ablation-real-world",
            yLabel: "Average Success Rate of Subtasks",
            yMax: 1.15,
            yTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
            valueFormat: "decimal",
            labelAngle: 0,
            separatorBeforeIndex: 6,
            categories: [
              "Headphones",
              "Mouse",
              "Cup",
              "Croissant",
              "Food Scraps",
              "Remedy",
              "Average"
            ],
            series: [
              {
                name: "w/o In-Domain",
                color: "#73acd1",
                values: [0.55, 0.75, 0.4, 0.1, 0.47, 0.55, 0.47]
              },
              {
                name: "w In-Domain",
                color: "#c0392b",
                values: [0.8, 0.6, 0.55, 0.2, 0.17, 0.83, 0.53]
              }
            ],
            caption:
              "Ablation result on the AgiBot benchmark with and without in-domain EgoLive."
          }
        ]
      }
    ]
  },
  videos: {
    title: "Videos",
    description:
      "Click different tasks to switch views. For each task, we visualize the head and left views side by side.",
    items: [
      {
        key: "Kitchen",
        label: "Kitchen",
        intro: "Visualization of the head and left views for the kitchen task.",
        views: [
          {
            label: "Head View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/kitchen/head.mp4",
              poster: "",
              title: "Kitchen head view"
            }
          },
          {
            label: "Left View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/kitchen/left.mp4",
              poster: "",
              title: "Kitchen left view"
            }
          }
        ]
      },
      {
        key: "Dinner-table-clean",
        label: "Dinner Table Clean",
        intro: "Visualization of the head and left views for the dinner-table-cleaning task.",
        views: [
          {
            label: "Head View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/dinner/head.mp4",
              poster: "",
              title: "Dinner table clean head view"
            }
          },
          {
            label: "Left View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/dinner/left.mp4",
              poster: "",
              title: "Dinner table clean left view"
            }
          }
        ]
      },
      {
        key: "Pharmacy",
        label: "Pharmacy",
        intro: "Visualization of the head and left views for the pharmacy-scene task.",
        views: [
          {
            label: "Head View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/pharmacy/head.mp4",
              poster: "",
              title: "Pharmacy head view"
            }
          },
          {
            label: "Left View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/pharmacy/left.mp4",
              poster: "",
              title: "Pharmacy left view"
            }
          }
        ]
      },
      {
        key: "headphones",
        label: "Headphones",
        intro: "Visualization of the head and left views for the headphones task.",
        views: [
          {
            label: "Head View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/headphone/head.mp4",
              poster: "",
              title: "Headphones head view"
            }
          },
          {
            label: "Left View",
            video: {
              src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/real-demo/headphone/left.mp4",
              poster: "",
              title: "Headphones left view"
            }
          }
        ]
      },
    ]
  },
  moreIntelligence: {
    title: "More Data, More Intelligence",
    description:
      "More data, more intelligence, coming from the scene and returning to the scene: The Scene-Driven Flywheel.",
    media: {
      src: "https://joyra.s3.cn-north-1.jdcloud-oss.com/assets/demo-2k.mov",
      poster: "",
      title: "More Data, More Intelligence"
    }
  },
  // citation: {
  //   title: "Citation",
  //   description: "If you find our work helpful, please cite us:",
  //   href: "https://www.overleaf.com/project/69b154c54b66348d5d75b0dc",
  //   linkLabel: "https://www.overleaf.com/project/69b154c54b66348d5d75b0dc"
  // },
  simulation: {
    title: "Simulation Benchmark",
    description:
      "We evaluate JoyAI-RA on simulation benchmarks including RoboTwin 2.0 and Robocasa GR1 Tabletop Tasks. In RoboTwin 2.0, JoyAI-RA consistently outperforms all strong baselines under both the Easy and Hard settings, achieving average success rates of 90.48% and 89.28%. On RoboCasa GR1 Tabletop tasks, JoyAI-RA achieves a new state-of-the-art average success rate of 63.2%, outperforming all prior methods by a clear margin",
    tabs: [
      {
        key: "robotwin",
        label: "RoboTwin 2.0",
        intro:
          "Based on the Easy / Hard results in the RoboTwin 2.0 table, JoyAI-RA achieves the best performance under both settings.",
        figures: [
          {
            key: "robotwin-benchmark",
            viewportWidth: 1280,
            barGroupScale: 0.8,
            maxBarGroupWidth: 132,
            barGapRatio: 0.06,
            rankCategoriesByValue: true,
            categoryRankBaseColor: "#c0392b",
            categoryRankMinStrength: 0.32,
            yMin: 40,
            yLabel: "Success Rate (%)",
            yMax: 100,
            yTicks: [40, 60, 80, 100],
            valueFormat: "decimal2",
            labelAngle: -16,
            categories: ["π0", "π0.5", "Motus", "LingBot-VLA", "JoyAI-RA"],
            series: [
              {
                name: "Easy",
                color: "#73acd1",
                rankBaseColor: "#73acd1",
                legendColor: "#73acd1",
                opacity: 0.72,
                legendOpacity: 0.72,
                values: [65.92, 82.74, 88.66, 88.56, 90.48]
              },
              {
                name: "Hard",
                color: "#c0392b",
                rankBaseColor: "#c0392b",
                legendColor: "#c0392b",
                values: [58.4, 76.76, 87.02, 86.68, 89.28]
              }
            ]
          }
        ]
      },
      {
        key: "robocasa",
        label: "Robocasa",
        intro:
          "Based on th Robocasa benchmark, JoyAI-RA achieves a new state-of-the-art average success rate.",
        figures: [
          {
            key: "robocasa-benchmark",
            maxBarGroupWidth: 92,
            rankCategoriesByValue: true,
            categoryRankBaseColor: "#c0392b",
            categoryRankMinStrength: 0.32,
            yMin: 20,
            yLabel: "Success Rate (%)",
            yMax: 70,
            yTicks: [20, 40, 60],
            valueFormat: "decimal1",
            labelAngle: -22,
            categories: [
              "GR00T-N1.6",
              "Qwen3PI",
              "TwinBrainVLA",
              "DualCoT-VLA",
              "ABot-M0",
              "JoyAI-RA"
            ],
            series: [
              {
                name: "Success Rate",
                color: "#c0392b",
                values: [47.6, 43.9, 54.6, 55.1, 58.3, 63.2]
              }
            ]
          }
        ]
      }
    ]
  },
  modelAdvantage: {
    title: "About JoyAI-RA",
    description:
      "We observe unique advantages of autoregressive video models, especially in long-term memory and few-shot adaptation. This is why we believe video models can provide a new and independent foundation for robot learning.",
    tabs: [
      {
        key: "memory",
        label: "Long-term Memory",
        caption: "Remember Longer, Act Better",
        paragraphs: [
          "We use a simple setup to clearly test whether the model truly possesses memory. In this task, the model must make decisions in a sequence containing repeated states. If it only relies on the current observation without memory, it can easily be confused by repeated states and lose track of its position in the sequence.",
          "For example, in the state sequence A → B → A → C, a memoryless model cannot tell whether it is seeing state A for the first or second time. It therefore learns P(next|A)=0.5, leading to incorrect transitions or loops. In contrast, a model with access to the full history can distinguish the context and produce the correct action."
        ],
        sequence: [
          { value: "A", color: "#555FFF" },
          { value: "B", color: "#55BEFF" },
          { value: "A", color: "#555FFF" },
          { value: "C", color: "#3ED180" }
        ],
        calloutTitle: "Cyclic States",
        calloutBody:
          "In the task of opening the box on the right, closing it, and then opening the one on the left, the visual state of the right box looks very similar before opening and after closing. A memoryless policy is repeatedly misled by these repeated states, while a model with historical context can reliably move through them.",
        comparisons: [
          {
            label: "π0.5",
            accent: false,
            video: {
              src: "https://gw.alipayobjects.com/v/huamei_u94ywh/afts/video/okbtRLM1Gc4AAAAAgDAAAAgADkxfAQFr",
              poster:
                "https://mdn.alipayobjects.com/huamei_u94ywh/afts/img/Z59pQIic9KQAAAAAdSAAAAgADkxfAQFr"
            }
          },
          {
            label: "Our Method",
            accent: true,
            video: {
              src: "https://gw.alipayobjects.com/v/huamei_u94ywh/afts/video/DQNWSrxdVLUAAAAAgCAAAAgADkxfAQFr",
              poster:
                "https://mdn.alipayobjects.com/huamei_u94ywh/afts/img/H3sISLdRqXcAAAAAdIAAAAgADkxfAQFr"
            }
          }
        ],
        secondTitle: "Counting",
        secondBody:
          "In a task that requires wiping back and forth for six rounds, visually similar states repeatedly appear, so the model must keep track of how many actions have already been executed. Without memory, the policy easily becomes random midway through; with memory, the model can consistently finish all repetitions.",
        secondComparisons: [
          {
            label: "π0.5",
            accent: false,
            video: {
              src: "https://gw.alipayobjects.com/v/huamei_u94ywh/afts/video/CDeDT5DnC7AAAAAAWBAAAAgADkxfAQFr",
              poster: ""
            }
          },
          {
            label: "Our Method",
            accent: true,
            video: {
              src: "https://gw.alipayobjects.com/v/huamei_u94ywh/afts/video/sm-fSI_wcD4AAAAAeWAAAAgADkxfAQFr",
              poster:
                "https://mdn.alipayobjects.com/huamei_u94ywh/afts/img/SQY0QaeSsQ8AAAAAaPAAAAgADkxfAQFr"
            }
          }
        ]
      },
      {
        key: "fewshot",
        label: "Few-shot Adaptation",
        caption: "Rapid Learning",
        paragraphs: [
          "Video models are highly data-efficient when adapting to new tasks. With only a few demonstrations, the model can quickly adjust its predictions to match the desired behavior. This few-shot ability significantly reduces the amount of data needed to teach robots new skills, making deployment in new environments and tasks easier."
        ],
        charts: [
          {
            title: "Robotwin Few-shot",
            max: 100,
            categories: ["5-shot", "10-shot", "25-shot", "50-shot"],
            series: [
              {
                name: "LingBot-VA",
                color: "#555FFF",
                values: [46.6, 58.2, 74.2, 84.6]
              },
              {
                name: "π0.5",
                color: "#A8ADFF",
                values: [36.3, 50.7, 70.5, 81.2]
              }
            ]
          },
          {
            title: "Real-World Few-shot",
            max: 100,
            categories: ["10-shot", "25-shot", "50-shot"],
            series: [
              {
                name: "LingBot-VA",
                color: "#555FFF",
                values: [61.1, 81.7, 97]
              },
              {
                name: "π0.5",
                color: "#A8ADFF",
                values: [45.5, 60, 73]
              }
            ]
          }
        ]
      }
    ]
  }
};
