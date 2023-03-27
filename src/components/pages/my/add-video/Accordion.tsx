import { Spacer } from "#/components/uiParts";
import { useRef } from "react";
import { RxCaretUp } from "react-icons/rx";

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const getKeyFrames = (content: HTMLDivElement, action: "open" | "close") => {
    const keyFrames = [
      {
        height: content.offsetHeight + "px",
        opacity: 1,
      },
      {
        height: 0,
        opacity: 0,
      },
    ];

    if (action === "open") {
      // const firstkeyFrame = keyFrames.splice(0, 1);
      // keyFrames.splice(1, 0, ...firstkeyFrame);
      const copiedKeyFrames = [...keyFrames];
      return copiedKeyFrames.reverse();
    }
    return keyFrames;
  };

  const timingObject: KeyframeAnimationOptions = {
    duration: 400,
    easing: "ease-in-out",
  };

  const toggleAccordion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!detailsRef.current || !panelRef.current) return;

    if (detailsRef.current.open) {
      // 閉じる処理
      // is-openedはcaretアイコンのアニメーションのため。
      detailsRef.current.classList.remove("is-opened");
      const closeAnim = panelRef.current.animate(
        getKeyFrames(panelRef.current, "close"),
        timingObject
      );
      closeAnim.onfinish = () => {
        detailsRef.current?.removeAttribute("open");
      };
    } else {
      // 開く処理
      detailsRef.current.classList.add("is-opened");
      detailsRef.current.setAttribute("open", "true");
      panelRef.current.animate(
        getKeyFrames(panelRef.current, "open"),
        timingObject
      );
    }
  };

  return (
    <details ref={detailsRef} open={true} className="group/details is-opened">
      <summary
        // tabIndex={-1}
        // onClick={(e) => e.preventDefault()}
        onClick={toggleAccordion}
        className="group block absolute top-2 right-10 cursor-pointer outline-none focus-visible:ring-2 ring-cocoa-200"
      >
        {/* Toggle Accordion Button */}
        {/* <button
            type="button"
            onClick={toggleAccordion}
            className="absolute right-10 top-2 outline-none"
          > */}
        <RxCaretUp
          size={24}
          className="transition duration-500 group-focus-visible:opacity-100 group-[.is-opened]/details:-rotate-180 opacity-0 group-hover/collection-item:opacity-100"
        />
        {/* </button> */}
      </summary>

      <Spacer size={24} axis="column" />

      {/* Accordion Panel */}
      <div ref={panelRef} className="overflow-hidden">
        {children}
      </div>
    </details>
  );
};
