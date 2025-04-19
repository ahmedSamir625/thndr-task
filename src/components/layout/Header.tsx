import SearchInput from "../ui/SearchInput"

const Header = ({ layoutPaddings }: { layoutPaddings: string }) => {


    return (
        <>
            <header className={`${layoutPaddings} bg-yellow-400 min-h-12 py-2 flex flex-col gap-5 content-center items-center md:flex-row md:justify-between md:items-center `}>
                <h1 className="text-2xl font-bold">thndr App</h1>
                <SearchInput />

            </header>
        </>

    )
}

export default Header