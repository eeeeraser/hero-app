"use client";

/**
 * @author: @emerald-ui
 * @description: An animated button with a shimmer gradient effect that moves across the surface
 * @version: 1.0.0
 * @date: 2026-02-11
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import * as React from "react";

import { cn } from "@/lib/utils";

type CommonProps = {
  children?: React.ReactNode;
  className?: string;
};

type ShimmerButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ShimmerButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

export type ShimmerButtonProps = ShimmerButtonAsButton | ShimmerButtonAsLink;

const shimmerMotion =
  "inline-flex animate-[shimmer2_2s_infinite_linear] items-center justify-center bg-size-[200%_100%] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const shimmerLookDefault =
  "h-12 rounded-md border border-slate-200 bg-[linear-gradient(110deg,#fff,45%,#f1f1f1,55%,#fff)] px-6 text-slate-600 focus-visible:ring-slate-700 focus-visible:ring-offset-slate-400 dark:border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-slate-400 dark:focus-visible:ring-slate-300";

export default function ShimmerButton(props: ShimmerButtonProps) {
  if ("href" in props && props.href !== undefined) {
    const { className, children, href, ...rest } = props;
    return (
      <a href={href} className={cn(shimmerMotion, shimmerLookDefault, className)} {...rest}>
        {children}
      </a>
    );
  }

  const { className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={cn(shimmerMotion, shimmerLookDefault, className)} {...rest}>
      {children}
    </button>
  );
}
