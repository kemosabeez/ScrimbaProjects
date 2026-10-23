import type {JSX} from "react"

type GameFinishModalProps = {
    onRestart: () => void
}


export default function GameFinishModal({ onRestart }: GameFinishModalProps): JSX.Element {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="win-title"
                className="rounded-xl bg-white p-8 text-center shadow-xl"
            >
                <h2 id="win-title" className="mb-2 text-2xl font-bold">
                    You won!
                </h2>
                <p className="mb-5">All your dice match. Nice work!</p>
                <button
                    type="button"
                    onClick={onRestart}
                    className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                    Play again
                </button>
            </section>
        </div>
    );
}