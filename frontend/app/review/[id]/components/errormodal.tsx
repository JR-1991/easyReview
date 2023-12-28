import cardStyle from "../../../utils/styles"

export default function ErrorModal(
    {
        error
    }: {
        error: string
    }) {
    return (
        <div className={`modal-box p-9 ${cardStyle}`}>
            <h3 className="text-xl font-bold">Something went wrong 😵</h3>
            <p className="py-4 font-light">{error}</p>
        </div>
    )
}