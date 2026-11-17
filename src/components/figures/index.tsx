import type { ReactElement } from "react";
import { type FigureId, IMAGES } from "@/data/projects";
import { BootCheck } from "./BootCheck";
import { Dictation } from "./Dictation";
import { InstallerMenu } from "./InstallerMenu";
import { Pipeline } from "./Pipeline";
import { BrowserShot, ProductShot } from "./Shots";
import { Sources } from "./Sources";
import { Tiers } from "./Tiers";
import { WeekChart } from "./WeekChart";
import { Windows } from "./Windows";

/** The picture for each project: a real image where the thing can be seen, a diagram where it can't. */
export const FIGURES: Record<FigureId, ReactElement> = {
  "boot-check": <BootCheck />,
  pipeline: <Pipeline />,
  installer: <InstallerMenu />,
  sources: <Sources />,
  week: <WeekChart />,
  tiers: <Tiers />,
  windows: <Windows />,
  dictation: <Dictation />,
  product: <ProductShot />,
  chipguard: <BrowserShot image={IMAGES.chipguard} host="chipguardai.com" />,
  cloudsprouts: (
    <BrowserShot image={IMAGES.cloudsprouts} host="www.cloudsprouts.com" />
  ),
};
