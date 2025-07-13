import type {
  ActionBlockFragment,
  EmbedBlockFragment,
  ImageBlockFragment,
  PagePartialBlockFragment,
  TableBlockFragment,
  TextBlockFragment,
  TextImageBlockFragment,
  VideoBlockFragment,
  VideoEmbedBlockFragment,
  GroupingBlockFragment,
  WeatherBlockFragment,
} from '@lib/datocms/types';
import type { WeatherBlockFragment } from '@lib/datocms/types.ts';

export type AnyBlock = Omit<
  ( // Add any new Block types here.
    | ActionBlockFragment
    | EmbedBlockFragment
    | GroupingBlockFragment
    | ImageBlockFragment
    | PagePartialBlockFragment
    | TableBlockFragment
    | TextBlockFragment
    | TextImageBlockFragment
    | VideoBlockFragment
    | VideoEmbedBlockFragment
    | WeatherBlockFragment
  ), '__typename' // Allow for any __typename so that missing blocks can be reported on.
> & { __typename: string };
