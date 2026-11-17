import { IMAGES, type ImageAsset } from "@/data/projects";
import { Picture } from "../Picture";

/** The Open Micro render on its own, since the object is the point. */
export function ProductShot() {
  return (
    <figure className="media media-product">
      <Picture
        image={IMAGES.openMicro}
        sizes="(min-width: 64em) 28rem, 76vw"
        className="product-image"
      />
      <figcaption>A concept render, not a photograph</figcaption>
    </figure>
  );
}

/** A live site as it looked when captured, framed with its address. */
export function BrowserShot({
  image,
  host,
}: {
  image: ImageAsset;
  host: string;
}) {
  return (
    <figure className="media">
      <div className="browser">
        <p className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {host}
        </p>
        <Picture image={image} sizes="(min-width: 64em) 30rem, 84vw" />
      </div>
      <figcaption>The live site, captured in November 2026</figcaption>
    </figure>
  );
}
