import {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {ReactNode} from "react";
import {ChevronDown} from "lucide-react";
import {useTranslations} from "next-intl";

interface TagListProps {
    children: ReactNode;
    currentTag: string;
}

export default function TagList({children, currentTag}: TagListProps) {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Header.Search');

    const tagNames: Record<string, string> = {
        'minecraft': t('Minecraft.name'),
        'hytale': t('Hytale.name'),
        'api': t('API.name'),
        'metrics': t('Metrics.name'),
    };

    return (
        <div>
            <button className='text-xs flex gap-1 items-center text-fd-muted-foreground hover:bg-fd-accent rounded-lg px-2 py-1' onClick={() => setIsOpen(!isOpen ? true : false)}>
                {t('filter')}
                <p className='text-fd-foreground!'>
                    {tagNames[currentTag] || ''}
                </p>
                <ChevronDown size={1.1+'em'}/>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute left-0 z-50 bg-fd-card/50 backdrop-blur-2xl mt-3 border-1 rounded-2xl p-2 flex flex-col gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        onClick={() => setIsOpen(false)}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
