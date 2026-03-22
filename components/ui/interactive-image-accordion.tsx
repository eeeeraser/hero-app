"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import ShimmerButton from "@/components/ui/shimmer-button";

// --- Data type for the image accordion ---
export interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

// --- Data for the image accordion（6 张卡片对应 public/1.jpg … 6.jpg）---
// 第 2、6 位已对调展示内容（原 2↔6）。1.jpg / 2.jpg 像素尺寸一致（800×986）
const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Voice Assistant",
    imageUrl: "/1.jpg",
  },
  {
    id: 2,
    title: "Digital Heritage",
    imageUrl: "/6.jpg",
  },
  {
    id: 3,
    title: "AI Chatbot + Local RAG",
    imageUrl: "/3.jpg",
  },
  {
    id: 4,
    title: "AI Agent",
    imageUrl: "/4.jpg",
  },
  {
    id: 5,
    title: "Visual Understanding",
    imageUrl: "/5.jpg",
  },
  {
    id: 6,
    title: "AI Image Generation",
    imageUrl: "/2.jpg",
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({
  item,
  isActive,
  onMouseEnter,
}: {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`
        relative h-[474px] rounded-2xl overflow-hidden cursor-pointer
        transition-[width] duration-700 ease-in-out
        ${isActive ? "w-[400px]" : "w-[60px]"}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* 固定 400×474；object-cover 铺满无黑边。第 1 张 object-right 恒 -translate-x-20；第 2、4–6 object-top；第 3 object-center；第 3 恒 -translate-x-18；第 5 恒 -translate-x-34（hover 前后不变） */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[400px]">
        <div
          className={`relative h-full w-full ${
            item.id === 1
              ? "-translate-x-[20px]"
              : item.id === 3
                ? "-translate-x-[18px]"
                : item.id === 5
                  ? "-translate-x-[34px]"
                  : ""
          }`}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="400px"
            quality={75}
            priority={isActive}
            draggable={false}
            className={`object-cover select-none ${
              item.id === 1
                ? "object-right"
                : [2, 4, 5, 6].includes(item.id)
                  ? "object-top"
                  : "object-center"
            }`}
          />
        </div>
      </div>

      {/* Caption Text */}
      <span
        className={`
          absolute z-10 text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0" // Active state: horizontal, bottom-center
              : "w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90" // Inactive state: vertical
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main App Component ---
export interface LandingAccordionItemProps {
  /** Custom accordion items (optional - uses default if not provided) */
  items?: AccordionItemData[];
  /** Initial active index (0-based, default: 4) */
  defaultActiveIndex?: number;
  /**
   * 若传入则左侧显示该图片；不传或空字符串则显示文字标题（「知识图谱」行为 md:text-[94px] font-normal）
   */
  heroImageSrc?: string | null;
  /** 标题图无障碍说明 */
  heroImageAlt?: string;
  /** 文字标题模式：主标题 */
  title?: string;
  /** 文字标题模式：副标题 */
  description?: string;
  /** Contact link href */
  contactHref?: string;
}

export function LandingAccordionItem({
  items = accordionItems,
  defaultActiveIndex = 0,
  heroImageSrc = "/text.png",
  heroImageAlt = "中国人物画知识图谱，南京艺术学院 · 美术与书法学院",
  title = "中国人物画知识图谱",
  description = "南京艺术学院 · 美术与书法学院",
  contactHref = "#contact",
}: LandingAccordionItemProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(defaultActiveIndex, items.length - 1),
  );

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="font-sans flex justify-center items-center min-h-full">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-28 md:items-start">
          {/* Left Side: 独立栅格列，宽度不受右侧手风琴动效挤压 */}
          <div className="w-full min-w-0 text-left">
            {heroImageSrc ? (
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                className="w-full max-w-[46rem] h-auto -translate-x-[12px]"
                draggable={false}
              />
            ) : (
              <>
                <h1
                  className="font-bold leading-tight tracking-normal text-4xl md:text-[94px] bg-clip-text text-transparent bg-[length:200%_auto] [animation:var(--animate-gradient-text)]"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(24, 60, 119, 1) 0%, rgba(11, 16, 86, 1) 50%, rgba(4, 16, 42, 1) 50%, rgba(59, 130, 246, 1) 100%)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {title === "中国人物画知识图谱" ? (
                    <>
                      中国人物画
                      <br className="hidden md:inline" />
                      <span className="text-4xl md:text-[94px] font-normal">
                        知识图谱
                      </span>
                    </>
                  ) : (
                    title
                  )}
                </h1>
                <p className="mt-6 text-lg text-[rgba(116,123,134,1)] max-w-xl">
                  {description}
                </p>
              </>
            )}
            <div className="mt-12">
              <ShimmerButton
                href={contactHref}
                style={{
                  fontFamily:
                    "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
                className="-translate-x-[12px] h-auto min-h-0 min-w-[130px] gap-2 rounded-[6px] border border-blue-600 bg-[linear-gradient(110deg,transparent,45%,rgba(59,130,246,0.16),55%,transparent)] px-5 py-3 text-center text-[19px] font-medium text-blue-600 duration-300 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-400 dark:bg-[linear-gradient(110deg,transparent,45%,rgba(96,165,250,0.14),55%,transparent)] dark:text-blue-400 dark:hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-zinc-900"
              >
                Enter
                <ArrowRight
                  className="size-[1.125rem] shrink-0"
                  strokeWidth={2}
                  aria-hidden
                />
              </ShimmerButton>
            </div>
          </div>

          {/* Right Side: Image Accordion（横向滚动在列内，不拉拽左列） */}
          <div className="w-full min-w-0">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto overflow-y-visible px-4 pb-4 pt-0">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
