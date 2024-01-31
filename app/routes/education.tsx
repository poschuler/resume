import { useLoaderData } from "@remix-run/react";
import { Section } from "~/components/section";
import { loader } from "~/routes/_app/route";
import { createId } from "@paralleldrive/cuid2";

export function Education() {
  const { education } = useLoaderData<typeof loader>();

  return (
    <Section title="Education">
      {education.map((item) => (
        <div
          key={createId()}
          className="rounded-lg bg-card text-card-foreground"
        >
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                {item.institution}
              </h3>
              <div className="text-sm tabular-nums text-muted-foreground">
                {`${item.startDate} - ${item.endDate}`}
              </div>
            </div>
          </div>
          <div className="mt-2 text-pretty font-mono text-xs leading-5 text-muted-foreground">
            {item.area}
          </div>
        </div>
      ))}
    </Section>
  );
}
