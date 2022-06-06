import BlueButton from "./ui/BlueButton"

const LoadMore = ({
    onLoadMoreEvent = () => { },
}) => {
    return(
        <BlueButton buttonclick={() => onLoadMoreEvent()}>Cargar Más</BlueButton>
    )
}

export default LoadMore;