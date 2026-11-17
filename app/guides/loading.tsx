import { ListingPageSkeleton } from "@/components/skeletons/pages";

export default function Loading() {
  return <ListingPageSkeleton count={8} gap="gap-6" label="Loading guides" />;
}
