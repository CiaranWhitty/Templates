import { useEffect } from "react";

export default function Scrolling() {
  useEffect(() => {
    var offsetStart = 0;
    var offsetEnd = 0;

    window.addEventListener(
      "scroll",
      () => {
        document.documentElement.style.setProperty(
          "--scroll",
          (window.pageYOffset - offsetStart) /
            (document.body.offsetHeight -
              offsetStart -
              offsetEnd -
              window.innerHeight)
        );
      },
      false
    );
  });

  return (
    <div>
      <div></div>
    </div>
  );
}
