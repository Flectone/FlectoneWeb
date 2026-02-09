'use client';
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
  type SharedProps, TagsList, TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { Cable, ChartCandlestick, Leaf, Pickaxe } from 'lucide-react';
import {useState} from "react";

export default function SearchComponent(props: SharedProps) {
  const [tag, setTag] = useState<string | undefined>();
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    tag,
    api: '/search',
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter className="flex flex-row">
          <TagsList tag={tag} onTagChange={setTag}>
            <TagsListItem className='px-3 py-1 cursor-pointer flex items-center gap-0.5 hover:bg-fd-accent' value="minecraft"><Pickaxe size={1.1+'em'}/>Minecraft</TagsListItem>
            <TagsListItem className='px-3 py-1 cursor-pointer flex items-center gap-0.5 hover:bg-fd-accent' value="hytale"><Leaf size={1.1+'em'}/>Hytale</TagsListItem>
            <TagsListItem className='px-3 py-1 cursor-pointer flex items-center gap-0.5 hover:bg-fd-accent' value="metrics"><ChartCandlestick size={1.1+'em'}/>Аналитика</TagsListItem>
            <TagsListItem className='px-3 py-1 cursor-pointer flex items-center gap-0.5 hover:bg-fd-accent' value="api"><Cable size={1.1+'em'}/>API</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}