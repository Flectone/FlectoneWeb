import Title from "@/components/Title/Title"
import TimeConverter from "@/components/Tools/TimeConverter"

export default function TimeConverterPage() {
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text='Конвертер времени' />
            <p>Конвертер времени</p>
            <TimeConverter />
        </div>
    )
}