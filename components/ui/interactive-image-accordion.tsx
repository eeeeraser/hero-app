"use client";

import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

import ShimmerButton from "@/components/ui/shimmer-button";

// --- Data type for the image accordion ---
export interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

// --- Data for the image accordion（5 张卡片均使用 Unsplash 网络图片）---
const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Voice Assistant",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=450&fit=crop",
  },
  {
    id: 2,
    title: "AI Image Generation",
    imageUrl:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&h=450&fit=crop",
  },
  {
    id: 3,
    title: "AI Chatbot + Local RAG",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=450&fit=crop",
  },
  {
    id: 4,
    title: "AI Agent",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=450&fit=crop",
  },
  {
    id: 5,
    title: "Visual Understanding",
    imageUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=450&fit=crop",
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
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? "w-[400px]" : "w-[60px]"}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src =
            "https://placehold.co/400x450/2d3748/ffffff?text=Image+Error";
        }}
      />
      {/* 浅色遮罩，保证底部文字可读 */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-left">
            {heroImageSrc ? (
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                className="w-full max-w-xl h-auto"
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
            <div className="mt-8">
              <ShimmerButton
                href={contactHref}
                className="h-auto min-h-0 min-w-[124px] gap-2 rounded-[6px] border border-blue-600 bg-[linear-gradient(110deg,transparent,45%,rgba(59,130,246,0.16),55%,transparent)] px-5 py-3 text-center text-[18px] font-serif font-medium text-blue-600 duration-300 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-400 dark:bg-[linear-gradient(110deg,transparent,45%,rgba(96,165,250,0.14),55%,transparent)] dark:text-blue-400 dark:hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-300 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-zinc-900"
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

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
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
