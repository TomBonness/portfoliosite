import { TIERS } from "@/data/projects";

const SQUARES = TIERS.experts / TIERS.perSquare;
const ROWS = SQUARES / TIERS.columns;

/** Distance from one square to the next. A drawn square, stroke included, is 10 wide. */
const PITCH = 12;

/**
 * The squares drawn as "on the GPU". Only the proportion is real (about half),
 * so the picks come from a fixed pseudo-random sequence that renders the same
 * on the server and in every browser.
 */
function pickHalf(): Set<number> {
  const order = Array.from({ length: SQUARES }, (_, index) => index);
  let seed = TIERS.experts;

  for (let i = order.length - 1; i > 0; i -= 1) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }

  return new Set(order.slice(0, SQUARES / 2));
}

const ON_GPU = pickHalf();

/**
 * One path for all squares on the GPU, or for all the others. `stroke` is the
 * width the path is stroked with, so both kinds come out the same size.
 */
function squaresPath(onGpu: boolean, stroke: number): string {
  const side = 10 - stroke;
  let d = "";

  for (let index = 0; index < SQUARES; index += 1) {
    if (ON_GPU.has(index) === onGpu) {
      const x = (index % TIERS.columns) * PITCH + stroke / 2;
      const y = Math.floor(index / TIERS.columns) * PITCH + stroke / 2;
      d += `M${x} ${y}h${side}v${side}h-${side}z`;
    }
  }

  return d;
}

/** fngine's routed experts as a memory map: filled squares on the GPU, hollow ones off it. */
export function Tiers() {
  return (
    <figure className="screen">
      <div className="screen-body tiers">
        <p className="screen-comment">routed experts by tier, 1 square = {TIERS.perSquare}</p>
        <svg
          viewBox={`0 0 ${TIERS.columns * PITCH - 2} ${ROWS * PITCH - 2}`}
          role="img"
          aria-label={`${SQUARES} squares, ${ON_GPU.size} of them filled`}
        >
          <path className="tiers-rest" d={squaresPath(false, 1)} />
          <path className="tiers-gpu" d={squaresPath(true, 2)} />
        </svg>
        <ul className="legend">
          <li>
            <span className="swatch swatch-gpu" aria-hidden="true" />
            On the GPU, in VRAM
          </li>
          <li>
            <span className="swatch" aria-hidden="true" />
            On the CPU, or streamed over PCIe
          </li>
        </ul>
      </div>
      <figcaption>
        The model’s {TIERS.experts.toLocaleString("en-US")} routed experts.
        About half sit on the GPU. Which half follows real usage, so this
        pattern is only an example.
      </figcaption>
    </figure>
  );
}
