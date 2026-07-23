'use client';
import { usePathname } from 'next/navigation';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent, SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import TagList from "@/components/Search/TagList";
import TagListItem from "@/components/Search/TagListItem";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from 'next-intl';

export default function SearchComponent(props: SharedProps) {
  const pathname = usePathname();
  const t = useTranslations('Header.Search')
  const currentTag = useMemo(() => {
    const segments = pathname.split('/');
    const validTags = ['hytale', 'metrics', 'api'];
    const foundTag = segments.find(s => validTags.includes(s));
    return foundTag || 'minecraft';
  }, [pathname]);

  const [tag, setTag] = useState<string | undefined>(currentTag);

  useEffect(() => {
    setTag(currentTag);
  }, [currentTag]);

  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    tag,
    api: '/search',
  });
  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent className='overflow-visible'>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter className="flex flex-row rounded-2xl py-1 px-1">
          <TagList currentTag={tag || 'minecraft'}>
            <TagListItem isSelect={tag == 'minecraft'} icon={'pickaxe'} title={t('Minecraft.name')} description={t('Minecraft.description')} onclick={() => setTag('minecraft')} />
            <TagListItem isSelect={tag == 'hytale'} icon={'leaf'} title={t('Hytale.name')} description={t('Hytale.description')} onclick={() => setTag('hytale')} />
            <TagListItem isSelect={tag == 'metrics'} icon={'cable'} title={t('Metrics.name')} description={t('Metrics.description')} onclick={() => setTag('metrics')} />
            <TagListItem isSelect={tag == 'api'} icon={'chart-candlestick'} title={t('API.name')} description={t('API.description')} onclick={() => setTag('api')} />
          </TagList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}