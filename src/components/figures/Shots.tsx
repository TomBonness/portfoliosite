import { IMAGES, type ImageAsset } from "@/data/projects";
import { Picture } from "../Picture";

/** The Open Micro render, pulled apart into its layers. */
export function ProductShot() {
  return (
    <figure className="screen">
      <div className="screen-body screen-shots">
        <Picture
          image={IMAGES.openMicro}
          sizes="(min-width: 64em) 18rem, 60vw"
          className="product-image"
        />
      </div>
      <figcaption>
        A concept render of every layer, from the keycaps down to the base. Not
        a photograph.
      </figcaption>
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
    <figure className="screen">
      <div className="browser">
        <p className="browser-bar">
          <span className="browser-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {host}
        </p>
        <Picture image={image} sizes="(min-width: 64em) 34rem, 88vw" />
      </div>
      <figcaption>The live site, captured in November 2026</figcaption>
    </figure>
  );
}
