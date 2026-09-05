import type { ReactNode } from "react";

const beans = Array.from({ length: 48 }, (_, i) => ({
  x: 137 + (i % 6) * 17 + Math.sin(i * 7) * 4,
  y: 88 + Math.floor(i / 6) * 14,
  rotate: (i * 137.5) % 180,
  color: ["#bd5639", "#dca964", "#777f57", "#e7c1ad", "#b0b69a"][i % 5],
}));
const seeds = Array.from({ length: 180 }, (_, i) => {
  const angle = i * 2.399963;
  const radius = Math.sqrt(i) * 6.5;
  return {
    x: 180 + Math.cos(angle) * radius,
    y: 118 + Math.sin(angle) * radius,
    radius: 1.5 + i / 150,
  };
});
const pegs = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: row + 1 }, (_, col) => ({
    x: 180 - row * 12 + col * 24,
    y: 45 + row * 20,
  })),
).flat();
const waferCells = Array.from({ length: 121 }, (_, i) => ({
  x: 88 + (i % 11) * 17,
  y: 27 + Math.floor(i / 11) * 17,
  color:
    (i * 17) % 23 < 3
      ? "#c36b4d"
      : ["#7c8b73", "#afbaa2", "#94a487", "#c0c7b5"][i % 4],
}));

function Frame({
  id,
  color,
  children,
}: {
  id: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`project-artwork art-${id}`}
      style={{ background: color }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 240" fill="none">
        {children}
      </svg>
    </div>
  );
}

export function ProjectArtwork({ id }: { id: string }) {
  switch (id) {
    case "jellybean-parliament":
      return (
        <Frame id={id} color="#e8dbcb">
          <ellipse
            cx="180"
            cy="215"
            rx="70"
            ry="8"
            fill="#c9b7a0"
            opacity=".3"
          />
          <path
            d="M132 66V51Q132 42 145 42H215Q228 42 228 51V66L239 86V190Q239 207 219 208H141Q121 207 121 190V86Z"
            fill="#f7f0e3"
            fillOpacity=".55"
            stroke="#8f816d"
            strokeWidth="1.2"
          />
          {beans.map((bean, i) => (
            <ellipse
              key={i}
              cx={bean.x}
              cy={bean.y}
              rx="8.5"
              ry="5.5"
              transform={`rotate(${bean.rotate} ${bean.x} ${bean.y})`}
              fill={bean.color}
            />
          ))}
          <path
            d="M136 49H224M136 58H224M130 91V183"
            stroke="#fffaf0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="130" y="35" width="100" height="16" rx="5" fill="#7b7f64" />
          <path
            d="M142 38V48M151 38V48M160 38V48M169 38V48M178 38V48M187 38V48M196 38V48M205 38V48M214 38V48"
            stroke="#c4c5a6"
            strokeOpacity=".35"
          />
          <text
            x="281"
            y="80"
            fill="#9d704f"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="38"
            transform="rotate(12 281 80)"
          >
            ?
          </text>
          <text
            x="48"
            y="153"
            fill="#9d704f"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="54"
            transform="rotate(-12 48 153)"
          >
            ?
          </text>
        </Frame>
      );
    case "word-finder":
      return (
        <div className="project-artwork art-word-finder" aria-hidden="true">
          <div className="word-art">
            serendipity
            <br />
            <em>petrichor</em>
            <br />
            somewhere
          </div>
        </div>
      );
    case "montys-ballroom":
      return (
        <Frame id={id} color="#e4d9cc">
          {[0, 1, 2].map((door) => (
            <g key={door} transform={`translate(${60 + door * 88} 47)`}>
              <path
                d="M0 150V32A32 32 0 0 1 64 32V150Z"
                fill={door === 2 ? "#75826b" : "#d5c4ae"}
                stroke={door === 2 ? "#526247" : "#ac977d"}
                strokeWidth="1.2"
              />
              <path
                d="M7 143V33A25 25 0 0 1 57 33V143Z"
                stroke={door === 2 ? "#acb8a0" : "#efe5d5"}
              />
              <circle cx="51" cy="95" r="3" fill="#eee0b4" />
              <text
                x="32"
                y="63"
                textAnchor="middle"
                fill={door === 2 ? "#e5e9d8" : "#857056"}
                fontFamily="Georgia, serif"
                fontSize="26"
              >
                {door + 1}
              </text>
            </g>
          ))}
          <path
            d="M92 213Q170 232 268 212m-8-4 10 3-7 8"
            stroke="#a4583a"
            strokeWidth="1.2"
          />
        </Frame>
      );
    case "galton-decision-tree":
      return (
        <Frame id={id} color="#dcded2">
          {pegs.map((peg, i) => (
            <circle key={i} cx={peg.x} cy={peg.y} r="2" fill="#7d836c" />
          ))}
          <path
            d="M180 26V44L168 65L180 85L168 105L180 125L168 145L180 165L192 185"
            stroke="#b95634"
            strokeWidth="2"
          />
          <circle cx="192" cy="185" r="5" fill="#b95634" />
          {[5, 14, 28, 46, 56, 46, 28, 14, 5].map((h, i) => (
            <rect
              key={i}
              x={78 + i * 24}
              y={227 - h / 2}
              width="12"
              height={h / 2}
              fill="#8c9679"
            />
          ))}
        </Frame>
      );
    case "phyllotaxis":
      return (
        <Frame id={id} color="#e9ddcc">
          <circle
            cx="180"
            cy="118"
            r="101"
            stroke="#c5b99f"
            strokeDasharray="2 5"
          />
          {seeds.map((seed, i) => (
            <circle
              key={i}
              cx={seed.x}
              cy={seed.y}
              r={seed.radius}
              fill={i < 90 ? "#818b65" : "#bb603e"}
            />
          ))}
        </Frame>
      );
    case "quadsite":
      return (
        <Frame id={id} color="#d9e0dd">
          {[40, 70, 100].map((r) => (
            <circle
              key={r}
              cx="180"
              cy="120"
              r={r}
              stroke="#adbeb3"
              strokeWidth=".7"
            />
          ))}
          <path
            d="M0 120H360M180 0V240M70 10L290 230M70 230L290 10"
            stroke="#b4c3b9"
            strokeWidth=".7"
          />
          <g stroke="#516d60" strokeWidth="5" strokeLinecap="round">
            <path d="M140 80L220 160M140 160L220 80" />
          </g>
          {[
            [134, 74],
            [226, 74],
            [134, 166],
            [226, 166],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="26"
                fill="#e8eeea"
                stroke="#698476"
                strokeWidth="1.5"
              />
              <ellipse
                cx={x}
                cy={y}
                rx="22"
                ry="5"
                transform={`rotate(${i % 2 ? 35 : -35} ${x} ${y})`}
                fill="#8a9d8d"
              />
              <circle cx={x} cy={y} r="3" fill="#3f5c4d" />
            </g>
          ))}
          <rect x="165" y="98" width="30" height="44" rx="6" fill="#3f5c4d" />
          <path d="M173 105L180 100L187 105" stroke="#d0bc81" strokeWidth="2" />
        </Frame>
      );
    case "benfords-ledger":
      return (
        <Frame id={id} color="#ead9ca">
          <path d="M52 44V195H317" stroke="#ac9176" />
          <path
            d="M52 145H317M52 95H317"
            stroke="#cfb9a3"
            strokeDasharray="3 4"
          />
          {[132, 81, 56, 42, 34, 29, 23, 20, 18].map((height, i) => (
            <g key={i}>
              <rect
                x={67 + i * 27}
                y={194 - height}
                width="16"
                height={height}
                rx="1"
                fill={i === 3 ? "#8c9778" : "#b96d4c"}
              />
              <text
                x={75 + i * 27}
                y="213"
                textAnchor="middle"
                fill="#8e765d"
                fontSize="10"
                fontFamily="monospace"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </Frame>
      );
    case "ompkickbacks":
      return (
        <div
          className="project-artwork"
          style={{ background: "#d9ded3" }}
          aria-hidden="true"
        >
          <div className="terminal-art">
            <span className="terminal-label">
              a little something in the meantime
            </span>
            <span className="terminal-command">$ agent build</span>
            <br />
            Working on your request…
            <div className="terminal-ad">SPONSORED · ONLY WHILE YOU WAIT</div>
          </div>
        </div>
      );
    case "chipguard":
      return (
        <Frame id={id} color="#dee1d6">
          <defs>
            <clipPath id="wafer-clip">
              <circle cx="181" cy="121" r="96" />
            </clipPath>
          </defs>
          <g clipPath="url(#wafer-clip)">
            {waferCells.map((cell, i) => (
              <rect
                key={i}
                x={cell.x}
                y={cell.y}
                width="15"
                height="15"
                rx="1"
                fill={cell.color}
              />
            ))}
          </g>
          <circle cx="181" cy="121" r="97" stroke="#718268" />
          <path d="M169 218L181 205L193 218" fill="#dee1d6" stroke="#718268" />
        </Frame>
      );
    case "cloudsprouts":
      return (
        <Frame id={id} color="#dce1cf">
          <path d="M40 195H320M40 199H320" stroke="#bec7aa" />
          <path
            d="M180 180V104M180 147L156 124M180 129L204 106"
            stroke="#647c4f"
            strokeWidth="2"
          />
          <path
            d="M156 124Q126 129 128 99Q160 96 156 124M204 106Q233 111 231 81Q201 80 204 106M180 109Q155 90 180 65Q205 90 180 109"
            fill="#8c9e70"
            stroke="#73895a"
          />
          <path d="M163 180H197L192 203H168Z" fill="#b77854" />
          <path
            d="M179 214V225H284V153"
            stroke="#7b9261"
            strokeDasharray="3 4"
          />
          <rect x="270" y="131" width="28" height="24" rx="3" fill="#8fa179" />
          <path
            d="M280 122q4-5 8 0m-12-5q8-9 16 0m-20-6q12-13 24 0"
            stroke="#6e8458"
            strokeWidth="1.5"
          />
          <path
            d="M49 63C49 53 61 50 67 56C68 35 103 34 108 55C123 46 141 66 127 74H59Q49 74 49 63Z"
            fill="#edf0e5"
            stroke="#adb99b"
          />
        </Frame>
      );
    case "dontswitchmics":
      return (
        <Frame id={id} color="#e3dce5">
          <path d="M42 120H94M266 120H318" stroke="#baa9bd" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i} stroke="#a58aaa" strokeWidth="2" strokeLinecap="round">
              <path
                d={`M${53 + i * 7} ${120 - 20 * Math.abs(Math.sin(i))}v${40 * Math.abs(Math.sin(i))}`}
              />
              <path
                d={`M${251 + i * 7} ${120 - 20 * Math.abs(Math.cos(i))}v${40 * Math.abs(Math.cos(i))}`}
              />
            </g>
          ))}
          <rect x="162" y="52" width="36" height="93" rx="18" fill="#a38ba5" />
          <path
            d="M148 116V127A32 32 0 0 0 212 127V116M180 159V183M161 184H199"
            stroke="#77617c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M173 67H187M173 75H187M173 83H187"
            stroke="#dcd0dd"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="214" cy="62" r="14" fill="#849176" />
          <path d="M208 62L212 66L220 58" stroke="#f1eee5" strokeWidth="2" />
        </Frame>
      );
    default:
      return null;
  }
}
