
const Footer = ({ layoutPaddings }: { layoutPaddings: string }) => {
    return (
        <footer className={`${layoutPaddings} bg-yellow-400 h-10 content-center flex-grow  text-center`}>
            &copy; Ahmed Samir
        </footer>
    )
}

export default Footer