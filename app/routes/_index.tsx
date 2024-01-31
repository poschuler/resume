import { json } from "@remix-run/node";
import { About } from "~/routes/about";
import { Certificates } from "~/routes/certificates";
import { Education } from "~/routes/education";
import { Experience } from "~/routes/experience";
import { Hero } from "~/routes/hero";
import { Skills } from "~/routes/skills";
import {
  basics,
  work,
  education,
  languages,
  skills,
  certificates,
} from "~/resume.json";
import { KeyboardManager } from "~/routes/keyboard-manager";

export async function loader() {
  return json({ basics, work, education, languages, skills, certificates });
}

export default function App() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certificates />
        {/*<Projects />*/}
      </section>
      <KeyboardManager />
    </main>
  );
}
