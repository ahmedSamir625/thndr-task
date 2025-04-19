import { SkeletonTheme } from 'react-loading-skeleton';
import StocksList from '../ui/StocksList';


const Main = ({ layoutPaddings }: { layoutPaddings: string }) => {
    return (
        <SkeletonTheme baseColor="#ececec" highlightColor="#cfcfcf">
            <main className={`${layoutPaddings} mx-auto min-h-[calc(100svh-10rem)] flex-grow flex justify-center items-start max-w-[2000px]`}>
                <StocksList />
            </main>
        </SkeletonTheme>

    )
}

export default Main