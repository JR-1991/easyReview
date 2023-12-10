export default function Status(
    { accepted, show = true }: { accepted: boolean, show: boolean }
) {

    return (
        <div
            className={`flex flex-col items-start col-span-1 transition-all duration-200 ${show === true ? "hover:opacity-100" : "opacity-0"}`}
        >
            {accepted
                ? <div className="scale-75 badge badge-success">Accepted</div>
                : <div className="scale-75 badge badge-warning">Open</div>
            }
        </div>
    )
}