import type { ImageAsset } from "@/data/projects";

/**
 * An image below the first screen: AVIF with a WebP fallback, in the two
 * widths that ship in `public/projects`. `sizes` is the slot it is drawn in.
 * `className` goes on the wrapper, which is the box the stylesheet places.
 */
export function Picture({
  image,
  sizes,
  className,
}: {
  image: ImageAsset;
  sizes: string;
  className?: string;
}) {
  const [small, large] = image.widths;

  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`${image.base}-${small}.avif ${small}w, ${image.base}-${large}.avif ${large}w`}
        sizes={sizes}
      />
      <img
        src={`${image.base}-${large}.webp`}
        srcSet={`${image.base}-${small}.webp ${small}w, ${image.base}-${large}.webp ${large}w`}
        sizes={sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
