import { Input } from "@/components"
import TextArea from "@/components/textArea"

export default function NoteForm({ state, setState, error, edit }: any) {
    const handleChange = (e: any) => {
        let { name, value } = e.target
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className="space-y-2">
            <Input
                label="Name"
                name='name'
                type='text'
                value={state?.name}
                onChange={handleChange}
            />
            <p className='text-red-400 text-sm'>{error?.name}</p>
            <TextArea
                label="Note"
                name='note'
                type='text'
                rows={25}
                value={state?.note}
                onChange={handleChange}
            />
            <p className='text-red-400 text-sm'>{error?.note}</p>
        </div>
    )
}
