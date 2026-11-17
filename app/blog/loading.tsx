import { ListingPageSkeleton } from "@/components/skeletons/pages";

export default function Loading() {
  return <ListingPageSkeleton count={6} gap="gap-8" calendar label="Loading blog" />;
}
