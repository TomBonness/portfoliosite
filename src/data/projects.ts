export type ProjectLink = {
  label: string;
  href: string;
};

/** The one measured figure a project is shown with. */
export type Readout = {
  value: string;
  label: string;
};

/** The picture a project is shown with; each id has a component in `src/components/figures`. */
export type FigureId =
  | "boot-check"
  | "pipeline"
  | "installer"
  | "sources"
  | "week"
  | "tiers"
  | "windows"
  | "dictation"
  | "product"
  | "chipguard"
  | "cloudsprouts";

export type SmallProject = {
  id: string;
  title: string;
  summary: string;
  stack: string;
  links: readonly ProjectLink[];
  /** Shown in place of links when a project has none to offer. */
  note?: string;
  figure?: FigureId;
};

export type Project = SmallProject & {
  readout: Readout;
  /** Folded behind "How it works". */
  details: readonly string[];
  figure: FigureId;
};

export type Chapter = {
  /** Also the name of the chapter's color in `globals.css`. */
  id: "run" | "fast" | "shipped";
  title: string;
  /** What the chapter covers, in a few words, for the index at the top of the page. */
  scope: string;
  intro: string;
  /** One project across the full width, or two side by side. */
  rows: readonly (readonly [Project] | readonly [Project, Project])[];
};

/** A raster image shipped as AVIF and WebP in two widths: `<base>-<width>.<format>`. */
export type ImageAsset = {
  base: string;
  widths: readonly [number, number];
  /** Pixel size of the larger file. */
  width: number;
  height: number;
  alt: string;
};

export const PROFILE = {
  name: "Tom Bonness",
  location: "Austin, Texas",
  github: "https://github.com/TomBonness",
  linkedin: "https://www.linkedin.com/in/bonness/",
  lab: "https://kmrl.org/",
  siteSource: "https://github.com/TomBonness/portfoliosite",
} as const;

export const CHAPTERS: readonly Chapter[] = [
  {
    id: "run",
    title: "Boring to run",
    scope: "Deployments, pipelines and observability",
    intro:
      "Deployments pinned to a hash, pipelines without stored secrets, and tooling that shows what a service is doing",
    rows: [
      [
        {
          id: "deployment-bundle",
          title: "GLM-5.3-Flash deployment bundle",
          summary:
            "A 182 GiB model served from four GPUs, with the image, the checkpoints and all eleven patches pinned by hash and checked before the server starts",
          readout: {
            value: "429 tok/s",
            label: "decode on the production profile",
          },
          stack: "Docker Compose, systemd, SGLang, Python",
          links: [
            { label: "Source", href: "https://github.com/TomBonness/tpopto" },
          ],
          details: [
            "A boot script checks both checkpoints and every patch against the manifest before it starts the server.",
            "Performance changes go in one at a time. A selector switches a single candidate and restarts the service, and the benchmark records which one was active, so a result can’t be credited to the wrong change.",
            "A change stays only if end-to-end decode improves by at least 3%. Draft width 32 was 27% slower than width 8 in a live comparison, so 8 stayed in production.",
            "Staging runs on a CPU instance against retained volumes, so the four GPUs are billed only while they serve.",
          ],
          figure: "boot-check",
        },
      ],
      [
        {
          id: "distributr",
          title: "distributr",
          summary:
            "A serverless news hub on AWS, defined in one CDK app and deployed from GitHub Actions without stored credentials",
          readout: { value: "0", label: "AWS keys stored in CI" },
          stack: "AWS CDK, Lambda, DynamoDB, GitHub Actions",
          links: [
            {
              label: "Source",
              href: "https://github.com/TomBonness/distributr",
            },
          ],
          details: [
            "CI assumes a deploy role over GitHub OIDC. The role trusts only pushes to main, is pinned to the repository’s immutable ID, and can do nothing except assume the CDK bootstrap roles.",
            "Every pull request and push to main runs typecheck, 31 tests and cdk synth. Main then deploys, and the job fails unless /healthz answers.",
            "The stack is three DynamoDB tables with point-in-time recovery, an S3 Vectors index, two ARM Lambdas, a throttled HTTP API and a two-hour ingest schedule.",
            "Spend is capped in code: daily LLM budgets and a per-address submission limit.",
          ],
          figure: "pipeline",
        },
        {
          id: "fast-long-context",
          title: "Fast Long Context",
          summary:
            "One-menu installers that take a Linux machine with an RTX 5090 to a running model server, and pick up where they stopped after any interruption",
          readout: {
            value: "262,144",
            label: "tokens of context, up from about 160K",
          },
          stack: "Bash, Python, CUDA, SGLang",
          links: [],
          note: "Walkthrough on request",
          details: [
            "Each installer pins its runtime and model to exact revisions, builds against its own isolated CUDA toolkit, and checks the SHA-256 and size of every file it downloads.",
            "Updates don’t delete anything. Files that no longer match are moved aside, and the update stops before downloading if the replacement won’t fit on disk.",
            "The first release needed a runtime fix, not a script: a patch to SGLang’s attention backend and a new Triton kernel made the full context fit.",
          ],
          figure: "installer",
        },
      ],
      [
        {
          id: "daish",
          title: "Daish",
          summary:
            "A terminal console that runs model servers as systemd units and shows what the hardware and each server are doing",
          readout: { value: "1 Hz", label: "hardware telemetry" },
          stack: "Python, Textual, systemd, Prometheus, SQLite",
          links: [
            { label: "Source", href: "https://github.com/TomBonness/daish" },
          ],
          details: [
            "Memory, swap, OOM events and CPU for each service come from its unit’s cgroup. GPU figures come from NVML.",
            "It reads the Prometheus endpoints of vLLM, SGLang and llama.cpp. A counter reset or a collection gap sets a fresh baseline instead of a spike or a negative rate.",
            "Start, stop and restart ask first and default to cancel. A second instance finds the first through a file lock and runs read-only.",
          ],
          figure: "sources",
        },
      ],
    ],
  },
  {
    id: "fast",
    title: "Fast",
    scope: "Inference engines in C++ and CUDA",
    intro:
      "Engines for hardware that is always slightly too small, with every speedup measured against the build before it",
    rows: [
      [
        {
          id: "cinference-engine",
          title: "Cinference Engine",
          summary:
            "A C++ and CUDA inference engine, built from NInfer, that serves a 27B model with a 256K-token context from one RTX 5090",
          readout: {
            value: "290 tok/s",
            label: "on coding chats, about 4× llama.cpp on the same GPU",
          },
          stack: "C++, CUDA, CMake, Python",
          links: [
            {
              label: "Product page",
              href: "https://kmrl.org/products/cinference-engine",
            },
          ],
          details: [
            "I rewrote the verification kernels over five passes. Rounds got 17–27% shorter and decode 21–37% faster, and passes two through five are bit-exact.",
            "A pipelined attention kernel took prefill at 131K tokens from 3,827 to 4,575 tokens per second, with output bit-identical to the kernel it replaced.",
            "Each result names its conditions and links a measurement file: alternating builds, paired medians, the commit on each side.",
          ],
          figure: "week",
        },
      ],
      [
        {
          id: "fngine",
          title: "fngine",
          summary:
            "An engine for a model too large for the GPU, which splits the work across VRAM, an AVX-512 CPU tier and NVMe",
          readout: {
            value: "180–210 tok/s",
            label: "decode on one RTX 5090",
          },
          stack: "C++20, CUDA, AVX-512, io_uring",
          links: [],
          note: "Walkthrough on request",
          details: [
            "About half of the model’s 24,576 routed experts sit on the GPU. The rest run on the CPU or stream over PCIe, and placement follows real usage on every decode step.",
            "Speculative decoding checks its drafts exactly, so the output matches plain decoding.",
            "The OpenAI-compatible server runs one request and queues up to eight. Past that it answers 429 instead of stalling.",
            "46 C++ and CUDA tests cover speculative-decoding equivalence, long-context state and real-model generation.",
          ],
          figure: "tiers",
        },
      ],
    ],
  },
  {
    id: "shipped",
    title: "Shipped",
    scope: "Apps, tools and a hardware concept",
    intro: "Software people install, with releases on more than one platform",
    rows: [
      [
        {
          id: "cinmux",
          title: "Cinmux",
          summary:
            "Terminal workspaces for Linux and macOS where every tab is a tmux session, so closing the window never stops a job",
          readout: {
            value: "3",
            label: "front ends: Linux, macOS and a TUI over SSH",
          },
          stack: "C++20, Qt 6, wlroots, Swift, tmux",
          links: [
            { label: "Product page", href: "https://kmrl.org/products/cinmux" },
          ],
          details: [
            "Two native apps on one design: Qt 6 and wlroots in C++20 on Linux, Swift on macOS.",
            "Sessions run on a private tmux server, so the user’s own tmux config is never touched.",
            "A small CLI reports state for each tab (working, needs input, done), so any long-running process can ask for attention.",
            "It installs from Homebrew or a script, and running the installer again updates in place while sessions keep running.",
          ],
          figure: "windows",
        },
      ],
      [
        {
          id: "lavtype",
          title: "Lavtype",
          summary:
            "Push-to-talk dictation in Rust that types into the focused app, with speech recognition kept on the machine",
          readout: {
            value: "3",
            label: "targets built and tested in CI",
          },
          stack: "Rust, sherpa-onnx, GitHub Actions",
          links: [
            {
              label: "Product page",
              href: "https://kmrl.org/products/lavtype",
            },
            { label: "Source", href: "https://github.com/TomBonness/lavtype" },
          ],
          details: [
            "Native build dependencies are fetched by pinned hash before Cargo runs, and every release ships SHA256SUMS.",
            "The 460 MiB speech model downloads only on request, is verified, then installed atomically.",
            "Rebinding the shortcut is transactional: if registration fails, the old one stays active.",
          ],
          figure: "dictation",
        },
        {
          id: "open-micro",
          title: "Open Micro",
          summary:
            "An open-source desktop controller designed end to end, from the two boards to the firmware and host tools. Still a concept, not a qualified build",
          readout: {
            value: "20 bytes",
            label: "per protocol frame",
          },
          stack: "Rust, C, Zephyr, KiCad",
          links: [
            {
              label: "Product page",
              href: "https://kmrl.org/products/open-micro",
            },
            {
              label: "Source",
              href: "https://github.com/TomBonness/open-micro",
            },
          ],
          details: [
            "One canonical protocol manifest is the source for every consumer: the firmware, the Rust crate and the IPC validators are regenerated from it.",
            "A Rust daemon, CLI and simulator let the whole host stack run, and be tested, with no hardware attached.",
            "Fabrication and CAD exports are deterministic and ship with SHA-256 manifests.",
          ],
          figure: "product",
        },
      ],
    ],
  },
];

/** Earlier end-to-end builds and small tools. The ones with a figure are shown as cards. */
export const ALSO: readonly SmallProject[] = [
  {
    id: "chipguard",
    title: "ChipGuard",
    summary:
      "Defect prediction for semiconductor wafers with drift monitoring, deployed with Docker and GitHub Actions",
    stack: "PyTorch, Flask, Angular",
    links: [
      { label: "Live site", href: "https://chipguardai.com/" },
      { label: "Source", href: "https://github.com/TomBonness/semiguard" },
    ],
    figure: "chipguard",
  },
  {
    id: "cloudsprouts",
    title: "CloudSprouts",
    summary:
      "An ESP32 garden sensor that reports over MQTT to AWS IoT Core, and a dashboard that is still receiving its readings",
    stack: "C, ESP-IDF, Lambda, DynamoDB",
    links: [
      { label: "Live site", href: "https://www.cloudsprouts.com/" },
      {
        label: "Firmware",
        href: "https://github.com/TomBonness/cloudsprouts-IoT-device",
      },
      {
        label: "Dashboard",
        href: "https://github.com/TomBonness/cloudsprouts-dashboard",
      },
    ],
    figure: "cloudsprouts",
  },
  {
    id: "fasterm",
    title: "fasterm",
    summary:
      "A terminal speed-reader that replays shell output one token at a time",
    stack: "Rust",
    links: [{ label: "Source", href: "https://github.com/TomBonness/fasterm" }],
  },
  {
    id: "dontswitchmics",
    title: "Don’t Switch Mics",
    summary:
      "A macOS menu bar utility that puts your chosen microphone back when the system switches inputs",
    stack: "Swift",
    links: [
      { label: "Source", href: "https://github.com/TomBonness/dontswitchmics" },
    ],
  },
  {
    id: "pgui",
    title: "pgui",
    summary: "A web framework where PostgreSQL is the server, in 125 lines of SQL",
    stack: "PL/pgSQL",
    links: [{ label: "Source", href: "https://github.com/TomBonness/pangres" }],
  },
];

/** The boot check of the deployment bundle, with its real pins shortened. */
export const PREFLIGHT = {
  service: "sglang-glm.service",
  checks: [
    { label: "Runtime image", value: "sha256:3a97bd50…409290" },
    { label: "Target checkpoint", value: "caca4e6a…e27177" },
    { label: "Draft checkpoint", value: "bf582e4e…737d2a" },
    { label: "Runtime patches", value: "11 of 11" },
  ],
} as const;

/** What distributr's workflow does on a push to main, in order. */
export const PIPELINE = [
  { icon: "list-checks", label: "Check", detail: "Typecheck, 31 tests, cdk synth" },
  { icon: "key-round", label: "Assume a role", detail: "Over GitHub OIDC, with no stored keys" },
  { icon: "cloud-upload", label: "Deploy", detail: "One CDK app, from main only" },
  { icon: "activity", label: "Smoke check", detail: "Fails unless /healthz answers" },
] as const;

/** The menu a Fast Long Context installer prints, in its own words. */
export const INSTALLER = {
  title: "Qwen 27B / RTX 5090 setup",
  subtitle: "NVFP4 weights + KV, DFlash2, patched SGLang",
  options: [
    { key: "1", label: "Set up everything (runtime + both model downloads)" },
    { key: "2", label: "Download / resume models only" },
    { key: "3", label: "Start the server (Ctrl-C to stop)" },
    { key: "0", label: "Exit" },
  ],
  note: "First setup downloads about 22 GB of model weights, plus runtime packages.",
  prompt: "Choose an option:",
} as const;

/** What Daish reads, and what it does with it. */
export const SOURCES = {
  reads: [
    { name: "NVML", detail: "GPU load, VRAM, temperature, power" },
    { name: "psutil", detail: "CPU per core, RAM, disks" },
    { name: "cgroups", detail: "Memory, swap and OOM per service" },
    { name: "Prometheus", detail: "vLLM, SGLang and llama.cpp metrics" },
    { name: "journald", detail: "Each service’s logs" },
  ],
  writes: [
    { name: "Terminal UI", detail: "Overview, models, hardware, activity" },
    { name: "SQLite", detail: "Seven days of history" },
    { name: "systemd", detail: "Start, stop, restart" },
  ],
} as const;

/** Decode speed of the Cinference Engine on one fixed benchmark, release by release. */
export const WEEK = [
  { date: "Sep 23", label: "First release", value: 410.6 },
  { date: "Sep 24", label: "Rewritten verify kernels", value: 535.8 },
  { date: "Sep 28", label: "Verify trees and prompt lookup", value: 777.5 },
  { date: "Sep 29", label: "Lookup rounds", value: 944.7 },
  { date: "Sep 30", label: "Overlapped GDN blocks", value: 970.7 },
] as const;

/** How fngine's routed experts are drawn: one square for every 64 of them. */
export const TIERS = {
  experts: 24576,
  perSquare: 64,
  columns: 32,
} as const;

/** The Lavtype figure. The sentence is an example, not a recording. */
export const DICTATION = {
  sentence: "Restart the staging server after lunch",
  model: "460 MiB speech model, on this machine",
} as const;

export const IMAGES = {
  cinmuxLinux: {
    base: "/projects/cinmux-linux",
    widths: [800, 1600],
    width: 1600,
    height: 978,
    alt: "Cinmux on Linux: a sidebar of folders and tabs with agent statuses, beside a split terminal showing a file tree and a passing test run",
  },
  cinmuxMacos: {
    base: "/projects/cinmux-macos",
    widths: [600, 1200],
    width: 1200,
    height: 783,
    alt: "Cinmux on macOS: the same sidebar of pinned tabs and folders, beside a split terminal with a passing Swift test run",
  },
  openMicro: {
    base: "/projects/open-micro",
    widths: [600, 1200],
    width: 1200,
    height: 823,
    alt: "Open Micro: a small black desktop controller with twelve keys and an encoder knob",
  },
  chipguard: {
    base: "/projects/chipguard",
    widths: [700, 1400],
    width: 1400,
    height: 875,
    alt: "The ChipGuard dashboard: 38 predictions with an 89.5% pass rate, a chart of confidence scores and a pass and fail breakdown",
  },
  cloudsprouts: {
    base: "/projects/cloudsprouts",
    widths: [700, 1400],
    width: 1400,
    height: 875,
    alt: "The CloudSprouts dashboard: a current reading of 69.8°F and 55% humidity above a week of temperature and humidity lines",
  },
} as const satisfies Record<string, ImageAsset>;

export const TOOLBOX: readonly { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "C++20, CUDA, Rust, Python, TypeScript, Swift, C, SQL, Bash",
  },
  {
    label: "Infrastructure",
    items:
      "AWS CDK, Lambda, DynamoDB, API Gateway and IoT Core, Docker, systemd, GitHub Actions with OIDC",
  },
  {
    label: "Operations",
    items:
      "Prometheus metrics, cgroups, journald, pinned and hash-verified artifacts, resumable updates",
  },
];
