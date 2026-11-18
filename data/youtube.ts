/**
 * YouTube Partner Program figures used by the earnings calculator.
 * Every number is editable by the caller. None of these are a payout promise.
 *
 * // TODO: verify against official YouTube Help before launch
 */

export interface YouTubeSource {
  label: string;
  url: string;
  lastReviewed: string;
}

export interface YouTubeConfig {
  revenueShare: {
    longFormPercent: number;
    shortsPercent: number;
    sourceUrl: string;
    lastReviewed: string;
  };
  premiumPools: {
    premiumPercent: number;
    premiumLitePercent: number;
    sourceUrl: string;
    lastReviewed: string;
  };
  shortsPayoutRule: {
    minViews: number;
    windowDays: number;
    effectiveFrom: string;
    sourceUrl: string;
    lastReviewed: string;
  };
  eligibility: {
    current: {
      subscribers: number;
      watchHours12m: number;
      shortsViews90d: number;
      sourceUrl: string;
      lastReviewed: string;
    };
    from2027: {
      subscribers: number;
      watchHours12m: number;
      shortsViews90d: number;
      effectiveFrom: string;
      sourceUrl: string;
      lastReviewed: string;
    };
    /** Shown as text. The checker does not score this line. */
    activityRule: string;
    activitySourceUrl: string;
    activityLastReviewed: string;
    activityEffectiveFrom: string;
  };
  payout: {
    thresholdUsd: number;
    sourceUrl: string;
    lastReviewed: string;
  };
  usWithholding: {
    defaultPercent: number;
    note: string;
    sourceUrl: string;
    lastReviewed: string;
  };
  sources: YouTubeSource[];
}

export const YOUTUBE_DISCLAIMER =
  "Estimate only. Not a payout guarantee, tax advice, or a quote from YouTube or Google.";

export const YOUTUBE_NOT_AFFILIATED = "RealGigPay is not affiliated with YouTube or Google.";

export const DISPLAY_CONVERSION_LABEL =
  "Display conversion at a reference rate, not a payout rate.";

export const youtubeConfig: YouTubeConfig = {
  revenueShare: {
    // TODO: verify against official YouTube Help before launch
    longFormPercent: 55,
    shortsPercent: 45,
    sourceUrl: "https://support.google.com/youtube/answer/72902",
    lastReviewed: "2026-11-19",
  },
  premiumPools: {
    // Share of net subscription revenue allocated to creator pools, before the video revenue share.
    // TODO: verify against official YouTube Help before launch
    premiumPercent: 30,
    premiumLitePercent: 60,
    sourceUrl: "https://support.google.com/youtube/thread/451804019",
    lastReviewed: "2026-11-19",
  },
  shortsPayoutRule: {
    // TODO: verify against official YouTube Help before launch
    minViews: 10_000_000,
    windowDays: 90,
    effectiveFrom: "2027-02-01",
    sourceUrl: "https://support.google.com/youtube/answer/12504220",
    lastReviewed: "2026-11-19",
  },
  eligibility: {
    current: {
      // TODO: verify against official YouTube Help before launch
      subscribers: 1000,
      watchHours12m: 4000,
      shortsViews90d: 10_000_000,
      sourceUrl: "https://support.google.com/youtube/answer/72851",
      lastReviewed: "2026-11-19",
    },
    from2027: {
      // TODO: verify against official YouTube Help before launch
      subscribers: 1000,
      watchHours12m: 8000,
      shortsViews90d: 20_000_000,
      effectiveFrom: "2027-02-01",
      sourceUrl: "https://support.google.com/youtube/answer/12843009",
      lastReviewed: "2026-11-19",
    },
    activityRule:
      "From 1 February 2027, YouTube Help describes a channel as active if it meets any one of these: 1,000 qualified watch hours in 365 days, 1 million qualified Shorts views in 90 days, or 2 public long-form videos or 5 Shorts uploaded every 90 days. Channels that fall short get a further 90 days to meet the watch-hour or Shorts-view option. This checker does not decide that status.",
    activitySourceUrl: "https://support.google.com/youtube/answer/12843009",
    activityLastReviewed: "2026-11-19",
    activityEffectiveFrom: "2027-02-01",
  },
  payout: {
    // TODO: verify against official YouTube Help before launch. Commonly cited as 100 USD. Not confirmed on the earnings overview reviewed 2026-11-19.
    thresholdUsd: 100,
    sourceUrl: "https://support.google.com/youtube/answer/72902",
    lastReviewed: "2026-11-19",
  },
  usWithholding: {
    // TODO: user must supply. TODO: verify the form names against official YouTube Help before launch.
    defaultPercent: 0,
    note: "Applied only to the portion of revenue you attribute to a US audience. The rate depends on the tax information submitted to Google and any treaty claim. Leave this at 0 until you enter the rate from your own documents.",
    sourceUrl: "https://support.google.com/youtube/answer/72902",
    lastReviewed: "2026-11-19",
  },
  sources: [
    {
      label: "YouTube partner earnings overview",
      url: "https://support.google.com/youtube/answer/72902",
      lastReviewed: "2026-11-19",
    },
    {
      label: "YouTube Shorts monetization policies",
      url: "https://support.google.com/youtube/answer/12504220",
      lastReviewed: "2026-11-19",
    },
    {
      label: "YouTube Partner Program overview and eligibility",
      url: "https://support.google.com/youtube/answer/72851",
      lastReviewed: "2026-11-19",
    },
    {
      label: "Changes to the YouTube Partner Program",
      url: "https://support.google.com/youtube/answer/12843009",
      lastReviewed: "2026-11-19",
    },
  ],
};
