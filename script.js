const figures = Array.from(document.querySelectorAll(".shot"));
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");

for (const figure of figures) {
  const image = figure.querySelector("img");
  const caption = figure.querySelector("figcaption");
  if (!image) continue;

  let frame = figure.querySelector(".shot-frame");
  if (!frame) {
    frame = document.createElement("div");
    frame.className = "shot-frame";
    image.before(frame);
    frame.appendChild(image);
  }

  const focusSpec = figure.dataset.focus?.trim();
  if (focusSpec) {
    const focusItems = focusSpec.split(";").map((item) => item.trim()).filter(Boolean);
    const primary = focusItems[0]?.split("|");
    if (primary?.length >= 2) {
      frame.style.setProperty("--fx", `${primary[0]}%`);
      frame.style.setProperty("--fy", `${primary[1]}%`);
    }

    for (const item of focusItems) {
      const [x, y, side = "right", text = "点击这里"] = item.split("|");
      const point = document.createElement("div");
      point.className = "focus-point";
      point.dataset.side = side;
      point.style.setProperty("--x", x);
      point.style.setProperty("--y", y);

      const ring = document.createElement("div");
      ring.className = "focus-ring";

      const label = document.createElement("div");
      label.className = "focus-label";
      label.textContent = text;

      point.append(ring, label);
      frame.appendChild(point);
    }
  }

  figure.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption?.textContent ?? "";
    lightbox.showModal();
  });
}

lightbox?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target === lightbox || target.closest(".close-button")) {
    lightbox.close();
  }
});
