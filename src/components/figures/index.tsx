import type { ReactElement } from "react";
import { type FigureId, IMAGES } from "@/data/projects";
import { Dictation } from "./Dictation";
import { InstallerMenu } from "./InstallerMenu";
import { BrowserShot, ProductShot } from "./Shots";
import { Sources } from "./Sources";
import { Tiers } from "./Tiers";
import { ValidateRun } from "./ValidateRun";
import { WeekChart } from "./WeekChart";
import { Windows } from "./Windows";
import { Workflow } from "./Workflow";

/** The screen for each project: real output, code or images where they exist, a terminal drawing where they don't. */
export const FIGURES: Record<FigureId, ReactElement> = {
  validate: <ValidateRun />,
  workflow: <Workflow />,
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
