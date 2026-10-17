import { BookOpen, Check, LockKeyhole } from "lucide-react";
import { chapterForAge, earnedChapters, levelChapters, tr, type Age, type Knowledge, type Lang } from "@/lib/i18n";

export function RewardChapters({ discoveries, L, age }: { discoveries: Knowledge[]; L: Lang; age: Age }) {
  const earned = earnedChapters(discoveries);
  return <section id="earned-chapters" className="earned-chapters" aria-label={tr("rewards", L)}>
    <h2><BookOpen />{tr("rewards", L)}</h2>
    <ol>{levelChapters.map((chapter) => {
      const unlocked = earned.some((entry) => entry.level === chapter.level);
      return <li key={chapter.level} className={unlocked ? "is-earned" : "is-locked"}>
        <div className="chapter-heading"><span>{unlocked ? <Check /> : <LockKeyhole />}{tr("level", L)} {chapter.level}</span><strong>{unlocked ? chapter.title[L] : "𓂀 𓆣 𓇳"}</strong></div>
        {unlocked && <p>{chapterForAge(chapter, L, age)}</p>}
      </li>;
    })}</ol>
  </section>;
}