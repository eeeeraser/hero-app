"use client";

import React, { useState } from "react";

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
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Contact link href */
  contactHref?: string;
}

export function LandingAccordionItem({
  items = accordionItems,
  defaultActiveIndex = 0,
  title = "中国人物画知识图谱",
  description = "Build high-performance AI apps on-device without the hassle of model compression or edge deployment.",
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
            <h1
              className="font-bold leading-tight tracking-normal text-4xl md:text-[94px]"
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: "rgba(16, 24, 40, 1)",
              }}
            >
              {title === "中国人物画知识图谱" ? (
                <>
                  中国人物画
                  <br className="hidden md:inline" />
                  知识图谱
                </>
              ) : (
                title
              )}
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">{description}</p>
            <div className="mt-8">
              <a
                href={contactHref}
                className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Contact Us
              </a>
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
