import { IMAGES } from "@/data/projects";
import { Picture } from "../Picture";

/** Cinmux's two native apps: the Linux window, with the macOS one in front. */
export function Windows() {
  return (
    <figure className="media">
      <div className="windows">
        <Picture
          image={IMAGES.cinmuxLinux}
          sizes="(min-width: 64em) 36rem, 80vw"
          className="window-back"
        />
        <Picture
          image={IMAGES.cinmuxMacos}
          sizes="(min-width: 64em) 26rem, 56vw"
          className="window-front"
        />
      </div>
      <figcaption>
        The Linux app, with the macOS app in front. Every tab is a live tmux
        session.
      </figcaption>
    </figure>
  );
}
