export type ProjectLink = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Figure =
  | {
      kind: "flow";
      caption: string;
      steps: readonly { label: string; detail: string }[];
    }
  | {
      kind: "bars";
      caption: string;
      groups: readonly {
        title: string;
        bars: readonly { label: string; value: number; highlight?: boolean }[];
      }[];
    }
  | {
      kind: "rows";
      caption: string;
      rows: readonly { label: string; detail: string }[];
    }
  | {
      kind: "image";
      caption: string;
      src: string;
      alt: string;
      width: number;
      height: number;
      /** Give the image the full width of the entry instead of a side column. */
      wide?: boolean;
    };

export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  highlights: readonly string[];
  metrics?: readonly Metric[];
  figure?: Figure;
  stack: readonly string[];
  links: readonly ProjectLink[];
  /** Shown in place of links when a project has none to offer. */
  note?: string;
};

export type WorkSection = {
  id: string;
  title: string;
  intro: string;
  layout: "full" | "compact";
  projects: readonly Project[];
};

export const PROFILE = {
  name: "Tom Bonness",
  location: "Austin, Texas",
  github: "https://github.com/TomBonness",
  linkedin: "https://www.linkedin.com/in/bonness/",
  lab: "https://kmrl.org/",
  siteSource: "https://github.com/TomBonness/portfoliosite",
} as const;

export const PROOF: readonly Metric[] = [
  {
    value: "+37%",
    label:
      "decode speed from rewritten GPU kernels, with the same tokens accepted per round",
  },
  {
    value: "262,144",
    label: "tokens of context served from a single 32 GB GPU",
  },
  {
    value: "0",
    label:
      "AWS keys stored in distributr’s CI. Deploys assume a scoped role over OIDC",
  },
  {
    value: "SHA-256",
    label:
      "pins on model files and runtime patches, verified before a server starts",
  },
];

export const WORK_SECTIONS: readonly WorkSection[] = [
  {
    id: "infrastructure",
    title: "Infrastructure & operations",
    intro:
      "Deployments pinned to a hash, pipelines that ship without stored secrets, and tooling that shows what a service is actually doing.",
    layout: "full",
    projects: [
      {
        id: "deployment-bundle",
        title: "GLM-5.3-Flash deployment bundle",
        kind: "Deployment and change control",
        summary:
          "A locked SGLang deployment of a 182 GiB model for two hardware profiles: a four-GPU RTX PRO 6000 machine and a single-GPU cloud pod.",
        highlights: [
          "Everything is pinned: the runtime image by digest, the model by revision, and all eleven runtime patches by SHA-256 in a manifest. The boot script checks both checkpoints and every patch before the server starts.",
          "Performance changes go in one at a time. A selector switches a single candidate and restarts the service atomically, and the benchmark writes the active candidate into its result, so a number can’t be credited to the wrong change.",
          "A change stays only if output is still coherent and end-to-end decode improves by at least 3%.",
          "Staging runs on a CPU instance against retained volumes, so four GPUs are only billed while they serve.",
        ],
        metrics: [
          { value: "428.6", label: "tokens/s decode on the production profile" },
          { value: "182 GiB", label: "checkpoint in 120 shards, mounted read-only" },
          { value: "11", label: "runtime patches, each locked by hash" },
        ],
        figure: {
          kind: "bars",
          caption:
            "Decode tokens per second by draft width, measured live on four GPUs. Width 32 was 27% slower, so width 8 stayed in production.",
          groups: [
            {
              title: "Draft width",
              bars: [
                { label: "Width 8", value: 428.6, highlight: true },
                { label: "Width 32", value: 314.7 },
              ],
            },
          ],
        },
        stack: ["Docker Compose", "systemd", "SGLang", "CUDA", "Python", "Bash"],
        links: [{ label: "Source", href: "https://github.com/TomBonness/tpopto" }],
      },
      {
        id: "distributr",
        title: "distributr",
        kind: "Infrastructure as code and CI/CD",
        summary:
          "A serverless news hub on AWS. It ingests RSS feeds on a schedule, merges related stories with embeddings, and serves the result as HTML, a REST API and an MCP endpoint.",
        highlights: [
          "One CDK app defines the stack: three DynamoDB tables with point-in-time recovery, an S3 Vectors index, two ARM Lambdas, a throttled HTTP API and a two-hour ingest schedule.",
          "CI holds no AWS keys. It assumes a deploy role over GitHub OIDC that trusts only pushes to main, is pinned to the repository’s immutable ID, and can do nothing except assume the CDK bootstrap roles.",
          "Every pull request and push to main runs typecheck, 31 tests and cdk synth. Main then deploys, and the job fails unless /healthz answers.",
          "Spend is capped in code: daily LLM budgets for ingest and for contributions, and a per-address submission limit.",
        ],
        figure: {
          kind: "flow",
          caption: "From push to production.",
          steps: [
            { label: "Check", detail: "Typecheck, 31 tests, cdk synth" },
            { label: "Assume role", detail: "GitHub OIDC, main branch only" },
            { label: "Deploy", detail: "cdk deploy, one stack" },
            { label: "Smoke check", detail: "curl /healthz, or the job fails" },
          ],
        },
        stack: [
          "AWS CDK",
          "Lambda",
          "DynamoDB",
          "API Gateway",
          "EventBridge",
          "Bedrock",
          "GitHub Actions",
          "TypeScript",
        ],
        links: [
          { label: "Source", href: "https://github.com/TomBonness/distributr" },
        ],
      },
      {
        id: "fast-long-context",
        title: "Fast Long Context",
        kind: "Release engineering",
        summary:
          "A family of one-menu installers that take a Linux machine with an RTX 5090 to a running model server with a 256K-token context: install, resume, serve and update.",
        highlights: [
          "Each installer pins its runtime and model to exact revisions, builds against its own isolated CUDA toolkit, and checks the SHA-256 and size of every file it downloads.",
          "Interrupted installs and downloads resume. Existing files are verified, never silently replaced, and modified sources are reported instead of reset.",
          "Updates don’t delete anything. Files that no longer match are moved aside, and the update stops before downloading if the replacement won’t fit on disk.",
          "The first release needed a runtime fix rather than a script. A patch to SGLang’s attention backend and a new Triton kernel raised usable context from about 160K tokens to the full 262,144 on the same card.",
        ],
        metrics: [
          {
            value: "160K → 262K",
            label: "tokens of usable context on the same 32 GB card",
          },
          {
            value: "239–341",
            label: "tokens/s generation on prompts from 8K to 260K tokens",
          },
        ],
        figure: {
          kind: "flow",
          caption: "What the menu does, in order.",
          steps: [
            { label: "Pin", detail: "Exact runtime and model revisions" },
            { label: "Fetch", detail: "Resumable, into a local cache" },
            { label: "Verify", detail: "SHA-256 and size of every file" },
            { label: "Build", detail: "Isolated CUDA toolkit at a fixed version" },
            { label: "Serve", detail: "OpenAI-compatible API on localhost" },
          ],
        },
        stack: ["Bash", "Python", "CUDA", "SGLang", "Triton"],
        links: [],
        note: "Code walkthrough on request.",
      },
      {
        id: "daish",
        title: "Daish",
        kind: "Observability and service control",
        summary:
          "A terminal command center for the model servers on one machine. It starts and stops them as systemd units and shows what the hardware and each server are doing.",
        highlights: [
          "Hardware telemetry at 1 Hz from NVML and psutil, sampled off the UI thread. Memory, swap, OOM events and CPU per service come from each unit’s cgroup.",
          "Reads the Prometheus endpoints of vLLM, SGLang and llama.cpp. A counter reset or a collection gap sets a fresh baseline instead of a spike or a negative rate, and latencies from _sum and _count deltas are labelled as means, not percentiles.",
          "Start, stop and restart go through systemd and ask first, defaulting to cancel. A second instance finds the first through a file lock and runs read-only.",
          "Events, benchmarks and minute-bucketed samples are kept in SQLite for seven days. Gaps in the timeline mark when the tool was closed.",
        ],
        figure: {
          kind: "rows",
          caption: "Where each number comes from.",
          rows: [
            { label: "GPU", detail: "NVML: utilization, VRAM, temperature, power" },
            { label: "Host", detail: "psutil: per-core CPU, available RAM, disks" },
            { label: "Service", detail: "cgroup: memory, swap, OOM, PIDs, CPU" },
            {
              label: "Inference",
              detail: "Prometheus endpoints and structured request logs",
            },
            { label: "Logs", detail: "journald, followed per unit" },
          ],
        },
        stack: [
          "Python",
          "Textual",
          "systemd",
          "cgroups",
          "NVML",
          "Prometheus",
          "SQLite",
        ],
        links: [{ label: "Source", href: "https://github.com/TomBonness/daish" }],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance & systems",
    intro:
      "Engines for hardware that is always slightly too small. Every speedup is measured against the build before it.",
    layout: "full",
    projects: [
      {
        id: "cinference-engine",
        title: "Cinference Engine",
        kind: "Performance engineering",
        summary:
          "A C++/CUDA inference engine that serves a 27B model with a 256K-token context from one RTX 5090. Built from the open-source NInfer engine, with my changes in its speculative decoding, CUDA graph reuse and verification kernels.",
        highlights: [
          "Rewrote the verification kernels over five passes. Rounds got 17–27% shorter and decode 21–37% faster on prompts from 8K to 131K tokens, and passes two through five are bit-exact.",
          "Pipelined the long-prompt attention kernel. Prefill at 131K tokens went from 3,827 to 4,575 tokens/s, with output bit-identical to the kernel it replaced.",
          "Added tree verification and prompt lookup, which accept more tokens per round while keeping the model’s output distribution.",
          "Each result names its conditions and links a measurement file: alternating builds, paired medians, the commit on each side.",
        ],
        metrics: [
          {
            value: "+37%",
            label: "decode speed at 131K-token prompts from kernel work alone",
          },
          { value: "970", label: "tokens/s peak decode on the benchmark corpus" },
          { value: "256K", label: "token context on a 32 GB card" },
        ],
        figure: {
          kind: "bars",
          caption:
            "Tokens per second on one RTX 5090, one request at a time, the same requests for every engine. llama.cpp ran without speculative decoding.",
          groups: [
            {
              title: "Coding chats",
              bars: [
                { label: "llama.cpp", value: 73.1 },
                { label: "NInfer (upstream)", value: 201.8 },
                { label: "Cinference Engine", value: 290.3, highlight: true },
              ],
            },
            {
              title: "Whole-file edits",
              bars: [
                { label: "llama.cpp", value: 76.4 },
                { label: "NInfer (upstream)", value: 305.8 },
                { label: "Cinference Engine", value: 535.2, highlight: true },
              ],
            },
          ],
        },
        stack: ["C++", "CUDA", "CMake", "Python"],
        links: [
          {
            label: "Product page",
            href: "https://kmrl.org/products/cinference-engine",
          },
        ],
      },
      {
        id: "fngine",
        title: "fngine",
        kind: "Systems engineering",
        summary:
          "A C++20/CUDA engine for a model that does not fit on the GPU. It runs on one RTX 5090 and 64 GB of RAM by splitting the model across VRAM, an AVX-512 CPU tier and NVMe.",
        highlights: [
          "About half of the model’s 24,576 routed experts sit on the GPU. The rest run on the CPU or stream over PCIe for long prompts. Placement follows real usage and adapts on every decode step.",
          "Speculative decoding checks its drafts exactly, so the output matches plain decoding.",
          "The OpenAI-compatible server runs one request and queues up to eight. Past that it answers 429 instead of stalling.",
          "46 C++/CUDA tests cover speculative-decoding equivalence, long-context state and real-model generation.",
        ],
        metrics: [
          { value: "180–210", label: "tokens/s decode on coding chat" },
          { value: "~3,300", label: "tokens/s prefill on a 32K-token prompt" },
          { value: "167 s", label: "to process a 262K-token prompt" },
        ],
        figure: {
          kind: "rows",
          caption: "Where the model lives.",
          rows: [
            {
              label: "VRAM, 32 GB",
              detail:
                "FP8 dense weights, 8-bit KV cache, about half of the routed experts",
            },
            {
              label: "RAM, 64 GB",
              detail: "Remaining experts, evaluated on the CPU with AVX-512",
            },
            { label: "NVMe", detail: "N-gram table, read on demand with io_uring" },
          ],
        },
        stack: ["C++20", "CUDA", "AVX-512", "io_uring", "CMake", "Python"],
        links: [],
        note: "Code walkthrough on request.",
      },
    ],
  },
  {
    id: "shipped",
    title: "Shipped software",
    intro:
      "Products with installers and releases, on more than one platform.",
    layout: "full",
    projects: [
      {
        id: "cinmux",
        title: "Cinmux",
        kind: "Desktop product",
        summary:
          "Persistent terminal workspaces for Linux and macOS: real terminals in folders, a status on every tab, and sessions that keep running after the window closes.",
        highlights: [
          "Two native apps on one design: Qt 6 and wlroots in C++20 on Linux, Swift on macOS, and the same workspace as a TUI over SSH.",
          "Every tab is a tmux session on a private server, so closing the app never stops a job and the user’s own tmux config is never touched.",
          "A small CLI reports state for each tab (working, needs input, done), so any long-running process can ask for attention.",
          "Installs from Homebrew or a script. Running the installer again updates in place while sessions keep running.",
        ],
        figure: {
          kind: "image",
          caption: "The Linux app. Each tab on the left is a live tmux session.",
          src: "/projects/cinmux.webp",
          alt: "Cinmux on Linux: a sidebar of folders and tabs with agent statuses, beside a split terminal showing a file tree and a passing test run",
          width: 2160,
          height: 1320,
          wide: true,
        },
        stack: ["C++20", "Qt 6 / QML", "wlroots", "Swift", "tmux"],
        links: [
          { label: "Product page", href: "https://kmrl.org/products/cinmux" },
        ],
      },
      {
        id: "lavtype",
        title: "Lavtype",
        kind: "Cross-platform desktop tool",
        summary:
          "Push-to-talk dictation in Rust. Hold a shortcut, speak, release, and the transcript is typed into the focused app. Speech recognition stays on the machine.",
        highlights: [
          "One codebase for macOS on arm64 and x86_64 and for X11 Linux. CI builds and tests all three, with rustfmt and clippy as gates.",
          "Native build dependencies are fetched by pinned hash before Cargo runs, and every release ships SHA256SUMS.",
          "The 460 MiB speech model is downloaded only on request, verified, then installed atomically. Rebinding the shortcut is transactional: if registration fails, the old one stays active.",
        ],
        figure: {
          kind: "rows",
          caption: "Release v0.1.0, published with checksums.",
          rows: [
            { label: "macOS arm64", detail: "DMG, 10.8 MB" },
            { label: "macOS x86_64", detail: "DMG, 12.2 MB" },
            { label: "Linux x86_64", detail: "AppImage, 44.4 MB" },
            { label: "All files", detail: "SHA256SUMS" },
          ],
        },
        stack: ["Rust", "sherpa-onnx", "Apple Speech", "GitHub Actions"],
        links: [
          { label: "Product page", href: "https://kmrl.org/products/lavtype" },
          { label: "Source", href: "https://github.com/TomBonness/lavtype" },
        ],
      },
      {
        id: "open-micro",
        title: "Open Micro",
        kind: "Hardware, firmware and host software",
        summary:
          "An open-source desktop controller with twelve keys, an encoder and a touch control, designed end to end: two boards, the enclosure, the firmware and the host tools. A concept in development, not yet a qualified build.",
        highlights: [
          "One canonical protocol manifest is the source for every consumer. The firmware, the Rust crate and the IPC validators are regenerated from it, so device and host cannot drift apart.",
          "A Rust daemon, CLI and simulator let the whole host stack run, and be tested, with no hardware attached.",
          "Fabrication and CAD exports are deterministic and ship with SHA-256 manifests. Electrical, collision and clearance checks run as scripts.",
        ],
        figure: {
          kind: "image",
          caption: "Concept render, not a photograph.",
          src: "/projects/open-micro.webp",
          alt: "Concept render of Open Micro: a square desktop controller with twelve keys, a dial and an illuminated edge",
          width: 960,
          height: 678,
        },
        stack: ["Rust", "C", "ZMK / Zephyr", "nRF52840", "KiCad", "CadQuery"],
        links: [
          { label: "Product page", href: "https://kmrl.org/products/open-micro" },
          { label: "Source", href: "https://github.com/TomBonness/open-micro" },
        ],
      },
    ],
  },
  {
    id: "earlier",
    title: "Earlier builds",
    intro: "Two smaller systems built front to back. Both are still running.",
    layout: "compact",
    projects: [
      {
        id: "chipguard",
        title: "ChipGuard",
        kind: "ML service with drift monitoring",
        summary:
          "Pass/fail prediction for semiconductor wafers from 590 sensor features (UCI SECOM), served by an API with a dashboard on top.",
        highlights: [
          "A PyTorch model behind a Flask API that logs every prediction. An Angular dashboard shows pass rates, confidence and history.",
          "Drift detection runs a Kolmogorov–Smirnov test per feature against the training baseline, to catch the model degrading.",
          "Backend pushes run pytest, then build and restart a Docker container on EC2.",
        ],
        stack: ["PyTorch", "Flask", "Angular", "Docker", "GitHub Actions", "EC2"],
        links: [
          { label: "Live site", href: "https://chipguardai.com/" },
          { label: "Source", href: "https://github.com/TomBonness/semiguard" },
        ],
      },
      {
        id: "cloudsprouts",
        title: "CloudSprouts",
        kind: "Firmware to dashboard",
        summary:
          "A garden sensor pipeline. An ESP32 publishes temperature and humidity over MQTT and TLS to AWS IoT Core, and a dashboard charts the readings.",
        highlights: [
          "Firmware in C on ESP-IDF: Wi-Fi, SNTP time sync, a TLS connection to IoT Core and JSON payloads.",
          "IoT Core routes messages to a Lambda that stores timestamped readings in DynamoDB. API Gateway serves the latest and weekly data.",
          "The dashboard reads live from the device, which is still reporting.",
        ],
        stack: [
          "C",
          "ESP-IDF",
          "MQTT",
          "AWS IoT Core",
          "Lambda",
          "DynamoDB",
          "React",
        ],
        links: [
          { label: "Live site", href: "https://www.cloudsprouts.com/" },
          {
            label: "Firmware source",
            href: "https://github.com/TomBonness/cloudsprouts-IoT-device",
          },
          {
            label: "Dashboard source",
            href: "https://github.com/TomBonness/cloudsprouts-dashboard",
          },
        ],
      },
    ],
  },
];

export type SmallTool = {
  id: string;
  title: string;
  language: string;
  summary: string;
  href: string;
};

export const SMALL_TOOLS: readonly SmallTool[] = [
  {
    id: "fasterm",
    title: "fasterm",
    language: "Rust",
    summary:
      "A terminal speed-reader. It wraps a shell in a PTY and replays recent output one token at a time with the source beside it. Also reads stdin, files and tmux scrollback.",
    href: "https://github.com/TomBonness/fasterm",
  },
  {
    id: "dontswitchmics",
    title: "Don’t Switch Mics",
    language: "Swift",
    summary:
      "A macOS menu bar utility that puts the chosen microphone back when the system switches inputs. Locks by CoreAudio UID and ships a CLI for listing, selection and one-shot enforcement.",
    href: "https://github.com/TomBonness/dontswitchmics",
  },
  {
    id: "pgui",
    title: "pgui",
    language: "PL/pgSQL",
    summary:
      "A web framework where PostgreSQL is the server. Routes map to SQL handlers, and a safe-HTML type makes escaping the default.",
    href: "https://github.com/TomBonness/pangres",
  },
];

export const TOOLBOX: readonly { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "C++20, CUDA, Rust, Python, TypeScript, Swift, C, SQL, Bash",
  },
  {
    label: "Cloud and delivery",
    items:
      "AWS CDK, Lambda, DynamoDB, API Gateway, IoT Core, EventBridge, Amplify and EC2. Docker and Compose. GitHub Actions with OIDC.",
  },
  {
    label: "Running services",
    items:
      "systemd, cgroups, journald, Prometheus metrics and NVML. Pinned, hash-verified artifacts. Resumable, non-destructive updates.",
  },
  {
    label: "Performance",
    items:
      "GPU kernels, memory tiering and speculative decoding. Benchmarks with alternating builds, paired medians and stated conditions.",
  },
  {
    label: "Systems and devices",
    items:
      "PTYs and tmux, Qt and Wayland, CoreAudio, and embedded firmware on ESP-IDF and Zephyr.",
  },
];
