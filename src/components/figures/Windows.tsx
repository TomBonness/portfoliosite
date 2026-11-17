import { IMAGES } from "@/data/projects";
import { Picture } from "../Picture";

/** Cinmux's two native apps: the Linux window, with the macOS one in front. */
export function Windows() {
  return (
    <figure className="screen">
      <div className="screen-body screen-shots">
        <div className="windows">
          <Picture
            image={IMAGES.cinmuxLinux}
            sizes="(min-width: 64em) 38rem, 84vw"
            className="window-back"
          />
          <Picture
            image={IMAGES.cinmuxMacos}
            sizes="(min-width: 64em) 26rem, 58vw"
            className="window-front"
          />
        </div>
      </div>
      <figcaption>
        The Linux app, with the macOS app in front. Every tab is a live tmux
        session.
      </figcaption>
    </figure>
  );
}
