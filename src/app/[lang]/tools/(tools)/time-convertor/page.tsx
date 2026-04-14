import Title from "@/components/Title/Title"
import TimeConvertor from "@/components/Tools/TimeConvertor"

export default function TimeConvertorPage() {
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text='Конвертер времени' />
            <p>Конвертер времени</p>
            <TimeConvertor />
        </div>
    )
}