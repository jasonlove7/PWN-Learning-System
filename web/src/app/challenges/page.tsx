import { ChallengeBrowser } from "@/components/ChallengeBrowser";
import { getChallenges } from "@/lib/content";

export default function ChallengesPage() {
  return (
    <>
      <h1>题库</h1>
      <p className="lead">正式收录的题。计划中的题不在这里。</p>
      <ChallengeBrowser items={getChallenges()} />
    </>
  );
}
