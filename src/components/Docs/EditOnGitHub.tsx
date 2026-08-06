import {useTranslations} from "next-intl";
import {SquarePen} from "lucide-react";
import {JSX} from "react";

interface EditOnGitHubProps {
    href: string;
}

export default function EditOnGitHub({href}: EditOnGitHubProps): JSX.Element {
    const t = useTranslations('Pulse')

    return (
        <a href={href} className="no-underline flex gap-1 items-center font-normal text-sm text-fd-muted-foreground ">
            <SquarePen size={1.2+'em'}/>{t('EditOnGitHub')}
        </a>
    )
}