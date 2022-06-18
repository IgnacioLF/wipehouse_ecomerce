import BlueButton from "./ui/BlueButton"

const LoadMore = ({
    onLoadMoreEvent = () => { },
}) => {
    return(
        <BlueButton buttonclick={() => onLoadMoreEvent()}>Cargar más</BlueButton>
    )
}

export default LoadMore;