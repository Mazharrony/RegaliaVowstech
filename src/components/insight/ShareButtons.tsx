"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

type Props = {
  title: string;
  labelCopy: string;
  labelCopied: string;
  labelTwitter: string;
  labelLinkedin: string;
};

export function ShareButtons({
  title,
  labelCopy,
  labelCopied,
  labelTwitter,
  labelLinkedin,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // no-op
    }
  };

  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const baseBtn =
    "inline-flex h-9 items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-4 text-[0.78rem] font-medium tracking-[-0.005em] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]";

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
      >
        {labelTwitter}
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
      >
        {labelLinkedin}
      </a>
      <button type="button" onClick={handleCopy} className={baseBtn}>
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <LinkIcon className="h-3.5 w-3.5" aria-hidden />
        )}
        {copied ? labelCopied : labelCopy}
      </button>
    </div>
  );
}
