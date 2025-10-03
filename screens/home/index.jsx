import GradientWrapper from "../../components/LinearGradient";
import HomeContent from "./HomeContent";
import SkillsCarousel from "./SkillsCarousel";
import SkillsCategory from "./SkillsCategory";

export default function Home() {
  
  return (
    <GradientWrapper margin={16}>
      <HomeContent/>
      <SkillsCarousel/>
      <SkillsCategory/>
    </GradientWrapper>
  );
}
