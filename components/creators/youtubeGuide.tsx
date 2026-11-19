import { AppLink as Link } from "@/components/ui/AppLink";
import { Accordion } from "@/components/ui/Accordion";
import { youtubeConfig } from "@/data/youtube";
import { formatLongDate } from "@/lib/utils";

const reviewed = formatLongDate(youtubeConfig.revenueShare.lastReviewed);
const shortsOn = formatLongDate(youtubeConfig.shortsPayoutRule.effectiveFrom);
const nextEligibility = formatLongDate(youtubeConfig.eligibility.from2027.effectiveFrom);
const activityOn = formatLongDate(youtubeConfig.eligibility.activityEffectiveFrom);
const count = (value: number) => value.toLocaleString("en-US");

const linkClass = "font-semibold text-brand hover:underline";

export const youtubeFaqs = [
  {
    question: "How does an RPM become a monthly estimate?",
    answer:
      "RPM on this page means the creator revenue you enter per 1,000 views. Monthly revenue is your views divided by 1,000, then multiplied by that RPM. At 100,000 views and an RPM of 3.00, the expected month is USD 300 and the same figure across 12 months is USD 3,600. Low and high are separate numbers you type. They are not supplied by this site.",
  },
  {
    question: "What is the difference between RPM and CPM here?",
    answer: `RPM is already your revenue per 1,000 views. CPM is the rate before the monetized-playback percent and the creator share. In CPM mode you enter both. The long-form share opens at ${youtubeConfig.revenueShare.longFormPercent}%, the figure reviewed on ${reviewed}, and you can edit it. The playback percent is not stored in the config, so that box starts empty.`,
  },
  {
    question: "Are the Premium pool percentages included in the result?",
    answer: `No. YouTube announced in August 2026 that creator pools receive ${youtubeConfig.premiumPools.premiumPercent}% of net YouTube Premium subscription revenue and ${youtubeConfig.premiumPools.premiumLitePercent}% of net Premium Lite subscription revenue. Those percentages are not applied. The Premium box is a per-1,000-view amount you type, and it starts at 0.`,
  },
  {
    question: "When does the Shorts payout rule take effect?",
    answer: `The stored rule takes effect on ${shortsOn}. From that date, Shorts revenue in this calculator is paused when the estimated qualified views over ${youtubeConfig.shortsPayoutRule.windowDays} days are under ${count(youtubeConfig.shortsPayoutRule.minViews)}. The 90-day estimate is the month's Shorts views multiplied by 3. Before ${shortsOn} the calculator still computes Shorts revenue and marks the rule as upcoming.`,
  },
  {
    question: "Which Partner Program thresholds does the checker use?",
    answer: `It compares your numbers with two stored sets and does not look at your channel. The set reviewed on ${reviewed} is ${count(youtubeConfig.eligibility.current.subscribers)} subscribers, plus either ${count(youtubeConfig.eligibility.current.watchHours12m)} qualified watch hours in 12 months or ${count(youtubeConfig.eligibility.current.shortsViews90d)} qualified Shorts views in 90 days. From ${nextEligibility} the stored set is ${count(youtubeConfig.eligibility.from2027.subscribers)} subscribers and either ${count(youtubeConfig.eligibility.from2027.watchHours12m)} qualified watch hours or ${count(youtubeConfig.eligibility.from2027.shortsViews90d)} qualified Shorts views. The activity description that takes effect on ${activityOn} is text only and is not scored.`,
  },
  {
    question: "Is the payout threshold the same for every AdSense account?",
    answer: `The field opens at USD ${youtubeConfig.payout.thresholdUsd}. That is the standard threshold stored here for USD AdSense accounts. It can vary by reporting currency, and some creators have a lower threshold in AdSense. Edit the field if your account uses a different amount. The calculator then counts how many months of the USD estimate it takes to reach the number you left in the box.`,
  },
  {
    question: "Does this page tell me a US withholding rate?",
    answer:
      "No. It does not state a withholding rate. If you name an audience row US, USA, or United States, you can type the percent that applies to that portion only. The rate depends on the tax information submitted to Google and any treaty claim. Use the figure from your own documents. The linked YouTube Help page is an earnings overview, not a tax table and not tax advice.",
  },
  {
    question: "Why can the same view count produce a different estimate?",
    answer:
      "Audience country, topic, video length, ad format, season, and ad blockers all change the RPM in YouTube Analytics. This page does not publish an average by niche or country. A single RPM also hides a mix of countries. Treating any card as a promised payout is a mistake: the result is a low, expected, and high range from the numbers you entered.",
  },
] as const;

export function YouTubeGuide() {
  return (
    <article className="shell grid max-w-3xl gap-8 py-10">
      <section className="grid gap-4" aria-labelledby="how-youtube-pays">
        <h2 id="how-youtube-pays" className="text-2xl font-semibold tracking-[-0.03em]">How YouTube pays creators</h2>
        <p className="text-base leading-7 text-muted">
          YouTube does not pay a fixed price per view. The creator share stored here is {youtubeConfig.revenueShare.longFormPercent}% for long-form ads and {youtubeConfig.revenueShare.shortsPercent}% for Shorts, reviewed on {reviewed} against the{" "}
          <a className={linkClass} href={youtubeConfig.revenueShare.sourceUrl}>partner earnings overview</a>.
          The config has no separate start date for those shares, so none is invented here.
        </p>
        <p className="text-base leading-7 text-muted">
          RPM means creator revenue per 1,000 views: views divided by 1,000, times the RPM you type. CPM is the rate before your share. CPM mode keeps only the monetized-playback percent you enter, then applies the long-form share, which opens at {youtubeConfig.revenueShare.longFormPercent}% and can be edited. No playback percent is stored, so that box starts empty.
        </p>
        <p className="text-base leading-7 text-muted">
          Shorts also use an RPM you supply. A payout rule takes effect on {shortsOn}. From that date, Shorts revenue is paused when estimated qualified views over {youtubeConfig.shortsPayoutRule.windowDays} days are under {count(youtubeConfig.shortsPayoutRule.minViews)}. That estimate is the month&apos;s Shorts views multiplied by 3. Before {shortsOn} the calculator still computes Shorts revenue and marks the rule as upcoming. Source, reviewed {reviewed}:{" "}
          <a className={linkClass} href={youtubeConfig.shortsPayoutRule.sourceUrl}>Shorts monetization policies</a>.
        </p>
        <p className="text-base leading-7 text-muted">
          {`YouTube announced in August 2026 that creator pools receive ${youtubeConfig.premiumPools.premiumPercent}% of net YouTube Premium subscription revenue and ${youtubeConfig.premiumPools.premiumLitePercent}% of net Premium Lite subscription revenue.`}{" "}
          <a className={linkClass} href={youtubeConfig.premiumPools.sourceUrl}>Read the announcement</a>
          {`, reviewed ${reviewed}. Those percentages are not applied. The Premium field is a per-1,000-view amount you type, and it starts at 0.`}
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="what-affects-rpm">
        <h2 id="what-affects-rpm" className="text-2xl font-semibold tracking-[-0.03em]">What changes the RPM you should type</h2>
        <p className="text-base leading-7 text-muted">
          The same public view count can earn different amounts. Audience country, topic, length, ad format, season, and ad blockers all move the RPM in YouTube Analytics. This page publishes no average RPM or CPM by niche or country. Put the spread from your own report in the low and high fields. One blended RPM also hides a country mix. The optional mix, up to six rows that must sum to 100%, applies only to the expected long-form result in RPM mode.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="read-analytics">
        <h2 id="read-analytics" className="text-2xl font-semibold tracking-[-0.03em]">How to read your own YouTube Analytics</h2>
        <p className="text-base leading-7 text-muted">
          In the revenue report, read the RPM for the month you want and type that number. If you start from CPM, also read the share of views that counted as monetized playbacks. Public views and monetized playbacks are different: a playback is a view YouTube could sell against. Use one date range for views, rate, and playbacks. A lifetime RPM pasted onto this month&apos;s views mixes two periods. The low, expected, and high boxes are example fields. Replace each one. This page will not fill them with a benchmark.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="worked-example">
        <h2 id="worked-example" className="text-2xl font-semibold tracking-[-0.03em]">A worked example: 100,000 views at an RPM of 3.00</h2>
        <p className="text-base leading-7 text-muted">
          Enter 100,000 monthly views and an expected RPM of 3.00. The month is 100,000 divided by 1,000, times 3.00, which is USD 300. Across 12 months that same figure is USD 3,600. An RPM of 3.00 is not a typical rate, a niche rate, or a country rate. If Analytics shows a different RPM, type yours. Low and high stay empty until you enter them.
        </p>
        <p className="text-base leading-7 text-muted">
          {`The payout field opens at USD ${youtubeConfig.payout.thresholdUsd}, the standard threshold stored here for USD AdSense accounts. It can vary by reporting currency, and some creators have a lower one.`}{" "}
          At USD 300 a month, USD {youtubeConfig.payout.thresholdUsd} is first reached in one month of this example. The linked source, reviewed {reviewed}, is the{" "}
          <a className={linkClass} href={youtubeConfig.payout.sourceUrl}>partner earnings overview</a>.
          It is not a claim that every account pays out at that amount.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="ypp-thresholds">
        <h2 id="ypp-thresholds" className="text-2xl font-semibold tracking-[-0.03em]">Partner Program thresholds on this page</h2>
        <p className="text-base leading-7 text-muted">
          The checker compares what you type with two stored sets. It does not read your channel. Reviewed on {reviewed}: {count(youtubeConfig.eligibility.current.subscribers)} subscribers, plus either {count(youtubeConfig.eligibility.current.watchHours12m)} qualified watch hours in 12 months or {count(youtubeConfig.eligibility.current.shortsViews90d)} qualified Shorts views in 90 days (<a className={linkClass} href={youtubeConfig.eligibility.current.sourceUrl}>Partner Program overview</a>). From {nextEligibility}: {count(youtubeConfig.eligibility.from2027.subscribers)} subscribers and either {count(youtubeConfig.eligibility.from2027.watchHours12m)} qualified watch hours or {count(youtubeConfig.eligibility.from2027.shortsViews90d)} qualified Shorts views (<a className={linkClass} href={youtubeConfig.eligibility.from2027.sourceUrl}>the 2027 changes</a>).
        </p>
        <p className="text-base leading-7 text-muted">
          From {activityOn}, the stored activity description is any one of 1,000 qualified watch hours in 365 days, 1 million qualified Shorts views in 90 days, or 2 public long-form videos or 5 Shorts uploaded every 90 days. A channel that falls short gets a further 90 days to meet the watch-hour or Shorts-view option. The checker does not score that status. Source, reviewed {reviewed}:{" "}
          <a className={linkClass} href={youtubeConfig.eligibility.activitySourceUrl}>the same 2027 Help page</a>.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="payout-and-withholding">
        <h2 id="payout-and-withholding" className="text-2xl font-semibold tracking-[-0.03em]">US withholding</h2>
        <p className="text-base leading-7 text-muted">
          This page does not state a US withholding rate. If you name a row US, USA, or United States, you may type a percent for that portion only. The rate depends on the tax information submitted to Google and any treaty claim. Use the figure from your own documents.{" "}
          <a className={linkClass} href={youtubeConfig.usWithholding.sourceUrl}>The earnings overview</a>, reviewed {reviewed}, is the stored Help link, not a tax table. A display currency converts finished USD amounts only when its reference rate is positive, and it is not a payout rate. Read the{" "}
          <Link className={linkClass} href="/disclaimer">disclaimer</Link> before treating a card as money you will receive.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="common-mistakes">
        <h2 id="common-mistakes" className="text-2xl font-semibold tracking-[-0.03em]">Common mistakes</h2>
        <p className="text-base leading-7 text-muted">
          Confusing CPM with RPM skips the playback percent and the {youtubeConfig.revenueShare.longFormPercent}% long-form share. Using total views where the formula expects monetized playbacks treats unsold views as if they earned the full CPM. Ignoring country mix hides the audiences inside one RPM. The last mistake is treating the range as a promise. Low, expected, and high come from your inputs. They are not a payout guarantee, a quote from YouTube or Google, or tax advice. RealGigPay is not affiliated with YouTube or Google.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="youtube-faq">
        <h2 id="youtube-faq" className="text-2xl font-semibold tracking-[-0.03em]">Questions about this estimate</h2>
        <Accordion items={[...youtubeFaqs]} name="youtube-faq" />
      </section>

      <section className="grid gap-3" aria-labelledby="youtube-sources">
        <h2 id="youtube-sources" className="text-xl font-semibold">Sources and last reviewed</h2>
        <p className="text-sm leading-6 text-muted">Last reviewed {reviewed}.</p>
        <ul className="grid gap-2 text-sm">
          {youtubeConfig.sources.map((source) => (
            <li key={source.url}>
              <a className={linkClass} href={source.url} rel="noopener noreferrer">{source.label}</a>
              <span className="text-muted">. Reviewed {formatLongDate(source.lastReviewed)}.</span>
            </li>
          ))}
          <li>
            <a className={linkClass} href={youtubeConfig.premiumPools.sourceUrl} rel="noopener noreferrer">
              YouTube announcement of the Premium and Premium Lite creator pools
            </a>
            <span className="text-muted">. Announced in August 2026. Reviewed {formatLongDate(youtubeConfig.premiumPools.lastReviewed)}.</span>
          </li>
        </ul>
      </section>
    </article>
  );
}
