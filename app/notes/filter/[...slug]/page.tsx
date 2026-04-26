import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: { slug: string[] };
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const currentTag = slug[0];

  const tag = currentTag === "all" ? "" : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <h2 style={{ marginBottom: "20px" }}>
          Category: {currentTag === "all" ? "All Notes" : currentTag}
        </h2>

        <NotesClient tag={tag} />
      </section>
    </HydrationBoundary>
  );
}
