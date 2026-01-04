import Card from "@/components/Card/Card";
import Svg from "@/components/Svg/Svg";

interface FeatureCardProps {
    className?: string;
    image: string;
    title: string;
    description: string;
    link?: string;
    glowPosition: 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom' | 'centerTop';
}

const glowStyles: Record<FeatureCardProps['glowPosition'], string> = {
    rightTop: '-top-10 -right-10 w-42 h-42',
    rightBottom: '-bottom-10 -right-10 w-42 h-42',
    leftTop: '-top-10 -left-10 w-42 h-42',
    leftBottom: '-bottom-10 -left-10 w-42 h-42',
    centerTop: '-top-10 w-full h-42'
};


export default function FeatureCard({ className, image, title, description, link, glowPosition }: FeatureCardProps) {
    return(
        <Card path={link} className={`not-dark:border w-1/3 h-72 max-[52rem]:w-full max-[52rem]:h-92 ${className}`}>
            <Svg src={image} className="text-fd-primary not-dark:contrast-70 rounded-lg absolute right-0 bottom-0 -z-1 mask-[linear-gradient(to_top,white,transparent)] shadow-sm w-full h-auto" />
            <div className='text-start flex flex-col gap-2'>
                <h2 className='font-medium'>{title}</h2>
                <p className=''>{description}</p>
            </div>
            <div className={`${glowStyles[glowPosition]} animate-pulse max-[52rem]:hidden [animation-duration:6s] absolute -z-1 bg-fd-primary/20 blur-2xl`}></div>
        </Card>
    )
}