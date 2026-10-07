import styles from "./styles.module.scss"
import HomeHero from "./(ui)/HomeHero/HomeHero"
import HomeMemberOutcomes from "./(ui)/HomeMemberOutcomes/HomeMemberOutcomes"
import HomeVision from "./(ui)/HomeVision/HomeVision"
import HomePrograms from "./(ui)/HomePrograms/HomePrograms"
import HomeGetInvolved from "./(ui)/HomeGetInvolved/HomeGetInvolved"
import HomeContact from "./(ui)/HomeContact/HomeContact"

const MainPage = () => (
    <div className={styles.homePageContainer}>
        <HomeHero />
        <HomeMemberOutcomes />
        <HomeVision />
        <HomePrograms />
        <HomeGetInvolved />
        <HomeContact />
    </div>
)

export default MainPage
