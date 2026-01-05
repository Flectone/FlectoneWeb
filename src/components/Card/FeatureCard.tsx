import Card from "@/components/Card/Card";
import Svg from "@/components/Svg/Svg";
import {ReactNode} from "react";

interface FeatureCardProps {
    className?: string;
    image: string;
    imagePosition: 'bottom' | 'top' | 'left' | 'right';
    title: string | ReactNode;
    description: string | ReactNode;
    link?: string;
    glow?: 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom' | 'centerTop';
}

const glowStyles: Record<Required<FeatureCardProps>['glow'], string> = {
    rightTop: '-top-10 -right-10 w-42 h-42',
    rightBottom: '-bottom-10 -right-10 w-42 h-42',
    leftTop: '-top-10 -left-10 w-42 h-42',
    leftBottom: '-bottom-10 -left-10 w-42 h-42',
    centerTop: '-top-10 w-full h-42'
}

const imageStyles: Record<FeatureCardProps['imagePosition'], string> = {
  bottom: 'w-full h-auto right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)]',
  top: 'w-full h-auto right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)]',
  right: 'w-2/3 bottom-0 right-0 mask-[linear-gradient(to_left,white,transparent)]',
  left: 'w-full h-auto right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)]',
}


export default function FeatureCard({ className, image, title, description, link, glow, imagePosition }: FeatureCardProps) {
    return(
        <Card path={link} className={`${className} not-dark:border`}>
            <Svg src={image} className={`${imageStyles[imagePosition]} text-fd-primary not-dark:contrast-70 rounded-lg absolute -z-1 `} />
            <div className='text-start flex flex-col gap-2'>
              {typeof title === 'string' ? <h2 className='font-medium'>{title}</h2> : title}
              {typeof description === 'string' ? <p className=''>{description}</p> : description}

            </div>
            {glow && (<div className={`${glowStyles[glow]} absolute ...`}></div>)}
        </Card>
    )
}